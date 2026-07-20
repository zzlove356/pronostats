/* =========================================================
   PronoStats — rendu accueil + page match (bilingue)
   Dépend de i18n.js (LANG, t, tr)
   ========================================================= */

const CONF_ICON  = { faible: "⚠", moyen: "◐", eleve: "●" };

function esc(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function frOf(x){ return (x && typeof x === "object") ? (x.fr != null ? x.fr : "") : x; }
function confLabel(c){ return t("conf_"+c); }

/* ---------- ACCUEIL ---------- */
function renderHome(){
  const grid = document.getElementById("matchGrid");
  if(!grid) return;
  if(!MATCHES.length){ grid.innerHTML = `<div class="empty">${esc(t("home_empty"))}</div>`; return; }

  grid.innerHTML = MATCHES.map(m => {
    const p = m.prediction;
    return `
    <a class="match-card" href="match.html?id=${encodeURIComponent(m.id)}">
      <div class="comp">${esc(tr(m.competition))}</div>
      <div class="teams">
        <div class="team"><span class="flag">${m.home.flag}</span>${esc(tr(m.home.name))}</div>
        <span class="vs">VS</span>
        <div class="team">${esc(tr(m.away.name))}<span class="flag">${m.away.flag}</span></div>
      </div>
      <div class="meta">
        <span>📅 ${esc(tr(m.date))}</span>
        <span>⏰ ${esc(tr(m.kickoff))}</span>
      </div>
      <div class="meta" style="gap:8px">
        ${m.safeBet ? `<span class="pill safe">🛡 ${esc(t("safe_bet"))} · ${m.safeBet.dec.toFixed(2)}</span>` : ""}
        ${m.simpleBet ? `<span class="pill pick">🎯 ${esc(t("simple_bet"))} · ${m.simpleBet.dec.toFixed(2)}</span>` : ""}
        <span class="pill conf-${p.confidence}">${CONF_ICON[p.confidence]} ${esc(confLabel(p.confidence))}</span>
      </div>
      <div class="foot"><span class="go">${esc(t("home_recent_sub"))} →</span></div>
    </a>`;
  }).join("");
}

/* ---------- PAGE MATCH ---------- */
function getParam(name){ return new URLSearchParams(location.search).get(name); }

function betPickCard(kind, bet, m){
  const typeLabel = kind === "safe" ? t("safe_full") : t("simple_full");
  return `
  <div class="betpick ${kind}">
    <div class="tagrow"><span class="type">${kind === "safe" ? "🛡" : "🎯"} ${esc(typeLabel)}</span></div>
    <div class="sel">${esc(tr(bet.sel))}</div>
    <div class="bigodd">${bet.dec.toFixed(2)} <span style="font-size:.9rem;color:var(--txt-dim)">${esc(bet.frac||"")}</span></div>
    <div class="why">${esc(tr(bet.why))}</div>
    <div class="book">${esc(t("odds_word"))} ${esc(t("book_at"))} ${esc(bet.book||"—")}</div>
    <div><a class="btn ${kind==='simple'?'primary':''}" href="bankroll.html?odds=${bet.dec.toFixed(2)}&prob=${bet.ai||''}&conf=${m.prediction.confidence}&label=${encodeURIComponent(tr(m.home.name)+' – '+tr(m.away.name)+' : '+tr(bet.sel))}">${esc(t("calc_stake"))}</a></div>
  </div>`;
}

function renderMatch(){
  const host = document.getElementById("matchDetail");
  if(!host) return;
  const id = getParam("id");
  const m = MATCHES.find(x => x.id === id) || MATCHES[0];
  if(!m){ host.innerHTML = `<div class="empty">${esc(t("not_found"))}</div>`; return; }

  document.title = `${tr(m.home.name)} – ${tr(m.away.name)} · PronoStats`;
  const p = m.prediction;
  const o = m.odds;
  const homeFr = frOf(m.home.name), awayFr = frOf(m.away.name);
  const pickKey = p.pickShort === homeFr ? "home" : p.pickShort === awayFr ? "away" : "draw";
  const bestOdd = o.best[pickKey];
  const aiProb = o.aiProb[pickKey];
  const fairOdd = aiProb ? (100/aiProb) : null;
  const edge = (aiProb && bestOdd) ? ((aiProb/100)*bestOdd.dec - 1)*100 : null;

  host.innerHTML = `
    <a class="back" href="index.html">${esc(t("back"))}</a>

    <div class="detail-hero">
      <div class="comp">${esc(tr(m.competition))}</div>
      <div class="scoreline">
        <div class="side">
          <div class="flag">${m.home.flag}</div>
          <div class="name">${esc(tr(m.home.name))}</div>
          <div class="odd">${esc(t("odds_word"))} ${o.best.home.dec.toFixed(2)} · AI ${o.aiProb.home}%</div>
        </div>
        <div class="mid"><div>${esc(t("draw_word"))} ${o.best.draw.dec.toFixed(2)}</div><div class="k">VS</div><div>AI ${o.aiProb.draw}%</div></div>
        <div class="side">
          <div class="flag">${m.away.flag}</div>
          <div class="name">${esc(tr(m.away.name))}</div>
          <div class="odd">${esc(t("odds_word"))} ${o.best.away.dec.toFixed(2)} · AI ${o.aiProb.away}%</div>
        </div>
      </div>
      <div class="info-row">
        <span>📅 ${esc(tr(m.date))}</span><span>⏰ ${esc(tr(m.kickoff))}</span><span>📍 ${esc(tr(m.venue))}</span>
      </div>
    </div>

    <!-- PARIS RECOMMANDÉS -->
    <div class="picks">
      ${m.safeBet ? betPickCard("safe", m.safeBet, m) : ""}
      ${m.simpleBet ? betPickCard("simple", m.simpleBet, m) : ""}
    </div>

    <!-- PRÉDICTION -->
    <div class="predict">
      <h3>🔮 ${esc(t("pred_title"))} — ${esc(tr(p.pick))} <span style="color:var(--txt-dim);font-weight:600">(${esc(t("pred_score"))} ${esc(p.score)})</span></h3>
      <div class="badges">
        <span class="pill conf-${p.confidence}">${CONF_ICON[p.confidence]} ${esc(confLabel(p.confidence))}</span>
        <span class="pill odds">${esc(tr(p.goals))}</span>
        ${p.value ? `<span class="pill pick">${esc(t("value_detected"))}</span>` : `<span class="pill odds">${esc(t("no_value"))}</span>`}
      </div>
      <p>${esc(tr(p.summary))}</p>
      <div class="valuebox">
        <div class="cell"><div class="lbl">${esc(t("val_bestodds"))} (${esc(tr(m.home.name))})</div><div class="val">${bestOdd.dec.toFixed(2)}</div></div>
        <div class="cell"><div class="lbl">${esc(t("val_aiprob"))}</div><div class="val">${aiProb}%</div></div>
        <div class="cell"><div class="lbl">${esc(t("val_fair"))}</div><div class="val">${fairOdd ? fairOdd.toFixed(2) : "—"}</div></div>
        <div class="cell"><div class="lbl">${esc(t("val_edge"))}</div><div class="val ${edge>=0?'good':'bad'}">${edge!=null?(edge>=0?'+':'')+edge.toFixed(1)+'%':'—'}</div></div>
      </div>
      <p style="margin-top:14px;font-size:.92rem"><strong>${esc(t("based_on"))}</strong></p>
      <ul style="margin:6px 0 0 18px;color:var(--txt-dim);font-size:.92rem">
        ${tr(p.basedOn).map(x=>`<li style="margin:4px 0">${esc(x)}</li>`).join("")}
      </ul>
      <p style="margin-top:12px;font-size:.92rem"><strong>${esc(t("against"))}</strong></p>
      <ul style="margin:6px 0 0 18px;color:var(--txt-dim);font-size:.92rem">
        ${tr(p.against).map(x=>`<li style="margin:4px 0">${esc(x)}</li>`).join("")}
      </ul>
    </div>

    <div class="disclaimer"><b>${esc(t("disclaimer_match").split(".")[0])}.</b> ${esc(t("disclaimer_match").split(".").slice(1).join(".").trim())}</div>

    <!-- COTES -->
    <div class="block">
      <h3><span class="ic">💷</span> ${esc(t("best_odds_h"))} — ${esc(tr(o.market))}</h3>
      <p style="font-size:.85rem;color:var(--txt-mute)">${esc(t("odds_note"))}</p>
      <div class="tscroll"><table class="odds">
        <thead><tr><th>${esc(t("th_issue"))}</th><th>${esc(t("th_bestodd"))}</th><th>${esc(t("th_frac"))}</th><th>${esc(t("th_book"))}</th><th>${esc(t("th_ai"))}</th></tr></thead>
        <tbody>
          <tr><td>${esc(tr(m.home.name))}</td><td class="${pickKey==='home'?'best':''}">${o.best.home.dec.toFixed(2)}</td><td>${esc(o.best.home.frac)}</td><td>${esc(o.best.home.book)}</td><td>${o.aiProb.home}%</td></tr>
          <tr><td>${esc(t("draw_word"))}</td><td class="${pickKey==='draw'?'best':''}">${o.best.draw.dec.toFixed(2)}</td><td>${esc(o.best.draw.frac)}</td><td>${esc(o.best.draw.book)}</td><td>${o.aiProb.draw}%</td></tr>
          <tr><td>${esc(tr(m.away.name))}</td><td class="${pickKey==='away'?'best':''}">${o.best.away.dec.toFixed(2)}</td><td>${esc(o.best.away.frac)}</td><td>${esc(o.best.away.book)}</td><td>${o.aiProb.away}%</td></tr>
        </tbody>
      </table></div>
    </div>

    ${m.valueBets && m.valueBets.length ? `
    <div class="block">
      <h3><span class="ic">💎</span> ${esc(t("valuebets_h"))}</h3>
      <p style="font-size:.85rem;color:var(--txt-mute)">${esc(t("valuebets_sub"))}</p>
      <div class="tscroll"><table class="odds">
        <thead><tr><th>${esc(t("th_bet"))}</th><th>${esc(t("th_bestodd"))}</th><th>${esc(t("th_prob"))}</th><th>${esc(t("th_fairodd"))}</th><th>${esc(t("th_value"))}</th></tr></thead>
        <tbody>
          ${m.valueBets.map(v=>{const fair=100/v.ai;const ed=((v.ai/100)*v.dec-1)*100;return `<tr><td><b>${esc(tr(v.label))}</b><br><span style="color:var(--txt-mute);font-size:.82rem">${esc(tr(v.note))}</span></td><td>${v.dec.toFixed(2)}</td><td>${v.ai}%</td><td>${fair.toFixed(2)}</td><td class="${ed>=0?'best':''}">${ed>=0?'+':''}${ed.toFixed(1)}%</td></tr>`;}).join("")}
        </tbody>
      </table></div>
      <p style="margin-top:10px;font-size:.82rem;color:var(--txt-mute)">${esc(t("valuebets_foot"))}</p>
    </div>` : ""}

    ${m.markets && m.markets.length ? `
    <div class="block">
      <h3><span class="ic">📈</span> ${esc(t("allmarkets_h"))}</h3>
      <p style="font-size:.85rem;color:var(--txt-mute)">${esc(t("allmarkets_sub"))}</p>
      ${m.markets.map(mk=>`
        <div style="margin-top:16px">
          <div style="font-weight:700;color:var(--gold);font-size:.9rem;margin-bottom:6px">${esc(tr(mk.category))}</div>
          <div class="tscroll"><table class="odds"><tbody>
            ${mk.rows.map(r=>`<tr><td>${esc(tr(r.sel))}</td><td style="text-align:right;font-weight:700">${r.dec!=null?r.dec.toFixed(2):'—'}</td><td style="color:var(--txt-mute);width:130px">${esc(r.frac||'')}${r.ai?' · AI '+esc(r.ai):''}</td></tr>`).join("")}
          </tbody></table></div>
          ${mk.note?`<p style="font-size:.8rem;color:var(--txt-mute);margin-top:6px">ℹ ${esc(tr(mk.note))}</p>`:""}
        </div>`).join("")}
    </div>` : ""}

    <div class="section-head"><h2>${esc(t("team_analysis"))}</h2></div>
    <div class="two-col">
      ${teamPanel(m.teams.home)}
      ${teamPanel(m.teams.away)}
    </div>

    <div class="block">
      <h3><span class="ic">⭐</span> ${esc(t("key_players"))}</h3>
      <div class="tscroll"><table class="players">
        <thead><tr><th></th><th>${esc(t("kp_player"))}</th><th>${esc(t("kp_pos"))}</th><th>${esc(t("kp_stat"))}</th><th>${esc(t("kp_note"))}</th></tr></thead>
        <tbody>
          ${m.keyPlayers.map(k=>`<tr><td>${k.team}</td><td><b>${esc(k.name)}</b></td><td>${esc(tr(k.pos))}</td><td>${esc(tr(k.stat))}</td><td style="color:var(--txt-mute)">${esc(tr(k.note))}</td></tr>`).join("")}
        </tbody>
      </table></div>
    </div>

    <div class="block">
      <h3><span class="ic">📋</span> ${esc(t("the_match"))}</h3>
      <p><strong>${esc(t("mi_h2h"))}</strong> ${esc(tr(m.matchInfo.h2h))}</p>
      <p><strong>${esc(t("mi_ref"))}</strong> ${esc(tr(m.matchInfo.referee))}</p>
      <p><strong>${esc(t("mi_stake"))}</strong> ${esc(tr(m.matchInfo.stake))}</p>
      <p><strong>${esc(t("mi_ext"))}</strong> ${esc(tr(m.matchInfo.external))}</p>
      ${m.matchInfo.supercomputer ? `<p><strong>${esc(t("mi_model"))}</strong> ${esc(tr(m.matchInfo.supercomputer))}</p>` : ""}
    </div>

    <div class="block">
      <h3><span class="ic">🔗</span> ${esc(t("sources"))}</h3>
      <p style="font-size:.9rem">${m.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener" style="color:var(--green)">${esc(s.label)}</a>`).join(" &nbsp;·&nbsp; ")}</p>
    </div>
  `;
}

function teamPanel(tm){
  return `
  <div class="team-panel">
    <div class="th"><span class="flag">${tm.flag}</span>${esc(tr(tm.name))}</div>
    <ul>
      <li><b>${esc(t("tp_coach"))} :</b> ${esc(tr(tm.coach))}</li>
      <li><b>${esc(t("tp_lineup"))} :</b> ${esc(tr(tm.lineup))}</li>
      <li><b>${esc(t("tp_absences"))} :</b><br>${tr(tm.absences).map(a=>"• "+esc(a)).join("<br>")}</li>
      <li><b>${esc(t("tp_physical"))} :</b> ${esc(tr(tm.physical))}</li>
      <li><b>${esc(t("tp_form"))} :</b> ${esc(tr(tm.form))}</li>
      <li><b>${esc(t("tp_xg"))} :</b> ${esc(tr(tm.xg))}</li>
      <li><b>${esc(t("tp_style"))} :</b> ${esc(tr(tm.style))}</li>
      <li><b>${esc(t("tp_context"))} :</b> ${esc(tr(tm.context))}</li>
      <li class="src">${esc(t("tp_source"))} : ${esc(tm.source)}</li>
    </ul>
  </div>`;
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof applyStaticI18n === "function") applyStaticI18n();
  renderHome();
  renderMatch();
});
