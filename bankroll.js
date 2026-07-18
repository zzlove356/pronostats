/* =========================================================
   PronoStats — Gestion du bankroll (bilingue, dépend de i18n.js)
   Données stockées localement (localStorage). Aucun pari placé.
   ========================================================= */

const LS_KEY = "pronostats_bankroll_v1";

const DEFAULT_STATE = { startBankroll: 100, bankroll: 100, kellyFraction: 0.25, bets: [] };
let STATE = load();

function load(){
  try { const s = JSON.parse(localStorage.getItem(LS_KEY)); return s && s.bets ? s : {...DEFAULT_STATE}; }
  catch(e){ return {...DEFAULT_STATE}; }
}
function save(){ localStorage.setItem(LS_KEY, JSON.stringify(STATE)); }
function eur(n){ return (Math.round(n*100)/100).toLocaleString(LANG==="it"?"it-IT":"fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2}) + " €"; }
function esc(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

function tierStake(bankroll){ if(bankroll>=1000) return 100; if(bankroll>=500) return 50; return 30; }
const CONF_MULT = { eleve: 1.0, moyen: 0.6, faible: 0.3 };
function kellyFraction(odds, prob){ const b=odds-1, p=prob, q=1-prob; return (b*p - q)/b; }

function computeReco(){
  const bankroll = STATE.bankroll;
  const odds = parseFloat(document.getElementById("cOdds").value);
  const prob = parseFloat(document.getElementById("cProb").value)/100;
  const conf = document.getElementById("cConf").value;
  const out = document.getElementById("recoOut");

  if(!odds || odds<=1 || !prob || prob<=0 || prob>=1){
    out.innerHTML = `<p class="muted">${esc(t("bk_calc_ph"))}</p>`;
    return;
  }

  const impliedProb = 1/odds, fairOdd = 1/prob, edge = (prob*odds - 1), hasValue = edge > 0;
  const base = tierStake(bankroll);
  const tier = base * (CONF_MULT[conf] ?? 0.6);
  const hardCap = bankroll * 0.25;
  const tierCapped = Math.min(tier, hardCap);
  const kFull = kellyFraction(odds, prob);
  const kFrac = Math.max(0, kFull) * STATE.kellyFraction;
  const kellyStake = kFrac * bankroll;

  let reco, recoNote;
  if(!hasValue){
    reco = 0;
    recoNote = LANG==="it"
      ? "Nessun valore: la quota proposta è <b>inferiore</b> a quanto giustifica la tua probabilità stimata. Il consiglio è di <b>non giocare</b>."
      : "Pas de valeur : la cote proposée est <b>inférieure</b> à ce que ta probabilité estimée justifie. Le conseil est de <b>ne pas jouer</b>.";
  } else {
    reco = Math.min(tierCapped, kellyStake * 2);
    if(reco < kellyStake) reco = kellyStake;
    recoNote = LANG==="it"
      ? "C'è <b>valore</b>. La puntata prudente qui sopra è limitata dal Kelly frazionato per proteggere il capitale. Il tuo metodo a livelli darebbe <b>"+eur(tierCapped)+"</b> — sta a te scegliere dove posizionarti."
      : "Il y a de la <b>valeur</b>. La mise prudente ci-dessus est bornée par le Kelly fractionné pour protéger ton capital. Ta méthode par paliers donnerait <b>"+eur(tierCapped)+"</b> — à toi de choisir où te placer.";
  }
  const potGain = reco * (odds - 1);

  out.innerHTML = `
    <div class="big">${eur(reco)}</div>
    <div class="muted">${esc(t("bk_reco_stake"))} · ${esc(t("bk_potgain"))} ${eur(potGain)} (${esc(t("odds_word"))} ${odds.toFixed(2)})</div>
    <p style="margin-top:10px;font-size:.92rem">${recoNote}</p>
    <table>
      <tr><td>${esc(t("val_edge"))}</td><td style="color:${hasValue?'var(--green)':'var(--red)'}">${(edge>=0?'+':'')}${(edge*100).toFixed(1)}%</td></tr>
      <tr><td>${esc(t("val_fair"))}</td><td>${fairOdd.toFixed(2)}</td></tr>
      <tr><td>${LANG==="it"?"Prob. implicita della quota":"Proba implicite de la cote"}</td><td>${(impliedProb*100).toFixed(1)}%</td></tr>
      <tr><td>${LANG==="it"?"Metodo a livelli (fiducia "+esc(conf)+")":"Méthode paliers (conf. "+esc(conf)+")"}</td><td>${eur(tierCapped)}${tier>hardCap?' <span style="color:var(--gold)">('+(LANG==="it"?"limite 25%":"plafonné 25%")+')</span>':''}</td></tr>
      <tr><td>${LANG==="it"?"Kelly frazionato":"Kelly fractionné"} (×${STATE.kellyFraction})</td><td>${eur(kellyStake)}</td></tr>
    </table>
    <div class="badges" style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn primary" onclick="addBetFromReco(${odds},${(prob*100)},${reco})">＋ ${esc(t("bk_add"))}</button>
    </div>
    <p style="margin-top:12px;font-size:.85rem;color:var(--txt-mute)">${LANG==="it"
      ? "💡 Il <b>Kelly frazionato</b> è una versione prudente del criterio di Kelly: punta una frazione (qui un quarto) della puntata « ottimale » teorica, riducendo molto il rischio di rovina. Puntare 30 € su 100 € = 30% del capitale è aggressivo, da qui il limite di sicurezza al 25% e la modulazione per fiducia."
      : "💡 Le <b>Kelly fractionné</b> est une version prudente du critère de Kelly : il mise une fraction (ici un quart) de la mise « optimale » théorique, réduisant fortement le risque de ruine. Miser 30 € sur 100 € = 30% du capital, c'est agressif, d'où le plafond de sécurité à 25% et la modulation par la confiance."}</p>
    <div class="disclaimer" style="margin-top:14px">${esc(t("bk_disclaimer"))}</div>
  `;
}

function addBetFromReco(odds, probPct, stake){
  const label = document.getElementById("cLabel").value || (LANG==="it"?"Scommessa senza nome":"Pari sans nom");
  STATE.bets.unshift({ id: Date.now(), date: new Date().toISOString().slice(0,10), label, odds:+odds, stake:+(Math.round(stake*100)/100), status:"pending" });
  save(); renderAll();
}
function addManualBet(){
  const label = document.getElementById("mLabel").value || (LANG==="it"?"Scommessa senza nome":"Pari sans nom");
  const odds = parseFloat(document.getElementById("mOdds").value);
  const stake = parseFloat(document.getElementById("mStake").value);
  if(!odds || odds<=1 || !stake || stake<=0){ alert(LANG==="it"?"Inserisci una quota (>1) e una puntata (>0).":"Renseigne une cote (>1) et une mise (>0)."); return; }
  STATE.bets.unshift({ id: Date.now(), date: new Date().toISOString().slice(0,10), label, odds, stake, status:"pending" });
  document.getElementById("mLabel").value=""; document.getElementById("mOdds").value=""; document.getElementById("mStake").value="";
  save(); renderAll();
}
function settleBet(id, status){ const b=STATE.bets.find(x=>x.id===id); if(!b) return; applyResult(b,false); b.status=status; applyResult(b,true); save(); renderAll(); }
function applyResult(b, add){ const s=add?1:-1; if(b.status==="win") STATE.bankroll += s*b.stake*(b.odds-1); if(b.status==="loss") STATE.bankroll -= s*b.stake; }
function deleteBet(id){ const b=STATE.bets.find(x=>x.id===id); if(!b) return; applyResult(b,false); STATE.bets=STATE.bets.filter(x=>x.id!==id); save(); renderAll(); }

function saveBankroll(){
  const v = parseFloat(document.getElementById("bkStart").value);
  if(!isNaN(v)){
    const settledProfit = STATE.bets.filter(b=>b.status!=="pending").reduce((s,b)=> s + (b.status==="win"? b.stake*(b.odds-1) : -b.stake), 0);
    STATE.startBankroll = v; STATE.bankroll = v + settledProfit; save(); renderAll();
  }
}
function setKelly(v){ STATE.kellyFraction = parseFloat(v); save(); computeReco(); }

function renderKPIs(){
  const pending = STATE.bets.filter(b=>b.status==="pending");
  const pendingTotal = pending.reduce((s,b)=>s+b.stake,0);
  const profit = STATE.bankroll - STATE.startBankroll;
  const settledStake = STATE.bets.filter(b=>b.status!=="pending").reduce((s,b)=>s+b.stake,0);
  const roi = settledStake>0 ? (profit/settledStake*100) : 0;
  document.getElementById("kpis").innerHTML = `
    <div class="kpi"><div class="lbl">${esc(t("bk_cur"))}</div><div class="num">${eur(STATE.bankroll)}</div></div>
    <div class="kpi"><div class="lbl">${esc(t("bk_balance"))}</div><div class="num ${profit>=0?'pos':'neg'}">${profit>=0?'+':''}${eur(profit)}</div></div>
    <div class="kpi"><div class="lbl">${esc(t("bk_roi"))}</div><div class="num ${roi>=0?'pos':'neg'}">${roi>=0?'+':''}${roi.toFixed(1)}%</div></div>
    <div class="kpi"><div class="lbl">${esc(t("bk_pending"))}</div><div class="num">${pending.length} <small>· ${eur(pendingTotal)} ${esc(t("bk_engaged"))}</small></div></div>
  `;
  document.getElementById("bkStart").value = STATE.startBankroll;
}

function renderBets(){
  const host = document.getElementById("betsTable");
  if(!STATE.bets.length){ host.innerHTML = `<div class="empty">${esc(t("bk_empty"))}</div>`; return; }
  host.innerHTML = `
    <div class="tscroll"><table class="bets">
      <thead><tr><th>${esc(t("bk_th_date"))}</th><th>${esc(t("bk_th_bet"))}</th><th>${esc(t("bk_th_odds"))}</th><th>${esc(t("bk_th_stake"))}</th><th>${esc(t("bk_th_status"))}</th><th>${esc(t("bk_th_pl"))}</th><th></th></tr></thead>
      <tbody>
        ${STATE.bets.map(b=>{
          const pl = b.status==="win" ? b.stake*(b.odds-1) : b.status==="loss" ? -b.stake : 0;
          const tag = b.status==="win"?`<span class="tag win">${esc(t("bk_won"))}</span>`: b.status==="loss"?`<span class="tag loss">${esc(t("bk_lost"))}</span>`:`<span class="tag pending">${esc(t("bk_ongoing"))}</span>`;
          return `<tr>
            <td>${esc(b.date)}</td><td>${esc(b.label)}</td><td>${b.odds.toFixed(2)}</td><td>${eur(b.stake)}</td><td>${tag}</td>
            <td style="color:${pl>0?'var(--green)':pl<0?'var(--red)':'var(--txt-mute)'}">${b.status==="pending"?"—":(pl>=0?'+':'')+eur(pl)}</td>
            <td class="row-actions">
              ${b.status==="pending" ? `<button onclick="settleBet(${b.id},'win')">✓ ${esc(t("bk_won"))}</button><button onclick="settleBet(${b.id},'loss')">✗ ${esc(t("bk_lost"))}</button>` : `<button onclick="settleBet(${b.id},'pending')">↺</button>`}
              <button class="del" onclick="deleteBet(${b.id})">🗑</button>
            </td>
          </tr>`;
        }).join("")}
      </tbody>
    </table></div>`;
}

function renderAll(){ renderKPIs(); renderBets(); }

function prefillFromURL(){
  const q = new URLSearchParams(location.search);
  if(q.get("odds")) document.getElementById("cOdds").value = q.get("odds");
  if(q.get("prob")) document.getElementById("cProb").value = q.get("prob");
  if(q.get("conf")) document.getElementById("cConf").value = q.get("conf");
  if(q.get("label")) document.getElementById("cLabel").value = q.get("label");
  if(q.get("odds")) computeReco();
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof applyStaticI18n === "function") applyStaticI18n();
  const kf = document.getElementById("kellySel"); if(kf) kf.value = String(STATE.kellyFraction);
  renderAll();
  prefillFromURL();
});
