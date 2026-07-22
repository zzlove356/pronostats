// PronoStats — génération automatique quotidienne (GitHub Actions, sans PC)
// Appelle l'API Claude (avec recherche web) pour analyser les matchs du jour
// et insère les résultats dans data.js. Aucune clé n'est écrite en clair : la clé
// vient du secret GitHub ANTHROPIC_API_KEY, le push utilise le token intégré d'Actions.
import { readFileSync, writeFileSync } from 'node:fs';

const KEY = process.env.ANTHROPIC_API_KEY;
if (!KEY) { console.error('ANTHROPIC_API_KEY manquant (ajoute-le en secret GitHub).'); process.exit(1); }

const MODEL = 'claude-haiku-4-5-20251001'; // pour passer en meilleure qualité : 'claude-sonnet-5'
const today = new Date().toISOString().slice(0, 10);

const SCHEMA_EXAMPLE = {
  id: 'equipea-equipeb-AAAA-MM-JJ',
  competition: { fr: '...', it: '...' }, date: { fr: '...', it: '...' }, kickoff: { fr: '...', it: '...' },
  venue: '...', home: { name: { fr: '...', it: '...' }, flag: '🔵' }, away: { name: { fr: '...', it: '...' }, flag: '🔴' },
  odds: { market: { fr: 'Résultat (1N2)', it: 'Esito (1X2)' }, source: 'sources publiques', checkedAt: 'JJ/MM/AAAA',
    aiProb: { home: 45, draw: 28, away: 27 },
    best: { home: { dec: 2.0, frac: '1/1', book: '...' }, draw: { dec: 3.3, frac: '23/10', book: '...' }, away: { dec: 3.6, frac: '13/5', book: '...' } } },
  safeBet: { sel: { fr: '...', it: '...' }, dec: 1.35, frac: '7/20', book: '...', ai: 74, why: { fr: '...', it: '...' } },
  simpleBet: { sel: { fr: '...', it: '...' }, dec: 1.85, frac: '17/20', book: '...', ai: 55, why: { fr: '...', it: '...' } },
  markets: [{ category: { fr: '...', it: '...' }, note: { fr: '...', it: '...' }, rows: [{ sel: { fr: '...', it: '...' }, dec: 1.5, frac: '1/2' }] }],
  valueBets: [{ label: { fr: '...', it: '...' }, dec: 1.85, ai: 55, note: { fr: '...', it: '...' } }],
  prediction: { pick: { fr: '...', it: '...' }, pickShort: '...', score: '2 - 1', goals: { fr: '...', it: '...' },
    confidence: 'moyen', value: true, summary: { fr: '...', it: '...' },
    basedOn: { fr: ['...'], it: ['...'] }, against: { fr: ['...'], it: ['...'] } },
  teams: { home: { name: { fr: '...', it: '...' }, flag: '🔵', coach: '—', lineup: { fr: '...', it: '...' }, style: { fr: '...', it: '...' },
      absences: { fr: ['...'], it: ['...'] }, physical: { fr: '...', it: '...' }, form: { fr: '...', it: '...' }, xg: { fr: '...', it: '...' }, context: { fr: '...', it: '...' }, source: '...' },
    away: { name: { fr: '...', it: '...' }, flag: '🔴', coach: '—', lineup: { fr: '...', it: '...' }, style: { fr: '...', it: '...' },
      absences: { fr: ['...'], it: ['...'] }, physical: { fr: '...', it: '...' }, form: { fr: '...', it: '...' }, xg: { fr: '...', it: '...' }, context: { fr: '...', it: '...' }, source: '...' } },
  keyPlayers: [{ team: '🔵', name: '...', pos: { fr: '...', it: '...' }, stat: { fr: '...', it: '...' }, note: { fr: '...', it: '...' } }],
  matchInfo: { h2h: { fr: '...', it: '...' }, referee: { fr: '...', it: '...' }, stake: { fr: '...', it: '...' }, external: { fr: '...', it: '...' }, supercomputer: { fr: '...', it: '...' } },
  sources: [{ label: '...', url: 'https://...' }]
};

