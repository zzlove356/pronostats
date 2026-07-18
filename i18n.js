/* =========================================================
   PronoStats — internationalisation FR / IT
   - LANG : langue courante ('fr' | 'it'), stockée en local
   - t(key) : chaîne d'interface traduite
   - tr(x)  : traduit une donnée (string OU {fr, it}) avec repli FR
   ========================================================= */

const LANG_KEY = "pronostats_lang";
let LANG = (function(){ try { return localStorage.getItem(LANG_KEY) || "fr"; } catch(e){ return "fr"; } })();

function setLang(l){
  LANG = (l === "it") ? "it" : "fr";
  try { localStorage.setItem(LANG_KEY, LANG); } catch(e){}
  location.reload();
}

/* traduit une donnée qui peut être une string (identique) ou {fr, it} */
function tr(x){
  if (x == null) return "";
  if (typeof x === "object" && !Array.isArray(x)) return x[LANG] != null ? x[LANG] : (x.fr != null ? x.fr : "");
  return x;
}

const DICT = {
  fr: {
    nav_matches: "Analyse des matchs",
    nav_bankroll: "Gestion du bankroll",
    nav_tickets: "Vérifier un ticket",

    hero_eyebrow: "● Analyses approfondies, pas juste les 5 derniers résultats",
    hero_title_1: "Des pronostics football",
    hero_title_2: "argumentés par la donnée.",
    hero_lead: "xG, compositions probables, charge physique, style de jeu, arbitre, historique, météo — puis un pari safe pour tes combinés, un pari simple, la meilleure cote comparée sur oddschecker, et ta gestion de bankroll.",
    home_recent: "Matchs analysés récemment",
    home_recent_sub: "Clique sur un match pour l’analyse complète",
    home_empty: "Aucun match analysé pour l’instant. Demande-moi une analyse dans Cowork.",
    disclaimer_home: "⚠ Rappel. Ce site est un outil d’aide à la décision et d’information. Les paris sportifs restent aléatoires : aucune analyse ne garantit un résultat. Joue de façon responsable, uniquement avec de l’argent que tu peux te permettre de perdre. Interdit aux mineurs.",
    footer_note: "PronoStats — outil personnel d’analyse. Aucun pari n’est placé par le site.",
    footer_18: "18+ · Jouez responsable",

    back: "← Retour aux analyses",
    safe_bet: "Pari safe · combiné",
    simple_bet: "Pari simple",
    safe_full: "Pari SAFE (pour combiné)",
    simple_full: "Pari SIMPLE",
    odds_word: "Cote",
    book_at: "chez",
    pred_title: "Prédiction",
    pred_score: "score probable",
    conf_faible: "Confiance faible",
    conf_moyen: "Confiance moyenne",
    conf_eleve: "Confiance élevée",
    value_detected: "💎 Value bet détecté",
    no_value: "Pas de value nette",
    based_on: "Sur quoi repose l’analyse :",
    against: "Arguments contraires / prudence :",
    calc_stake: "💰 Calculer ma mise",
    val_bestodds: "Meilleure cote",
    val_aiprob: "Proba estimée (AI)",
    val_fair: "Cote « juste »",
    val_edge: "Valeur (edge)",
    disclaimer_match: "⚠ Aide à la décision, pas une garantie. Le football reste aléatoire : même une analyse solide peut être démentie par un fait de match. Ne mise que ce que tu peux te permettre de perdre. La décision finale t’appartient entièrement.",
    best_odds_h: "Meilleures cotes",
    odds_note: "Relevé sur oddschecker.com. Comparaison des bookmakers ; la meilleure cote (la plus haute) est mise en avant. Le site compare et informe — il ne place jamais de pari.",
    th_issue: "Issue", th_bestodd: "Meilleure cote", th_frac: "Fraction", th_book: "Bookmaker", th_ai: "AI Prob.",
    draw_word: "Match nul",
    valuebets_h: "Les value bets repérés (tous marchés confondus)",
    valuebets_sub: "On croise la meilleure cote disponible avec l’« AI Probability » d’oddschecker : si la cote est plus haute que la cote « juste », il y a de la valeur. Classés du plus fort edge au plus faible.",
    th_bet: "Pari", th_prob: "Proba (AI)", th_fairodd: "Cote juste", th_value: "Valeur",
    valuebets_foot: "💡 Un edge positif ne garantit rien sur un seul match : c’est un avantage statistique qui ne paie qu’à long terme et sur beaucoup de paris. Utilise le calculateur de mise pour dimensionner prudemment.",
    allmarkets_h: "Tous les marchés (meilleures cotes relevées)",
    allmarkets_sub: "Parcours complet des catégories oddschecker (résultat, doubles chances, buts, score exact, buteurs, handicaps, stats…). Cotes en décimal.",
    team_analysis: "Analyse par équipe",
    key_players: "Joueurs clés",
    kp_player: "Joueur", kp_pos: "Poste", kp_stat: "Stat clé", kp_note: "Note",
    the_match: "Le match",
    tp_coach: "Entraîneur", tp_lineup: "Compo probable", tp_absences: "Absences / incertitudes",
    tp_physical: "Charge physique", tp_form: "Forme récente (xG)", tp_xg: "Production xG",
    tp_style: "Style de jeu", tp_context: "Contexte interne", tp_source: "Source",
    mi_h2h: "Confrontations directes (H2H).", mi_ref: "Arbitre.", mi_stake: "Enjeu.",
    mi_ext: "Éléments externes.", mi_model: "Modèle.",
    sources: "Sources",
    not_found: "Match introuvable.",

    /* Bankroll */
    bk_eyebrow: "💰 Ton capital, tes mises, tes suggestions",
    bk_title: "Gestion du bankroll",
    bk_lead: "Suis ton capital, calcule une mise prudente pour chaque pari selon sa valeur et sa fiabilité, et garde une vue d’ensemble de ton historique. Tout est stocké sur ton navigateur — rien n’est envoyé, aucun pari n’est placé.",
    bk_cur: "Bankroll actuel", bk_balance: "Bilan total", bk_roi: "ROI (paris réglés)", bk_pending: "Paris en cours", bk_engaged: "engagés",
    bk_capital: "⚙️ Mon capital", bk_start: "Bankroll de départ (€)",
    bk_prudence: "Prudence du calcul de mise (fraction de Kelly)",
    bk_k_quarter: "Quart de Kelly — très prudent (recommandé)", bk_k_half: "Demi-Kelly — modéré", bk_k_full: "Kelly complet — agressif (déconseillé)",
    bk_save: "Enregistrer",
    bk_recalc: "Le bankroll actuel se recalcule automatiquement à partir de ton capital de départ + le résultat des paris réglés (gagnés/perdus).",
    bk_calc_h: "🧮 Calculateur de mise (value + Kelly prudent)",
    bk_bet_label: "Pari (libellé)", bk_bet_ph: "Ex : France – Angleterre : Victoire France",
    bk_odds: "Cote proposée", bk_prob: "Probabilité réelle estimée (%)", bk_conf: "Confiance de l’analyse",
    bk_conf_high: "Élevée", bk_conf_mid: "Moyenne", bk_conf_low: "Faible",
    bk_calc_ph: "Renseigne une cote et une probabilité estimée pour obtenir une suggestion de mise.",
    bk_track_h: "📊 Suivi de mes paris",
    bk_add_label: "Ajouter un pari manuellement — libellé", bk_add_ph: "Ex : PSG – OM : Plus de 2,5 buts",
    bk_add_odds: "Cote", bk_add_stake: "Mise (€)", bk_add: "＋ Ajouter",
    bk_disclaimer: "⚠ Rappel important. Cet outil calcule et conseille, il ne place jamais aucun pari nulle part. La décision finale et la responsabilité t’appartiennent entièrement. Les paris sportifs restent aléatoires. 18+ · Jouez responsable.",
    bk_th_date: "Date", bk_th_bet: "Pari", bk_th_odds: "Cote", bk_th_stake: "Mise", bk_th_status: "Statut", bk_th_pl: "Gain/Perte",
    bk_won: "Gagné", bk_lost: "Perdu", bk_ongoing: "En cours",
    bk_empty: "Aucun pari suivi pour l’instant. Ajoute-en un via le calculateur ou le formulaire ci-dessous.",
    bk_reco_stake: "Mise recommandée", bk_potgain: "gain potentiel net",

    /* Tickets */
    tk_eyebrow: "🎫 Fais juger ton ticket",
    tk_title: "Vérification de tickets",
    tk_lead: "Tu as une idée de combiné ? Deux options : le calculateur instantané ci-dessous pour un premier avis chiffré, ou envoie l’image de ton ticket dans Cowork pour un verdict pro complet (je recherche toutes les infos et je publie une note argumentée ici).",
    tk_calc_h: "⚡ Calculateur de combiné instantané",
    tk_calc_sub: "Ajoute chaque sélection de ton ticket avec sa cote et ta probabilité estimée. Le site calcule la cote totale, la probabilité combinée, la valeur et une note.",
    tk_leg_label: "Sélection", tk_leg_label_ph: "Ex : France gagne / Kane buteur",
    tk_leg_odds: "Cote", tk_leg_prob: "Proba estimée (%)",
    tk_add_leg: "＋ Ajouter une sélection", tk_eval: "Évaluer le ticket",
    tk_res_totalodds: "Cote totale", tk_res_prob: "Proba combinée", tk_res_fair: "Cote juste", tk_res_edge: "Valeur (edge)",
    tk_verdict: "Verdict", tk_rating: "Note",
    tk_play: "À jouer", tk_risky: "Jouable mais risqué", tk_avoid: "À éviter",
    tk_note_min: "Ajoute au moins une sélection avec une cote (>1) et une probabilité (1–99%).",
    tk_pro_h: "🔎 Avis pro complet (via Cowork)",
    tk_pro_p: "Pour une analyse en profondeur, envoie-moi l’image de ton ticket dans Cowork. Je recherche toutes les infos (compos, blessures, forme, xG, arbitre, météo, value marché par marché), je te donne une note sur 10, un verdict « je le jouerais / je ne le jouerais pas » et je publie le ticket vérifié ci-dessous.",
    tk_verified_h: "Tickets vérifiés récemment",
    tk_verified_empty: "Aucun ticket vérifié pour l’instant. Envoie-moi le tien dans Cowork.",
    tk_legs_word: "Sélections", tk_would: "Je le jouerais", tk_wouldnot: "Je ne le jouerais pas",
    tk_disclaimer: "⚠ Le calculateur repose sur TES probabilités estimées : il vaut ce que valent tes estimations. C’est un outil d’aide à la décision, pas une garantie. La responsabilité finale t’appartient. 18+ · Jouez responsable.",
    tk_expl: "explication"
  },

  it: {
    nav_matches: "Analisi delle partite",
    nav_bankroll: "Gestione del bankroll",
    nav_tickets: "Verifica schedina",

    hero_eyebrow: "● Analisi approfondite, non solo gli ultimi 5 risultati",
    hero_title_1: "Pronostici di calcio",
    hero_title_2: "basati sui dati.",
    hero_lead: "xG, formazioni probabili, carico fisico, stile di gioco, arbitro, precedenti, meteo — poi una scommessa sicura per le tue multiple, una singola, la quota migliore confrontata su oddschecker e la gestione del bankroll.",
    home_recent: "Partite analizzate di recente",
    home_recent_sub: "Clicca su una partita per l’analisi completa",
    home_empty: "Nessuna partita analizzata per ora. Chiedimi un’analisi in Cowork.",
    disclaimer_home: "⚠ Promemoria. Questo sito è uno strumento di supporto alle decisioni e informativo. Le scommesse sportive restano aleatorie: nessuna analisi garantisce un risultato. Gioca in modo responsabile, solo con denaro che puoi permetterti di perdere. Vietato ai minori.",
    footer_note: "PronoStats — strumento personale di analisi. Il sito non piazza alcuna scommessa.",
    footer_18: "18+ · Gioca responsabilmente",

    back: "← Torna alle analisi",
    safe_bet: "Scommessa sicura · multipla",
    simple_bet: "Scommessa singola",
    safe_full: "Scommessa SICURA (per multipla)",
    simple_full: "Scommessa SINGOLA",
    odds_word: "Quota",
    book_at: "su",
    pred_title: "Pronostico",
    pred_score: "risultato probabile",
    conf_faible: "Fiducia bassa",
    conf_moyen: "Fiducia media",
    conf_eleve: "Fiducia alta",
    value_detected: "💎 Value bet rilevato",
    no_value: "Nessun valore netto",
    based_on: "Su cosa si basa l’analisi:",
    against: "Argomenti contrari / prudenza:",
    calc_stake: "💰 Calcola la mia puntata",
    val_bestodds: "Quota migliore",
    val_aiprob: "Prob. stimata (AI)",
    val_fair: "Quota « equa »",
    val_edge: "Valore (edge)",
    disclaimer_match: "⚠ Supporto alla decisione, non una garanzia. Il calcio resta aleatorio: anche un’analisi solida può essere smentita da un episodio. Punta solo ciò che puoi permetterti di perdere. La decisione finale è tua.",
    best_odds_h: "Quote migliori",
    odds_note: "Rilevato su oddschecker.com. Confronto tra bookmaker; la quota migliore (più alta) è evidenziata. Il sito confronta e informa — non piazza mai scommesse.",
    th_issue: "Esito", th_bestodd: "Quota migliore", th_frac: "Frazione", th_book: "Bookmaker", th_ai: "AI Prob.",
    draw_word: "Pareggio",
    valuebets_h: "I value bet individuati (tutti i mercati)",
    valuebets_sub: "Incrociamo la quota migliore disponibile con l’« AI Probability » di oddschecker: se la quota è più alta di quella « equa », c’è valore. Ordinati dal maggiore al minore edge.",
    th_bet: "Scommessa", th_prob: "Prob. (AI)", th_fairodd: "Quota equa", th_value: "Valore",
    valuebets_foot: "💡 Un edge positivo non garantisce nulla su una singola partita: è un vantaggio statistico che paga solo nel lungo periodo e su tante scommesse. Usa il calcolatore per dimensionare con prudenza.",
    allmarkets_h: "Tutti i mercati (quote migliori rilevate)",
    allmarkets_sub: "Percorso completo delle categorie oddschecker (esito, doppia chance, gol, risultato esatto, marcatori, handicap, statistiche…). Quote decimali.",
    team_analysis: "Analisi per squadra",
    key_players: "Giocatori chiave",
    kp_player: "Giocatore", kp_pos: "Ruolo", kp_stat: "Statistica chiave", kp_note: "Nota",
    the_match: "La partita",
    tp_coach: "Allenatore", tp_lineup: "Formazione probabile", tp_absences: "Assenze / dubbi",
    tp_physical: "Carico fisico", tp_form: "Forma recente (xG)", tp_xg: "Produzione xG",
    tp_style: "Stile di gioco", tp_context: "Contesto interno", tp_source: "Fonte",
    mi_h2h: "Precedenti diretti (H2H).", mi_ref: "Arbitro.", mi_stake: "Posta in gioco.",
    mi_ext: "Fattori esterni.", mi_model: "Modello.",
    sources: "Fonti",
    not_found: "Partita non trovata.",

    bk_eyebrow: "💰 Il tuo capitale, le tue puntate, i tuoi consigli",
    bk_title: "Gestione del bankroll",
    bk_lead: "Segui il tuo capitale, calcola una puntata prudente per ogni scommessa in base al valore e all’affidabilità, e tieni d’occhio lo storico. Tutto è salvato sul tuo browser — nulla viene inviato, nessuna scommessa viene piazzata.",
    bk_cur: "Bankroll attuale", bk_balance: "Bilancio totale", bk_roi: "ROI (scommesse chiuse)", bk_pending: "Scommesse aperte", bk_engaged: "impegnati",
    bk_capital: "⚙️ Il mio capitale", bk_start: "Bankroll iniziale (€)",
    bk_prudence: "Prudenza del calcolo (frazione di Kelly)",
    bk_k_quarter: "Un quarto di Kelly — molto prudente (consigliato)", bk_k_half: "Mezzo Kelly — moderato", bk_k_full: "Kelly pieno — aggressivo (sconsigliato)",
    bk_save: "Salva",
    bk_recalc: "Il bankroll attuale si ricalcola automaticamente dal capitale iniziale + il risultato delle scommesse chiuse (vinte/perse).",
    bk_calc_h: "🧮 Calcolatore di puntata (valore + Kelly prudente)",
    bk_bet_label: "Scommessa (etichetta)", bk_bet_ph: "Es: Francia – Inghilterra : Vince Francia",
    bk_odds: "Quota proposta", bk_prob: "Probabilità reale stimata (%)", bk_conf: "Fiducia dell’analisi",
    bk_conf_high: "Alta", bk_conf_mid: "Media", bk_conf_low: "Bassa",
    bk_calc_ph: "Inserisci una quota e una probabilità stimata per ottenere una puntata consigliata.",
    bk_track_h: "📊 Storico scommesse",
    bk_add_label: "Aggiungi una scommessa manualmente — etichetta", bk_add_ph: "Es: PSG – OM : Over 2,5 gol",
    bk_add_odds: "Quota", bk_add_stake: "Puntata (€)", bk_add: "＋ Aggiungi",
    bk_disclaimer: "⚠ Promemoria importante. Questo strumento calcola e consiglia, non piazza mai alcuna scommessa. La decisione finale e la responsabilità sono tue. Le scommesse restano aleatorie. 18+ · Gioca responsabilmente.",
    bk_th_date: "Data", bk_th_bet: "Scommessa", bk_th_odds: "Quota", bk_th_stake: "Puntata", bk_th_status: "Stato", bk_th_pl: "Vincita/Perdita",
    bk_won: "Vinta", bk_lost: "Persa", bk_ongoing: "In corso",
    bk_empty: "Nessuna scommessa registrata. Aggiungine una col calcolatore o col modulo qui sotto.",
    bk_reco_stake: "Puntata consigliata", bk_potgain: "vincita netta potenziale",

    tk_eyebrow: "🎫 Fai valutare la tua schedina",
    tk_title: "Verifica delle schedine",
    tk_lead: "Hai un’idea di multipla? Due opzioni: il calcolatore istantaneo qui sotto per un primo parere numerico, oppure invia l’immagine della tua schedina in Cowork per un verdetto pro completo (cerco tutte le info e pubblico una valutazione motivata qui).",
    tk_calc_h: "⚡ Calcolatore di multipla istantaneo",
    tk_calc_sub: "Aggiungi ogni selezione della schedina con la sua quota e la tua probabilità stimata. Il sito calcola la quota totale, la probabilità combinata, il valore e un voto.",
    tk_leg_label: "Selezione", tk_leg_label_ph: "Es: Vince Francia / Kane marcatore",
    tk_leg_odds: "Quota", tk_leg_prob: "Prob. stimata (%)",
    tk_add_leg: "＋ Aggiungi una selezione", tk_eval: "Valuta la schedina",
    tk_res_totalodds: "Quota totale", tk_res_prob: "Prob. combinata", tk_res_fair: "Quota equa", tk_res_edge: "Valore (edge)",
    tk_verdict: "Verdetto", tk_rating: "Voto",
    tk_play: "Da giocare", tk_risky: "Giocabile ma rischiosa", tk_avoid: "Da evitare",
    tk_note_min: "Aggiungi almeno una selezione con quota (>1) e probabilità (1–99%).",
    tk_pro_h: "🔎 Parere pro completo (via Cowork)",
    tk_pro_p: "Per un’analisi approfondita, inviami l’immagine della schedina in Cowork. Cerco tutte le info (formazioni, infortuni, forma, xG, arbitro, meteo, valore mercato per mercato), ti do un voto su 10, un verdetto « la giocherei / non la giocherei » e pubblico la schedina verificata qui sotto.",
    tk_verified_h: "Schedine verificate di recente",
    tk_verified_empty: "Nessuna schedina verificata per ora. Inviami la tua in Cowork.",
    tk_legs_word: "Selezioni", tk_would: "La giocherei", tk_wouldnot: "Non la giocherei",
    tk_disclaimer: "⚠ Il calcolatore si basa sulle TUE probabilità stimate: vale quanto valgono le tue stime. È uno strumento di supporto, non una garanzia. La responsabilità finale è tua. 18+ · Gioca responsabilmente.",
    tk_expl: "spiegazione"
  }
};

function t(key){
  const d = DICT[LANG] || DICT.fr;
  return d[key] != null ? d[key] : (DICT.fr[key] != null ? DICT.fr[key] : key);
}

/* applique les traductions aux éléments statiques marqués data-i18n / data-i18n-ph */
function applyStaticI18n(){
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.getAttribute("data-i18n")); });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
  document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
  // état visuel du sélecteur de langue
  document.querySelectorAll(".lang-switch button").forEach(b => {
    b.classList.toggle("active", b.getAttribute("data-lang") === LANG);
  });
  document.documentElement.lang = LANG;
}
