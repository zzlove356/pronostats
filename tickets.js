/* =========================================================
   PronoStats — Vérification de tickets (bilingue, dépend de i18n.js)
   Calculateur de combiné instantané + affichage des tickets vérifiés.
   ========================================================= */

function esc(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

let LEGS = [ { label:"", odds:"", prob:"" }, { label:"", odds:"", prob:"" } ];

function renderLegs(){
  const host = document.getElementById("ticketLegs");
  if(!host) return;
  host.innerHTML = LEGS.map((l,i)=>`
    <div class="leg-row">
      <div class="lbl-cell">
        <label class="f">${esc(t("tk_leg_label"))} ${i+1}</label>
        <input class="f" type="text" value="${esc(l.label)}" placeholder="${esc(t("tk_leg_label_ph"))}" oninput="updateLeg(${i},'label',this.value)">
      </div>
      <div>
        <label class="f">${esc(t("tk_leg_odds"))}</label>
        <input class="f" type="number" min="1.01" step="0.01" value="${esc(l.odds)}" placeholder="1.75" oninput="updateLeg(${i},'odds',this.value)">
      </div>
      <div>
        <label class="f">${esc(t("tk_leg_prob"))}</label>
        <input class="f" type="number" min="1" max="99" step="1" value="${esc(l.prob)}" placeholder="60" oninput="updateLeg(${i},'prob',this.value)">
      </div>
      <button class="rm" onclick="removeLeg(${i})" title="✕">✕</button>
    </div>`).join("");
}
function updateLeg(i,key,val){ if(LEGS[i]) LEGS[i][key]=val; }
function addLeg(){ LEGS.push({label:"",odds:"",prob:""}); renderLegs(); }
function removeLeg(i){ if(LEGS.length>1){ LEGS.splice(i,1); renderLegs(); } }

function evaluateTicket(){
  const out = document.getElementById("ticketResult");
  const valid = LEGS.filter(l => parseFloat(l.odds)>1 && parseFloat(l.prob)>0 && parseFloat(l.prob)<100);
  if(!valid.length){ out.innerHTML = `<p class="muted">${esc(t("tk_note_min"))}</p>`; return; }

  let totalOdds = 1, combinedProb = 1;
  valid.forEach(l => { totalOdds *= parseFloat(l.odds); combinedProb *= parseFloat(l.prob)/100; });
  const fairOdds = 1/combinedProb;
  const edge = combinedProb*totalOdds - 1;

  // Note /10 : valeur (edge) + réalisme (proba combinée, nb de sélections)
  let score = 5 + edge*18;
  if(combinedProb < 0.12) score -= 1.5;         // combiné très improbable
  if(valid.length >= 5) score -= 1;             // trop de sélections
  if(combinedProb >= 0.45) score += 0.5;        // combiné réaliste
  score = Math.max(0, Math.min(10, score));
  const rating = Math.round(score*10)/10;

  let cls, verdict, would;
  if(rating >= 7){ cls="rating-hi"; verdict=t("tk_play"); would=t("tk_would"); }
  else if(rating >= 5){ cls="rating-mid"; verdict=t("tk_risky"); would=t("tk_would"); }
  else { cls="rating-lo"; verdict=t("tk_avoid"); would=t("tk_wouldnot"); }

  const expl = (LANG==="it")
    ? `Su ${valid.length} selezioni: quota totale ${totalOdds.toFixed(2)}, probabilità combinata stimata ${(combinedProb*100).toFixed(1)}%. ${edge>=0?`Valore positivo (+${(edge*100).toFixed(1)}%): sulla carta conviene rispetto alla quota.`:`Valore negativo (${(edge*100).toFixed(1)}%): la quota non ripaga il rischio secondo le tue stime.`}`
    : `Sur ${valid.length} sélections : cote totale ${totalOdds.toFixed(2)}, probabilité combinée estimée ${(combinedProb*100).toFixed(1)}%. ${edge>=0?`Valeur positive (+${(edge*100).toFixed(1)}%) : sur le papier c'est rentable vu la cote.`:`Valeur négative (${(edge*100).toFixed(1)}%) : la cote ne paie pas le risque selon tes estimations.`}`;

  out.innerHTML = `
    <div class="verdict-row">
      <div class="rating-badge ${cls}">${rating.toFixed(1)}</div>
      <div>
        <div style="font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--txt-mute)">${esc(t("tk_rating"))} /10 · ${esc(t("tk_verdict"))}</div>
        <div style="font-size:1.3rem;font-weight:800">${esc(verdict)}</div>
        <div style="color:${rating>=5?'var(--green)':'var(--red)'};font-weight:700">${esc(would)}</div>
      </div>
    </div>
    <div class="valuebox" style="margin-top:14px">
      <div class="cell"><div class="lbl">${esc(t("tk_res_totalodds"))}</div><div class="val">${totalOdds.toFixed(2)}</div></div>
      <div class="cell"><div class="lbl">${esc(t("tk_res_prob"))}</div><div class="val">${(combinedProb*100).toFixed(1)}%</div></div>
      <div class="cell"><div class="lbl">${esc(t("tk_res_fair"))}</div><div class="val">${fairOdds.toFixed(2)}</div></div>
      <div class="cell"><div class="lbl">${esc(t("tk_res_edge"))}</div><div class="val ${edge>=0?'good':'bad'}">${edge>=0?'+':''}${(edge*100).toFixed(1)}%</div></div>
    </div>
    <p style="margin-top:12px;font-size:.9rem;color:var(--txt-dim)"><strong>${esc(t("tk_expl"))} :</strong> ${esc(expl)}</p>
    <div class="disclaimer" style="margin-top:14px">${esc(t("tk_disclaimer"))}</div>
  `;
}

function renderVerifiedTickets(){
  const host = document.getElementById("verifiedTickets");
  if(!host) return;
  if(typeof TICKETS === "undefined" || !TICKETS.length){
    host.innerHTML = `<div class="empty">${esc(t("tk_verified_empty"))}</div>`; return;
  }
  host.innerHTML = TICKETS.map(tk=>{
    const r = tk.rating;
    const cls = r>=7?"rating-hi":r>=5?"rating-mid":"rating-lo";
    const would = tk.would ? t("tk_would") : t("tk_wouldnot");
    return `
    <div class="ticket-card">
      <div class="head">
        <div class="rating-badge ${cls}">${r.toFixed(1)}</div>
        <div>
          <div style="font-weight:800;font-size:1.1rem">${esc(tr(tk.title))}</div>
          <div style="color:${r>=5?'var(--green)':'var(--red)'};font-weight:700">${esc(would)} · ${esc(t("odds_word"))} ${tk.totalOdds?tk.totalOdds.toFixed(2):'—'}</div>
        </div>
      </div>
      <ul class="legs">${(tk.legs||[]).map(l=>`<li>${esc(tr(l))}</li>`).join("")}</ul>
      <p style="margin-top:10px;color:var(--txt-dim);font-size:.92rem">${esc(tr(tk.verdict))}</p>
    </div>`;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof applyStaticI18n === "function") applyStaticI18n();
  renderLegs();
  renderVerifiedTickets();
});
