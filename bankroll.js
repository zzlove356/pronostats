/* =========================================================
   PronoStats — Gestion du bankroll
   Données stockées localement dans le navigateur (localStorage).
   Rien n'est envoyé nulle part ; aucun pari n'est jamais placé.
   ========================================================= */

const LS_KEY = "pronostats_bankroll_v1";

const DEFAULT_STATE = {
  startBankroll: 100,   // capital de départ
  bankroll: 100,        // capital actuel (réalisé)
  kellyFraction: 0.25,  // fraction de Kelly (prudence) : 0.25 = quart de Kelly
  bets: []              // { id, date, label, odds, stake, status: 'pending'|'win'|'loss' }
};

let STATE = load();

function load(){
  try { const s = JSON.parse(localStorage.getItem(LS_KEY)); return s && s.bets ? s : {...DEFAULT_STATE}; }
  catch(e){ return {...DEFAULT_STATE}; }
}
function save(){ localStorage.setItem(LS_KEY, JSON.stringify(STATE)); }
function eur(n){ return (Math.round(n*100)/100).toLocaleString("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2}) + " €"; }
function esc(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

/* ----- Méthode de mise ----- */
// 1) Mise "paliers" (méthode d'Abdel) selon le bankroll
function tierStake(bankroll){
  if(bankroll >= 1000) return 100;
  if(bankroll >= 500)  return 50;
  return 30;
}
// modulateur selon la confiance de l'analyse
const CONF_MULT = { eleve: 1.0, moyen: 0.6, faible: 0.3 };

// 2) Kelly fractionné
function kellyFraction(odds, prob){ // prob en 0..1
  const b = odds - 1, p = prob, q = 1 - prob;
  const f = (b*p - q) / b;
  return f; // peut être négatif (=> pas de value)
}

function computeReco(){
  const bankroll = STATE.bankroll;
  const odds = parseFloat(document.getElementById("cOdds").value);
  const prob = parseFloat(document.getElementById("cProb").value)/100;
  const conf = document.getElementById("cConf").value;
  const out = document.getElementById("recoOut");

  if(!odds || odds<=1 || !prob || prob<=0 || prob>=1){
    out.innerHTML = '<p class="muted">Renseigne une cote (>1) et une probabilité estimée (1–99%) pour obtenir une suggestion.</p>';
    return;
  }

  const impliedProb = 1/odds;                 // proba implicite de la cote
  const fairOdd = 1/prob;                      // cote "juste"
  const edge = (prob*odds - 1);                // espérance par euro misé
  const hasValue = edge > 0;

  // Méthode paliers modulée
  const base = tierStake(bankroll);
  let tier = base * (CONF_MULT[conf] ?? 0.6);
  // sécurité : jamais plus de 25% du bankroll sur un pari
  const hardCap = bankroll * 0.25;
  let tierCapped = Math.min(tier, hardCap);

  // Kelly fractionné (prudent)
  const kFull = kellyFraction(odds, prob);
  const kFrac = Math.max(0, kFull) * STATE.kellyFraction;
  const kellyStake = kFrac * bankroll;

  // Recommandation finale : prudente
  let reco;
  let recoNote;
  if(!hasValue){
    reco = 0;
    recoNote = "Pas de valeur : la cote proposée est <b>inférieure</b> à ce que ta probabilité estimée justifie. Le conseil est de <b>ne pas jouer</b> ce pari.";
  } else {
    // Recommandation prudente : on borne la mise par le Kelly fractionné (protection du capital),
    // sans jamais dépasser ta méthode par paliers plafonnée.
    reco = Math.min(tierCapped, kellyStake * 2); // plafond haut = 2x Kelly fractionné (~demi-Kelly)
    if(reco < kellyStake) reco = kellyStake;      // plancher = Kelly fractionné
    recoNote = "Il y a de la <b>valeur</b> sur ce pari. La mise prudente ci-dessus est bornée par le Kelly fractionné pour protéger ton capital. " +
               "Ta méthode par paliers donnerait <b>" + eur(tierCapped) + "</b> — à toi de choisir où te placer entre les deux, en gardant en tête qu’une mise plus faible réduit fortement le risque de ruine.";
  }
  const potGain = reco * (odds - 1);

  out.innerHTML = `
    <div class="big">${eur(reco)}</div>
    <div class="muted">Mise recommandée · gain potentiel net ${eur(potGain)} (cote ${odds.toFixed(2)})</div>
    <p style="margin-top:10px;font-size:.92rem">${recoNote}</p>
    <table>
      <tr><td>Valeur du pari (edge)</td><td style="color:${hasValue?'var(--green)':'var(--red)'}">${(edge>=0?'+':'')}${(edge*100).toFixed(1)}%</td></tr>
      <tr><td>Cote « juste » (selon ta proba)</td><td>${fairOdd.toFixed(2)}</td></tr>
      <tr><td>Proba implicite de la cote</td><td>${(impliedProb*100).toFixed(1)}%</td></tr>
      <tr><td>Ta méthode (paliers · conf. ${esc(conf)})</td><td>${eur(tierCapped)}${tier>hardCap?' <span style="color:var(--gold)">(plafonné 25%)</span>':''}</td></tr>
      <tr><td>Kelly fractionné (×${STATE.kellyFraction})</td><td>${eur(kellyStake)}</td></tr>
      <tr><td>Kelly complet suggérerait</td><td>${kFull>0?eur(kFull*bankroll):'0 € (pas de value)'}</td></tr>
    </table>
    <div class="badges" style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn primary" onclick="addBetFromReco(${odds},${(prob*100)},${reco})">＋ Ajouter ce pari au suivi</button>
    </div>
    <p style="margin-top:12px;font-size:.85rem;color:var(--txt-mute)">
      💡 <b>Rappel méthode.</b> Le <b>Kelly fractionné</b> est une version prudente du critère de Kelly : il mise une fraction
      (ici un quart) de la mise « optimale » théorique, ce qui réduit fortement le risque de ruine tout en profitant de la valeur.
      C'est l'approche la plus adaptée à un usage prudent. Ta méthode par paliers (30/50/100 €) reste affichée pour comparaison,
      mais 30 € sur 100 € = 30% du capital : c'est agressif, d'où le plafond de sécurité à 25% et la modulation par la confiance.
    </p>
    <div class="disclaimer" style="margin-top:14px"><b>⚠</b> Ceci est un calcul d'aide à la décision. La décision finale et la responsabilité t'appartiennent entièrement. Aucun pari n'est placé par le site.</div>
  `;
}

/* ----- Suivi des paris ----- */
function addBetFromReco(odds, probPct, stake){
  const label = document.getElementById("cLabel").value || "Pari sans nom";
  STATE.bets.unshift({ id: Date.now(), date: new Date().toISOString().slice(0,10), label, odds:+odds, stake:+(Math.round(stake*100)/100), status:"pending" });
  save(); renderAll();
}

function addManualBet(){
  const label = document.getElementById("mLabel").value || "Pari sans nom";
  const odds = parseFloat(document.getElementById("mOdds").value);
  const stake = parseFloat(document.getElementById("mStake").value);
  if(!odds || odds<=1 || !stake || stake<=0){ alert("Renseigne une cote (>1) et une mise (>0)."); return; }
  STATE.bets.unshift({ id: Date.now(), date: new Date().toISOString().slice(0,10), label, odds, stake, status:"pending" });
  document.getElementById("mLabel").value=""; document.getElementById("mOdds").value=""; document.getElementById("mStake").value="";
  save(); renderAll();
}

function settleBet(id, status){
  const b = STATE.bets.find(x=>x.id===id); if(!b) return;
  // annuler l'effet précédent si déjà réglé
  applyResult(b, false);
  b.status = status;
  applyResult(b, true);
  save(); renderAll();
}
function applyResult(b, add){
  const sign = add ? 1 : -1;
  if(b.status==="win")  STATE.bankroll += sign * b.stake*(b.odds-1);
  if(b.status==="loss") STATE.bankroll -= sign * b.stake;
}
function deleteBet(id){
  const b = STATE.bets.find(x=>x.id===id); if(!b) return;
  applyResult(b, false); // retirer son effet du bankroll
  STATE.bets = STATE.bets.filter(x=>x.id!==id);
  save(); renderAll();
}

/* ----- Réglages bankroll ----- */
function saveBankroll(){
  const v = parseFloat(document.getElementById("bkStart").value);
  if(!isNaN(v)){
    const settledProfit = STATE.bets.filter(b=>b.status!=="pending").reduce((s,b)=> s + (b.status==="win"? b.stake*(b.odds-1) : -b.stake), 0);
    STATE.startBankroll = v;
    STATE.bankroll = v + settledProfit;
    save(); renderAll();
  }
}
function setKelly(v){ STATE.kellyFraction = parseFloat(v); save(); computeReco(); }

/* ----- Rendu ----- */
function renderKPIs(){
  const pending = STATE.bets.filter(b=>b.status==="pending");
  const pendingTotal = pending.reduce((s,b)=>s+b.stake,0);
  const profit = STATE.bankroll - STATE.startBankroll;
  const settledStake = STATE.bets.filter(b=>b.status!=="pending").reduce((s,b)=>s+b.stake,0);
  const roi = settledStake>0 ? (profit/settledStake*100) : 0;

  document.getElementById("kpis").innerHTML = `
    <div class="kpi"><div class="lbl">Bankroll actuel</div><div class="num">${eur(STATE.bankroll)}</div></div>
    <div class="kpi"><div class="lbl">Bilan total</div><div class="num ${profit>=0?'pos':'neg'}">${profit>=0?'+':''}${eur(profit)}</div></div>
    <div class="kpi"><div class="lbl">ROI (paris réglés)</div><div class="num ${roi>=0?'pos':'neg'}">${roi>=0?'+':''}${roi.toFixed(1)}%</div></div>
    <div class="kpi"><div class="lbl">Paris en cours</div><div class="num">${pending.length} <small>· ${eur(pendingTotal)} engagés</small></div></div>
  `;
  document.getElementById("bkStart").value = STATE.startBankroll;
}

function renderBets(){
  const host = document.getElementById("betsTable");
  if(!STATE.bets.length){ host.innerHTML = '<div class="empty">Aucun pari suivi pour l’instant. Ajoute-en un via le calculateur ou le formulaire ci-dessous.</div>'; return; }
  host.innerHTML = `
    <table class="bets">
      <thead><tr><th>Date</th><th>Pari</th><th>Cote</th><th>Mise</th><th>Statut</th><th>Gain/Perte</th><th></th></tr></thead>
      <tbody>
        ${STATE.bets.map(b=>{
          const pl = b.status==="win" ? b.stake*(b.odds-1) : b.status==="loss" ? -b.stake : 0;
          const tag = b.status==="win"?'<span class="tag win">Gagné</span>': b.status==="loss"?'<span class="tag loss">Perdu</span>':'<span class="tag pending">En cours</span>';
          return `<tr>
            <td>${esc(b.date)}</td>
            <td>${esc(b.label)}</td>
            <td>${b.odds.toFixed(2)}</td>
            <td>${eur(b.stake)}</td>
            <td>${tag}</td>
            <td style="color:${pl>0?'var(--green)':pl<0?'var(--red)':'var(--txt-mute)'}">${b.status==="pending"?"—":(pl>=0?'+':'')+eur(pl)}</td>
            <td class="row-actions">
              ${b.status==="pending" ? `<button onclick="settleBet(${b.id},'win')">✓ Gagné</button><button onclick="settleBet(${b.id},'loss')">✗ Perdu</button>` : `<button onclick="settleBet(${b.id},'pending')">↺ Rouvrir</button>`}
              <button class="del" onclick="deleteBet(${b.id})">🗑</button>
            </td>
          </tr>`;
        }).join("")}
      </tbody>
    </table>`;
}

function renderAll(){ renderKPIs(); renderBets(); }

/* ----- Préremplissage depuis une page match ----- */
function prefillFromURL(){
  const q = new URLSearchParams(location.search);
  if(q.get("odds")) document.getElementById("cOdds").value = q.get("odds");
  if(q.get("prob")) document.getElementById("cProb").value = q.get("prob");
  if(q.get("conf")) document.getElementById("cConf").value = q.get("conf");
  if(q.get("label")) document.getElementById("cLabel").value = q.get("label");
  if(q.get("odds")) computeReco();
}

document.addEventListener("DOMContentLoaded", () => {
  const kf = document.getElementById("kellySel"); if(kf) kf.value = String(STATE.kellyFraction);
  renderAll();
  prefillFromURL();
});
