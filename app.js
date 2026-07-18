/* =========================================================
   PronoStats — rendu accueil + page match
   ========================================================= */

const CONF_LABEL = { faible: "Confiance faible", moyen: "Confiance moyenne", eleve: "Confiance élevée" };
const CONF_ICON  = { faible: "⚠", moyen: "◐", eleve: "●" };

function esc(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

/* ---------- ACCUEIL : liste des matchs ---------- */
function renderHome(){
  const grid = document.getElementById("matchGrid");
  if(!grid) return;
  if(!MATCHES.length){ grid.innerHTML = '<div class="empty">Aucun match analysé pour l’instant. Demande-moi une analyse dans Cowork.</div>'; return; }

  grid.innerHTML = MATCHES.map(m => {
    const p = m.prediction;
    const bestOdd = m.odds.best[ p.pickShort === m.home.name ? "home" : p.pickShort === m.away.name ? "away" : "draw" ];
    return `
    <a class="match-card" href="match.html?id=${encodeURIComponent(m.id)}">
      <div class="comp">${esc(m.competition)}</div>
      <div class="teams">
        <div class="team"><span class="flag">${m.home.flag}</span>${esc(m.home.name)}</div>
        <span class="vs">VS</span>
        <div class="team">${esc(m.away.name)}<span class="flag">${m.away.flag}</span></div>
      </div>
      <div class="meta">
        <span>📅 ${esc(m.date)}</span>
        <span>⏰ ${esc(m.kickoff)}</span>
      </div>
      <div class="meta" style="gap:8px">
        <span class="pill pick">✓ ${esc(p.pick)}</span>
        <span class="pill conf-${p.confidence}">${CONF_ICON[p.confidence]} ${esc(CONF_LABEL[p.confidence])}</span>
        ${bestOdd ? `<span class="pill odds">Cote ${bestOdd.dec.toFixed(2)}</span>` : ""}
      </div>
      <div class="foot">
        <span class="go">Voir l’analyse complète →</span>
      </div>
    </a>`;
  }).join("");
}

/* ---------- PAGE MATCH ---------- */
function getParam(name){ return new URLSearchParams(location.search).get(name); }

function renderMatch(){
  const host = document.getElementById("matchDetail");
  if(!host) return;
  const id = getParam("id");
  const m = MATCHES.find(x => x.id === id) || MATCHES[0];
  if(!m){ host.innerHTML = '<div class="empty">Match introuvable.</div>'; return; }

  document.title = `${m.home.name} – ${m.away.name} · PronoStats`;
  const p = m.prediction;
  const o = m.odds;
  const pickKey = p.pickShort === m.home.name ? "home" : p.pickShort === m.away.name ? "away" : "draw";
  const bestOdd = o.best[pickKey];
  const aiProb = o.aiProb[pickKey];
  const fairOdd = aiProb ? (100/aiProb) : null;
  const edge = (aiProb && bestOdd) ? ((aiProb/100)*bestOdd.dec - 1)*100 : null;

  const stat = (label,a,b,aVal,bVal) => `
    <div class="statline">
      <div class="row"><span>${a}</span><span>${label}</span><span>${b}</span></div>
      <div class="bar"><div class="a" style="width:${aVal}%"></div><div class="b" style="width:${bVal}%"></div></div>
    </div>`;

  host.innerHTML = `
    <a class="back" href="index.html">← Retour aux analyses</a>

    <div class="detail-hero">
      <div class="comp">${esc(m.competition)}</div>
      <div class="scoreline">
        <div class="side">
          <div class="flag">${m.home.flag}</div>
          <div class="name">${esc(m.home.name)}</div>
          <div class="odd">Cote ${o.best.home.dec.toFixed(2)} · AI ${o.aiProb.home}%</div>
        </div>
        <div class="mid"><div>Nul ${o.best.draw.dec.toFixed(2)}</div><div class="k">VS</div><div>AI ${o.aiProb.draw}%</div></div>
        <div class="side">
          <div class="flag">${m.away.flag}</div>
          <div class="name">${esc(m.away.name)}</div>
          <div class="odd">Cote ${o.best.away.dec.toFixed(2)} · AI ${o.aiProb.away}%</div>
        </div>
      </div>
      <div class="info-row">
        <span>📅 ${esc(m.date)}</span><span>⏰ ${esc(m.kickoff)}</span><span>📍 ${esc(m.venue)}</span>
      </div>
    </div>

    <!-- PRÉDICTION -->
    <div class="predict">
      <h3>🎯 Prédiction — ${esc(p.pick)} <span style="color:var(--txt-dim);font-weight:600">(score probable ${esc(p.score)})</span></h3>
      <div class="badges">
        <span class="pill conf-${p.confidence}">${CONF_ICON[p.confidence]} ${esc(CONF_LABEL[p.confidence])}</span>
        <span class="pill odds">${esc(p.goals)}</span>
        ${p.value ? '<span class="pill pick">💎 Value bet détecté</span>' : '<span class="pill odds">Pas de value nette</span>'}
      </div>
      <p>${esc(p.summary)}</p>
      <div class="valuebox">
        <div class="cell"><div class="lbl">Meilleure cote (${esc(p.pickShort)})</div><div class="val">${bestOdd.dec.toFixed(2)} <span style="font-size:.8rem;color:var(--txt-dim)">${esc(bestOdd.frac)}</span></div></div>
        <div class="cell"><div class="lbl">Proba estimée (AI)</div><div class="val">${aiProb}%</div></div>
        <div class="cell"><div class="lbl">Cote « juste »</div><div class="val">${fairOdd ? fairOdd.toFixed(2) : "—"}</div></div>
        <div class="cell"><div class="lbl">Valeur (edge)</div><div class="val ${edge>=0?'good':'bad'}">${edge!=null?(edge>=0?'+':'')+edge.toFixed(1)+'%':'—'}</div></div>
      </div>
      <p style="margin-top:14px;font-size:.92rem"><strong>Sur quoi repose la prédiction :</strong></p>
      <ul style="margin:6px 0 0 18px;color:var(--txt-dim);font-size:.92rem">
        ${p.basedOn.map(x=>`<li style="margin:4px 0">${esc(x)}</li>`).join("")}
      </ul>
      <p style="margin-top:12px;font-size:.92rem"><strong>Arguments contraires / prudence :</strong></p>
      <ul style="margin:6px 0 0 18px;color:var(--txt-dim);font-size:.92rem">
        ${p.against.map(x=>`<li style="margin:4px 0">${esc(x)}</li>`).join("")}
      </ul>
      <div style="margin-top:16px" class="badges">
        <a class="btn primary" href="bankroll.html?odds=${bestOdd.dec.toFixed(2)}&prob=${aiProb}&conf=${p.confidence}&label=${encodeURIComponent(m.home.name+' – '+m.away.name+' : '+p.pick)}">💰 Calculer ma mise</a>
      </div>
    </div>

    <div class="disclaimer"><b>⚠ Aide à la décision, pas une garantie.</b> Le football reste aléatoire : même une analyse solide peut être démentie par un fait de match. Ne mise que ce que tu peux te permettre de perdre. La décision finale t’appartient entièrement.</div>

    <!-- COTES -->
    <div class="block">
      <h3><span class="ic">💷</span> Meilleures cotes — ${esc(o.market)}</h3>
      <p style="font-size:.85rem;color:var(--txt-mute)">Relevé sur ${esc(o.source)} le ${esc(o.checkedAt)}. Comparaison des bookmakers ; la meilleure cote (la plus haute) est mise en avant. <strong>Le site compare et informe — il ne place jamais de pari.</strong></p>
      <table class="odds">
        <thead><tr><th>Issue</th><th>Meilleure cote</th><th>Fraction</th><th>Bookmaker</th><th>AI Prob.</th></tr></thead>
        <tbody>
          <tr><td>${esc(m.home.name)}</td><td class="${pickKey==='home'?'best':''}">${o.best.home.dec.toFixed(2)}</td><td>${esc(o.best.home.frac)}</td><td>${esc(o.best.home.book)}</td><td>${o.aiProb.home}%</td></tr>
          <tr><td>Match nul</td><td class="${pickKey==='draw'?'best':''}">${o.best.draw.dec.toFixed(2)}</td><td>${esc(o.best.draw.frac)}</td><td>${esc(o.best.draw.book)}</td><td>${o.aiProb.draw}%</td></tr>
          <tr><td>${esc(m.away.name)}</td><td class="${pickKey==='away'?'best':''}">${o.best.away.dec.toFixed(2)}</td><td>${esc(o.best.away.frac)}</td><td>${esc(o.best.away.book)}</td><td>${o.aiProb.away}%</td></tr>
        </tbody>
      </table>
    </div>

    ${m.valueBets && m.valueBets.length ? `
    <!-- VALUE BETS -->
    <div class="block">
      <h3><span class="ic">💎</span> Les value bets repérés (tous marchés confondus)</h3>
      <p style="font-size:.85rem;color:var(--txt-mute)">On croise la meilleure cote disponible avec l’« AI Probability » d’oddschecker : si la cote est plus haute que la cote « juste », il y a de la valeur. Classés du plus fort edge au plus faible.</p>
      <table class="odds">
        <thead><tr><th>Pari</th><th>Cote</th><th>Proba (AI)</th><th>Cote juste</th><th>Valeur</th></tr></thead>
        <tbody>
          ${m.valueBets.map(v=>{const fair=100/v.ai;const edge=((v.ai/100)*v.dec-1)*100;return `<tr><td><b>${esc(v.label)}</b><br><span style="color:var(--txt-mute);font-size:.82rem">${esc(v.note)}</span></td><td>${v.dec.toFixed(2)}</td><td>${v.ai}%</td><td>${fair.toFixed(2)}</td><td class="${edge>=0?'best':''}">${edge>=0?'+':''}${edge.toFixed(1)}%</td></tr>`;}).join("")}
        </tbody>
      </table>
      <p style="margin-top:10px;font-size:.82rem;color:var(--txt-mute)">💡 Un edge positif ne garantit rien sur un seul match : c’est un avantage statistique qui ne paie qu’à long terme et sur beaucoup de paris. Utilise le calculateur de mise pour dimensionner prudemment.</p>
    </div>` : ""}

    ${m.markets && m.markets.length ? `
    <!-- TOUS LES MARCHÉS -->
    <div class="block">
      <h3><span class="ic">📈</span> Tous les marchés (meilleures cotes relevées)</h3>
      <p style="font-size:.85rem;color:var(--txt-mute)">Parcours complet des catégories oddschecker (résultat, doubles chances, buts, score exact, buteurs, handicaps, stats…). Cotes en décimal.</p>
      ${m.markets.map(mk=>`
        <div style="margin-top:16px">
          <div style="font-weight:700;color:var(--gold);font-size:.9rem;margin-bottom:6px">${esc(mk.category)}</div>
          <table class="odds"><tbody>
            ${mk.rows.map(r=>`<tr><td>${esc(r.sel)}</td><td style="text-align:right;font-weight:700">${r.dec!=null?r.dec.toFixed(2):'—'}</td><td style="color:var(--txt-mute);width:120px">${esc(r.frac||'')}${r.ai?' · AI '+esc(r.ai):''}</td></tr>`).join("")}
          </tbody></table>
          ${mk.note?`<p style="font-size:.8rem;color:var(--txt-mute);margin-top:6px">ℹ ${esc(mk.note)}</p>`:""}
        </div>`).join("")}
    </div>` : ""}

    <!-- COMPARATIF ÉQUIPES -->
    <div class="section-head"><h2>Analyse par équipe</h2></div>
    <div class="two-col">
      ${teamPanel(m.teams.home)}
      ${teamPanel(m.teams.away)}
    </div>

    <!-- JOUEURS CLÉS -->
    <div class="block">
      <h3><span class="ic">⭐</span> Joueurs clés</h3>
      <table class="players">
        <thead><tr><th></th><th>Joueur</th><th>Poste</th><th>Stat clé</th><th>Note</th></tr></thead>
        <tbody>
          ${m.keyPlayers.map(k=>`<tr><td>${k.team}</td><td><b>${esc(k.name)}</b></td><td>${esc(k.pos)}</td><td>${esc(k.stat)}</td><td style="color:var(--txt-mute)">${esc(k.note)}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>

    <!-- LE MATCH -->
    <div class="block">
      <h3><span class="ic">📋</span> Le match</h3>
      <p><strong>Confrontations directes (H2H).</strong> ${esc(m.matchInfo.h2h)}</p>
      <p><strong>Arbitre.</strong> ${esc(m.matchInfo.referee)}</p>
      <p><strong>Enjeu.</strong> ${esc(m.matchInfo.stake)}</p>
      <p><strong>Éléments externes.</strong> ${esc(m.matchInfo.external)}</p>
      ${m.matchInfo.supercomputer ? `<p><strong>Modèle.</strong> ${esc(m.matchInfo.supercomputer)}</p>` : ""}
    </div>

    <!-- SOURCES -->
    <div class="block">
      <h3><span class="ic">🔗</span> Sources</h3>
      <p style="font-size:.9rem">${m.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener" style="color:var(--green)">${esc(s.label)}</a>`).join(" &nbsp;·&nbsp; ")}</p>
    </div>
  `;
}

function teamPanel(t){
  return `
  <div class="team-panel">
    <div class="th"><span class="flag">${t.flag}</span>${esc(t.name)}</div>
    <ul>
      <li><b>Entraîneur :</b> ${esc(t.coach)}</li>
      <li><b>Compo probable :</b> ${esc(t.lineup)}</li>
      <li><b>Absences / incertitudes :</b><br>${t.absences.map(a=>"• "+esc(a)).join("<br>")}</li>
      <li><b>Charge physique :</b> ${esc(t.physical)}</li>
      <li><b>Forme récente (xG) :</b> ${esc(t.form)}</li>
      <li><b>Production xG :</b> ${esc(t.xg)}</li>
      <li><b>Style de jeu :</b> ${esc(t.style)}</li>
      <li><b>Contexte interne :</b> ${esc(t.context)}</li>
      <li class="src">Source : ${esc(t.source)}</li>
    </ul>
  </div>`;
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => { renderHome(); renderMatch(); });
