/* =========================================================
   PronoStats — Base de données des analyses (bilingue FR/IT)
   ---------------------------------------------------------
   Les champs texte peuvent être une chaîne (identique FR/IT)
   ou un objet { fr:"...", it:"..." }. La fonction tr() choisit
   la langue et retombe sur le FR si l'italien manque.

   Pour AJOUTER un match : copie un bloc { ... } dans MATCHES.
   Le plus récent (en haut) apparaît en premier sur l'accueil.
   ========================================================= */

const MATCHES = [
  {
    id: "france-angleterre-2026-07-18",
    competition: { fr: "Coupe du Monde 2026 — Match pour la 3ᵉ place", it: "Mondiali 2026 — Finale per il 3° posto" },
    date: { fr: "Samedi 18 juillet 2026", it: "Sabato 18 luglio 2026" },
    kickoff: { fr: "23:00 (heure de Paris)", it: "23:00 (ora italiana)" },
    venue: "Hard Rock Stadium, Miami (USA)",
    home: { name: { fr: "France", it: "Francia" }, flag: "🇫🇷" },
    away: { name: { fr: "Angleterre", it: "Inghilterra" }, flag: "🏴" },

    odds: {
      market: { fr: "Résultat du match (1N2)", it: "Esito finale (1X2)" },
      source: "oddschecker.com",
      checkedAt: "18/07/2026",
      aiProb: { home: 58, draw: 21, away: 22 },
      best: {
        home: { dec: 1.91, frac: "10/11", book: "QuinnBet / PricedUp / AK Bets" },
        draw: { dec: 4.20, frac: "16/5", book: "QuinnBet / bet365" },
        away: { dec: 4.20, frac: "16/5", book: "PricedUp / Sky Bet" }
      }
    },

    /* --- PARIS RECOMMANDÉS : un safe (combiné) + un simple --- */
    safeBet: {
      sel: { fr: "France remboursé si match nul (Draw No Bet)", it: "Francia rimborso se pareggio (Draw No Bet)" },
      dec: 1.44, frac: "4/9", book: "bet365 / William Hill", ai: 72,
      why: {
        fr: "Le pari safe idéal pour un combiné : la France n'a qu'à ne pas perdre, et si le match finit sur un nul ta mise est remboursée. Elle reste favorite (AI ~72% de ne pas perdre) avec la meilleure attaque du tournoi face à une défense anglaise diminuée (James sorti).",
        it: "La scommessa sicura ideale per una multipla: alla Francia basta non perdere e, se finisce in pareggio, la puntata viene rimborsata. Resta favorita (AI ~72% di non perdere) con il miglior attacco del torneo contro una difesa inglese ridotta (James uscito)."
      }
    },
    simpleBet: {
      sel: { fr: "Kylian Mbappé buteur à tout moment", it: "Kylian Mbappé marcatore in qualsiasi momento" },
      dec: 1.75, frac: "3/4", book: "plusieurs bookmakers", ai: 64,
      why: {
        fr: "Le meilleur rapport valeur/fiabilité en simple : Mbappé a marqué 8 buts sur le tournoi, joue le Soulier d'Or (dernier match pour dépasser Messi) et affronte une défense remaniée. AI 64% pour une cote de 1.75 → +12% de valeur.",
        it: "Il miglior rapporto valore/affidabilità in singola: Mbappé ha segnato 8 gol nel torneo, gioca per la Scarpa d'Oro (ultima gara per superare Messi) e affronta una difesa rimaneggiata. AI 64% per una quota di 1.75 → +12% di valore."
      }
    },

    markets: [
      {
        category: { fr: "Résultat & doubles chances", it: "Esito & doppie chance" },
        rows: [
          { sel: { fr: "France (1)", it: "Francia (1)" }, dec: 1.91, frac: "10/11", ai: "58%" },
          { sel: { fr: "Match nul (N)", it: "Pareggio (X)" }, dec: 4.20, frac: "16/5", ai: "21%" },
          { sel: { fr: "Angleterre (2)", it: "Inghilterra (2)" }, dec: 4.20, frac: "16/5", ai: "22%" },
          { sel: { fr: "Double chance — France ou nul (1N)", it: "Doppia chance — Francia o pareggio (1X)" }, dec: 1.29, frac: "2/7", ai: "~79%" },
          { sel: { fr: "Double chance — Angleterre ou nul (N2)", it: "Doppia chance — Inghilterra o pareggio (X2)" }, dec: 2.00, frac: "1/1", ai: "~43%" },
          { sel: { fr: "Double chance — France ou Angleterre (12)", it: "Doppia chance — Francia o Inghilterra (12)" }, dec: 1.25, frac: "1/4", ai: "~80%" },
          { sel: { fr: "France remboursé si nul (Draw No Bet)", it: "Francia rimborso se pareggio (DNB)" }, dec: 1.44, frac: "4/9", ai: "~72%" },
          { sel: { fr: "Angleterre remboursé si nul (Draw No Bet)", it: "Inghilterra rimborso se pareggio (DNB)" }, dec: 2.90, frac: "19/10", ai: "~28%" }
        ]
      },
      {
        category: { fr: "Méthode de qualification (match à élimination)", it: "Metodo di qualificazione (gara a eliminazione)" },
        rows: [
          { sel: { fr: "France gagne dans le temps réglementaire", it: "Francia vince nei tempi regolamentari" }, dec: 1.85, frac: "17/20" },
          { sel: { fr: "Angleterre gagne dans le temps réglementaire", it: "Inghilterra vince nei tempi regolamentari" }, dec: 3.80, frac: "14/5" },
          { sel: { fr: "France se qualifie après prolongation", it: "Francia si qualifica ai supplementari" }, dec: 10.0, frac: "9/1" },
          { sel: { fr: "France se qualifie aux tirs au but", it: "Francia si qualifica ai rigori" }, dec: 13.0, frac: "12/1" },
          { sel: { fr: "Angleterre après prolongation", it: "Inghilterra ai supplementari" }, dec: 17.0, frac: "16/1" },
          { sel: { fr: "Angleterre aux tirs au but", it: "Inghilterra ai rigori" }, dec: 15.0, frac: "14/1" }
        ]
      },
      {
        category: { fr: "Nombre de buts", it: "Numero di gol" },
        rows: [
          { sel: { fr: "Total 3 buts exact (issue la plus probable)", it: "Totale 3 gol esatti (esito più probabile)" }, dec: 4.50, frac: "7/2" },
          { sel: { fr: "Total 2 buts exact", it: "Totale 2 gol esatti" }, dec: 4.75, frac: "15/4" },
          { sel: { fr: "Total 4 buts exact", it: "Totale 4 gol esatti" }, dec: 5.25, frac: "17/4" },
          { sel: { fr: "Total 1 but exact", it: "Totale 1 gol esatto" }, dec: 8.00, frac: "7/1" },
          { sel: { fr: "Total 5 buts exact", it: "Totale 5 gol esatti" }, dec: 7.00, frac: "6/1" }
        ]
      },
      {
        category: { fr: "Score exact (favoris du marché)", it: "Risultato esatto (favoriti del mercato)" },
        rows: [
          { sel: { fr: "France 2-1", it: "Francia 2-1" }, dec: 9.50, frac: "17/2" },
          { sel: { fr: "Match nul 1-1", it: "Pareggio 1-1" }, dec: 9.50, frac: "17/2" },
          { sel: { fr: "France 2-0", it: "Francia 2-0" }, dec: 15.0, frac: "14/1" },
          { sel: { fr: "France 1-0", it: "Francia 1-0" }, dec: 15.0, frac: "14/1" },
          { sel: { fr: "France 3-1", it: "Francia 3-1" }, dec: 15.0, frac: "14/1" },
          { sel: { fr: "Angleterre 2-1", it: "Inghilterra 2-1" }, dec: 15.0, frac: "14/1" }
        ]
      },
      {
        category: { fr: "Buteurs (à tout moment)", it: "Marcatori (in qualsiasi momento)" },
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
        category: { fr: "Handicaps & combinés (exemples)", it: "Handicap & multiple (esempi)" },
        rows: [
          { sel: { fr: "Bet Builder — Mbappé +3,5 tirs & Mbappé buteur & Kane buteur (BetMGM)", it: "Bet Builder — Mbappé +3,5 tiri & Mbappé marcatore & Kane marcatore (BetMGM)" }, dec: 5.80, frac: "24/5" },
          { sel: { fr: "Dispo aussi : handicap asiatique/européen, corners, cartons, penalty, clean sheet, mi-temps", it: "Disponibili anche: handicap asiatico/europeo, corner, cartellini, rigore, clean sheet, primo tempo" }, dec: null, frac: "voir oddschecker" }
        ],
        note: {
          fr: "Arbitre Jesús Valenzuela ≈ 4,9 cartons/match : les marchés « nombre de cartons » et « joueur cartonné » sont à surveiller pour du over-cartons.",
          it: "Arbitro Jesús Valenzuela ≈ 4,9 cartellini/partita: i mercati « numero di cartellini » e « giocatore ammonito » sono da tenere d'occhio per l'over-cartellini."
        }
      }
    ],

    valueBets: [
      { label: { fr: "Harry Kane buteur à tout moment", it: "Harry Kane marcatore in qualsiasi momento" }, dec: 2.40, ai: 47,
        note: { fr: "Kane joue le Soulier d'Or (6 buts), voudra jouer et tirer ; principal danger anglais sur coups de pied arrêtés.", it: "Kane gioca per la Scarpa d'Oro (6 gol), vorrà giocare e tirare; principale pericolo inglese sui calci piazzati." } },
      { label: { fr: "Kylian Mbappé buteur à tout moment", it: "Kylian Mbappé marcatore in qualsiasi momento" }, dec: 1.75, ai: 64,
        note: { fr: "8 buts, motivation maximale (dépasser Messi), en pleine confiance.", it: "8 gol, motivazione massima (superare Messi), in piena fiducia." } },
      { label: { fr: "Victoire France (1N2)", it: "Vittoria Francia (1X2)" }, dec: 1.91, ai: 58,
        note: { fr: "Le pari principal : favori logique avec une cote généreuse.", it: "La scommessa principale: favorita logica con una quota generosa." } },
      { label: { fr: "France remboursé si nul (Draw No Bet)", it: "Francia rimborso se pareggio (DNB)" }, dec: 1.44, ai: 72,
        note: { fr: "Version plus sûre du pari France : le nul est remboursé. Value plus légère mais risque réduit.", it: "Versione più sicura della scommessa Francia: il pareggio è rimborsato. Valore più leggero ma rischio ridotto." } }
    ],

    prediction: {
      pick: { fr: "Victoire France", it: "Vittoria Francia" },
      pickShort: "France",
      score: "2 – 1",
      goals: { fr: "Plus de 2,5 buts probable", it: "Over 2,5 gol probabile" },
      confidence: "moyen",
      value: true,
      summary: {
        fr: "La France part favorite logique (AI 58%) et présente de la valeur à 1.91 : la cote juste correspondrait à ~1.72. Sa production offensive sur le tournoi (2,1 xG/match hors demie) est très supérieure à celle d'une Angleterre plus irrégulière, et Mbappé joue le Soulier d'Or, une vraie motivation individuelle. Le bémol qui fait retomber la confiance à « moyen » : un match pour la 3ᵉ place est structurellement imprévisible (grosse rotation des deux côtés, enjeu collectif faible — Tuchel a lui-même reconnu que « personne ne veut jouer » ce match).",
        it: "La Francia parte favorita logica (AI 58%) e offre valore a 1.91: la quota equa sarebbe ~1.72. La sua produzione offensiva nel torneo (2,1 xG/partita esclusa la semifinale) è nettamente superiore a quella di un'Inghilterra più discontinua, e Mbappé gioca per la Scarpa d'Oro, una vera motivazione individuale. Il limite che riporta la fiducia a « media »: una finale per il 3° posto è strutturalmente imprevedibile (ampio turnover da entrambe le parti, posta collettiva bassa — lo stesso Tuchel ha ammesso che « nessuno vuole giocare » questa gara)."
      },
      basedOn: {
        fr: [
          "Écart de production offensive nette sur le tournoi (France 2,1 xG/match hors demie vs Angleterre irrégulière)",
          "Valeur mathématique : cote 1.91 > cote juste 1.72 issue de l'AI Probability (58%)",
          "Motivation individuelle de Mbappé (course au Soulier d'Or, 8 buts, dernier match)",
          "Historique récent favorable : France invaincue en compétition contre l'Angleterre depuis 1982",
          "Absence défensive anglaise plus lourde (James sorti) que côté français"
        ],
        it: [
          "Divario di produzione offensiva netta nel torneo (Francia 2,1 xG/partita esclusa la semifinale vs Inghilterra discontinua)",
          "Valore matematico: quota 1.91 > quota equa 1.72 dall'AI Probability (58%)",
          "Motivazione individuale di Mbappé (corsa alla Scarpa d'Oro, 8 gol, ultima gara)",
          "Precedenti recenti favorevoli: Francia imbattuta in gare ufficiali contro l'Inghilterra dal 1982",
          "Assenza difensiva inglese più pesante (James uscito) rispetto alla Francia"
        ]
      },
      against: {
        fr: [
          "Match sans enjeu collectif = imprévisibilité élevée, rotations massives annoncées",
          "Angleterre a créé beaucoup d'occasions en demie (motivation d'orgueil possible)",
          "Fatigue cumulée de fin de tournoi pour les deux cadres restants"
        ],
        it: [
          "Gara senza posta collettiva = imprevedibilità elevata, ampio turnover annunciato",
          "L'Inghilterra ha creato molte occasioni in semifinale (possibile motivazione d'orgoglio)",
          "Stanchezza accumulata a fine torneo per i big rimasti"
        ]
      }
    },

    teams: {
      home: {
        name: { fr: "France", it: "Francia" }, flag: "🇫🇷", coach: "Didier Deschamps",
        lineup: "Maignan — Koundé, Konaté, Lacroix, T. Hernandez — Tchouaméni, Camavinga — Dembélé, Griezmann, Barcola — Mbappé",
        style: { fr: "Bloc médian, transitions rapides, exploitation de la vitesse Mbappé/Barcola dans le dos de la défense.", it: "Blocco medio, transizioni rapide, sfruttamento della velocità di Mbappé/Barcola alle spalle della difesa." },
        absences: {
          fr: ["William Saliba — forfait (dos, sorti avant la mi-temps contre l'Espagne)", "Rotation probable : Deschamps devrait faire tourner, titres envolés"],
          it: ["William Saliba — indisponibile (schiena, uscito prima dell'intervallo con la Spagna)", "Turnover probabile: Deschamps dovrebbe far ruotare, titolo ormai sfumato"]
        },
        physical: { fr: "6 matchs avant la demie, cadres proches de la limite de minutes. Match n°7 en un mois, gestion de la fraîcheur attendue. Repos identique aux deux équipes.", it: "6 gare prima della semifinale, big vicini al limite di minutaggio. Gara n°7 in un mese, gestione della freschezza attesa. Riposo identico per le due squadre." },
        form: { fr: "6 victoires puis défaite 0-2 en demie face à l'Espagne. Seul match du tournoi sous 0,5 xG créé (0,32 xG) — accident plus que tendance.", it: "6 vittorie poi sconfitta 0-2 in semifinale con la Spagna. Unica gara del torneo sotto 0,5 xG creati (0,32 xG) — episodio più che tendenza." },
        xg: { fr: "≈ 2,1 xG créés / match (hors demie), 0,8 concédé — l'une des meilleures attaques du tournoi.", it: "≈ 2,1 xG creati / partita (esclusa la semifinale), 0,8 concessi — uno dei migliori attacchi del torneo." },
        context: { fr: "Saliba forfait fragilise l'axe ; Lacroix (Crystal Palace) devrait débuter aux côtés de Konaté. Theo Hernandez remplacerait Digne à gauche.", it: "L'assenza di Saliba indebolisce il centro; Lacroix (Crystal Palace) dovrebbe partire titolare accanto a Konaté. Theo Hernandez rileverebbe Digne a sinistra." },
        source: "RotoWire / Sports Mole / xGscore (18/07/2026)"
      },
      away: {
        name: { fr: "Angleterre", it: "Inghilterra" }, flag: "🏴", coach: "Thomas Tuchel",
        lineup: "Pickford — Spence, Chalobah, Burn, O'Reilly — James, Mainoo — Madueke, Eze, Rashford — Kane",
        style: { fr: "Construction posée, dépendance à Kane pour fixer et à Bellingham/Eze pour créer. Moins tranchante dans le dernier tiers sur ce tournoi.", it: "Costruzione ragionata, dipendenza da Kane per il riferimento e da Bellingham/Eze per creare. Meno incisiva nell'ultimo terzo in questo torneo." },
        absences: {
          fr: ["Reece James — incertain / sorti sur blessure musculaire contre l'Argentine", "Jordan Henderson — forfait (poignet)", "Jude Bellingham — menace de suspension (geste sur Barco)"],
          it: ["Reece James — in dubbio / uscito per problema muscolare con l'Argentina", "Jordan Henderson — indisponibile (polso)", "Jude Bellingham — a rischio squalifica (gesto su Barco)"]
        },
        physical: { fr: "Défense diminuée par la sortie de James. Même charge de calendrier que la France. Rotation également probable côté Tuchel.", it: "Difesa ridotta dall'uscita di James. Stesso carico di calendario della Francia. Turnover probabile anche per Tuchel." },
        form: { fr: "Parcours plus heurté, défaite 2-1 contre l'Argentine en demie. Pics offensifs par séquences (2,80 xG vs Haïti) mais irrégularité d'un match à l'autre.", it: "Percorso più accidentato, sconfitta 2-1 con l'Argentina in semifinale. Picchi offensivi a tratti (2,80 xG vs Haiti) ma discontinuità da gara a gara." },
        xg: { fr: "Production offensive en dents de scie ; solidité défensive variable selon l'adversaire.", it: "Produzione offensiva altalenante; solidità difensiva variabile secondo l'avversario." },
        context: { fr: "Kane (6 buts) et Bellingham (6 buts) restent en course pour le Soulier d'Or et voudront jouer — motivation individuelle réelle malgré l'enjeu collectif nul.", it: "Kane (6 gol) e Bellingham (6 gol) restano in corsa per la Scarpa d'Oro e vorranno giocare — motivazione individuale reale nonostante la posta collettiva nulla." },
        source: "Yahoo Sports / RotoWire (18/07/2026)"
      }
    },

    keyPlayers: [
      { team: "🇫🇷", name: "Kylian Mbappé", pos: { fr: "Attaquant", it: "Attaccante" }, stat: { fr: "8 buts + 3 passes D. — à égalité avec Messi pour le Soulier d'Or", it: "8 gol + 3 assist — a pari con Messi per la Scarpa d'Oro" }, note: { fr: "Motivation maximale, dernier match pour dépasser Messi.", it: "Motivazione massima, ultima gara per superare Messi." } },
      { team: "🇫🇷", name: "Ousmane Dembélé", pos: { fr: "Ailier", it: "Ala" }, stat: { fr: "5 buts sur le tournoi", it: "5 gol nel torneo" }, note: { fr: "Percussion et déséquilibre côté droit.", it: "Strappi e superiorità sulla destra." } },
      { team: "🇫🇷", name: "Ibrahima Konaté", pos: { fr: "Défenseur central", it: "Difensore centrale" }, stat: { fr: "Patron de l'axe en l'absence de Saliba", it: "Leader del reparto in assenza di Saliba" }, note: { fr: "Doit compenser une charnière remaniée avec Lacroix.", it: "Deve compensare una coppia centrale rimaneggiata con Lacroix." } },
      { team: "🏴", name: "Harry Kane", pos: { fr: "Attaquant / Capitaine", it: "Attaccante / Capitano" }, stat: { fr: "6 buts — en course pour le Soulier d'Or", it: "6 gol — in corsa per la Scarpa d'Oro" }, note: { fr: "Point de fixation, danger sur coups de pied arrêtés.", it: "Riferimento offensivo, pericolo sui calci piazzati." } },
      { team: "🏴", name: "Jude Bellingham", pos: { fr: "Milieu offensif", it: "Trequartista" }, stat: { fr: "6 buts — sous menace de suspension", it: "6 gol — a rischio squalifica" }, note: { fr: "Disponibilité incertaine ; s'il joue, créateur n°1.", it: "Disponibilità incerta; se gioca, è il creatore n°1." } },
      { team: "🏴", name: "Jordan Pickford", pos: { fr: "Gardien", it: "Portiere" }, stat: { fr: "Rempart habituel des Three Lions", it: "Baluardo abituale dei Three Lions" }, note: { fr: "Devra être décisif face à la vitesse française.", it: "Dovrà essere decisivo contro la velocità francese." } }
    ],

    matchInfo: {
      h2h: { fr: "33ᵉ confrontation. Bilan historique : Angleterre 17 victoires, France 10, 5 nuls. Mais la France est invaincue en match officiel contre l'Angleterre depuis 1982 (dont 2-1 en quart de finale du Mondial 2022).", it: "33° confronto. Bilancio storico: Inghilterra 17 vittorie, Francia 10, 5 pareggi. Ma la Francia è imbattuta in gare ufficiali contro l'Inghilterra dal 1982 (incluso il 2-1 ai quarti del Mondiale 2022)." },
      referee: { fr: "Jesús Valenzuela (Venezuela), 42 ans. Réputé strict : ≈ 4,9 cartons jaunes/match, 0,10 rouge/match, 38 penalties sur 108 matchs. Tendance cartons = marché « nombre de cartons » potentiellement intéressant.", it: "Jesús Valenzuela (Venezuela), 42 anni. Noto per il rigore: ≈ 4,9 gialli/partita, 0,10 rossi/partita, 38 rigori su 108 gare. Tendenza cartellini = mercato « numero di cartellini » potenzialmente interessante." },
      stake: { fr: "Match pour la 3ᵉ place (« bronze final ») : enjeu de prestige et de primes, mais pas de titre. Enjeu individuel fort pour Mbappé et Kane (Soulier d'Or).", it: "Finale per il 3° posto (« bronze final »): posta di prestigio e premi, ma nessun titolo. Forte posta individuale per Mbappé e Kane (Scarpa d'Oro)." },
      external: { fr: "Miami en juillet : chaleur et forte humidité, facteur de fatigue en seconde période, tempo souvent plus bas.", it: "Miami a luglio: caldo e forte umidità, fattore di stanchezza nella ripresa, ritmo spesso più basso." },
      supercomputer: { fr: "Le supercalculateur Opta donne la France gagnante dans 50,7% de ses simulations d'avant-match.", it: "Il supercomputer Opta dà la Francia vincente nel 50,7% delle simulazioni pre-partita." }
    },

    sources: [
      { label: "Al Jazeera — preview 3ᵉ place", url: "https://www.aljazeera.com/sports/2026/7/17/france-england-fifa-world-cup-third-place-playoff-predictions-kickoff" },
      { label: "RotoWire — lineups & team news", url: "https://www.rotowire.com/soccer/article/france-vs-england-preview-predicted-lineups-team-news-tactical-analysis-2026-world-cup-third-place-playoff-123027" },
      { label: "xGscore — preview & xG", url: "https://xgscore.io/world-cup/france-england/preview" },
      { label: "oddschecker — cotes du match", url: "https://www.oddschecker.com/football/world-cup/france-v-england/winner" }
    ]
  }
];

/* =========================================================
   TICKETS VÉRIFIÉS (analyses de combinés faites via Cowork)
   Pour ajouter un ticket : copie un bloc dans TICKETS.
   ========================================================= */
const TICKETS = [];