const SYSTEM = `Tu es l'analyste football automatique du site PronoStats. Nous sommes le ${today}.
Utilise l'outil de recherche web pour : (1) trouver les matchs qui se jouent AUJOURD'HUI (ou demain si rien aujourd'hui) parmi ces compétitions — qualifications Ligue des Champions / Ligue Europa / Conference League, les 5 grands championnats (Ligue 1, Premier League, Serie A, Liga, Bundesliga) quand ils jouent, et l'Allsvenskan ; (2) choisir les 2 matchs les plus intéressants ; (3) rechercher pour chacun : compos probables, blessures/suspensions (avec source), forme récente, xG si dispo, contexte aller/retour, style, H2H, arbitre si connu, cotes principales trouvées sur les aperçus publics.

Pour chaque match : 1 pari SAFE orienté combiné (cote min 1.25, cible ~1.50, pas forcément le 1N2) et 1 pari SIMPLE (cote min 1.70, meilleur value). Tes probabilités sont TES estimations. Ajoute systématiquement dans les champs why/note/summary la mention "⚠ Analyse en mode autonome (sources publiques), sans balayage oddschecker complet : cote indicative à revérifier chez ton bookmaker."

Construis aussi le MEILLEUR combiné entre les 2 matchs : 1 sélection par match (paris safe fiables en priorité), cote totale visée 2.00-4.00. Calcule cote totale (produit), proba combinée (produit des probas/100), espérance = proba × cote − 1.

Réponds UNIQUEMENT avec du JSON minifié valide, sans texte ni balises markdown, de la forme :
{"matches":[<objet match>,<objet match>],"combo":{"title":{"fr":"⭐ Meilleur combiné du jour — ${today}","it":"..."},"totalOdds":<n>,"rating":<5+edge*18 borné 0-10 arrondi 1 déc>,"would":<true si edge>=0 sinon false>,"legs":[{"fr":"cote · proba estimée X% · valeur ±Y%","it":"..."}],"verdict":{"fr":"logique + maillon fragile + espérance + mise suggérée 3-4 € sur 25 € + ⚠ mode autonome + aide à la décision, 18+","it":"..."}}}

TOUT champ visible doit être bilingue {fr, it} (traduis fidèlement en italien). Chaque objet match DOIT respecter EXACTEMENT cette structure de clés (les valeurs "..." sont à remplir) :
${JSON.stringify(SCHEMA_EXAMPLE)}
Les id en kebab-case avec la date (ex "levski-craiova-${today}"). N'invente pas d'infos : si une donnée manque, écris-le honnêtement dans le champ.`;

async function callClaude() {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: MODEL, max_tokens: 20000,
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 10 }],
      system: SYSTEM,
      messages: [{ role: 'user', content: `Produis les analyses du jour (${today}) au format JSON demandé. Rien d'autre que le JSON.` }]
    })
  });
  if (!res.ok) { console.error('Erreur API', res.status, await res.text()); process.exit(1); }
  const data = await res.json();
  const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
  return text;
}

function extractJson(text) {
  let t = text.trim().replace(/^```(json)?/i, '').replace(/```$/,'').trim();
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  if (a < 0 || b < 0) throw new Error('Aucun JSON trouvé dans la réponse.');
  return JSON.parse(t.slice(a, b + 1));
}

function validateMatch(m) {
  const need = ['id','competition','date','kickoff','venue','home','away','odds','safeBet','simpleBet','markets','valueBets','prediction','teams','keyPlayers','matchInfo','sources'];
  for (const k of need) if (!(k in m)) throw new Error('Match sans clé ' + k);
  if (!m.safeBet?.sel?.fr || !m.simpleBet?.sel?.fr) throw new Error('safeBet/simpleBet incomplet: ' + m.id);
}

function insertAfter(src, marker, jsonChunk) {
  const i = src.indexOf(marker);
  if (i < 0) throw new Error('Marqueur introuvable: ' + marker);
  const at = i + marker.length;
  return src.slice(0, at) + '\n' + jsonChunk + '\n' + src.slice(at);
}

const out = await callClaude();
const parsed = extractJson(out);
if (!Array.isArray(parsed.matches) || !parsed.matches.length) throw new Error('Pas de matchs.');
parsed.matches.forEach(validateMatch);
if (!parsed.combo?.title?.fr) throw new Error('Combo invalide.');

let js = readFileSync('data.js', 'utf8');

// éviter les doublons si le job tourne deux fois le même jour
const existingIds = [...js.matchAll(/id:\s*["']([^"']+)["']/g)].map(x => x[1]);
const fresh = parsed.matches.filter(m => !existingIds.includes(m.id));
if (!fresh.length) { console.log('Aucun nouveau match (déjà publiés aujourd\'hui). Rien à faire.'); process.exit(0); }

const matchesChunk = fresh.map(m => JSON.stringify(m) + ',').join('\n');
const comboChunk = JSON.stringify(parsed.combo) + ',';
js = insertAfter(js, 'const MATCHES = [', matchesChunk);
js = insertAfter(js, 'const TICKETS = [', comboChunk);

// validation finale : le fichier doit s'évaluer sans erreur
try {
  const test = new Function(js + '; return {M:MATCHES,T:TICKETS};')();
  if (!test.M.length || !test.T.length) throw new Error('Tableaux vides après insertion.');
} catch (e) { console.error('data.js invalide après génération, abandon (aucun commit).', e.message); process.exit(1); }

writeFileSync('data.js', js);
console.log(`OK — ${fresh.length} match(s) ajouté(s) : ${fresh.map(m => m.id).join(', ')} + combiné du jour.`);
