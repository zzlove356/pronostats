/* =========================================================
   PronoStats — Base de données des analyses
   ---------------------------------------------------------
   Pour AJOUTER un match : copie un bloc { ... } dans MATCHES,
   change l'id (unique, sans espace) et remplis les champs.
   Le site se met à jour tout seul. Le match le plus récent
   (en haut de la liste) apparaît en premier sur l'accueil.
   ========================================================= */

const MATCHES = [
  {
    id: "france-angleterre-2026-07-18",
    competition: "Coupe du Monde 2026 — Match pour la 3ᵉ place",
    date: "Samedi 18 juillet 2026",
    kickoff: "23:00 (heure de Paris)",
    venue: "Hard Rock Stadium, Miami (USA)",
    home: { name: "France", flag: "🇫🇷" },
    away: { name: "Angleterre", flag: "🏴" },

    /* --- Cotes relevées sur oddschecker.com (résultat) --- */
    odds: {
      market: "Résultat du match (1N2)",
      source: "oddschecker.com",
      checkedAt: "18/07/2026",
      aiProb: { home: 58, draw: 21, away: 22 }, // AI Probability oddschecker (%)
      best: {
        home: { dec: 1.91, frac: "10/11", book: "QuinnBet / PricedUp / AK Bets" },
        draw: { dec: 4.20, frac: "16/5", book: "QuinnBet / bet365" },
        away: { dec: 4.20, frac: "16/5", book: "PricedUp / Sky Bet" }
      },
      extra: [
        { label: "Buteur à tout moment — Mbappé", frac: "3/4", dec: 1.75, ai: "64%" },
        { label: "Buteur à tout moment — Kane", frac: "7/5", dec: 2.40, ai: "47%" },
        { label: "Buteur à tout moment — Bellingham", frac: "31/10", dec: 4.10, ai: "—" },
        { label: "Buteur à tout moment — Saka", frac: "4/1", dec: 5.00, ai: "—" }
      ]
    },

    /* --- TOUS LES MARCHÉS relevés sur oddschecker (meilleures cotes, décimal) --- */
    markets: [
      {
        category: "Résultat & doubles chances",
        rows: [
          { sel: "France (1)", dec: 1.91, frac: "10/11", ai: "58%" },
          { sel: "Match nul (N)", dec: 4.20, frac: "16/5", ai: "21%" },
          { sel: "Angleterre (2)", dec: 4.20, frac: "16/5", ai: "22%" },
          { sel: "Double chance — France ou nul (1N)", dec: 1.29, frac: "2/7", ai: "~79%" },
          { sel: "Double chance — Angleterre ou nul (N2)", dec: 2.00, frac: "1/1", ai: "~43%" },
          { sel: "Double chance — France ou Angleterre (12, sans nul)", dec: 1.25, frac: "1/4", ai: "~80%" },
          { sel: "France — remboursé si nul (Draw No Bet)", dec: 1.44, frac: "4/9", ai: "~72%" },
          { sel: "Angleterre — remboursé si nul (Draw No Bet)", dec: 2.90, frac: "19/10", ai: "~28%" }
        ]
      },
      {
        category: "Méthode de qualification (match à élimination)",
        rows: [
          { sel: "France gagne dans le temps réglementaire", dec: 1.85, frac: "17/20" },
          { sel: "Angleterre gagne dans le temps réglementaire", dec: 3.80, frac: "14/5" },
          { sel: "France se qualifie après prolongation", dec: 10.0, frac: "9/1" },
          { sel: "France se qualifie aux tirs au but", dec: 13.0, frac: "12/1" },
          { sel: "Angleterre après prolongation", dec: 17.0, frac: "16/1" },
          { sel: "Angleterre aux tirs au but", dec: 15.0, frac: "14/1" }
        ]
      },
      {
        category: "Nombre de buts",
        rows: [
          { sel: "Total 3 buts exact (issue la plus probable)", dec: 4.50, frac: "7/2" },
          { sel: "Total 2 buts exact", dec: 4.75, frac: "15/4" },
          { sel: "Total 4 buts exact", dec: 5.25, frac: "17/4" },
          { sel: "Total 1 but exact", dec: 8.00, frac: "7/1" },
          { sel: "Total 5 buts exact", dec: 7.00, frac: "6/1" },
          { sel: "0 but / 6+ buts", dec: 11.0, frac: "10/1 à 22/1" }
        ]
      },
      {
        category: "Score exact (favoris du marché)",
        rows: [
          { sel: "France 2-1", dec: 9.50, frac: "17/2" },
          { sel: "Match nul 1-1", dec: 9.50, frac: "17/2" },
          { sel: "France 2-0", dec: 15.0, frac: "14/1" },
          { sel: "France 1-0", dec: 15.0, frac: "14/1" },
          { sel: "France 3-1", dec: 15.0, frac: "14/1" },
          { sel: "Angleterre 2-1", dec: 15.0, frac: "14/1" }
        ]
      },
      {
        category: "Buteurs (à tout moment)",
        rows: [
          { sel: "Kylian Mbappé", dec: 1.75, frac: "3/4", ai: "64%" },
          { sel: "Harry Kane", dec: 2.40, frac: "7/5", ai: "47%" },
          { sel: "Jean-Philippe Mateta", dec: 2.70, frac: "17/10" },
          { sel: "Marcus Thuram", dec: 2.75, frac: "7/4" },
          { sel: "Ivan Toney", dec: 2.88, frac: "15/8" },
          { sel: "Ollie Watkins", dec: 3.00, frac: "2/1" },
          { sel: "Bradley Barcola", dec: 3.70, frac: "27/10" },
          { sel: "Michael Olise", dec: 3.75, frac: "11/4" },
          { sel: "Jude Bellingham", dec: 4.10, frac: "31/10" },
          { sel: "Marcus Rashford", dec: 4.75, frac: "15/4" },
          { sel: "Bukayo Saka", dec: 5.00, frac: "4/1" }
        ]
      },
      {
        category: "Handicaps & combinés (exemples)",
        rows: [
          { sel: "Bet Builder — Mbappé +3,5 tirs & Mbappé buteur & Kane buteur (BetMGM)", dec: 5.80, frac: "24/5" },
          { sel: "Marchés dispo aussi : handicap asiatique/européen, corners, cartons, penalty, clean sheet, mi-temps/fin de match", dec: null, frac: "voir oddschecker" }
        ],
        note: "Arbitre Jesús Valenzuela ≈ 4,9 cartons/match : les marchés « nombre de cartons » et « joueur cartonné » sont à surveiller pour du over-cartons."
      }
    ],

    /* --- VALUE BETS : croisement meilleure cote × AI Probability oddschecker --- */
    valueBets: [
      { label: "Harry Kane buteur à tout moment", dec: 2.40, ai: 47, note: "Kane joue le Soulier d'Or (6 buts), voudra jouer et tirer ; principal danger anglais sur coups de pied arrêtés." },
      { label: "Kylian Mbappé buteur à tout moment", dec: 1.75, ai: 64, note: "8 buts, motivation maximale (dépasser Messi), en pleine confiance." },
      { label: "Victoire France (1N2)", dec: 1.91, ai: 58, note: "Le pari principal : favori logique avec une cote généreuse." },
      { label: "France remboursé si nul (Draw No Bet)", dec: 1.44, ai: 72, note: "Version plus sûre du pari France : le nul est remboursé. Value plus légère mais risque réduit." }
    ],

    /* --- Prédiction --- */
    prediction: {
      pick: "Victoire France",
      pickShort: "France",
      score: "2 – 1",
      goals: "Plus de 2,5 buts probable",
      confidence: "moyen", // faible | moyen | eleve
      value: true,
      summary:
        "La France part favorite logique (AI 58%) et présente de la valeur à 1.91 : la cote juste correspondrait à ~1.72. " +
        "Sa production offensive sur le tournoi (2,1 xG/match hors demie) est très supérieure à celle d'une Angleterre plus " +
        "irrégulière, et Mbappé joue le Soulier d'Or, une vraie motivation individuelle. Le bémol qui fait retomber la confiance " +
        "à « moyen » : un match pour la 3ᵉ place est structurellement imprévisible (grosse rotation des deux côtés, enjeu collectif " +
        "faible — Tuchel a lui-même reconnu que « personne ne veut jouer » ce match).",
      basedOn: [
        "Écart de production offensive nette sur le tournoi (France 2,1 xG/match hors demie vs Angleterre irrégulière)",
        "Valeur mathématique : cote 1.91 > cote juste 1.72 issue de l'AI Probability (58%)",
        "Motivation individuelle de Mbappé (course au Soulier d'Or, 8 buts, dernier match)",
        "Historique récent favorable : France invaincue en compétition contre l'Angleterre depuis 1982",
        "Absence défensive anglaise plus lourde (James sortie) que côté français"
      ],
      against: [
        "Match sans enjeu collectif = imprévisibilité élevée, rotations massives annoncées",
        "Angleterre a créé beaucoup d'occasions en demie (motivation d'orgueil possible)",
        "Fatigue cumulée de fin de tournoi pour les deux cadres restants"
      ]
    },

    /* --- Analyse par équipe --- */
    teams: {
      home: {
        name: "France", flag: "🇫🇷", coach: "Didier Deschamps",
        lineup: "Maignan — Koundé, Konaté, Lacroix, T. Hernandez — Tchouaméni, Camavinga — Dembélé, Griezmann, Barcola — Mbappé (compo probable, rotation attendue)",
        style: "Bloc médian, transitions rapides, exploitation de la vitesse Mbappé/Barcola dans le dos de la défense. Possession moins recherchée que la maîtrise verticale.",
        absences: [
          "William Saliba — forfait (dos, sorti avant la mi-temps contre l'Espagne)",
          "Rotation probable : Deschamps devrait faire tourner, titres envolés"
        ],
        physical: "6 matchs disputés avant la demie, cadres proches de la limite de minutes. Match n°7 en un mois, gestion de la fraîcheur attendue. Repos identique aux deux équipes (demies jouées 14 & 15 juillet).",
        form: "6 victoires puis défaite 0-2 en demie face à l'Espagne. Seul match du tournoi sous 0,5 xG créé (0,32 xG en demie) — accident plus que tendance de fond.",
        xg: "≈ 2,1 xG créés / match (hors demie), 0,8 concédé — l'une des meilleures attaques du tournoi.",
        context: "Saliba forfait fragilise l'axe ; Lacroix (Crystal Palace) devrait débuter aux côtés de Konaté. Theo Hernandez remplacerait Digne à gauche après les difficultés de ce dernier contre Yamal.",
        source: "RotoWire / Sports Mole / xGscore (preview 18/07/2026)"
      },
      away: {
        name: "Angleterre", flag: "🏴", coach: "Thomas Tuchel",
        lineup: "Pickford — Spence, Chalobah, Burn, O'Reilly — James, Mainoo — Madueke, Eze, Rashford — Kane (compo probable)",
        style: "Construction posée, dépendance à Kane pour fixer et à Bellingham/Eze pour créer entre les lignes. Moins tranchante dans le dernier tiers sur ce tournoi.",
        absences: [
          "Reece James — incertain / sorti sur blessure musculaire contre l'Argentine",
          "Jordan Henderson — forfait (poignet)",
          "Jude Bellingham — menace de suspension (geste sur Barco après le match)"
        ],
        physical: "Défense diminuée par la sortie de James. Même charge de calendrier que la France (demie le 15/07). Rotation également probable côté Tuchel.",
        form: "Parcours plus heurté, défaite 2-1 contre l'Argentine en demie. Pics offensifs par séquences (2,80 xG contre Haïti) mais irrégularité d'un match à l'autre.",
        xg: "Production offensive en dents de scie ; solidité défensive variable selon l'adversaire.",
        context: "Kane (6 buts) et Bellingham (6 buts) restent en course pour le Soulier d'Or et voudront jouer — motivation individuelle réelle malgré l'enjeu collectif nul.",
        source: "Yahoo Sports / RotoWire (predicted lineup 18/07/2026)"
      }
    },

    /* --- Joueurs clés --- */
    keyPlayers: [
      { team: "🇫🇷", name: "Kylian Mbappé", pos: "Attaquant", stat: "8 buts + 3 passes D. sur le tournoi — à égalité avec Messi pour le Soulier d'Or", note: "Motivation individuelle maximale, dernier match pour dépasser Messi." },
      { team: "🇫🇷", name: "Ousmane Dembélé", pos: "Ailier", stat: "5 buts sur le tournoi", note: "Percussion et déséquilibre côté droit." },
      { team: "🇫🇷", name: "Ibrahima Konaté", pos: "Défenseur central", stat: "Patron de l'axe en l'absence de Saliba", note: "Doit compenser une charnière remaniée avec Lacroix." },
      { team: "🏴", name: "Harry Kane", pos: "Attaquant / Capitaine", stat: "6 buts — en course pour le Soulier d'Or", note: "Point de fixation, principal danger sur coups de pied arrêtés." },
      { team: "🏴", name: "Jude Bellingham", pos: "Milieu offensif", stat: "6 buts — sous menace de suspension", note: "Disponibilité incertaine ; s'il joue, créateur n°1 entre les lignes." },
      { team: "🏴", name: "Jordan Pickford", pos: "Gardien", stat: "Rempart habituel des Three Lions", note: "Devra être décisif face à la vitesse française." }
    ],

    /* --- Le match --- */
    matchInfo: {
      h2h: "33ᵉ confrontation. Bilan historique : Angleterre 17 victoires, France 10, 5 nuls. Mais la France est invaincue en match officiel contre l'Angleterre depuis la Coupe du Monde 1982 (dont 2-1 en quart de finale du Mondial 2022).",
      referee: "Jesús Valenzuela (Venezuela), 42 ans. Réputé strict : ≈ 4,9 cartons jaunes par match en moyenne, 0,10 rouge/match, 38 penalties sur 108 matchs. Avait déjà arbitré la France au Mondial 2022 (8ᵉ, victoire 3-1 vs Pologne). Tendance cartons = marché « nombre de cartons » potentiellement intéressant.",
      stake: "Match pour la 3ᵉ place (« bronze final ») : enjeu de prestige et de primes, mais pas de titre. Enjeu individuel fort pour Mbappé et Kane (Soulier d'Or).",
      external: "Miami en juillet : chaleur et forte humidité, facteur de fatigue accru en seconde période, tempo souvent plus bas — argument modéré en faveur des équipes qui gèrent leur effort et des scénarios à buts en fin de match.",
      supercomputer: "Le supercalculateur Opta donne la France gagnante dans 50,7% de ses simulations d'avant-match."
    },

    sources: [
      { label: "Al Jazeera — preview 3ᵉ place", url: "https://www.aljazeera.com/sports/2026/7/17/france-england-fifa-world-cup-third-place-playoff-predictions-kickoff" },
      { label: "RotoWire — predicted lineups & team news", url: "https://www.rotowire.com/soccer/article/france-vs-england-preview-predicted-lineups-team-news-tactical-analysis-2026-world-cup-third-place-playoff-123027" },
      { label: "xGscore — preview & xG", url: "https://xgscore.io/world-cup/france-england/preview" },
      { label: "Sports Mole — head to head", url: "https://www.sportsmole.co.uk/football/france/world-cup-2026/head-to-head/france-vs-england-head-to-head-record-and-past-meetings_601299.html" },
      { label: "OneFootball — arbitre Valenzuela", url: "https://onefootball.com/en/news/jesus-valenzuela-to-referee-world-cup-third-place-play-off-between-france-and-england-43153659" },
      { label: "oddschecker — cotes du match", url: "https://www.oddschecker.com/football/world-cup/france-v-england/winner" }
    ]
  }
];
