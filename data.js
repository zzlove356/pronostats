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
    id: "espagne-argentine-2026-07-19",
    competition: { fr: "Coupe du Monde 2026 — FINALE", it: "Mondiali 2026 — FINALE" },
    date: { fr: "Dimanche 19 juillet 2026", it: "Domenica 19 luglio 2026" },
    kickoff: { fr: "21:00 (heure de Paris)", it: "21:00 (ora italiana)" },
    venue: "MetLife Stadium, East Rutherford, New Jersey (USA)",
    home: { name: { fr: "Espagne", it: "Spagna" }, flag: "🇪🇸" },
    away: { name: { fr: "Argentine", it: "Argentina" }, flag: "🇦🇷" },

    odds: {
      market: { fr: "Résultat du match (1N2, 90 min)", it: "Esito finale (1X2, 90 min)" },
      source: "oddschecker.com",
      checkedAt: "18/07/2026",
      aiProb: { home: 50, draw: 27, away: 23 },
      best: {
        home: { dec: 2.35, frac: "27/20", book: "meilleure cote du comparateur oddschecker" },
        draw: { dec: 3.20, frac: "11/5", book: "meilleure cote du comparateur oddschecker" },
        away: { dec: 3.80, frac: "14/5", book: "meilleure cote du comparateur oddschecker" }
      }
    },

    safeBet: {
      sel: { fr: "Espagne remboursé si match nul (Draw No Bet)", it: "Spagna rimborso se pareggio (Draw No Bet)" },
      dec: 1.57, frac: "4/7", book: "top des bookmakers (oddschecker)", ai: 68,
      why: {
        fr: "Le pari safe pour un combiné : l'Espagne n'a qu'à ne pas perdre en 90 min, et le nul est remboursé. Elle a la meilleure défense du tournoi (1 seul but encaissé en 7 matchs, clean sheet contre la France) et reste invaincue en 5 matchs sous l'arbitre Vinčić.",
        it: "La scommessa sicura per una multipla: alla Spagna basta non perdere nei 90 minuti, e il pareggio è rimborsato. Ha la miglior difesa del torneo (1 solo gol subito in 7 gare, clean sheet contro la Francia) ed è imbattuta in 5 partite con l'arbitro Vinčić."
      }
    },
    simpleBet: {
      sel: { fr: "Victoire Espagne (temps réglementaire)", it: "Vittoria Spagna (tempi regolamentari)" },
      dec: 2.35, frac: "27/20", book: "meilleure cote du comparateur oddschecker", ai: 50,
      why: {
        fr: "Le pari value : l'Espagne est favorite logique (AI 50%) et la cote de 2.35 est généreuse (cote juste ~2.00, soit +17,5% de valeur). Sa maîtrise et sa défense de fer face à une Argentine dépendante de Messi justifient le pari. À noter : c'est le résultat sur 90 min — en cas de prolongation, « Espagne soulève le trophée » (1.70) est l'alternative plus sûre.",
        it: "La scommessa value: la Spagna è favorita logica (AI 50%) e la quota 2.35 è generosa (quota equa ~2.00, cioè +17,5% di valore). Il suo controllo e la difesa di ferro contro un'Argentina dipendente da Messi giustificano la scommessa. Nota: è l'esito sui 90 min — in caso di supplementari, « Spagna alza il trofeo » (1.70) è l'alternativa più sicura."
      }
    },

    markets: [
      {
        category: { fr: "Résultat, remboursé si nul & vainqueur final", it: "Esito, rimborso se pareggio & vincitore finale" },
        rows: [
          { sel: { fr: "Espagne (1)", it: "Spagna (1)" }, dec: 2.35, frac: "27/20", ai: "50%" },
          { sel: { fr: "Match nul (N)", it: "Pareggio (X)" }, dec: 3.20, frac: "11/5", ai: "27%" },
          { sel: { fr: "Argentine (2)", it: "Argentina (2)" }, dec: 3.80, frac: "14/5", ai: "23%" },
          { sel: { fr: "Espagne remboursé si nul (Draw No Bet)", it: "Spagna rimborso se pareggio (DNB)" }, dec: 1.57, frac: "4/7", ai: "~68%" },
          { sel: { fr: "Argentine remboursé si nul (Draw No Bet)", it: "Argentina rimborso se pareggio (DNB)" }, dec: 2.40, frac: "7/5", ai: "~32%" },
          { sel: { fr: "Espagne championne du monde (prolong./tab incluses)", it: "Spagna campione del mondo (suppl./rigori inclusi)" }, dec: 1.70, frac: "7/10" },
          { sel: { fr: "Argentine championne du monde (prolong./tab incluses)", it: "Argentina campione del mondo (suppl./rigori inclusi)" }, dec: 2.40, frac: "7/5" }
        ]
      },
      {
        category: { fr: "Mi-temps / fin de match", it: "Primo tempo / finale" },
        rows: [
          { sel: { fr: "Espagne / Espagne", it: "Spagna / Spagna" }, dec: 3.75, frac: "11/4" },
          { sel: { fr: "Nul / Espagne", it: "Pareggio / Spagna" }, dec: 5.75, frac: "19/4" },
          { sel: { fr: "Nul / Nul", it: "Pareggio / Pareggio" }, dec: 4.75, frac: "15/4" },
          { sel: { fr: "Argentine / Argentine", it: "Argentina / Argentina" }, dec: 6.00, frac: "5/1" },
          { sel: { fr: "Nul / Argentine", it: "Pareggio / Argentina" }, dec: 8.00, frac: "7/1" }
        ]
      },
      {
        category: { fr: "Buteurs (à tout moment)", it: "Marcatori (in qualsiasi momento)" },
        rows: [
          { sel: "Lionel Messi", dec: 2.75, frac: "7/4", ai: "57%" },
          { sel: "Mikel Oyarzabal", dec: 2.90, frac: "19/10", ai: "47%" },
          { sel: "Borja Iglesias", dec: 3.40, frac: "12/5", ai: "38%" },
          { sel: "Ferran Torres", dec: 3.60, frac: "13/5" },
          { sel: "Lamine Yamal", dec: 3.80, frac: "14/5" },
          { sel: "Julián Álvarez", dec: 4.50, frac: "7/2" },
          { sel: "Lautaro Martínez", dec: 4.60, frac: "18/5" },
          { sel: "Nico Williams", dec: 4.60, frac: "18/5" },
          { sel: "Mikel Merino", dec: 5.00, frac: "4/1" },
          { sel: "Dani Olmo", dec: 5.75, frac: "19/4" }
        ]
      },
      {
        category: { fr: "Passeurs & divers", it: "Assist & varie" },
        rows: [
          { sel: { fr: "Lionel Messi — passe décisive (Over 0,5)", it: "Lionel Messi — assist (Over 0,5)" }, dec: 4.50, frac: "7/2", ai: "35%" },
          { sel: { fr: "Bet Builder — Messi buteur & Oyarzabal buteur & +1,5 but Argentine & Messi passeur (bet365)", it: "Bet Builder — Messi marcatore & Oyarzabal marcatore & +1,5 gol Argentina & Messi assist (bet365)" }, dec: 34.0, frac: "33/1" },
          { sel: { fr: "Autres marchés : score exact, over/under, corners, cartons, handicaps — voir oddschecker", it: "Altri mercati: risultato esatto, over/under, corner, cartellini, handicap — vedi oddschecker" }, dec: null, frac: "voir oddschecker" }
        ]
      }
    ],

    valueBets: [
      { label: { fr: "Victoire Espagne (1N2, 90 min)", it: "Vittoria Spagna (1X2, 90 min)" }, dec: 2.35, ai: 50,
        note: { fr: "Favorite logique avec la meilleure défense du tournoi ; cote généreuse à 2.35 pour une proba de 50%.", it: "Favorita logica con la miglior difesa del torneo; quota generosa a 2.35 per una probabilità del 50%." } },
      { label: { fr: "Espagne remboursé si nul (Draw No Bet)", it: "Spagna rimborso se pareggio (DNB)" }, dec: 1.57, ai: 68,
        note: { fr: "Version plus sûre : l'Espagne ne perd pas en 90 min, le nul est remboursé. Idéal en combiné.", it: "Versione più sicura: la Spagna non perde nei 90 min, il pareggio è rimborsato. Ideale in multipla." } },
      { label: { fr: "Lionel Messi buteur à tout moment", it: "Lionel Messi marcatore in qualsiasi momento" }, dec: 2.75, ai: 57,
        note: { fr: "⚠ L'AI d'oddschecker flaire une grosse valeur, MAIS le marché est bien plus prudent (proba implicite ~36%) et l'Espagne n'a encaissé qu'1 but en 7 matchs. À jouer avec prudence, la défense espagnole est le vrai risque.", it: "⚠ L'AI di oddschecker fiuta un grande valore, MA il mercato è molto più prudente (prob. implicita ~36%) e la Spagna ha subito solo 1 gol in 7 gare. Da giocare con prudenza, la difesa spagnola è il vero rischio." } }
    ],

    prediction: {
      pick: { fr: "Victoire Espagne", it: "Vittoria Spagna" },
      pickShort: "Espagne",
      score: "1 – 0",
      goals: { fr: "Match plutôt fermé, Under 2,5 buts plausible", it: "Gara piuttosto chiusa, Under 2,5 gol plausibile" },
      confidence: "moyen",
      value: true,
      summary: {
        fr: "L'Espagne part favorite logique (AI 50%) avec la meilleure défense du tournoi : 1 seul but encaissé en 7 matchs, dont un clean sheet contre la France, l'attaque la plus puissante de la compétition. La cote de 2.35 offre de la valeur (cote juste ~2.00). Mais une finale reste à variance élevée : l'Argentine est tenante du titre, spécialiste des remontées et des scénarios de prolongation, avec Messi (8 buts, 4 passes) en facteur X. D'où une confiance « moyenne » et un pari safe (Draw No Bet 1.57) pour sécuriser un combiné.",
        it: "La Spagna parte favorita logica (AI 50%) con la miglior difesa del torneo: 1 solo gol subito in 7 gare, incluso un clean sheet contro la Francia, l'attacco più potente della competizione. La quota 2.35 offre valore (quota equa ~2.00). Ma una finale resta ad alta varianza: l'Argentina è campione in carica, specialista di rimonte e scenari da supplementari, con Messi (8 gol, 4 assist) come fattore X. Da qui la fiducia « media » e una scommessa sicura (Draw No Bet 1.57) per blindare una multipla."
      },
      basedOn: {
        fr: [
          "Meilleure défense du tournoi : 1 seul but encaissé en 7 matchs (clean sheet contre la France)",
          "Valeur mathématique : cote 2.35 > cote juste 2.00 issue de l'AI Probability (50%)",
          "Espagne invaincue en 5 matchs sous l'arbitre Slavko Vinčić",
          "Maîtrise et possession supérieures (Rodri, Fabián Ruiz, Dani Olmo au milieu)",
          "Argentine très dépendante de Messi face à une défense qui a muselé Mbappé et la France"
        ],
        it: [
          "Miglior difesa del torneo: 1 solo gol subito in 7 gare (clean sheet contro la Francia)",
          "Valore matematico: quota 2.35 > quota equa 2.00 dall'AI Probability (50%)",
          "Spagna imbattuta in 5 partite con l'arbitro Slavko Vinčić",
          "Maggiore controllo e possesso (Rodri, Fabián Ruiz, Dani Olmo a centrocampo)",
          "Argentina molto dipendente da Messi contro una difesa che ha imbrigliato Mbappé e la Francia"
        ]
      },
      against: {
        fr: [
          "Une finale = enjeu maximal et variance élevée, matchs souvent fermés et décidés sur un détail",
          "Argentine tenante du titre, habituée des remontées et des scénarios de prolongation / tirs au but",
          "Messi facteur X (8 buts, 4 passes) capable de débloquer n'importe quel match",
          "Emiliano Martínez, spécialiste des séances de tirs au but"
        ],
        it: [
          "Una finale = posta massima e varianza elevata, gare spesso chiuse e decise da un dettaglio",
          "Argentina campione in carica, abituata a rimonte e scenari da supplementari / rigori",
          "Messi fattore X (8 gol, 4 assist) capace di sbloccare qualsiasi partita",
          "Emiliano Martínez, specialista delle sequenze di rigori"
        ]
      }
    },

    teams: {
      home: {
        name: { fr: "Espagne", it: "Spagna" }, flag: "🇪🇸", coach: "Luis de la Fuente",
        lineup: "Simón — Porro, Cubarsí, Laporte, Cucurella — Rodri, Fabián Ruiz, Dani Olmo — Yamal, Oyarzabal, Baena (4-3-3)",
        style: { fr: "Possession, pressing haut, contrôle du milieu ; défense la plus solide du tournoi. Yamal en différence sur le côté droit.", it: "Possesso, pressing alto, controllo del centrocampo; difesa più solida del torneo. Yamal a fare la differenza sulla destra." },
        absences: {
          fr: ["Groupe considéré au complet à l'approche de la finale", "Rotation minimale attendue pour une finale"],
          it: ["Rosa considerata al completo verso la finale", "Turnover minimo atteso per una finale"]
        },
        physical: { fr: "Parcours maîtrisé, peu de temps fort défensif à gérer (1 but encaissé). Fraîcheur correcte pour une finale.", it: "Percorso gestito, poche difficoltà difensive (1 gol subito). Buona freschezza per una finale." },
        form: { fr: "7 matchs, 1 seul but encaissé, victoire 2-0 en demie contre la France (meilleure attaque du tournoi muselée).", it: "7 gare, 1 solo gol subito, vittoria 2-0 in semifinale contro la Francia (miglior attacco del torneo neutralizzato)." },
        xg: { fr: "Défense d'élite (xG concédé le plus bas du tournoi) ; attaque efficace via Yamal/Oyarzabal.", it: "Difesa d'élite (xG concesso più basso del torneo); attacco efficace tramite Yamal/Oyarzabal." },
        context: { fr: "De la Fuente s'appuie sur un bloc rodé ; l'Espagne vise un 2ᵉ titre mondial (après 2010).", it: "De la Fuente si affida a un blocco collaudato; la Spagna punta al 2° titolo mondiale (dopo il 2010)." },
        source: "RotoWire / Forbes / CBS Sports (18/07/2026)"
      },
      away: {
        name: { fr: "Argentine", it: "Argentina" }, flag: "🇦🇷", coach: "Lionel Scaloni",
        lineup: "E. Martínez — Molina, Romero, Otamendi, Tagliafico — Paredes, Enzo Fernández, Mac Allister — Simeone, J. Álvarez, Messi (4-3-3)",
        style: { fr: "Bloc compact, transitions et coups de génie de Messi ; spécialiste des fins de match et des scénarios de prolongation.", it: "Blocco compatto, transizioni e giocate di Messi; specialista dei finali di gara e degli scenari da supplementari." },
        absences: {
          fr: ["Groupe des 26 déclaré pleinement disponible (Romero et Paredes remis de crampes)", "De Paul hors du onze projeté, Paredes titularisé"],
          it: ["Rosa dei 26 dichiarata pienamente disponibile (Romero e Paredes recuperati dai crampi)", "De Paul fuori dall'undici previsto, Paredes titolare"]
        },
        physical: { fr: "Tenante du titre au vécu énorme ; capacité à tenir 120 minutes et à gérer les tirs au but.", it: "Campione in carica con enorme esperienza; capacità di reggere 120 minuti e gestire i rigori." },
        form: { fr: "Parcours de battante, victoire 2-1 en demie contre l'Angleterre. Messi porte l'équipe (8 buts, 4 passes).", it: "Percorso da combattente, vittoria 2-1 in semifinale contro l'Inghilterra. Messi trascina la squadra (8 gol, 4 assist)." },
        xg: { fr: "Production offensive concentrée autour de Messi/Álvarez ; efficacité clinique dans les moments clés.", it: "Produzione offensiva incentrata su Messi/Álvarez; efficacia clinica nei momenti chiave." },
        context: { fr: "L'Argentine défend son titre de 2022 ; dernière grande finale probable pour Messi.", it: "L'Argentina difende il titolo del 2022; probabile ultima grande finale per Messi." },
        source: "RotoWire / Yahoo Sports (18/07/2026)"
      }
    },

    keyPlayers: [
      { team: "🇪🇸", name: "Lamine Yamal", pos: { fr: "Ailier", it: "Ala" }, stat: { fr: "Différence sur le côté droit, créateur n°1", it: "Fa la differenza sulla destra, creatore n°1" }, note: { fr: "L'arme offensive majeure de l'Espagne.", it: "L'arma offensiva principale della Spagna." } },
      { team: "🇪🇸", name: "Rodri", pos: { fr: "Milieu défensif", it: "Mediano" }, stat: { fr: "Métronome, base de la maîtrise espagnole", it: "Metronomo, base del controllo spagnolo" }, note: { fr: "Contrôle le tempo et protège la défense.", it: "Controlla il ritmo e protegge la difesa." } },
      { team: "🇪🇸", name: "Unai Simón", pos: { fr: "Gardien", it: "Portiere" }, stat: { fr: "1 but encaissé sur le tournoi", it: "1 gol subito nel torneo" }, note: { fr: "Pilier de la meilleure défense de la compétition.", it: "Pilastro della miglior difesa della competizione." } },
      { team: "🇦🇷", name: "Lionel Messi", pos: { fr: "Attaquant", it: "Attaccante" }, stat: { fr: "8 buts + 4 passes D. — course au Soulier d'Or", it: "8 gol + 4 assist — corsa alla Scarpa d'Oro" }, note: { fr: "Facteur X capable de tout faire basculer.", it: "Fattore X capace di ribaltare tutto." } },
      { team: "🇦🇷", name: "Julián Álvarez", pos: { fr: "Attaquant", it: "Attaccante" }, stat: { fr: "Point d'appui et finisseur", it: "Riferimento e finalizzatore" }, note: { fr: "Complément idéal de Messi devant.", it: "Complemento ideale di Messi in attacco." } },
      { team: "🇦🇷", name: "Emiliano Martínez", pos: { fr: "Gardien", it: "Portiere" }, stat: { fr: "Spécialiste des tirs au but", it: "Specialista dei rigori" }, note: { fr: "Décisif si la finale va jusqu'aux tirs au but.", it: "Decisivo se la finale arriva ai rigori." } }
    ],

    matchInfo: {
      h2h: { fr: "Affiche inédite en finale de Coupe du Monde entre l'Espagne (championne 2010) et l'Argentine (tenante du titre 2022). Les deux nations ne se rencontrent que rarement en match officiel.", it: "Sfida inedita in una finale dei Mondiali tra Spagna (campione 2010) e Argentina (campione in carica 2022). Le due nazionali si affrontano solo raramente in gare ufficiali." },
      referee: { fr: "Slavko Vinčić (Slovénie) — premier Slovène à arbitrer une finale de Coupe du Monde. Très expérimenté (50 matchs de Ligue des Champions). L'Espagne est invaincue lors de ses 5 matchs sous sa direction (dont 2-1 vs France à l'Euro 2024).", it: "Slavko Vinčić (Slovenia) — primo sloveno ad arbitrare una finale dei Mondiali. Molto esperto (50 gare di Champions League). La Spagna è imbattuta nelle sue 5 partite con lui (incluso il 2-1 vs Francia a Euro 2024)." },
      stake: { fr: "Finale de Coupe du Monde : le titre mondial. L'Espagne vise un 2ᵉ sacre, l'Argentine défend sa couronne de 2022. Enjeu maximal, probable dernière grande finale de Messi.", it: "Finale dei Mondiali: il titolo mondiale. La Spagna punta al 2° trionfo, l'Argentina difende la corona del 2022. Posta massima, probabile ultima grande finale di Messi." },
      external: { fr: "MetLife Stadium (New Jersey), chaleur et humidité de juillet possibles. Une finale se joue souvent sur la tension et les détails, avec un scénario fermé fréquent.", it: "MetLife Stadium (New Jersey), possibile caldo e umidità di luglio. Una finale si gioca spesso sulla tensione e sui dettagli, con uno scenario chiuso frequente." },
      supercomputer: { fr: "Les bookmakers font de l'Espagne une favorite légère (AI 50% vs 23% pour l'Argentine, 27% de nul).", it: "I bookmaker rendono la Spagna una favorita leggera (AI 50% vs 23% per l'Argentina, 27% di pareggio)." }
    },

    sources: [
      { label: "Squawka — prédiction finale", url: "https://www.squawka.com/us/news/world-cup/world-cup-2026-final-predictions/" },
      { label: "Yahoo Sports — preview finale", url: "https://sports.yahoo.com/soccer/article/world-cup-final-early-preview-argentinas-comebacks-meet-spains-impenetrable-defense-214251519.html" },
      { label: "RotoWire — lineups & team news", url: "https://www.rotowire.com/soccer/article/spain-vs-argentina-preview-predicted-lineups-team-news-tactical-analysis-2026-world-cup-final-123191" },
      { label: "ESPN — arbitre Vinčić", url: "https://www.espn.com/soccer/story/_/id/49382615/who-slavko-vincic-spain-vs-argentina-referee-world-cup-final-real-madrid-jose-mourinho-jude-bellingham" },
      { label: "oddschecker — cotes du match", url: "https://www.oddschecker.com/football/world-cup/spain-v-argentina/winner" }
    ]
  },
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
