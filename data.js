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
    id: "sturm-graz-hearts-2026-07-21",
    competition: { fr: "Ligue des Champions — 2ᵉ tour de qualification (aller)", it: "Champions League — 2° turno di qualificazione (andata)" },
    date: { fr: "Mardi 21 juillet 2026", it: "Martedì 21 luglio 2026" },
    kickoff: { fr: "20:30 (heure de Paris)", it: "20:30 (ora italiana)" },
    venue: "Merkur Arena (Liebenauer Stadion), Graz (Autriche)",
    home: { name: { fr: "Sturm Graz", it: "Sturm Graz" }, flag: "⚫" },
    away: { name: { fr: "Hearts", it: "Hearts" }, flag: "🟣" },

    odds: {
      market: { fr: "Résultat du match (1N2)", it: "Esito finale (1X2)" },
      source: "oddschecker.com",
      checkedAt: "20/07/2026",
      aiProb: { home: 53, draw: 25, away: 22 },
      best: {
        home: { dec: 1.80, frac: "4/5", book: "meilleure cote du comparateur oddschecker" },
        draw: { dec: 3.90, frac: "29/10", book: "meilleure cote du comparateur oddschecker" },
        away: { dec: 4.60, frac: "18/5", book: "meilleure cote du comparateur oddschecker" }
      }
    },

    safeBet: {
      sel: { fr: "Hearts marque moins de 1,5 but", it: "Hearts segna meno di 1,5 gol" },
      dec: 1.36, frac: "4/11", book: "top des bookmakers (oddschecker)", ai: 76,
      why: {
        fr: "Choisi parmi les 25 marchés de la page, pas un DNB. C'est un match ALLER : l'équipe qui se déplace gère généralement, et Hearts vient jouer en Autriche avec le retour à Tynecastle le 28 juillet en tête. Sturm Graz sort d'un 2-0 à domicile contre le Rapid Vienne et le marché ne donne Hearts qu'à 1.50 pour simplement marquer, contre 3.25 pour inscrire 2 buts ou plus. Qu'Hearts reste à 0 ou 1 but est donc nettement le scénario le plus probable (~76% selon mon estimation) pour une cote de 1.36, dans ta fourchette safe.",
        it: "Scelto tra i 25 mercati della pagina, non un DNB. È una gara d'ANDATA: chi gioca fuori casa gestisce, e l'Hearts arriva in Austria pensando al ritorno a Tynecastle il 28 luglio. Lo Sturm Graz viene da un 2-0 casalingo col Rapid Vienna e il mercato dà l'Hearts a solo 1.50 per segnare, contro 3.25 per farne 2 o più. Che l'Hearts resti a 0 o 1 gol è quindi lo scenario più probabile (~76% secondo la mia stima) per una quota di 1.36, nella tua fascia sicura."
      }
    },
    simpleBet: {
      sel: { fr: "Sturm Graz marque plus de 1,5 but", it: "Sturm Graz segna più di 1,5 gol" },
      dec: 1.75, frac: "3/4", book: "top des bookmakers (oddschecker)", ai: 60,
      why: {
        fr: "Sturm Graz reçoit à l'aller et a besoin d'un matelas avant le déplacement à Édimbourg. Le marché le donne à 1.15 pour marquer au moins un but (≈87%) : la question n'est pas s'il marque, mais combien. Il sort d'un 2-0 contre le Rapid Vienne et affiche 67% de victoires sur les 30 derniers jours. J'estime la probabilité de 2 buts ou plus autour de 60% pour une cote de 1.75 (57% implicite) → environ +5% de valeur. ⚠ Pas d'AI Probability ici : c'est MON estimation.",
        it: "Lo Sturm Graz gioca in casa all'andata e ha bisogno di un margine prima della trasferta di Edimburgo. Il mercato lo dà a 1.15 per segnare almeno un gol (≈87%): la domanda non è se segna, ma quanto. Viene da un 2-0 col Rapid Vienna e ha il 67% di vittorie negli ultimi 30 giorni. Stimo la probabilità di 2+ gol intorno al 60% per una quota di 1.75 (57% implicito) → circa +5% di valore. ⚠ Nessuna AI Probability qui: è una MIA stima."
      }
    },

    markets: [
      {
        category: { fr: "Buts par équipe (le cœur de l'analyse)", it: "Gol per squadra (il cuore dell'analisi)" },
        note: { fr: "Sturm est à 1.15 pour marquer, Hearts à seulement 1.50 : l'écart de production attendue est le socle des deux paris retenus.", it: "Lo Sturm è a 1.15 per segnare, l'Hearts solo a 1.50: il divario di produzione attesa è la base delle due scommesse scelte." },
        rows: [
          { sel: { fr: "Sturm Graz marque (plus de 0,5 but)", it: "Segna lo Sturm Graz (oltre 0,5 gol)" }, dec: 1.15, frac: "2/13" },
          { sel: { fr: "Sturm Graz plus de 1,5 but (2+)", it: "Sturm Graz oltre 1,5 gol (2+)" }, dec: 1.75, frac: "3/4" },
          { sel: { fr: "Sturm Graz plus de 2,5 buts (3+)", it: "Sturm Graz oltre 2,5 gol (3+)" }, dec: 3.50, frac: "5/2" },
          { sel: { fr: "Hearts marque (plus de 0,5 but)", it: "Segna l'Hearts (oltre 0,5 gol)" }, dec: 1.50, frac: "1/2" },
          { sel: { fr: "Hearts moins de 1,5 but", it: "Hearts meno di 1,5 gol" }, dec: 1.36, frac: "4/11" },
          { sel: { fr: "Hearts ne marque pas", it: "L'Hearts non segna" }, dec: 2.75, frac: "7/4" },
          { sel: { fr: "Les deux équipes marquent — Oui", it: "Entrambe segnano — Sì" }, dec: 1.73, frac: "8/11" },
          { sel: { fr: "Les deux équipes marquent — Non", it: "Entrambe segnano — No" }, dec: 2.20, frac: "6/5" }
        ]
      },
      {
        category: { fr: "Résultat, qualification & remboursé si nul", it: "Esito, qualificazione & rimborso se pareggio" },
        note: { fr: "Le marché « se qualifier » (sur les deux matchs) est quasiment à 50/50 : Sturm 1.91, Hearts 2.10. Le tie est bien plus équilibré que le 1N2 de l'aller ne le laisse croire.", it: "Il mercato « qualificazione » (sui due incontri) è quasi 50/50: Sturm 1.91, Hearts 2.10. Il confronto è molto più equilibrato di quanto suggerisca l'1X2 dell'andata." },
        rows: [
          { sel: { fr: "Sturm Graz (1)", it: "Sturm Graz (1)" }, dec: 1.80, frac: "4/5" },
          { sel: { fr: "Match nul (N)", it: "Pareggio (X)" }, dec: 3.90, frac: "29/10" },
          { sel: { fr: "Hearts (2)", it: "Hearts (2)" }, dec: 4.60, frac: "18/5" },
          { sel: { fr: "Sturm Graz se qualifie (sur 2 matchs)", it: "Sturm Graz si qualifica (sui 2 incontri)" }, dec: 1.91, frac: "10/11" },
          { sel: { fr: "Hearts se qualifie (sur 2 matchs)", it: "Hearts si qualifica (sui 2 incontri)" }, dec: 2.10, frac: "11/10" },
          { sel: { fr: "Sturm Graz remboursé si nul (Draw No Bet)", it: "Sturm Graz rimborso se pareggio (DNB)" }, dec: 1.33, frac: "1/3" },
          { sel: { fr: "Hearts remboursé si nul (Draw No Bet)", it: "Hearts rimborso se pareggio (DNB)" }, dec: 3.50, frac: "5/2" }
        ]
      },
      {
        category: { fr: "Nombre de buts & score exact", it: "Numero di gol & risultato esatto" },
        rows: [
          { sel: { fr: "Total 2 buts exact (le plus probable)", it: "Totale 2 gol esatti (il più probabile)" }, dec: 3.80, frac: "14/5" },
          { sel: { fr: "Total 3 buts exact", it: "Totale 3 gol esatti" }, dec: 4.33, frac: "10/3" },
          { sel: { fr: "Total 4 buts exact", it: "Totale 4 gol esatti" }, dec: 5.50, frac: "9/2" },
          { sel: { fr: "Total 1 but exact", it: "Totale 1 gol esatto" }, dec: 6.00, frac: "5/1" },
          { sel: { fr: "Nul 1-1 (score le plus probable)", it: "Pareggio 1-1 (risultato più probabile)" }, dec: 7.50, frac: "13/2" },
          { sel: { fr: "Sturm Graz 1-0", it: "Sturm Graz 1-0" }, dec: 8.50, frac: "15/2" },
          { sel: { fr: "Sturm Graz 2-1", it: "Sturm Graz 2-1" }, dec: 8.50, frac: "15/2" },
          { sel: { fr: "Sturm Graz 2-0", it: "Sturm Graz 2-0" }, dec: 9.50, frac: "17/2" }
        ]
      },
      {
        category: { fr: "Tirs cadrés (marché fiable pour combiné)", it: "Tiri in porta (mercato affidabile per multipla)" },
        rows: [
          { sel: { fr: "Belmin Beganović — plus de 0,5 tir cadré", it: "Belmin Beganović — oltre 0,5 tiri in porta" }, dec: 1.29, frac: "2/7" },
          { sel: { fr: "Seedy Jatta — plus de 0,5", it: "Seedy Jatta — oltre 0,5" }, dec: 1.30, frac: "3/10" },
          { sel: { fr: "Otar Kiteishvili — plus de 0,5", it: "Otar Kiteishvili — oltre 0,5" }, dec: 1.30, frac: "3/10" },
          { sel: { fr: "Szymon Włodarczyk — plus de 0,5", it: "Szymon Włodarczyk — oltre 0,5" }, dec: 1.36, frac: "4/11" },
          { sel: { fr: "Leon Grgić / Peter Kiedl / Simon Seidl — plus de 0,5", it: "Leon Grgić / Peter Kiedl / Simon Seidl — oltre 0,5" }, dec: 1.40, frac: "2/5" },
          { sel: { fr: "Maurice Malone — plus de 0,5", it: "Maurice Malone — oltre 0,5" }, dec: 1.50, frac: "1/2" }
        ]
      },
      {
        category: { fr: "Buteurs & mi-temps", it: "Marcatori & primo tempo" },
        rows: [
          { sel: "Belmin Beganović — buteur", dec: 2.45, frac: "29/20" },
          { sel: "Amady Camara — buteur", dec: 2.63, frac: "13/8" },
          { sel: "Otar Kiteishvili — buteur", dec: 2.63, frac: "13/8" },
          { sel: "Leon Grgić — buteur", dec: 2.63, frac: "13/8" },
          { sel: "Claudio Braga (Hearts) — buteur", dec: 4.00, frac: "3/1" },
          { sel: { fr: "Résultat mi-temps : Sturm Graz", it: "Esito primo tempo: Sturm Graz" }, dec: 2.38, frac: "11/8" },
          { sel: { fr: "Résultat mi-temps : Nul", it: "Esito primo tempo: Pareggio" }, dec: 2.38, frac: "11/8" },
          { sel: { fr: "Score 1ʳᵉ MT : 0-0", it: "Risultato 1° tempo: 0-0" }, dec: 3.30, frac: "23/10" },
          { sel: { fr: "Sturm gagne & les deux marquent", it: "Vince lo Sturm & entrambe segnano" }, dec: 3.50, frac: "5/2" }
        ]
      }
    ],

    valueBets: [
      { label: { fr: "Sturm Graz plus de 1,5 but", it: "Sturm Graz oltre 1,5 gol" }, dec: 1.75, ai: 60,
        note: { fr: "Sturm à 1.15 pour marquer, sort d'un 2-0 contre le Rapid Vienne, et joue l'aller à domicile où il doit creuser l'écart.", it: "Sturm a 1.15 per segnare, viene da un 2-0 col Rapid Vienna e gioca l'andata in casa dove deve scavare il solco." } },
      { label: { fr: "Hearts moins de 1,5 but", it: "Hearts meno di 1,5 gol" }, dec: 1.36, ai: 76,
        note: { fr: "Match aller à l'extérieur : Hearts n'est qu'à 3.25 pour marquer 2 buts ou plus. La base safe du combiné.", it: "Andata in trasferta: l'Hearts è a 3.25 per segnare 2+ gol. La base sicura della multipla." } },
      { label: { fr: "Les deux équipes marquent — Oui", it: "Entrambe segnano — Sì" }, dec: 1.73, ai: 58,
        note: { fr: "Quasiment à sa juste valeur (Sturm marque à 87%, Hearts à 67%) : à jouer seulement si tu crois à un aller ouvert.", it: "Praticamente al valore equo (Sturm segna all'87%, Hearts al 67%): da giocare solo se credi a un'andata aperta." } }
    ],

    prediction: {
      pick: { fr: "Victoire Sturm Graz", it: "Vittoria Sturm Graz" },
      pickShort: "Sturm Graz",
      score: "2 – 1",
      goals: { fr: "Sturm devrait marquer 2 buts, Hearts limité à 0 ou 1", it: "Lo Sturm dovrebbe segnare 2 gol, l'Hearts limitato a 0 o 1" },
      confidence: "moyen",
      value: true,
      summary: {
        fr: "Premier match de l'histoire entre les deux clubs, et un tie que le marché juge très équilibré sur l'ensemble : Sturm 1.91 pour se qualifier contre 2.10 pour Hearts. Sur l'aller à Graz en revanche, Sturm est logiquement favori (1.80) : il joue à domicile, sort d'un 2-0 contre le Rapid Vienne et affiche 67% de victoires sur les 30 derniers jours. Hearts arrive pourtant avec de vraies références — une victoire récente contre le Rayo Vallecano — et le même taux de 67% sur la période. Les deux jouent en 4-3-3, la bataille du milieu décidera du tempo. Ma lecture : le résultat sec à 1.80 n'offre pas de marge suffisante ; la valeur est dans la répartition des buts, avec un Sturm qui doit se créer un matelas avant Tynecastle et un Hearts qui gère son déplacement.",
        it: "Prima gara nella storia tra i due club, e un confronto che il mercato giudica molto equilibrato: Sturm 1.91 per qualificarsi contro 2.10 dell'Hearts. Sull'andata a Graz però lo Sturm è logicamente favorito (1.80): gioca in casa, viene da un 2-0 col Rapid Vienna e ha il 67% di vittorie negli ultimi 30 giorni. L'Hearts arriva però con referenze vere — una recente vittoria sul Rayo Vallecano — e la stessa percentuale del 67%. Entrambe giocano col 4-3-3, la battaglia a centrocampo deciderà il ritmo. La mia lettura: l'esito secco a 1.80 non offre margine sufficiente; il valore è nella distribuzione dei gol, con uno Sturm che deve costruirsi un margine prima di Tynecastle e un Hearts che gestisce la trasferta."
      },
      basedOn: {
        fr: [
          "Sturm Graz sort d'un 2-0 à domicile contre le Rapid Vienne (Mamageishvili et Hierländer buteurs)",
          "Sturm est coté 1.15 pour marquer au moins un but, contre 1.50 pour Hearts",
          "Hearts n'est qu'à 3.25 pour inscrire 2 buts ou plus : le marché ne l'attend pas prolifique en déplacement",
          "Match ALLER : l'équipe visiteuse gère traditionnellement, avec le retour à Tynecastle le 28 juillet",
          "Le total le plus probable est 2 buts (3.80), les scores favoris sont 1-1, Sturm 1-0 et Sturm 2-1"
        ],
        it: [
          "Lo Sturm Graz viene da un 2-0 casalingo col Rapid Vienna (in gol Mamageishvili e Hierländer)",
          "Lo Sturm è quotato 1.15 per segnare almeno un gol, contro 1.50 dell'Hearts",
          "L'Hearts è a 3.25 per segnare 2+ gol: il mercato non lo attende prolifico in trasferta",
          "Gara d'ANDATA: chi gioca fuori tradizionalmente gestisce, col ritorno a Tynecastle il 28 luglio",
          "Il totale più probabile è 2 gol (3.80), i risultati favoriti sono 1-1, Sturm 1-0 e Sturm 2-1"
        ]
      },
      against: {
        fr: [
          "Le marché « qualification » est quasiment à 50/50 (1.91 vs 2.10) : Hearts est loin d'être un faire-valoir",
          "Hearts vient de battre le Rayo Vallecano, un signal de forme réel avant de venir en Autriche",
          "Les deux équipes affichent le même taux de 67% de victoires sur les 30 derniers jours",
          "Première confrontation de l'histoire : aucun historique direct pour s'appuyer",
          "Aucune AI Probability sur ce match : toutes les probabilités sont mes estimations",
          "Aucun arbitre annoncé et aucune info blessures fiable trouvée à l'heure de l'analyse"
        ],
        it: [
          "Il mercato « qualificazione » è quasi 50/50 (1.91 vs 2.10): l'Hearts non è una comparsa",
          "L'Hearts ha appena battuto il Rayo Vallecano, segnale di forma reale prima dell'Austria",
          "Entrambe hanno la stessa percentuale del 67% di vittorie negli ultimi 30 giorni",
          "Prima sfida della storia: nessun precedente diretto su cui appoggiarsi",
          "Nessuna AI Probability su questa gara: tutte le probabilità sono mie stime",
          "Nessun arbitro annunciato e nessuna info affidabile sugli infortuni al momento dell'analisi"
        ]
      }
    },

    teams: {
      home: {
        name: { fr: "Sturm Graz", it: "Sturm Graz" }, flag: "⚫", coach: "—",
        lineup: { fr: "Dispositif en 4-3-3 (composition détaillée non publiée à l'heure de l'analyse).", it: "Modulo 4-3-3 (formazione dettagliata non pubblicata al momento dell'analisi)." },
        style: { fr: "4-3-3, équipe qui marque beaucoup à domicile : cotée 1.15 pour trouver la faille. Beganović, Kiteishvili et Jatta sont les plus sollicités au tir (tous sous 1.30 pour cadrer).", it: "4-3-3, squadra che segna molto in casa: quotata 1.15 per andare a segno. Beganović, Kiteishvili e Jatta sono i più coinvolti al tiro (tutti sotto 1.30 per centrare la porta)." },
        absences: { fr: ["Aucune information de blessure ou suspension publiée à l'heure de l'analyse"], it: ["Nessuna informazione su infortuni o squalifiche pubblicata al momento dell'analisi"] },
        physical: { fr: "Début de saison européenne, effectif frais. Match à domicile, pas de déplacement.", it: "Inizio di stagione europea, rosa fresca. Gara in casa, nessuna trasferta." },
        form: { fr: "67% de victoires sur les 30 derniers jours. Dernière sortie : victoire 2-0 à domicile contre le Rapid Vienne (Mamageishvili, Hierländer).", it: "67% di vittorie negli ultimi 30 giorni. Ultima uscita: vittoria 2-0 in casa col Rapid Vienna (Mamageishvili, Hierländer)." },
        xg: { fr: "Pas de données xG publiées, mais le marché est clair : 1.15 pour marquer, 1.75 pour inscrire 2 buts ou plus.", it: "Nessun dato xG pubblicato, ma il mercato è chiaro: 1.15 per segnare, 1.75 per 2+ gol." },
        context: { fr: "Aller à domicile : Sturm doit se construire une avance avant le déplacement à Édimbourg le 28 juillet.", it: "Andata in casa: lo Sturm deve costruirsi un vantaggio prima della trasferta di Edimburgo del 28 luglio." },
        source: "Tips.GG / Sportskeeda / SportsGambler (21/07/2026)"
      },
      away: {
        name: { fr: "Hearts", it: "Hearts" }, flag: "🟣", coach: "—",
        lineup: { fr: "Dispositif en 4-3-3 (composition détaillée non publiée à l'heure de l'analyse).", it: "Modulo 4-3-3 (formazione dettagliata non pubblicata al momento dell'analisi)." },
        style: { fr: "4-3-3 également. Lawrence Shankland est le meilleur buteur (5 buts), Claudio Braga (3) et Blair Spittal (2) suivent, Marc Leonard est le principal passeur.", it: "Anche 4-3-3. Lawrence Shankland è il capocannoniere (5 gol), seguono Claudio Braga (3) e Blair Spittal (2), Marc Leonard è il principale assistman." },
        absences: { fr: ["Aucune information de blessure ou suspension publiée à l'heure de l'analyse"], it: ["Nessuna informazione su infortuni o squalifiche pubblicata al momento dell'analisi"] },
        physical: { fr: "Déplacement Édimbourg → Graz en début de saison européenne. Effectif frais mais voyage à absorber.", it: "Trasferta Edimburgo → Graz a inizio stagione europea. Rosa fresca ma viaggio da assorbire." },
        form: { fr: "67% de victoires sur les 30 derniers jours, dont une victoire récente contre le Rayo Vallecano. La saison passée s'est conclue par une défaite 3-1 à Celtic Park qui a coûté le titre écossais.", it: "67% di vittorie negli ultimi 30 giorni, inclusa una recente vittoria sul Rayo Vallecano. La scorsa stagione si è chiusa con un 3-1 al Celtic Park che è costato il titolo scozzese." },
        xg: { fr: "Pas de données xG publiées ; le marché le donne à 1.50 pour marquer et 3.25 pour inscrire 2 buts ou plus.", it: "Nessun dato xG pubblicato; il mercato lo dà a 1.50 per segnare e 3.25 per 2+ gol." },
        context: { fr: "Retour européen ambitieux après avoir manqué le titre écossais de peu : le club vise la phase de groupes.", it: "Ritorno europeo ambizioso dopo aver mancato di poco il titolo scozzese: il club punta alla fase a gironi." },
        source: "Tips.GG / Sportskeeda / SportsGambler (21/07/2026)"
      }
    },

    keyPlayers: [
      { team: "⚫", name: "Belmin Beganović", pos: { fr: "Attaquant", it: "Attaccante" }, stat: { fr: "Le plus court des buteurs (2.45) et 1.29 pour cadrer un tir", it: "Il più quotato tra i marcatori (2.45) e 1.29 per centrare un tiro" }, note: { fr: "La référence offensive de Sturm sur ce match.", it: "Il riferimento offensivo dello Sturm in questa gara." } },
      { team: "⚫", name: "Otar Kiteishvili", pos: { fr: "Meneur de jeu", it: "Trequartista" }, stat: { fr: "Buteur à 2.63, tir cadré à 1.30", it: "Marcatore a 2.63, tiro in porta a 1.30" }, note: { fr: "Créateur en chef, très sollicité au tir.", it: "Creatore principale, molto coinvolto al tiro." } },
      { team: "⚫", name: "Gizo Mamageishvili", pos: { fr: "Milieu", it: "Centrocampista" }, stat: { fr: "Buteur lors du 2-0 contre le Rapid Vienne", it: "In gol nel 2-0 col Rapid Vienna" }, note: { fr: "En confiance après sa dernière sortie.", it: "In fiducia dopo l'ultima uscita." } },
      { team: "🟣", name: "Lawrence Shankland", pos: { fr: "Attaquant", it: "Attaccante" }, stat: { fr: "Meilleur buteur d'Hearts avec 5 buts", it: "Capocannoniere dell'Hearts con 5 gol" }, note: { fr: "La principale menace écossaise ; c'est de lui que dépend le pari « Hearts -1,5 but ».", it: "La principale minaccia scozzese; da lui dipende la scommessa « Hearts -1,5 gol »." } },
      { team: "🟣", name: "Claudio Braga", pos: { fr: "Attaquant", it: "Attaccante" }, stat: { fr: "3 buts, coté 4.00 buteur", it: "3 gol, quotato 4.00 marcatore" }, note: { fr: "Deuxième option offensive de Hearts.", it: "Seconda opzione offensiva dell'Hearts." } },
      { team: "🟣", name: "Marc Leonard", pos: { fr: "Milieu", it: "Centrocampista" }, stat: { fr: "Meilleur passeur sur les 10 derniers matchs (2 passes)", it: "Miglior assistman nelle ultime 10 gare (2 assist)" }, note: { fr: "Le relais créatif dans le 4-3-3 écossais.", it: "Il riferimento creativo nel 4-3-3 scozzese." } }
    ],

    matchInfo: {
      h2h: { fr: "Aucun historique : c'est la toute première confrontation entre Sturm Graz et Hearts. Impossible de s'appuyer sur un précédent, ce qui augmente l'incertitude sur le résultat sec.", it: "Nessun precedente: è il primissimo confronto tra Sturm Graz e Hearts. Impossibile appoggiarsi a uno storico, il che aumenta l'incertezza sull'esito secco." },
      referee: { fr: "Arbitre non communiqué à l'heure de l'analyse ; aucun marché cartons exploitable n'a donc pu être croisé avec une tendance arbitrale.", it: "Arbitro non comunicato al momento dell'analisi; nessun mercato cartellini ha quindi potuto essere incrociato con una tendenza arbitrale." },
      stake: { fr: "2ᵉ tour de qualification de la Ligue des Champions, match aller. Le retour a lieu le 28 juillet à Tynecastle Park (Édimbourg). L'enjeu est majeur : la route vers la phase de groupes.", it: "2° turno di qualificazione di Champions League, gara d'andata. Il ritorno è il 28 luglio a Tynecastle Park (Edimburgo). Posta in palio importante: la strada verso la fase a gironi." },
      external: { fr: "Match en soirée à la Merkur Arena de Graz, en juillet : conditions estivales douces. Déplacement Écosse → Autriche pour Hearts, sans surcharge de calendrier en début de saison.", it: "Gara serale alla Merkur Arena di Graz, a luglio: condizioni estive miti. Trasferta Scozia → Austria per l'Hearts, senza sovraccarico di calendario a inizio stagione." },
      supercomputer: { fr: "Le marché voit Sturm favori sur l'aller (≈53%) mais le tie quasiment à 50/50 sur les deux matchs (qualification : Sturm 1.91, Hearts 2.10).", it: "Il mercato vede lo Sturm favorito all'andata (≈53%) ma il confronto quasi 50/50 sui due incontri (qualificazione: Sturm 1.91, Hearts 2.10)." }
    },

    sources: [
      { label: "Tips.GG — preview & prédiction", url: "https://tips.gg/article/sturm-graz-vs-hearts-21-07-2026/" },
      { label: "Sportskeeda — betting tips", url: "https://www.sportskeeda.com/football/sturm-graz-vs-hearts-prediction-betting-tips-july-21st-2026" },
      { label: "SportsGambler — lineups & odds", url: "https://www.sportsgambler.com/betting-tips/football/sturm-graz-vs-hearts-prediction-lineups-odds-2026-07-21/" },
      { label: "UEFA — fiche du match", url: "https://www.uefa.com/uefachampionsleague/match/2048726--sturm-graz-vs-hearts/" },
      { label: "oddschecker — cotes du match", url: "https://www.oddschecker.com/football/champions-league/sk-sturm-graz-v-hearts/winner" }
    ]
  },
  {
    id: "fenerbahce-gornik-2026-07-21",
    competition: { fr: "Ligue des Champions — 2ᵉ tour de qualification (aller)", it: "Champions League — 2° turno di qualificazione (andata)" },
    date: { fr: "Mardi 21 juillet 2026", it: "Martedì 21 luglio 2026" },
    kickoff: { fr: "20:00 (heure de Paris)", it: "20:00 (ora italiana)" },
    venue: "Şükrü Saracoğlu, Istanbul (Turquie)",
    home: { name: { fr: "Fenerbahçe", it: "Fenerbahçe" }, flag: "🟡" },
    away: { name: { fr: "Górnik Zabrze", it: "Górnik Zabrze" }, flag: "🔵" },

    odds: {
      market: { fr: "Résultat du match (1N2)", it: "Esito finale (1X2)" },
      source: "oddschecker.com",
      checkedAt: "20/07/2026",
      aiProb: { home: 78, draw: 14, away: 8 },
      best: {
        home: { dec: 1.25, frac: "1/4", book: "meilleure cote du comparateur oddschecker" },
        draw: { dec: 7.00, frac: "6/1", book: "meilleure cote du comparateur oddschecker" },
        away: { dec: 13.0, frac: "12/1", book: "meilleure cote du comparateur oddschecker" }
      }
    },

    safeBet: {
      sel: { fr: "Plus de 2,5 buts dans le match", it: "Over 2,5 gol nella partita" },
      dec: 1.45, frac: "9/20", book: "top des bookmakers (oddschecker)", ai: 67,
      why: {
        fr: "Le meilleur pari safe de la soirée, et il ne vient pas du 1N2. Trois éléments convergent : Fenerbahçe a gagné ses 3 matchs de préparation en juillet avec des scores massifs (5-0 contre Admira, 4-0 contre Pogoń Szczecin, 2-1 contre le LASK) ; le gardien titulaire de Górnik, Tomasz Loska, est SUSPENDU, ce qui affaiblit directement le poste le plus exposé face à une attaque turque de ce niveau ; et le marché place le total le plus probable à 3 buts. J'estime le +2,5 buts autour de 67% pour une cote de 1.45 — pile dans ta cible ~1,50.",
        it: "La miglior scommessa sicura della serata, e non viene dall'1X2. Tre elementi convergono: il Fenerbahçe ha vinto le 3 amichevoli di luglio con punteggi larghi (5-0 all'Admira, 4-0 al Pogoń Szczecin, 2-1 al LASK); il portiere titolare del Górnik, Tomasz Loska, è SQUALIFICATO, il che indebolisce direttamente il ruolo più esposto contro un attacco turco di questo livello; e il mercato colloca il totale più probabile a 3 gol. Stimo l'over 2,5 intorno al 67% per una quota di 1.45 — esattamente nel tuo obiettivo ~1,50."
      }
    },
    simpleBet: {
      sel: { fr: "Plus de 3,5 buts dans le match", it: "Over 3,5 gol nella partita" },
      dec: 2.10, frac: "11/10", book: "top des bookmakers (oddschecker)", ai: 50,
      why: {
        fr: "Le seul pari à cote ≥1.70 qui garde un vrai angle sur ce match, parce que Fenerbahçe à 1.25 n'offre aucune valeur sur le résultat sec. L'angle est le gardien : Górnik se présente sans Tomasz Loska, son portier n°1, face à une équipe qui vient de planter 5 et 4 buts en préparation et qui reçoit à Kadıköy. J'estime la probabilité de 4 buts ou plus autour de 50% pour une cote de 2.10 (47,6% implicite) → environ +5% de valeur. À jouer en petite mise, la variance reste élevée.",
        it: "L'unica scommessa a quota ≥1.70 che mantiene un vero angolo su questa gara, perché il Fenerbahçe a 1.25 non offre alcun valore sull'esito secco. L'angolo è il portiere: il Górnik si presenta senza Tomasz Loska, il portiere n°1, contro una squadra che ha appena segnato 5 e 4 gol in preparazione e che gioca a Kadıköy. Stimo la probabilità di 4+ gol intorno al 50% per una quota di 2.10 (47,6% implicito) → circa +5% di valore. Da giocare con puntata piccola, la varianza resta alta."
      }
    },

    markets: [
      {
        category: { fr: "Nombre de buts (le cœur de l'analyse)", it: "Numero di gol (il cuore dell'analisi)" },
        note: { fr: "Le total le plus probable est 3 buts, et la distribution a une queue lourde vers le haut : Fenerbahçe a marqué 5 et 4 buts lors de sa préparation.", it: "Il totale più probabile è 3 gol, con una coda pesante verso l'alto: il Fenerbahçe ha segnato 5 e 4 gol in preparazione." },
        rows: [
          { sel: { fr: "Plus de 2,5 buts", it: "Over 2,5 gol" }, dec: 1.45, frac: "9/20" },
          { sel: { fr: "Moins de 2,5 buts", it: "Under 2,5 gol" }, dec: 3.00, frac: "2/1" },
          { sel: { fr: "Plus de 3,5 buts", it: "Over 3,5 gol" }, dec: 2.10, frac: "11/10" },
          { sel: { fr: "Moins de 3,5 buts", it: "Under 3,5 gol" }, dec: 1.80, frac: "4/5" },
          { sel: { fr: "Plus de 1,5 but", it: "Over 1,5 gol" }, dec: 1.17, frac: "1/6" },
          { sel: { fr: "Total 3 buts exact (le plus probable)", it: "Totale 3 gol esatti (il più probabile)" }, dec: 4.00, frac: "3/1" },
          { sel: { fr: "Total 4 buts exact", it: "Totale 4 gol esatti" }, dec: 4.75, frac: "15/4" },
          { sel: { fr: "Total 2 buts exact", it: "Totale 2 gol esatti" }, dec: 4.75, frac: "15/4" }
        ]
      },
      {
        category: { fr: "Résultat, marge & qualification", it: "Esito, scarto & qualificazione" },
        note: { fr: "À 1.25, le résultat sec n'a aucune valeur : c'est pourquoi aucun pari n'est recommandé sur le 1N2.", it: "A 1.25 l'esito secco non ha valore: per questo nessuna scommessa è consigliata sull'1X2." },
        rows: [
          { sel: { fr: "Fenerbahçe (1)", it: "Fenerbahçe (1)" }, dec: 1.25, frac: "1/4" },
          { sel: { fr: "Match nul (N)", it: "Pareggio (X)" }, dec: 7.00, frac: "6/1" },
          { sel: { fr: "Górnik Zabrze (2)", it: "Górnik Zabrze (2)" }, dec: 13.0, frac: "12/1" },
          { sel: { fr: "Fenerbahçe se qualifie (sur 2 matchs)", it: "Fenerbahçe si qualifica (sui 2 incontri)" }, dec: 1.14, frac: "1/7" },
          { sel: { fr: "Górnik se qualifie (sur 2 matchs)", it: "Górnik si qualifica (sui 2 incontri)" }, dec: 5.75, frac: "19/4" },
          { sel: { fr: "Fenerbahçe gagne par 2 buts", it: "Fenerbahçe vince di 2 gol" }, dec: 4.00, frac: "3/1" },
          { sel: { fr: "Fenerbahçe gagne par 4 buts ou plus", it: "Fenerbahçe vince di 4+ gol" }, dec: 4.40, frac: "17/5" },
          { sel: { fr: "Fenerbahçe gagne par 1 but", it: "Fenerbahçe vince di 1 gol" }, dec: 4.50, frac: "7/2" },
          { sel: { fr: "Fenerbahçe remboursé si nul (DNB)", it: "Fenerbahçe rimborso se pareggio (DNB)" }, dec: 1.08, frac: "1/12" }
        ]
      },
      {
        category: { fr: "Mi-temps & combinés", it: "Primo tempo & combo" },
        rows: [
          { sel: { fr: "Résultat mi-temps : Fenerbahçe", it: "Esito primo tempo: Fenerbahçe" }, dec: 1.65, frac: "13/20" },
          { sel: { fr: "Résultat mi-temps : Nul", it: "Esito primo tempo: Pareggio" }, dec: 3.10, frac: "21/10" },
          { sel: { fr: "Score 1ʳᵉ MT : Fenerbahçe 1-0", it: "Risultato 1° tempo: Fenerbahçe 1-0" }, dec: 3.50, frac: "5/2" },
          { sel: { fr: "Score 1ʳᵉ MT : 0-0", it: "Risultato 1° tempo: 0-0" }, dec: 4.40, frac: "17/5" },
          { sel: { fr: "Score 1ʳᵉ MT : Fenerbahçe 2-0", it: "Risultato 1° tempo: Fenerbahçe 2-0" }, dec: 5.50, frac: "9/2" },
          { sel: { fr: "Fenerbahçe gagne & les deux marquent", it: "Vince il Fenerbahçe & entrambe segnano" }, dec: 2.75, frac: "7/4" },
          { sel: { fr: "Nul & les deux marquent", it: "Pareggio & entrambe segnano" }, dec: 9.00, frac: "8/1" }
        ]
      }
    ],

    valueBets: [
      { label: { fr: "Plus de 2,5 buts", it: "Over 2,5 gol" }, dec: 1.45, ai: 67,
        note: { fr: "La base safe de la soirée : Fener sort de 5-0 et 4-0 en préparation et Górnik est privé de son gardien titulaire suspendu.", it: "La base sicura della serata: il Fener viene da 5-0 e 4-0 in preparazione e il Górnik è privo del portiere titolare squalificato." } },
      { label: { fr: "Plus de 3,5 buts", it: "Over 3,5 gol" }, dec: 2.10, ai: 50,
        note: { fr: "L'angle du gardien suspendu poussé un cran plus loin. Value modeste (+5%) et variance élevée : petite mise seulement.", it: "L'angolo del portiere squalificato spinto oltre. Value modesto (+5%) e varianza alta: solo piccola puntata." } },
      { label: { fr: "Victoire Fenerbahçe (1N2)", it: "Vittoria Fenerbahçe (1X2)" }, dec: 1.25, ai: 78,
        note: { fr: "⚠ À NE PAS jouer : 1.25 pour une probabilité estimée à 78% donne une valeur négative (−2,5%). Le favori est correctement évalué, il n'y a rien à gagner ici.", it: "⚠ DA NON giocare: 1.25 per una probabilità stimata al 78% dà valore negativo (−2,5%). Il favorito è valutato correttamente, non c'è nulla da guadagnare." } }
    ],

    prediction: {
      pick: { fr: "Victoire Fenerbahçe", it: "Vittoria Fenerbahçe" },
      pickShort: "Fenerbahçe",
      score: "3 – 1",
      goals: { fr: "Match ouvert : plus de 2,5 buts très probable", it: "Gara aperta: over 2,5 gol molto probabile" },
      confidence: "moyen",
      value: true,
      summary: {
        fr: "Fenerbahçe reçoit à Kadıköy en position de très large favori (1.25) et c'est justifié : le club a terminé 2ᵉ de Süper Lig avec 74 points, à trois longueurs de Galatasaray, et a survolé sa préparation avec trois victoires en trois matchs en juillet — 5-0 contre Admira, 4-0 contre Pogoń Szczecin, 2-1 contre le LASK. En face, Górnik Zabrze a fini 2ᵉ d'Ekstraklasa mais reste sur une défaite 3-1 contre Lech Poznań en Supercoupe de Pologne, et surtout se présente SANS son gardien titulaire Tomasz Loska, suspendu. Conclusion nette : il n'y a rien à jouer sur le résultat, correctement évalué à 1.25. Toute la valeur du match est dans les marchés de buts, et le poste de gardien affaibli côté polonais en est l'argument central. Nuance à ne pas ignorer : Fenerbahçe est lui aussi diminué avec quatre absents notables.",
        it: "Il Fenerbahçe gioca a Kadıköy da grandissimo favorito (1.25) ed è giustificato: ha chiuso 2° in Süper Lig con 74 punti, a tre lunghezze dal Galatasaray, e ha dominato la preparazione con tre vittorie su tre a luglio — 5-0 all'Admira, 4-0 al Pogoń Szczecin, 2-1 al LASK. Di fronte, il Górnik Zabrze ha chiuso 2° in Ekstraklasa ma viene da un 3-1 subito dal Lech Poznań in Supercoppa di Polonia e soprattutto si presenta SENZA il portiere titolare Tomasz Loska, squalificato. Conclusione netta: non c'è nulla da giocare sull'esito, valutato correttamente a 1.25. Tutto il valore è nei mercati dei gol, e il ruolo di portiere indebolito è l'argomento centrale. Sfumatura da non ignorare: anche il Fenerbahçe è ridotto con quattro assenze rilevanti."
      },
      basedOn: {
        fr: [
          "Fenerbahçe a gagné ses 3 matchs de préparation en juillet : 5-0 contre Admira, 4-0 contre Pogoń Szczecin, 2-1 contre le LASK",
          "Le gardien titulaire de Górnik, Tomasz Loska, est SUSPENDU pour ce match aller",
          "Górnik reste sur une défaite 3-1 contre Lech Poznań en Supercoupe de Pologne (16 juillet)",
          "Fenerbahçe a terminé 2ᵉ de Süper Lig avec 74 points, à 3 points de Galatasaray",
          "Le total de buts le plus probable est 3, avec une distribution qui s'étale vers le haut"
        ],
        it: [
          "Il Fenerbahçe ha vinto le 3 amichevoli di luglio: 5-0 all'Admira, 4-0 al Pogoń Szczecin, 2-1 al LASK",
          "Il portiere titolare del Górnik, Tomasz Loska, è SQUALIFICATO per l'andata",
          "Il Górnik viene da un 3-1 subito dal Lech Poznań in Supercoppa di Polonia (16 luglio)",
          "Il Fenerbahçe ha chiuso 2° in Süper Lig con 74 punti, a 3 dal Galatasaray",
          "Il totale gol più probabile è 3, con una distribuzione che si allunga verso l'alto"
        ]
      },
      against: {
        fr: [
          "Fenerbahçe est lui aussi diminué : Mert Hakan Yandaş suspendu, Vedat Muriqi et Dorgelès Nene blessés, N'Golo Kanté probablement forfait",
          "L'absence de Muriqi prive Fenerbahçe d'un finisseur, ce qui tempère l'argument « beaucoup de buts »",
          "Górnik a fini 2ᵉ d'Ekstraklasa : ce n'est pas un adversaire anodin malgré l'écart de cotes",
          "C'est un match ALLER : Fenerbahçe peut gérer et se contenter d'une victoire maîtrisée avant le retour du 29 juillet",
          "Le pari « Fenerbahçe gagne » à 1.25 est à valeur NÉGATIVE : à ne pas jouer",
          "Aucune AI Probability disponible : toutes les probabilités sont mes estimations"
        ],
        it: [
          "Anche il Fenerbahçe è ridotto: Mert Hakan Yandaş squalificato, Vedat Muriqi e Dorgelès Nene infortunati, N'Golo Kanté probabile assente",
          "L'assenza di Muriqi priva il Fenerbahçe di un finalizzatore, il che tempera l'argomento « tanti gol »",
          "Il Górnik ha chiuso 2° in Ekstraklasa: non è un avversario banale nonostante il divario di quote",
          "È una gara d'ANDATA: il Fenerbahçe può gestire e accontentarsi di una vittoria controllata prima del ritorno del 29 luglio",
          "La scommessa « vince il Fenerbahçe » a 1.25 ha valore NEGATIVO: da non giocare",
          "Nessuna AI Probability disponibile: tutte le probabilità sono mie stime"
        ]
      }
    },

    teams: {
      home: {
        name: { fr: "Fenerbahçe", it: "Fenerbahçe" }, flag: "🟡", coach: "—",
        lineup: { fr: "Composition non publiée à l'heure de l'analyse ; quatre absences notables à intégrer.", it: "Formazione non pubblicata al momento dell'analisi; quattro assenze rilevanti da considerare." },
        style: { fr: "Équipe offensive qui a écrasé sa préparation (5-0, 4-0) et joue à guichets fermés à Kadıköy, un des stades les plus bruyants d'Europe.", it: "Squadra offensiva che ha dominato la preparazione (5-0, 4-0) e gioca a porte piene a Kadıköy, uno degli stadi più caldi d'Europa." },
        absences: {
          fr: ["Mert Hakan Yandaş — suspendu", "Vedat Muriqi — blessé", "Dorgelès Nene — blessé", "N'Golo Kanté — probablement forfait"],
          it: ["Mert Hakan Yandaş — squalificato", "Vedat Muriqi — infortunato", "Dorgelès Nene — infortunato", "N'Golo Kanté — probabile assente"]
        },
        physical: { fr: "Trois matchs de préparation en juillet, tous gagnés : rythme déjà en place pour aborder l'Europe.", it: "Tre amichevoli a luglio, tutte vinte: ritmo già impostato per affrontare l'Europa." },
        form: { fr: "3 victoires en 3 matchs de préparation en juillet (5-0 Admira, 4-0 Pogoń Szczecin, 2-1 LASK). 2ᵉ de Süper Lig la saison passée avec 74 points.", it: "3 vittorie in 3 amichevoli a luglio (5-0 Admira, 4-0 Pogoń Szczecin, 2-1 LASK). 2° in Süper Lig la scorsa stagione con 74 punti." },
        xg: { fr: "Pas de données xG publiées sur la préparation, mais 11 buts marqués en 3 matchs parlent d'eux-mêmes.", it: "Nessun dato xG sulla preparazione, ma 11 gol in 3 gare parlano da soli." },
        context: { fr: "Objectif phase de groupes de Ligue des Champions après une saison à 3 points du titre turc : la pression est maximale dès l'aller.", it: "Obiettivo fase a gironi di Champions dopo una stagione a 3 punti dal titolo turco: pressione massima già all'andata." },
        source: "Sportskeeda / MightyTips / SportsGambler (21/07/2026)"
      },
      away: {
        name: { fr: "Górnik Zabrze", it: "Górnik Zabrze" }, flag: "🔵", coach: "—",
        lineup: { fr: "Groupe annoncé au complet sur le plan des blessures, MAIS le gardien titulaire Tomasz Loska est suspendu : un gardien remplaçant débutera.", it: "Gruppo annunciato al completo sul fronte infortuni, MA il portiere titolare Tomasz Loska è squalificato: partirà un secondo portiere." },
        style: { fr: "Équipe solide d'Ekstraklasa (2ᵉ la saison passée) mais qui se déplace dans un des chaudrons d'Europe avec un gardien remplaçant.", it: "Squadra solida di Ekstraklasa (2ª la scorsa stagione) ma che va in trasferta in una delle bolge d'Europa con un portiere di riserva." },
        absences: {
          fr: ["Tomasz Loska (gardien n°1) — SUSPENDU, c'est l'absence clé du match", "Aucune blessure significative signalée par ailleurs"],
          it: ["Tomasz Loska (portiere n°1) — SQUALIFICATO, è l'assenza chiave della gara", "Nessun infortunio significativo segnalato"]
        },
        physical: { fr: "Déplacement Pologne → Istanbul, long voyage en début de saison européenne. Match de Supercoupe disputé le 16 juillet.", it: "Trasferta Polonia → Istanbul, viaggio lungo a inizio stagione europea. Supercoppa giocata il 16 luglio." },
        form: { fr: "Défaite 3-1 contre Lech Poznań en Supercoupe de Pologne le 16 juillet. 2ᵉ d'Ekstraklasa la saison passée, à 4 points de Lech.", it: "Sconfitta 3-1 col Lech Poznań in Supercoppa di Polonia il 16 luglio. 2° in Ekstraklasa la scorsa stagione, a 4 punti dal Lech." },
        xg: { fr: "Pas de données xG publiées ; le marché ne lui donne que 13.0 pour gagner et 5.75 pour se qualifier.", it: "Nessun dato xG; il mercato gli dà solo 13.0 per vincere e 5.75 per qualificarsi." },
        context: { fr: "Retour européen après une belle saison nationale, mais un aller à Istanbul sans gardien titulaire est le pire scénario possible.", it: "Ritorno europeo dopo una buona stagione, ma un'andata a Istanbul senza portiere titolare è lo scenario peggiore." },
        source: "Sportskeeda / MightyTips / Footballwhispers (21/07/2026)"
      }
    },

    keyPlayers: [
      { team: "🔵", name: "Tomasz Loska", pos: { fr: "Gardien (SUSPENDU)", it: "Portiere (SQUALIFICATO)" }, stat: { fr: "Gardien n°1 de Górnik — absent", it: "Portiere n°1 del Górnik — assente" }, note: { fr: "⚠ L'absence la plus lourde du match et l'argument central du pari sur les buts.", it: "⚠ L'assenza più pesante e l'argomento centrale della scommessa sui gol." } },
      { team: "🟡", name: "Vedat Muriqi", pos: { fr: "Attaquant (blessé)", it: "Attaccante (infortunato)" }, stat: { fr: "Forfait pour blessure", it: "Assente per infortunio" }, note: { fr: "Son absence prive Fener d'un finisseur : c'est le contre-argument au scénario « beaucoup de buts ».", it: "La sua assenza priva il Fener di un finalizzatore: è il contro-argomento allo scenario « tanti gol »." } },
      { team: "🟡", name: "N'Golo Kanté", pos: { fr: "Milieu (probable forfait)", it: "Centrocampista (probabile assente)" }, stat: { fr: "Probablement absent", it: "Probabilmente assente" }, note: { fr: "Perte d'équilibre au milieu, ce qui peut rendre le match plus ouvert.", it: "Perdita di equilibrio a centrocampo, il che può rendere la gara più aperta." } },
      { team: "🟡", name: "Mert Hakan Yandaş", pos: { fr: "Milieu (suspendu)", it: "Centrocampista (squalificato)" }, stat: { fr: "Suspendu", it: "Squalificato" }, note: { fr: "Troisième absence majeure côté turc.", it: "Terza assenza importante lato turco." } }
    ],

    matchInfo: {
      h2h: { fr: "Aucune confrontation directe récente documentée entre les deux clubs : l'analyse s'appuie donc sur la forme et les absences plutôt que sur l'historique.", it: "Nessun confronto diretto recente documentato tra i due club: l'analisi si basa quindi su forma e assenze invece che sui precedenti." },
      referee: { fr: "Arbitre non communiqué à l'heure de l'analyse ; aucun marché cartons n'a donc pu être exploité.", it: "Arbitro non comunicato al momento dell'analisi; nessun mercato cartellini è stato sfruttabile." },
      stake: { fr: "2ᵉ tour de qualification de la Ligue des Champions, match aller au Şükrü Saracoğlu. Le retour se joue le 29 juillet en Pologne.", it: "2° turno di qualificazione di Champions League, andata allo Şükrü Saracoğlu. Il ritorno si gioca il 29 luglio in Polonia." },
      external: { fr: "Soirée d'été à Istanbul : chaleur et humidité possibles, dans une ambiance de Kadıköy réputée parmi les plus hostiles d'Europe pour un visiteur. Long déplacement pour Górnik.", it: "Serata estiva a Istanbul: caldo e umidità possibili, in un'atmosfera di Kadıköy tra le più ostili d'Europa per un ospite. Lunga trasferta per il Górnik." },
      supercomputer: { fr: "Le marché donne Fenerbahçe à ≈78% sur l'aller et 1.14 pour se qualifier : c'est précisément pour cela qu'il n'y a aucune valeur sur le résultat et qu'il faut chercher dans les buts.", it: "Il mercato dà il Fenerbahçe al ≈78% sull'andata e 1.14 per qualificarsi: proprio per questo non c'è valore sull'esito e bisogna cercare nei gol." }
    },

    sources: [
      { label: "Sportskeeda — preview & tips", url: "https://www.sportskeeda.com/football/fenerbahce-vs-gornik-zabrze-prediction-betting-tips-july-21st-2026" },
      { label: "MightyTips — stats & absences", url: "https://www.mightytips.com/football-predictions/fenerbahce-vs-gornik-zabrze-prediction-21-07-2026/" },
      { label: "Footballwhispers — preview", url: "https://footballwhispers.com/blog/fenerbahce-vs-gornik-zabrze-prediction-21-07-2026/" },
      { label: "SportsGambler — lineups & odds", url: "https://www.sportsgambler.com/betting-tips/football/fenerbahce-vs-gornik-zabrze-prediction-lineups-odds-2026-07-21/" },
      { label: "oddschecker — cotes du match", url: "https://www.oddschecker.com/football/champions-league/fenerbahce-v-gornik-zabrze/winner" }
    ]
  },
  {
    id: "rapid-sepsi-2026-07-20",
    competition: { fr: "SuperLiga (Roumanie) — 1ʳᵉ journée", it: "SuperLiga (Romania) — 1ª giornata" },
    date: { fr: "Lundi 20 juillet 2026", it: "Lunedì 20 luglio 2026" },
    kickoff: { fr: "20:30 (heure de Paris)", it: "20:30 (ora italiana)" },
    venue: "Stadionul Rapid-Giulești, Bucarest (Roumanie)",
    home: { name: { fr: "Rapid Bucarest", it: "Rapid Bucarest" }, flag: "🟤" },
    away: { name: { fr: "Sepsi Sf. Gheorghe", it: "Sepsi Sf. Gheorghe" }, flag: "🔴" },

    odds: {
      market: { fr: "Résultat du match (1N2)", it: "Esito finale (1X2)" },
      source: "oddschecker.com",
      checkedAt: "20/07/2026",
      aiProb: { home: 54, draw: 27, away: 19 },
      best: {
        home: { dec: 1.75, frac: "3/4", book: "meilleure cote du comparateur oddschecker" },
        draw: { dec: 3.75, frac: "11/4", book: "meilleure cote du comparateur oddschecker" },
        away: { dec: 5.00, frac: "4/1", book: "meilleure cote du comparateur oddschecker" }
      }
    },

    simpleBet: {
      sel: { fr: "Match nul", it: "Pareggio" },
      dec: 3.75, frac: "11/4", book: "top des bookmakers (oddschecker)", ai: 32,
      why: {
        fr: "Le meilleur value de la page, et il vient de l'historique. Sur 13 confrontations, 6 se sont terminées par un nul (46%) et surtout Sepsi est INVAINCU lors de ses 8 derniers matchs de championnat contre Rapid. En face, Rapid n'a gagné aucun de ses 4 derniers matchs de championnat à domicile la saison passée et n'a pas gagné ses 3 derniers amicaux de préparation. Même en régressant fortement le taux de nuls historique, j'estime la probabilité autour de 32% contre 27% implicite → environ +20% de valeur. ⚠ Pas d'AI Probability sur la SuperLiga : c'est MON estimation.",
        it: "Il miglior value della pagina, e viene dai precedenti. Su 13 confronti, 6 sono finiti in pareggio (46%) e soprattutto il Sepsi è IMBATTUTO nelle ultime 8 gare di campionato contro il Rapid. Di contro, il Rapid non ha vinto nessuna delle ultime 4 gare interne di campionato della scorsa stagione né le ultime 3 amichevoli. Anche regredendo fortemente il tasso storico di pareggi, stimo la probabilità intorno al 32% contro il 27% implicito → circa +20% di valore. ⚠ Nessuna AI Probability sulla SuperLiga: è una MIA stima."
      }
    },

    markets: [
      {
        category: { fr: "⚠ Marchés disponibles très limités sur ce match", it: "⚠ Mercati disponibili molto limitati su questa partita" },
        note: { fr: "La page détaillée du match est CASSÉE sur oddschecker : le lien officiel du comparateur renvoie lui-même une erreur 404. Seuls 7 marchés restent accessibles via le sélecteur de la page Liga I. Impossible donc d'analyser les buts total/exact, les buts par mi-temps, le score exact, la marge de victoire, les buteurs, les tirs, les corners ou les cartons. C'est signalé plutôt que masqué — et c'est la raison pour laquelle aucun pari safe n'est proposé sur ce match.", it: "La pagina dettagliata è ROTTA su oddschecker: il link ufficiale del comparatore restituisce esso stesso un errore 404. Restano accessibili solo 7 mercati tramite il selettore della pagina Liga I. Impossibile quindi analizzare gol totali/esatti, gol per tempo, risultato esatto, scarto, marcatori, tiri, corner o cartellini. Lo segnaliamo invece di nasconderlo — ed è il motivo per cui non viene proposta alcuna scommessa sicura su questa gara." },
        rows: [
          { sel: { fr: "Marchés absents : buts total/exact, buts par mi-temps, score exact, marge, buteurs, tirs, corners, cartons", it: "Mercati assenti: gol totali/esatti, gol per tempo, risultato esatto, scarto, marcatori, tiri, corner, cartellini" }, dec: null, frac: "page 404" }
        ]
      },
      {
        category: { fr: "Résultat & remboursé si nul", it: "Esito & rimborso se pareggio" },
        rows: [
          { sel: { fr: "Rapid Bucarest (1)", it: "Rapid Bucarest (1)" }, dec: 1.75, frac: "3/4" },
          { sel: { fr: "Match nul (N)", it: "Pareggio (X)" }, dec: 3.75, frac: "11/4" },
          { sel: { fr: "Sepsi Sf. Gheorghe (2)", it: "Sepsi Sf. Gheorghe (2)" }, dec: 5.00, frac: "4/1" },
          { sel: { fr: "Rapid remboursé si nul (Draw No Bet)", it: "Rapid rimborso se pareggio (DNB)" }, dec: 1.30, frac: "3/10" },
          { sel: { fr: "Sepsi remboursé si nul (Draw No Bet)", it: "Sepsi rimborso se pareggio (DNB)" }, dec: 4.00, frac: "3/1" },
          { sel: { fr: "Sepsi ou nul (double chance, calculé depuis le 1N2)", it: "Sepsi o pareggio (doppia chance, calcolata dall'1X2)" }, dec: 2.10, frac: "≈ 11/10" }
        ]
      },
      {
        category: { fr: "Les deux équipes marquent & combinés", it: "Entrambe segnano & combo" },
        rows: [
          { sel: { fr: "Les deux équipes marquent — Oui", it: "Entrambe segnano — Sì" }, dec: 1.89, frac: "8/9" },
          { sel: { fr: "Les deux équipes marquent — Non", it: "Entrambe segnano — No" }, dec: 2.00, frac: "1/1" },
          { sel: { fr: "Rapid gagne & les deux marquent", it: "Vince il Rapid & entrambe segnano" }, dec: 3.80, frac: "14/5" },
          { sel: { fr: "Nul & les deux marquent", it: "Pareggio & entrambe segnano" }, dec: 5.25, frac: "17/4" },
          { sel: { fr: "Sepsi gagne & les deux marquent", it: "Vince il Sepsi & entrambe segnano" }, dec: 9.50, frac: "17/2" }
        ]
      },
      {
        category: { fr: "Clean sheet, mi-temps & handicap", it: "Clean sheet, primo tempo & handicap" },
        rows: [
          { sel: { fr: "Rapid gagne sans encaisser", it: "Il Rapid vince senza subire" }, dec: 3.00, frac: "2/1" },
          { sel: { fr: "Sepsi gagne sans encaisser", it: "Il Sepsi vince senza subire" }, dec: 9.00, frac: "8/1" },
          { sel: { fr: "Rapid gagne les deux mi-temps", it: "Il Rapid vince entrambi i tempi" }, dec: 5.00, frac: "4/1" },
          { sel: { fr: "Sepsi gagne les deux mi-temps", it: "Il Sepsi vince entrambi i tempi" }, dec: 26.0, frac: "25/1" },
          { sel: { fr: "Handicap 1ʳᵉ MT : Rapid -1", it: "Handicap 1° tempo: Rapid -1" }, dec: 6.50, frac: "11/2" },
          { sel: { fr: "Handicap 1ʳᵉ MT : nul (-1)", it: "Handicap 1° tempo: pareggio (-1)" }, dec: 3.30, frac: "23/10" },
          { sel: { fr: "Handicap 1ʳᵉ MT : Sepsi +1", it: "Handicap 1° tempo: Sepsi +1" }, dec: 16.0, frac: "15/1" }
        ]
      }
    ],

    valueBets: [
      { label: { fr: "Match nul", it: "Pareggio" }, dec: 3.75, ai: 32,
        note: { fr: "Le meilleur rapport valeur/risque : 6 nuls sur 13 confrontations, Sepsi invaincu lors des 8 derniers duels de championnat contre Rapid, et Rapid sans victoire sur ses 4 derniers matchs à domicile.", it: "Il miglior rapporto valore/rischio: 6 pareggi su 13 confronti, Sepsi imbattuto negli ultimi 8 scontri di campionato col Rapid e Rapid senza vittorie nelle ultime 4 gare interne." } },
      { label: { fr: "Sepsi ou nul (double chance)", it: "Sepsi o pareggio (doppia chance)" }, dec: 2.10, ai: 55,
        note: { fr: "La version à variance réduite du même raisonnement : il suffit que Rapid ne gagne pas. ⚠ Cote calculée depuis le 1N2 — le marché double chance n'est pas listé par oddschecker sur ce match, vérifie le prix chez ton bookmaker.", it: "La versione a varianza ridotta dello stesso ragionamento: basta che il Rapid non vinca. ⚠ Quota calcolata dall'1X2 — il mercato doppia chance non è elencato da oddschecker su questa gara, verifica il prezzo dal tuo bookmaker." } },
      { label: { fr: "Victoire Sepsi", it: "Vittoria Sepsi" }, dec: 5.00, ai: 26,
        note: { fr: "La plus grosse valeur théorique (+30%) mais aussi la plus risquée : Sepsi n'a perdu que 2 de ses 18 derniers matchs depuis février et reste invaincu contre Rapid, mais gagner à Giulești reste difficile. À réserver à une petite mise.", it: "Il valore teorico più alto (+30%) ma anche il più rischioso: il Sepsi ha perso solo 2 delle ultime 18 gare da febbraio ed è imbattuto col Rapid, ma vincere a Giulești resta difficile. Da riservare a una piccola puntata." } },
      { label: { fr: "Les deux équipes marquent — Non", it: "Entrambe segnano — No" }, dec: 2.00, ai: 52,
        note: { fr: "Value légère : 67% des 6 dernières confrontations sont passées sous 2,5 buts, ce duel est traditionnellement fermé.", it: "Value leggero: il 67% degli ultimi 6 confronti è finito sotto i 2,5 gol, questa sfida è tradizionalmente chiusa." } }
    ],

    prediction: {
      pick: { fr: "Match nul", it: "Pareggio" },
      pickShort: "Nul",
      score: "1 – 1",
      goals: { fr: "Duel traditionnellement fermé : 67% des 6 derniers sous 2,5 buts", it: "Sfida tradizionalmente chiusa: 67% degli ultimi 6 sotto i 2,5 gol" },
      confidence: "moyen",
      value: true,
      summary: {
        fr: "Le marché fait de Rapid le favori à 1.75, mais l'historique et la forme racontent une autre histoire. Sepsi est INVAINCU lors de ses 8 derniers matchs de championnat contre Rapid, et sur les 13 confrontations récentes on compte 6 nuls (46%) pour 4 victoires de Sepsi et 3 de Rapid. Ajoutons que Rapid n'a gagné aucun de ses 4 derniers matchs de championnat à domicile la saison passée et qu'il n'a pas gagné ses 3 derniers amicaux de préparation, tandis que Sepsi n'a perdu que 2 de ses 18 derniers matchs depuis février et reste invaincu sur ses 3 amicaux. Ce duel est en plus historiquement fermé : 67% des 6 dernières confrontations sont passées sous 2,5 buts. Conclusion : Rapid à 1.75 est trop court, la valeur est sur le nul et plus largement sur « Rapid ne gagne pas ».",
        it: "Il mercato rende il Rapid favorito a 1.75, ma precedenti e forma raccontano un'altra storia. Il Sepsi è IMBATTUTO nelle ultime 8 gare di campionato contro il Rapid e, sui 13 confronti recenti, si contano 6 pareggi (46%) contro 4 vittorie del Sepsi e 3 del Rapid. Aggiungiamo che il Rapid non ha vinto nessuna delle ultime 4 gare interne di campionato della scorsa stagione né le ultime 3 amichevoli, mentre il Sepsi ha perso solo 2 delle ultime 18 gare da febbraio ed è imbattuto nelle 3 amichevoli. Questa sfida è inoltre storicamente chiusa: il 67% degli ultimi 6 confronti è finito sotto i 2,5 gol. Conclusione: il Rapid a 1.75 è troppo corto, il valore è sul pareggio e più in generale su « il Rapid non vince »."
      },
      basedOn: {
        fr: [
          "Sepsi est invaincu lors de ses 8 derniers matchs de championnat contre Rapid",
          "6 nuls sur les 13 confrontations récentes (46%), contre 4 victoires Sepsi et 3 Rapid",
          "Rapid n'a gagné aucun de ses 4 derniers matchs de championnat à domicile la saison passée",
          "Rapid n'a pas gagné ses 3 derniers matchs amicaux de préparation",
          "Sepsi n'a perdu que 2 de ses 18 derniers matchs depuis février et est invaincu en amical (2 victoires sur 3)",
          "67% des 6 dernières confrontations se sont terminées sous 2,5 buts"
        ],
        it: [
          "Il Sepsi è imbattuto nelle ultime 8 gare di campionato contro il Rapid",
          "6 pareggi sui 13 confronti recenti (46%), contro 4 vittorie del Sepsi e 3 del Rapid",
          "Il Rapid non ha vinto nessuna delle ultime 4 gare interne di campionato della scorsa stagione",
          "Il Rapid non ha vinto le ultime 3 amichevoli di preparazione",
          "Il Sepsi ha perso solo 2 delle ultime 18 gare da febbraio ed è imbattuto in amichevole (2 vittorie su 3)",
          "Il 67% degli ultimi 6 confronti è finito sotto i 2,5 gol"
        ]
      },
      against: {
        fr: [
          "Aucun pari SAFE proposé sur ce match : la page détaillée d'oddschecker est en erreur 404 et seuls 7 marchés sont accessibles, dont aucun dans la fourchette 1,25–1,60 qui soit défendable",
          "Rapid joue à domicile devant son public à Giulești, avec un effectif théoriquement supérieur",
          "C'est la 1ʳᵉ journée : la forme de la saison passée et les amicaux ne prédisent pas toujours bien le niveau réel",
          "Aucune composition probable publiée, aucun arbitre annoncé, aucune info blessures fiable trouvée",
          "Aucune AI Probability sur la SuperLiga roumaine : toutes les probabilités sont mes estimations",
          "Parier sur le nul reste un pari à variance élevée : même avec 46% d'historique, il ne se réalise qu'environ une fois sur trois"
        ],
        it: [
          "Nessuna scommessa SICURA proposta: la pagina dettagliata di oddschecker è in errore 404 e restano solo 7 mercati, nessuno dei quali difendibile nella fascia 1,25–1,60",
          "Il Rapid gioca in casa davanti al proprio pubblico a Giulești, con una rosa teoricamente superiore",
          "È la 1ª giornata: la forma della scorsa stagione e le amichevoli non predicono sempre bene il livello reale",
          "Nessuna formazione probabile pubblicata, nessun arbitro annunciato, nessuna info affidabile sugli infortuni",
          "Nessuna AI Probability sulla SuperLiga rumena: tutte le probabilità sono mie stime",
          "Puntare sul pareggio resta ad alta varianza: anche con il 46% storico, si verifica solo circa una volta su tre"
        ]
      }
    },

    teams: {
      home: {
        name: { fr: "Rapid Bucarest", it: "Rapid Bucarest" }, flag: "🟤", coach: "—",
        lineup: { fr: "Composition non publiée à l'heure de l'analyse (1ʳᵉ journée).", it: "Formazione non pubblicata al momento dell'analisi (1ª giornata)." },
        style: { fr: "Grand club de Bucarest, favori sur le papier et à domicile, mais en difficulté chronique contre Sepsi et sur ses dernières réceptions.", it: "Grande club di Bucarest, favorito sulla carta e in casa, ma in difficoltà cronica contro il Sepsi e nelle ultime gare interne." },
        absences: {
          fr: ["Aucune information de blessure ou suspension publiée à l'heure de l'analyse"],
          it: ["Nessuna informazione su infortuni o squalifiche pubblicata al momento dell'analisi"]
        },
        physical: { fr: "Premier match officiel de la saison : effectif frais mais rythme de compétition encore à trouver. Match à domicile, pas de déplacement.", it: "Prima gara ufficiale della stagione: rosa fresca ma ritmo partita ancora da trovare. Gara in casa, nessuna trasferta." },
        form: { fr: "Préparation décevante : après un 3-1 contre le Dynamo Kyiv, Rapid n'a plus gagné (2 nuls et 1 défaite sur les 3 amicaux suivants). La saison passée, aucune victoire sur ses 4 derniers matchs de championnat à domicile.", it: "Preparazione deludente: dopo un 3-1 con la Dinamo Kiev, il Rapid non ha più vinto (2 pareggi e 1 sconfitta nelle 3 amichevoli seguenti). La scorsa stagione, nessuna vittoria nelle ultime 4 gare interne." },
        xg: { fr: "Aucune donnée xG publiée pour ce match ; les marchés de buts ne sont pas ouverts (page oddschecker en 404).", it: "Nessun dato xG pubblicato; i mercati dei gol non sono aperti (pagina oddschecker in 404)." },
        context: { fr: "Ouverture de saison à domicile devant un public exigeant : pression forte sur une équipe qui reste sur une série sans victoire à Giulești.", it: "Apertura di stagione in casa davanti a un pubblico esigente: forte pressione su una squadra reduce da una serie senza vittorie a Giulești." },
        source: "Sportytrader / MightyTips / aFootballReport (20/07/2026)"
      },
      away: {
        name: { fr: "Sepsi Sf. Gheorghe", it: "Sepsi Sf. Gheorghe" }, flag: "🔴", coach: "—",
        lineup: { fr: "Composition non publiée à l'heure de l'analyse.", it: "Formazione non pubblicata al momento dell'analisi." },
        style: { fr: "Équipe difficile à battre, très solide dans la durée : seulement 2 défaites sur ses 18 derniers matchs depuis février. Profil de bloc compact qui neutralise Rapid depuis 8 confrontations.", it: "Squadra difficile da battere, molto solida nel tempo: solo 2 sconfitte nelle ultime 18 gare da febbraio. Profilo di blocco compatto che neutralizza il Rapid da 8 confronti." },
        absences: {
          fr: ["Aucune information de blessure ou suspension publiée à l'heure de l'analyse"],
          it: ["Nessuna informazione su infortuni o squalifiche pubblicata al momento dell'analisi"]
        },
        physical: { fr: "Déplacement Sfântu Gheorghe → Bucarest (environ 200 km), trajet notable mais sans surcharge : c'est le premier match officiel de la saison.", it: "Trasferta Sfântu Gheorghe → Bucarest (circa 200 km), viaggio notevole ma senza sovraccarico: è la prima gara ufficiale della stagione." },
        form: { fr: "De retour en SuperLiga après un an d'absence. Invaincu sur ses 3 amicaux (2 victoires), 3 victoires sur ses 6 derniers matchs la saison passée dont des succès contre CSA Steaua et Corvinul Hunedoara, et seulement 2 défaites en 18 matchs depuis février.", it: "Di ritorno in SuperLiga dopo un anno. Imbattuto nelle 3 amichevoli (2 vittorie), 3 vittorie nelle ultime 6 gare della scorsa stagione inclusi successi con CSA Steaua e Corvinul Hunedoara, e solo 2 sconfitte in 18 gare da febbraio." },
        xg: { fr: "Aucune donnée xG publiée ; les marchés de buts ne sont pas ouverts sur ce match.", it: "Nessun dato xG pubblicato; i mercati dei gol non sono aperti su questa gara." },
        context: { fr: "Retour dans l'élite avec une dynamique très positive et un ascendant psychologique net sur Rapid (invaincu sur les 8 derniers duels).", it: "Ritorno nell'élite con una dinamica molto positiva e un netto ascendente psicologico sul Rapid (imbattuto negli ultimi 8 confronti)." },
        source: "Sportytrader / MightyTips / SoccerPunter (20/07/2026)"
      }
    },

    keyPlayers: [
      { team: "🟤", name: { fr: "Effectif Rapid", it: "Rosa Rapid" }, pos: { fr: "—", it: "—" }, stat: { fr: "Aucun marché buteur ouvert (page match en 404)", it: "Nessun mercato marcatori aperto (pagina in 404)" }, note: { fr: "Impossible d'isoler un joueur clé coté sur ce match.", it: "Impossibile isolare un giocatore chiave quotato su questa gara." } },
      { team: "🔴", name: { fr: "Effectif Sepsi", it: "Rosa Sepsi" }, pos: { fr: "—", it: "—" }, stat: { fr: "2 défaites seulement en 18 matchs depuis février", it: "Solo 2 sconfitte in 18 gare da febbraio" }, note: { fr: "C'est la solidité collective, pas un individu, qui porte le signal.", it: "È la solidità collettiva, non un individuo, a dare il segnale." } }
    ],

    matchInfo: {
      h2h: { fr: "13 confrontations récentes : Sepsi 4 victoires, Rapid 3, et 6 matchs nuls (46%). Surtout, Sepsi est invaincu lors de ses 8 derniers matchs de championnat contre Rapid — c'est la donnée la plus forte de cette analyse. 67% des 6 derniers duels sont passés sous 2,5 buts.", it: "13 confronti recenti: Sepsi 4 vittorie, Rapid 3 e 6 pareggi (46%). Soprattutto, il Sepsi è imbattuto nelle ultime 8 gare di campionato contro il Rapid — è il dato più forte di questa analisi. Il 67% degli ultimi 6 confronti è finito sotto i 2,5 gol." },
      referee: { fr: "Arbitre non communiqué à l'heure de l'analyse. Aucun marché cartons n'est de toute façon proposé sur ce match.", it: "Arbitro non comunicato al momento dell'analisi. Su questa gara non è comunque proposto alcun mercato cartellini." },
      stake: { fr: "1ʳᵉ journée de SuperLiga 2026/2027. Rapid veut lancer sa saison à domicile après une préparation ratée ; Sepsi fait son retour dans l'élite après un an d'absence, avec une dynamique très positive.", it: "1ª giornata di SuperLiga 2026/2027. Il Rapid vuole lanciare la stagione in casa dopo una preparazione fallita; il Sepsi torna nell'élite dopo un anno, con una dinamica molto positiva." },
      external: { fr: "Match en soirée (20:30) au Stadionul Rapid-Giulești de Bucarest, en juillet : chaleur résiduelle mais conditions correctes en nocturne. Déplacement d'environ 200 km pour Sepsi, sans impact majeur.", it: "Gara serale (20:30) allo Stadionul Rapid-Giulești di Bucarest, a luglio: caldo residuo ma condizioni accettabili in notturna. Trasferta di circa 200 km per il Sepsi, senza impatto rilevante." },
      supercomputer: { fr: "Le marché donne Rapid ≈54%, nul ≈27%, Sepsi ≈19%. Mon analyse considère que Rapid est surévalué compte tenu de sa série sans victoire à domicile et de l'invincibilité de Sepsi dans ce duel.", it: "Il mercato dà Rapid ≈54%, pareggio ≈27%, Sepsi ≈19%. La mia analisi ritiene che il Rapid sia sopravvalutato vista la serie senza vittorie in casa e l'imbattibilità del Sepsi in questa sfida." }
    },

    sources: [
      { label: "Sportytrader — preview & pronostic", url: "https://www.sportytrader.com/en/betting-tips/rapid-bucuresti-sepsi-osk-sfantu-gheorghe-359784/" },
      { label: "MightyTips — stats & tips", url: "https://www.mightytips.com/football-predictions/fc-rapid-bucuresti-vs-sepsi-osk-prediction-20-07-2026/" },
      { label: "aFootballReport — H2H & team stats", url: "https://afootballreport.com/predictions/head-to-head/romania/superliga/rapid-bucure%C8%99ti/sepsi-osk/MTAzMjgtOTY2NQ==" },
      { label: "SoccerPunter — H2H", url: "https://www.soccerpunter.com/h2h/Rapid-Bucuresti-vs-Sepsi/7773/10238/" },
      { label: "oddschecker — Liga I (page match en 404)", url: "https://www.oddschecker.com/football/romania/liga-i" }
    ]
  },
  {
    id: "corvinul-csikszereda-2026-07-20",
    competition: { fr: "SuperLiga (Roumanie) — 1ʳᵉ journée", it: "SuperLiga (Romania) — 1ª giornata" },
    date: { fr: "Lundi 20 juillet 2026", it: "Lunedì 20 luglio 2026" },
    kickoff: { fr: "17:30 (heure de Paris)", it: "17:30 (ora italiana)" },
    venue: "Stadionul Corvinul 1921, Hunedoara (Roumanie)",
    home: { name: { fr: "Corvinul Hunedoara", it: "Corvinul Hunedoara" }, flag: "🟣" },
    away: { name: { fr: "Csikszereda M. Ciuc", it: "Csikszereda M. Ciuc" }, flag: "🔴" },

    odds: {
      market: { fr: "Résultat du match (1N2)", it: "Esito finale (1X2)" },
      source: "oddschecker.com",
      checkedAt: "20/07/2026",
      aiProb: { home: 43, draw: 29, away: 28 },
      best: {
        home: { dec: 2.20, frac: "6/5", book: "meilleure cote du comparateur oddschecker" },
        draw: { dec: 3.30, frac: "23/10", book: "meilleure cote du comparateur oddschecker" },
        away: { dec: 3.40, frac: "12/5", book: "meilleure cote du comparateur oddschecker" }
      }
    },

    safeBet: {
      sel: { fr: "Csikszereda marque moins de 1,5 but", it: "Csikszereda segna meno di 1,5 gol" },
      dec: 1.40, frac: "2/5", book: "top des bookmakers (oddschecker)", ai: 75,
      why: {
        fr: "Choisi parmi les 19 marchés de la page, pas un DNB. Csikszereda a un profil offensif très pauvre : 7 de ses 8 derniers matchs de SuperLiga se sont terminés sous 2,5 buts. Le marché lui-même le confirme — elle est cotée 2.50 pour simplement marquer en 1ʳᵉ mi-temps et 1.45 pour marquer sur l'ensemble du match. Qu'elle reste à 0 ou 1 but est donc très probable (~75% selon mon estimation) pour une cote de 1.40, proche de ta cible ~1,50. Alternative encore plus sûre si tu veux blinder un combiné : moins de 3,5 buts dans le match à 1.27.",
        it: "Scelta tra i 19 mercati della pagina, non un DNB. Il Csikszereda ha un profilo offensivo molto povero: 7 delle ultime 8 gare di SuperLiga sono finite sotto i 2,5 gol. Lo conferma il mercato stesso — è quotato 2.50 solo per segnare nel primo tempo e 1.45 per segnare in tutta la gara. Che resti a 0 o 1 gol è quindi molto probabile (~75% secondo la mia stima) per una quota di 1.40, vicina al tuo obiettivo ~1,50. Alternativa ancora più sicura per blindare una multipla: under 3,5 gol a 1.27."
      }
    },
    simpleBet: {
      sel: { fr: "Moins de 2,5 buts dans le match", it: "Under 2,5 gol nella partita" },
      dec: 1.73, frac: "8/11", book: "top des bookmakers (oddschecker)", ai: 67,
      why: {
        fr: "Le meilleur value de toute la page. La statistique la plus forte du match : 7 des 8 derniers matchs de Csikszereda en SuperLiga sont passés sous 2,5 buts. Tout le reste du marché va dans le même sens — le 0-0 est archi-favori à la mi-temps (2.75), les scores les plus probables sont 1-1 (6.50) et 1-0 (7.50), et « les deux équipes marquent en 1ʳᵉ mi-temps : NON » est à 1.18. C'est en plus un match d'ouverture de saison, généralement fermé. J'estime la probabilité à ~67% contre 58% implicite → environ +15% de valeur. ⚠ Pas d'AI Probability sur la SuperLiga roumaine : c'est MON estimation.",
        it: "Il miglior value di tutta la pagina. La statistica più forte: 7 delle ultime 8 gare del Csikszereda in SuperLiga sono finite sotto i 2,5 gol. Tutto il resto del mercato va nella stessa direzione — lo 0-0 è super favorito all'intervallo (2.75), i risultati più probabili sono 1-1 (6.50) e 1-0 (7.50), e « entrambe segnano nel primo tempo: NO » è a 1.18. È inoltre una gara d'apertura di stagione, di solito chiusa. Stimo la probabilità al ~67% contro il 58% implicito → circa +15% di valore. ⚠ Nessuna AI Probability sulla SuperLiga rumena: è una MIA stima."
      }
    },

    markets: [
      {
        category: { fr: "Nombre de buts (le cœur de l'analyse)", it: "Numero di gol (il cuore dell'analisi)" },
        note: { fr: "7 des 8 derniers matchs de Csikszereda en SuperLiga sont passés sous 2,5 buts. Tous les marchés de buts vont dans le même sens.", it: "7 delle ultime 8 gare del Csikszereda in SuperLiga sono finite sotto i 2,5 gol. Tutti i mercati dei gol vanno nella stessa direzione." },
        rows: [
          { sel: { fr: "Moins de 2,5 buts", it: "Under 2,5 gol" }, dec: 1.73, frac: "8/11" },
          { sel: { fr: "Plus de 2,5 buts", it: "Over 2,5 gol" }, dec: 2.15, frac: "23/20" },
          { sel: { fr: "Moins de 3,5 buts", it: "Under 3,5 gol" }, dec: 1.27, frac: "3/11" },
          { sel: { fr: "Moins de 2 buts (0 ou 1)", it: "Under 2 gol (0 o 1)" }, dec: 2.30, frac: "13/10" },
          { sel: { fr: "Plus de 1,5 but", it: "Over 1,5 gol" }, dec: 1.36, frac: "4/11" },
          { sel: { fr: "Corvinul gagne & moins de 3,5 buts", it: "Vince Corvinul & under 3,5 gol" }, dec: 2.88, frac: "15/8" },
          { sel: { fr: "Corvinul gagne & moins de 2,5 buts", it: "Vince Corvinul & under 2,5 gol" }, dec: 4.50, frac: "7/2" }
        ]
      },
      {
        category: { fr: "Buts par équipe & BTTS", it: "Gol per squadra & BTTS" },
        note: { fr: "Csikszereda est cotée 2.50 pour simplement marquer en 1ʳᵉ mi-temps : son impuissance offensive est le socle de l'analyse.", it: "Il Csikszereda è quotato 2.50 solo per segnare nel primo tempo: la sua impotenza offensiva è la base dell'analisi." },
        rows: [
          { sel: { fr: "Csikszereda moins de 1,5 but", it: "Csikszereda meno di 1,5 gol" }, dec: 1.40, frac: "2/5" },
          { sel: { fr: "Csikszereda marque (plus de 0,5 but)", it: "Segna il Csikszereda (oltre 0,5 gol)" }, dec: 1.45, frac: "5/11" },
          { sel: { fr: "Csikszereda ne marque pas", it: "Il Csikszereda non segna" }, dec: 2.80, frac: "9/5" },
          { sel: { fr: "Csikszereda ne marque pas en 1ʳᵉ mi-temps", it: "Il Csikszereda non segna nel 1° tempo" }, dec: 1.55, frac: "11/20" },
          { sel: { fr: "Corvinul marque (plus de 0,5 but)", it: "Segna il Corvinul (oltre 0,5 gol)" }, dec: 1.29, frac: "2/7" },
          { sel: { fr: "Corvinul moins de 1,5 but", it: "Corvinul meno di 1,5 gol" }, dec: 1.62, frac: "8/13" },
          { sel: { fr: "Les deux équipes marquent — Oui", it: "Entrambe segnano — Sì" }, dec: 1.91, frac: "10/11" },
          { sel: { fr: "Les deux équipes marquent — Non", it: "Entrambe segnano — No" }, dec: 1.92, frac: "23/25" }
        ]
      },
      {
        category: { fr: "Mi-temps (résultat, score 1ʳᵉ MT, MT/fin)", it: "Primo tempo (esito, risultato 1° tempo, PT/finale)" },
        note: { fr: "Le 0-0 à la pause est de loin l'issue favorite (2.75) et « les deux marquent en 1ʳᵉ MT : NON » est à 1.18.", it: "Lo 0-0 all'intervallo è di gran lunga l'esito favorito (2.75) e « entrambe segnano nel 1° tempo: NO » è a 1.18." },
        rows: [
          { sel: { fr: "Score 1ʳᵉ MT : 0-0 (grand favori)", it: "Risultato 1° tempo: 0-0 (grande favorito)" }, dec: 2.75, frac: "7/4" },
          { sel: { fr: "Résultat mi-temps : Nul", it: "Esito primo tempo: Pareggio" }, dec: 2.15, frac: "15/13" },
          { sel: { fr: "Résultat mi-temps : Corvinul", it: "Esito primo tempo: Corvinul" }, dec: 2.90, frac: "19/10" },
          { sel: { fr: "Résultat mi-temps : Csikszereda", it: "Esito primo tempo: Csikszereda" }, dec: 4.00, frac: "3/1" },
          { sel: { fr: "Les deux marquent en 1ʳᵉ MT — Non", it: "Entrambe segnano nel 1° tempo — No" }, dec: 1.18, frac: "2/11" },
          { sel: { fr: "Les deux marquent dans les 2 MT — Non", it: "Entrambe segnano in entrambi i tempi — No" }, dec: 1.03, frac: "1/33" },
          { sel: { fr: "Mi-temps/fin : Corvinul / Corvinul", it: "PT/Finale: Corvinul / Corvinul" }, dec: 3.50, frac: "5/2" },
          { sel: { fr: "Mi-temps/fin : Nul / Nul", it: "PT/Finale: Pareggio / Pareggio" }, dec: 5.00, frac: "4/1" }
        ]
      },
      {
        category: { fr: "Résultat, doubles chances & remboursé si nul", it: "Esito, doppie chance & rimborso se pareggio" },
        rows: [
          { sel: { fr: "Corvinul (1)", it: "Corvinul (1)" }, dec: 2.20, frac: "6/5" },
          { sel: { fr: "Match nul (N)", it: "Pareggio (X)" }, dec: 3.30, frac: "23/10" },
          { sel: { fr: "Csikszereda (2)", it: "Csikszereda (2)" }, dec: 3.40, frac: "12/5" },
          { sel: { fr: "Double chance — Corvinul ou nul (1N)", it: "Doppia chance — Corvinul o pareggio (1X)" }, dec: 1.33, frac: "1/3" },
          { sel: { fr: "Double chance — Corvinul ou Csikszereda (12)", it: "Doppia chance — Corvinul o Csikszereda (12)" }, dec: 1.30, frac: "3/10" },
          { sel: { fr: "Double chance — Csikszereda ou nul (N2)", it: "Doppia chance — Csikszereda o pareggio (X2)" }, dec: 1.67, frac: "4/6" },
          { sel: { fr: "Corvinul remboursé si nul (Draw No Bet)", it: "Corvinul rimborso se pareggio (DNB)" }, dec: 1.57, frac: "4/7" },
          { sel: { fr: "Csikszereda remboursé si nul (Draw No Bet)", it: "Csikszereda rimborso se pareggio (DNB)" }, dec: 2.40, frac: "7/5" }
        ]
      },
      {
        category: { fr: "Score exact & premier but", it: "Risultato esatto & primo gol" },
        note: { fr: "Les trois scores les plus probables du match sont tous à 0 ou 1 but par équipe.", it: "I tre risultati più probabili hanno tutti 0 o 1 gol per squadra." },
        rows: [
          { sel: { fr: "Match nul 1-1 (score le plus probable)", it: "Pareggio 1-1 (risultato più probabile)" }, dec: 6.50, frac: "11/2" },
          { sel: { fr: "Corvinul 1-0", it: "Corvinul 1-0" }, dec: 7.50, frac: "13/2" },
          { sel: { fr: "Match nul 0-0", it: "Pareggio 0-0" }, dec: 9.50, frac: "17/2" },
          { sel: { fr: "Corvinul 2-1", it: "Corvinul 2-1" }, dec: 9.50, frac: "17/2" },
          { sel: { fr: "Csikszereda 1-0", it: "Csikszereda 1-0" }, dec: 9.50, frac: "17/2" },
          { sel: { fr: "Corvinul marque en premier", it: "Segna per primo il Corvinul" }, dec: 1.83, frac: "5/6" },
          { sel: { fr: "Csikszereda marque en premier", it: "Segna per primo il Csikszereda" }, dec: 2.38, frac: "11/8" },
          { sel: { fr: "Aucun but dans le match", it: "Nessun gol nella partita" }, dec: 9.50, frac: "17/2" }
        ]
      },
      {
        category: { fr: "Combinés résultat + buts & clean sheet", it: "Combo esito + gol & clean sheet" },
        rows: [
          { sel: { fr: "Moins de 2,5 buts & les deux ne marquent pas", it: "Under 2,5 gol & non segnano entrambe" }, dec: 2.25, frac: "5/4" },
          { sel: { fr: "Plus de 2,5 buts & les deux marquent", it: "Over 2,5 gol & segnano entrambe" }, dec: 2.50, frac: "6/4" },
          { sel: { fr: "Nul & moins de 2,5 buts", it: "Pareggio & under 2,5 gol" }, dec: 4.00, frac: "3/1" },
          { sel: { fr: "Corvinul gagne & les deux marquent", it: "Vince Corvinul & segnano entrambe" }, dec: 5.00, frac: "4/1" },
          { sel: { fr: "Corvinul gagne sans encaisser", it: "Corvinul vince senza subire" }, dec: 3.60, frac: "13/5" },
          { sel: { fr: "Csikszereda gagne sans encaisser", it: "Csikszereda vince senza subire" }, dec: 5.50, frac: "9/2" }
        ]
      },
      {
        category: { fr: "Marchés absents sur ce match", it: "Mercati assenti su questa partita" },
        note: { fr: "La SuperLiga roumaine n'ouvre pas les marchés joueurs (buteurs, tirs cadrés, passeurs), ni corners ni cartons chez les bookmakers listés par oddschecker. Il n'y a pas non plus d'AI Probability. Ces marchés n'ont donc pas pu être analysés — c'est signalé plutôt que passé sous silence.", it: "La SuperLiga rumena non apre i mercati giocatori (marcatori, tiri in porta, assist), né corner né cartellini presso i bookmaker elencati da oddschecker. Non c'è nemmeno l'AI Probability. Questi mercati non hanno quindi potuto essere analizzati — lo segnaliamo invece di nasconderlo." },
        rows: [
          { sel: { fr: "Buteurs, tirs, tirs cadrés, passeurs, corners, cartons", it: "Marcatori, tiri, tiri in porta, assist, corner, cartellini" }, dec: null, frac: "non proposés" }
        ]
      }
    ],

    valueBets: [
      { label: { fr: "Moins de 2,5 buts", it: "Under 2,5 gol" }, dec: 1.73, ai: 67,
        note: { fr: "Le meilleur edge de la page : 7 des 8 derniers matchs de Csikszereda sont passés sous 2,5 buts, et tout le marché (0-0 favori à la pause, scores 1-1 et 1-0 en tête) confirme un match fermé.", it: "Il miglior edge della pagina: 7 delle ultime 8 gare del Csikszereda sono finite sotto i 2,5 gol e tutto il mercato (0-0 favorito all'intervallo, risultati 1-1 e 1-0 in testa) conferma una gara chiusa." } },
      { label: { fr: "Moins de 3,5 buts", it: "Under 3,5 gol" }, dec: 1.27, ai: 88,
        note: { fr: "La version blindée du même raisonnement : il faudrait 4 buts ou plus pour perdre. Probabilité estimée ~88% pour une cote de 1.27.", it: "La versione blindata dello stesso ragionamento: servirebbero 4+ gol per perdere. Probabilità stimata ~88% per una quota di 1.27." } },
      { label: { fr: "Score 0-0 à la mi-temps", it: "Risultato 0-0 all'intervallo" }, dec: 2.75, ai: 40,
        note: { fr: "Marché de niche intéressant : le 0-0 à la pause est déjà l'issue favorite du marché, et un match d'ouverture entre un promu prudent et une équipe qui ne marque pas s'y prête parfaitement.", it: "Mercato di nicchia interessante: lo 0-0 all'intervallo è già l'esito favorito e una gara d'apertura tra una neopromossa prudente e una squadra che non segna ci si presta perfettamente." } },
      { label: { fr: "Csikszereda moins de 1,5 but", it: "Csikszereda meno di 1,5 gol" }, dec: 1.40, ai: 75,
        note: { fr: "La base safe : Csikszereda est cotée 2.50 pour seulement marquer en 1ʳᵉ mi-temps. Qu'elle reste à 0 ou 1 but est le scénario le plus probable.", it: "La base sicura: il Csikszereda è quotato 2.50 solo per segnare nel primo tempo. Che resti a 0 o 1 gol è lo scenario più probabile." } }
    ],

    prediction: {
      pick: { fr: "Victoire Corvinul (courte)", it: "Vittoria Corvinul (di misura)" },
      pickShort: "Corvinul Hunedoara",
      score: "1 – 0",
      goals: { fr: "Match fermé, moins de 2,5 buts très probable", it: "Gara chiusa, under 2,5 gol molto probabile" },
      confidence: "faible",
      value: true,
      summary: {
        fr: "C'est le match d'ouverture de la SuperLiga 2026/2027, et un match particulier : Corvinul Hunedoara retrouve l'élite roumaine après 34 ans d'absence, à domicile. Le marché en fait le favori (2.20 contre 3.40), sans doute grâce à l'avantage du terrain et à la faiblesse offensive de son adversaire. Mais soyons clairs : sur le résultat, la confiance est FAIBLE — un promu qui découvre le niveau après 34 ans est une inconnue totale, aucune composition n'est publiée, aucun arbitre annoncé, et les deux dernières confrontations directes se sont soldées par des nuls. La vraie lecture du match est ailleurs : dans les buts. Csikszereda a terminé 7 de ses 8 derniers matchs de SuperLiga sous 2,5 buts, le 0-0 est le grand favori à la mi-temps (2.75), les scores les plus probables sont 1-1 et 1-0, et « les deux équipes marquent en 1ʳᵉ mi-temps : NON » est à 1.18. C'est là que se trouve toute la valeur.",
        it: "È la gara d'apertura della SuperLiga 2026/2027, e una gara speciale: il Corvinul Hunedoara torna nell'élite rumena dopo 34 anni, in casa. Il mercato lo rende favorito (2.20 contro 3.40), probabilmente per il fattore campo e la debolezza offensiva dell'avversario. Ma siamo chiari: sull'esito la fiducia è BASSA — una neopromossa che scopre il livello dopo 34 anni è un'incognita totale, nessuna formazione pubblicata, nessun arbitro annunciato, e gli ultimi due confronti diretti sono finiti in pareggio. La vera lettura della gara è altrove: nei gol. Il Csikszereda ha chiuso 7 delle ultime 8 gare di SuperLiga sotto i 2,5 gol, lo 0-0 è il grande favorito all'intervallo (2.75), i risultati più probabili sono 1-1 e 1-0, e « entrambe segnano nel 1° tempo: NO » è a 1.18. Lì si trova tutto il valore."
      },
      basedOn: {
        fr: [
          "7 des 8 derniers matchs de Csikszereda en SuperLiga se sont terminés sous 2,5 buts",
          "Le 0-0 est le score le plus probable à la mi-temps (2.75) et « les deux marquent en 1ʳᵉ MT : NON » est à 1.18",
          "Les trois scores exacts favoris sont 1-1 (6.50), Corvinul 1-0 (7.50) et 0-0 (9.50)",
          "Csikszereda n'est cotée que 2.50 pour simplement marquer en 1ʳᵉ mi-temps",
          "Match d'ouverture de saison : rythme généralement prudent et peu de buts",
          "Corvinul joue à domicile et l'historique lui est favorable (3 victoires sur 5 confrontations)"
        ],
        it: [
          "7 delle ultime 8 gare del Csikszereda in SuperLiga sono finite sotto i 2,5 gol",
          "Lo 0-0 è il risultato più probabile all'intervallo (2.75) e « entrambe segnano nel 1° tempo: NO » è a 1.18",
          "I tre risultati esatti favoriti sono 1-1 (6.50), Corvinul 1-0 (7.50) e 0-0 (9.50)",
          "Il Csikszereda è quotato solo 2.50 per segnare nel primo tempo",
          "Gara d'apertura di stagione: ritmo generalmente prudente e pochi gol",
          "Il Corvinul gioca in casa e i precedenti gli sono favorevoli (3 vittorie su 5 confronti)"
        ]
      },
      against: {
        fr: [
          "Corvinul est un promu qui retrouve l'élite après 34 ans : niveau réel totalement inconnu à cet étage",
          "Aucune composition probable publiée, aucun arbitre annoncé, aucune info blessures fiable trouvée",
          "Les deux dernières confrontations directes se sont terminées par un nul",
          "Un match d'ouverture peut aussi se débrider si un but tombe tôt : le +2,5 buts reste à 2.15, ce n'est pas une formalité",
          "Aucune AI Probability sur la SuperLiga roumaine : toutes les probabilités sont mes estimations",
          "Aucun marché joueurs, corners ou cartons proposé : l'analyse est forcément moins large que sur un grand championnat"
        ],
        it: [
          "Il Corvinul è una neopromossa che torna nell'élite dopo 34 anni: livello reale del tutto sconosciuto",
          "Nessuna formazione probabile pubblicata, nessun arbitro annunciato, nessuna info affidabile sugli infortuni",
          "Gli ultimi due confronti diretti sono finiti in pareggio",
          "Una gara d'apertura può anche aprirsi se arriva un gol presto: l'over 2,5 resta a 2.15, non è una formalità",
          "Nessuna AI Probability sulla SuperLiga rumena: tutte le probabilità sono mie stime",
          "Nessun mercato giocatori, corner o cartellini disponibile: l'analisi è forzatamente meno ampia"
        ]
      }
    },

    teams: {
      home: {
        name: { fr: "Corvinul Hunedoara", it: "Corvinul Hunedoara" }, flag: "🟣", coach: "—",
        lineup: { fr: "Composition non publiée à l'heure de l'analyse (match d'ouverture de saison).", it: "Formazione non pubblicata al momento dell'analisi (gara d'apertura di stagione)." },
        style: { fr: "Profil inconnu à ce niveau : le club retrouve l'élite après 34 ans. Le marché lui accorde l'avantage du terrain (favori à 2.20) mais aucune donnée de style fiable n'est disponible en SuperLiga.", it: "Profilo sconosciuto a questo livello: il club torna nell'élite dopo 34 anni. Il mercato gli concede il fattore campo (favorito a 2.20) ma non ci sono dati di stile affidabili in SuperLiga." },
        absences: {
          fr: ["Aucune information de blessure ou suspension publiée à l'heure de l'analyse"],
          it: ["Nessuna informazione su infortuni o squalifiche pubblicata al momento dell'analisi"]
        },
        physical: { fr: "Début de saison : effectif frais, aucune charge de calendrier. Match à domicile, pas de déplacement.", it: "Inizio stagione: rosa fresca, nessun carico di calendario. Gara in casa, nessuna trasferta." },
        form: { fr: "Aucun match de SuperLiga 2026/2027 disputé : c'est la 1ʳᵉ journée. Le club revient dans l'élite roumaine après 34 ans d'absence.", it: "Nessuna gara di SuperLiga 2026/2027 disputata: è la 1ª giornata. Il club torna nell'élite rumena dopo 34 anni." },
        xg: { fr: "Aucune donnée xG disponible à ce niveau pour ce club — c'est une inconnue statistique.", it: "Nessun dato xG disponibile a questo livello per questo club — è un'incognita statistica." },
        context: { fr: "Retour dans l'élite après 34 ans et match d'ouverture à domicile : contexte émotionnel fort, public attendu en nombre, mais gestion prudente probable.", it: "Ritorno nell'élite dopo 34 anni e gara d'apertura in casa: contesto emotivo forte, pubblico atteso numeroso, ma gestione probabilmente prudente." },
        source: "Wincomparator / fkcsikszereda.ro / oddschecker (20/07/2026)"
      },
      away: {
        name: { fr: "Csikszereda M. Ciuc", it: "Csikszereda M. Ciuc" }, flag: "🔴", coach: "—",
        lineup: { fr: "Composition non publiée à l'heure de l'analyse.", it: "Formazione non pubblicata al momento dell'analisi." },
        style: { fr: "Équipe au profil très fermé : 7 de ses 8 derniers matchs de SuperLiga sous 2,5 buts. Peu de production offensive, cotée seulement 1.45 pour marquer sur l'ensemble du match.", it: "Squadra dal profilo molto chiuso: 7 delle ultime 8 gare di SuperLiga sotto i 2,5 gol. Poca produzione offensiva, quotata solo 1.45 per segnare in tutta la gara." },
        absences: {
          fr: ["Aucune information de blessure ou suspension publiée à l'heure de l'analyse"],
          it: ["Nessuna informazione su infortuni o squalifiche pubblicata al momento dell'analisi"]
        },
        physical: { fr: "Début de saison, effectif frais. Déplacement interne à la Roumanie (Miercurea Ciuc → Hunedoara), trajet notable mais sans surcharge de calendrier.", it: "Inizio stagione, rosa fresca. Trasferta interna alla Romania (Miercurea Ciuc → Hunedoara), viaggio lungo ma senza sovraccarico di calendario." },
        form: { fr: "Statistique clé : 7 de ses 8 derniers matchs de SuperLiga se sont terminés sous 2,5 buts. C'est le socle de toute l'analyse.", it: "Statistica chiave: 7 delle ultime 8 gare di SuperLiga sono finite sotto i 2,5 gol. È la base di tutta l'analisi." },
        xg: { fr: "Pas de données xG publiées, mais le marché est éloquent : 2.50 pour marquer en 1ʳᵉ mi-temps, 1.40 pour rester sous 1,5 but sur le match.", it: "Nessun dato xG pubblicato, ma il mercato è eloquente: 2.50 per segnare nel primo tempo, 1.40 per restare sotto 1,5 gol." },
        context: { fr: "Équipe installée en SuperLiga qui affronte un promu en ouverture : elle part avec l'expérience du niveau, mais son manque d'efficacité offensive limite son potentiel de victoire nette.", it: "Squadra stabile in SuperLiga che affronta una neopromossa all'esordio: ha l'esperienza del livello, ma la scarsa efficacia offensiva ne limita il potenziale di vittoria netta." },
        source: "Wincomparator / fctables / oddschecker (20/07/2026)"
      }
    },

    keyPlayers: [
      { team: "🟣", name: { fr: "Effectif Corvinul", it: "Rosa Corvinul" }, pos: { fr: "—", it: "—" }, stat: { fr: "Aucun marché buteur ouvert sur ce match", it: "Nessun mercato marcatori aperto su questa gara" }, note: { fr: "Les bookmakers ne proposent pas de paris joueurs en SuperLiga : impossible d'isoler un joueur clé coté.", it: "I bookmaker non propongono scommesse sui giocatori in SuperLiga: impossibile isolare un giocatore chiave quotato." } },
      { team: "🔴", name: { fr: "Effectif Csikszereda", it: "Rosa Csikszereda" }, pos: { fr: "—", it: "—" }, stat: { fr: "Cotée 1.45 pour marquer, 2.50 pour marquer en 1ʳᵉ MT", it: "Quotata 1.45 per segnare, 2.50 per segnare nel 1° tempo" }, note: { fr: "C'est l'équipe, pas un joueur, qui porte le signal : l'attaque est le point faible.", it: "È la squadra, non un giocatore, a dare il segnale: l'attacco è il punto debole." } }
    ],

    matchInfo: {
      h2h: { fr: "5 confrontations directes : Corvinul 3 victoires, Csikszereda 1, 1 nul. Nuance importante : les deux dernières se sont terminées sur un match nul, ce qui colle au profil fermé de l'affiche.", it: "5 confronti diretti: Corvinul 3 vittorie, Csikszereda 1, 1 pareggio. Sfumatura importante: gli ultimi due sono finiti in pareggio, in linea con il profilo chiuso della sfida." },
      referee: { fr: "Arbitre non communiqué à l'heure de l'analyse. Aucun marché cartons n'est proposé sur ce match de toute façon.", it: "Arbitro non comunicato al momento dell'analisi. Su questa gara non è comunque proposto alcun mercato cartellini." },
      stake: { fr: "1ʳᵉ journée de SuperLiga 2026/2027. Corvinul Hunedoara fait son retour dans l'élite roumaine après 34 ans d'absence et reçoit pour l'ouverture ; Csikszereda entame sa saison en déplacement.", it: "1ª giornata di SuperLiga 2026/2027. Il Corvinul Hunedoara torna nell'élite rumena dopo 34 anni e ospita l'apertura; il Csikszereda inizia la stagione in trasferta." },
      external: { fr: "Match en fin d'après-midi (17:30) au Stadionul Corvinul 1921 de Hunedoara, en plein mois de juillet : chaleur possible, ce qui tend plutôt à ralentir le rythme et va dans le sens d'un match fermé.", it: "Gara di fine pomeriggio (17:30) allo Stadionul Corvinul 1921 di Hunedoara, in pieno luglio: caldo possibile, il che tende a rallentare il ritmo e va nella direzione di una gara chiusa." },
      supercomputer: { fr: "Le marché voit un match serré et fermé : Corvinul ≈43%, nul ≈29%, Csikszereda ≈28%, avec le moins de 2,5 buts largement favori sur le plus de 2,5.", it: "Il mercato vede una gara equilibrata e chiusa: Corvinul ≈43%, pareggio ≈29%, Csikszereda ≈28%, con l'under 2,5 gol nettamente favorito sull'over." }
    },

    sources: [
      { label: "Wincomparator — prédiction & cotes", url: "https://www.wincomparator.com/predictions/cs-corvinul-hunedoara-fk-csikszereda-miercurea-ciuc-8580232/" },
      { label: "FK Csíkszereda — site officiel (SuperLiga)", url: "https://fkcsikszereda.ro/hirek/szuperliga?lang=en" },
      { label: "fctables — H2H", url: "https://www.fctables.com/h2h/afk-csikszereda/corvinul_hunedoara/" },
      { label: "WhoScored — fiche du match", url: "https://www.whoscored.com/matches/1992328/show/romania-superliga-2026-2027-corvinul-hunedoara-csikszereda-miercurea-ciuc" },
      { label: "oddschecker — cotes du match", url: "https://www.oddschecker.com/football/romania/liga-i/cs-hunedoara-v-fc-csikszereda-miercurea-ciuc/winner" }
    ]
  },
  {
    id: "orgryte-djurgarden-2026-07-20",
    competition: { fr: "Allsvenskan (Suède) — 13ᵉ journée", it: "Allsvenskan (Svezia) — 13ª giornata" },
    date: { fr: "Lundi 20 juillet 2026", it: "Lunedì 20 luglio 2026" },
    kickoff: { fr: "19:00 (heure de Paris)", it: "19:00 (ora italiana)" },
    venue: "Gamla Ullevi, Göteborg (Suède)",
    home: { name: { fr: "Örgryte IS", it: "Örgryte IS" }, flag: "🔴" },
    away: { name: { fr: "Djurgården IF", it: "Djurgården IF" }, flag: "🔵" },

    odds: {
      market: { fr: "Résultat du match (1N2)", it: "Esito finale (1X2)" },
      source: "oddschecker.com",
      checkedAt: "20/07/2026",
      aiProb: { home: 12, draw: 18, away: 70 },
      best: {
        home: { dec: 8.00, frac: "7/1", book: "meilleure cote du comparateur oddschecker" },
        draw: { dec: 5.50, frac: "9/2", book: "meilleure cote du comparateur oddschecker" },
        away: { dec: 1.36, frac: "4/11", book: "meilleure cote du comparateur oddschecker" }
      }
    },

    safeBet: {
      sel: { fr: "Plus de 2,5 buts dans le match", it: "Over 2,5 gol nella partita" },
      dec: 1.45, frac: "9/20", book: "top des bookmakers (oddschecker)", ai: 69,
      why: {
        fr: "Le pari le plus solide de toute la page, sorti du marché des buts (pas d'un DNB). Quatre signaux convergent : les 6 derniers matchs de Djurgården en Allsvenskan ont TOUS dépassé 2,5 buts ; l'xG combiné attendu est de ≈4,01 ; Örgryte a marqué dans ses 6 matchs à domicile ET encaissé dans les 6 ; enfin le marché « total de buts exact » donne 3 buts comme total le plus probable, ce qui place le +2,5 buts autour de 68%. Cote 1.45, pile dans ta cible ~1,50, idéale comme base de combiné.",
        it: "La scommessa più solida di tutta la pagina, presa dal mercato dei gol (non un DNB). Quattro segnali convergono: le ultime 6 gare del Djurgården in Allsvenskan hanno TUTTE superato 2,5 gol; l'xG combinato atteso è ≈4,01; l'Örgryte ha segnato in tutte e 6 le gare casalinghe E subito in tutte e 6; infine il mercato « totale gol esatti » dà 3 gol come totale più probabile, il che porta l'over 2,5 intorno al 68%. Quota 1.45, esattamente nel tuo obiettivo ~1,50, ideale come base di multipla."
      }
    },
    simpleBet: {
      sel: { fr: "Djurgården gagne ET les deux équipes marquent", it: "Vince il Djurgården E entrambe segnano" },
      dec: 2.50, frac: "6/4", book: "top des bookmakers (oddschecker)", ai: 47,
      why: {
        fr: "Le meilleur value de la page. Djurgården est très largement supérieur (coté 1.36, 5ᵉ avec 19 pts, deux victoires 4-2 et 3-0 de suite) mais le scénario « Djurgården gagne sans encaisser » à 2.70 est un piège : Örgryte a marqué dans ses 6 matchs à domicile cette saison. En combinant la victoire de Djurgården ET le but d'Örgryte, on obtient 2.50 pour une probabilité que j'estime à ~47% (40% implicite) → environ +17% de valeur. ⚠ Pas d'AI Probability sur l'Allsvenskan : cette probabilité est MON estimation.",
        it: "Il miglior value della pagina. Il Djurgården è nettamente superiore (quotato 1.36, 5° con 19 punti, due vittorie 4-2 e 3-0 di fila) ma lo scenario « Djurgården vince senza subire » a 2.70 è una trappola: l'Örgryte ha segnato in tutte e 6 le gare casalinghe. Combinando la vittoria del Djurgården E il gol dell'Örgryte si ottiene 2.50 per una probabilità che stimo ~47% (40% implicita) → circa +17% di valore. ⚠ Nessuna AI Probability sull'Allsvenskan: questa probabilità è una MIA stima."
      }
    },

    markets: [
      {
        category: { fr: "Résultat, doubles chances & remboursé si nul", it: "Esito, doppie chance & rimborso se pareggio" },
        rows: [
          { sel: { fr: "Örgryte (1)", it: "Örgryte (1)" }, dec: 8.00, frac: "7/1" },
          { sel: { fr: "Match nul (N)", it: "Pareggio (X)" }, dec: 5.50, frac: "9/2" },
          { sel: { fr: "Djurgården (2)", it: "Djurgården (2)" }, dec: 1.36, frac: "4/11" },
          { sel: { fr: "Double chance — Djurgården ou nul (N2)", it: "Doppia chance — Djurgården o pareggio (X2)" }, dec: 1.10, frac: "1/10" },
          { sel: { fr: "Double chance — Örgryte ou Djurgården (12)", it: "Doppia chance — Örgryte o Djurgården (12)" }, dec: 1.17, frac: "1/6" },
          { sel: { fr: "Double chance — Örgryte ou nul (1N)", it: "Doppia chance — Örgryte o pareggio (1X)" }, dec: 3.25, frac: "9/4" },
          { sel: { fr: "Djurgården remboursé si nul (Draw No Bet)", it: "Djurgården rimborso se pareggio (DNB)" }, dec: 1.13, frac: "1/8" },
          { sel: { fr: "Örgryte remboursé si nul (Draw No Bet)", it: "Örgryte rimborso se pareggio (DNB)" }, dec: 6.00, frac: "5/1" }
        ]
      },
      {
        category: { fr: "Nombre de buts (le cœur de l'analyse)", it: "Numero di gol (il cuore dell'analisi)" },
        note: { fr: "Les 6 derniers matchs de Djurgården ont tous dépassé 2,5 buts ; xG combiné attendu ≈ 4,01. Le total le plus probable est 3 buts.", it: "Le ultime 6 gare del Djurgården hanno tutte superato 2,5 gol; xG combinato atteso ≈ 4,01. Il totale più probabile è 3 gol." },
        rows: [
          { sel: { fr: "Plus de 2,5 buts", it: "Over 2,5 gol" }, dec: 1.45, frac: "9/20" },
          { sel: { fr: "Moins de 2,5 buts", it: "Under 2,5 gol" }, dec: 3.10, frac: "21/10" },
          { sel: { fr: "Plus de 3,5 buts", it: "Over 3,5 gol" }, dec: 2.10, frac: "11/10" },
          { sel: { fr: "Plus de 1,5 but", it: "Over 1,5 gol" }, dec: 1.14, frac: "1/7" },
          { sel: { fr: "Total 3 buts exact (le plus probable)", it: "Totale 3 gol esatti (il più probabile)" }, dec: 4.33, frac: "10/3" },
          { sel: { fr: "Total 4 buts exact", it: "Totale 4 gol esatti" }, dec: 4.75, frac: "15/4" },
          { sel: { fr: "Total 2 buts exact", it: "Totale 2 gol esatti" }, dec: 5.00, frac: "4/1" }
        ]
      },
      {
        category: { fr: "Buts par équipe & BTTS", it: "Gol per squadra & BTTS" },
        note: { fr: "Örgryte a marqué dans ses 6 matchs à domicile et n'a gardé aucune cage inviolée en 6 réceptions.", it: "L'Örgryte ha segnato in tutte e 6 le gare casalinghe e non ha mai mantenuto la porta inviolata in casa." },
        rows: [
          { sel: { fr: "Djurgården marque (plus de 0,5 but)", it: "Segna il Djurgården (oltre 0,5 gol)" }, dec: 1.06, frac: "1/16" },
          { sel: { fr: "Djurgården plus de 1,5 but (2+ buts)", it: "Djurgården oltre 1,5 gol (2+ gol)" }, dec: 1.34, frac: "10/29" },
          { sel: { fr: "Djurgården plus de 2,5 buts (3+ buts)", it: "Djurgården oltre 2,5 gol (3+ gol)" }, dec: 2.05, frac: "21/20" },
          { sel: { fr: "Örgryte marque (plus de 0,5 but)", it: "Segna l'Örgryte (oltre 0,5 gol)" }, dec: 1.55, frac: "11/20" },
          { sel: { fr: "Örgryte ne marque pas", it: "L'Örgryte non segna" }, dec: 2.50, frac: "6/4" },
          { sel: { fr: "Les deux équipes marquent — Oui", it: "Entrambe segnano — Sì" }, dec: 1.67, frac: "4/6" },
          { sel: { fr: "Les deux équipes marquent — Non", it: "Entrambe segnano — No" }, dec: 2.30, frac: "13/10" }
        ]
      },
      {
        category: { fr: "Résultat combiné, marge & clean sheet", it: "Esito combinato, scarto & clean sheet" },
        note: { fr: "⚠ Le pari « Djurgården gagne sans encaisser » (2.70) est le piège du match : Örgryte marque à chaque réception.", it: "⚠ La scommessa « Djurgården vince senza subire » (2.70) è la trappola della gara: l'Örgryte segna in ogni gara interna." },
        rows: [
          { sel: { fr: "Djurgården gagne & les deux marquent", it: "Vince il Djurgården & entrambe segnano" }, dec: 2.50, frac: "6/4" },
          { sel: { fr: "Djurgården gagne sans encaisser (piège)", it: "Djurgården vince senza subire (trappola)" }, dec: 2.70, frac: "17/10" },
          { sel: { fr: "Djurgården gagne par 1 but", it: "Djurgården vince di 1 gol" }, dec: 4.00, frac: "3/1" },
          { sel: { fr: "Djurgården gagne par 2 buts", it: "Djurgården vince di 2 gol" }, dec: 4.33, frac: "10/3" },
          { sel: { fr: "Djurgården gagne par 3 buts ou plus", it: "Djurgården vince di 3+ gol" }, dec: 6.00, frac: "5/1" },
          { sel: { fr: "Match nul (score de parité)", it: "Pareggio (con gol)" }, dec: 6.00, frac: "5/1" },
          { sel: { fr: "Örgryte gagne par 1 but", it: "Örgryte vince di 1 gol" }, dec: 10.0, frac: "9/1" }
        ]
      },
      {
        category: { fr: "Mi-temps (résultat & score 1ère MT)", it: "Primo tempo (esito & risultato 1° tempo)" },
        rows: [
          { sel: { fr: "Résultat mi-temps : Djurgården", it: "Esito primo tempo: Djurgården" }, dec: 1.80, frac: "4/5" },
          { sel: { fr: "Résultat mi-temps : Nul", it: "Esito primo tempo: Pareggio" }, dec: 2.90, frac: "19/10" },
          { sel: { fr: "Résultat mi-temps : Örgryte", it: "Esito primo tempo: Örgryte" }, dec: 7.00, frac: "6/1" },
          { sel: { fr: "Score 1ère MT : Djurgården 1-0 (favori)", it: "Risultato 1° tempo: Djurgården 1-0 (favorito)" }, dec: 3.85, frac: "57/20" },
          { sel: { fr: "Score 1ère MT : 0-0", it: "Risultato 1° tempo: 0-0" }, dec: 4.50, frac: "7/2" },
          { sel: { fr: "Score 1ère MT : Djurgården 2-0", it: "Risultato 1° tempo: Djurgården 2-0" }, dec: 6.50, frac: "11/2" },
          { sel: { fr: "Djurgården marque en premier", it: "Segna per primo il Djurgården" }, dec: 1.36, frac: "4/11" },
          { sel: { fr: "Örgryte marque en premier", it: "Segna per primo l'Örgryte" }, dec: 3.50, frac: "5/2" }
        ]
      },
      {
        category: { fr: "Buteurs (2 buts ou plus, hat-trick)", it: "Marcatori (doppietta, tripletta)" },
        note: { fr: "⚠ Piège repéré : Tobias Sana (Örgryte) figure encore dans les listes de buteurs alors qu'il est SUSPENDU (3ᵉ carton jaune). Ne pas parier sur lui.", it: "⚠ Trappola rilevata: Tobias Sana (Örgryte) compare ancora tra i marcatori benché sia SQUALIFICATO (3° cartellino giallo). Non scommetterci." },
        rows: [
          { sel: "Kristian Strømland Lien (Djurgården) — 2 buts ou +", dec: 5.50, frac: "9/2" },
          { sel: "Bo Asulv Hegland (Djurgården) — 2 buts ou +", dec: 8.50, frac: "15/2" },
          { sel: "Joel Asoro — 2 buts ou +", dec: 10.0, frac: "9/1" },
          { sel: "Nino Zugelj — 2 buts ou +", dec: 13.0, frac: "12/1" },
          { sel: "Hannes Hyllenbom — 2 buts ou +", dec: 13.0, frac: "12/1" },
          { sel: "Kristian Strømland Lien — hat-trick", dec: 21.0, frac: "20/1" }
        ]
      },
      {
        category: { fr: "Cartons & corners", it: "Cartellini & corner" },
        note: { fr: "Arbitre : Granit Maqedonci. Aucune statistique de cartons publiée pour lui à l'heure de l'analyse.", it: "Arbitro: Granit Maqedonci. Nessuna statistica cartellini pubblicata su di lui al momento dell'analisi." },
        rows: [
          { sel: { fr: "Leon Hien — cartonné", it: "Leon Hien — ammonito" }, dec: 2.50, frac: "6/4" },
          { sel: { fr: "Aydarus Abukar — cartonné", it: "Aydarus Abukar — ammonito" }, dec: 2.63, frac: "13/8" },
          { sel: { fr: "Mikael Marques — cartonné", it: "Mikael Marques — ammonito" }, dec: 2.75, frac: "7/4" },
          { sel: { fr: "Hampus Finndell (Djurgården) — cartonné", it: "Hampus Finndell (Djurgården) — ammonito" }, dec: 3.10, frac: "21/10" },
          { sel: { fr: "Plus de 8,5 corners", it: "Over 8,5 corner" }, dec: 1.35, frac: "6/17" },
          { sel: { fr: "Plus de 7,5 corners", it: "Over 7,5 corner" }, dec: 1.18, frac: "2/11" }
        ]
      }
    ],

    valueBets: [
      { label: { fr: "Djurgården gagne & les deux équipes marquent", it: "Vince il Djurgården & entrambe segnano" }, dec: 2.50, ai: 47,
        note: { fr: "Le meilleur edge : Djurgården est nettement supérieur mais Örgryte marque à chaque réception (6/6). Probabilité estimée ~47% pour 40% implicite.", it: "Il miglior edge: il Djurgården è nettamente superiore ma l'Örgryte segna in ogni gara interna (6/6). Probabilità stimata ~47% contro 40% implicita." } },
      { label: { fr: "Les deux équipes marquent — Oui", it: "Entrambe segnano — Sì" }, dec: 1.67, ai: 68,
        note: { fr: "Djurgården marque à 1.06 (≈94%) et Örgryte a marqué dans ses 6 matchs à domicile : le marché sous-évalue la capacité d'Örgryte à trouver la faille chez lui.", it: "Il Djurgården segna a 1.06 (≈94%) e l'Örgryte ha segnato in tutte e 6 le gare casalinghe: il mercato sottovaluta la capacità dell'Örgryte di segnare in casa." } },
      { label: { fr: "Plus de 2,5 buts", it: "Over 2,5 gol" }, dec: 1.45, ai: 69,
        note: { fr: "Quasiment à sa juste valeur, mais c'est la probabilité la plus élevée de toute la page (≈69%) : la base idéale d'un combiné plutôt qu'un pari sec.", it: "Praticamente al suo valore equo, ma è la probabilità più alta di tutta la pagina (≈69%): la base ideale di una multipla più che una singola." } }
    ],

    prediction: {
      pick: { fr: "Victoire Djurgården", it: "Vittoria Djurgården" },
      pickShort: "Djurgården IF",
      score: "1 – 2",
      goals: { fr: "Plus de 2,5 buts très probable, les deux équipes marquent", it: "Over 2,5 gol molto probabile, entrambe segnano" },
      confidence: "moyen",
      value: true,
      summary: {
        fr: "Djurgården est largement favori (1.36) et c'est justifié : 5ᵉ avec 19 points en 11 matchs, deux victoires de rang (4-2 à Häcken puis 3-0 contre Halmstad) et une domination historique sur Örgryte (8 victoires contre 4, 7 nuls). En face, Örgryte est 15ᵉ avec 9 points, même s'il vient d'arracher un 4-3 contre Häcken qui a mis fin à 91 jours sans victoire en championnat. Mais l'essentiel de l'analyse n'est pas là : à 1.36, le résultat sec n'offre aucune valeur. Toute la valeur est dans les buts. Örgryte a marqué dans ses 6 matchs à domicile et encaissé dans les 6, les 6 derniers matchs de Djurgården ont tous dépassé 2,5 buts, et l'xG combiné attendu tourne autour de 4,01. C'est pourquoi je recommande le +2,5 buts en base de combiné et « Djurgården gagne & les deux marquent » en simple.",
        it: "Il Djurgården è nettamente favorito (1.36) ed è giustificato: 5° con 19 punti in 11 gare, due vittorie di fila (4-2 a Häcken poi 3-0 con l'Halmstad) e un dominio storico sull'Örgryte (8 vittorie contro 4, 7 pareggi). Di fronte, l'Örgryte è 15° con 9 punti, pur avendo appena strappato un 4-3 all'Häcken che ha chiuso 91 giorni senza vittorie in campionato. Ma il cuore dell'analisi non è lì: a 1.36 l'esito secco non offre alcun valore. Tutto il valore è nei gol. L'Örgryte ha segnato in tutte e 6 le gare casalinghe e subito in tutte e 6, le ultime 6 del Djurgården hanno superato 2,5 gol e l'xG combinato atteso è circa 4,01. Per questo consiglio l'over 2,5 come base di multipla e « Djurgården vince & entrambe segnano » in singola."
      },
      basedOn: {
        fr: [
          "Djurgården 5ᵉ (19 pts en 11 matchs) contre Örgryte 15ᵉ (9 pts en 12 matchs)",
          "Djurgården sur deux victoires nettes : 4-2 à Häcken puis 3-0 contre Halmstad",
          "Les 6 derniers matchs de Djurgården en Allsvenskan ont TOUS dépassé 2,5 buts",
          "Örgryte a marqué dans ses 6 matchs à domicile et n'a gardé aucune cage inviolée en 6 réceptions",
          "xG combiné attendu ≈ 4,01 et total de buts le plus probable = 3",
          "Historique favorable : Djurgården 8 victoires, Örgryte 4, 7 nuls"
        ],
        it: [
          "Djurgården 5° (19 punti in 11 gare) contro Örgryte 15° (9 punti in 12)",
          "Djurgården su due vittorie nette: 4-2 a Häcken poi 3-0 con l'Halmstad",
          "Le ultime 6 gare del Djurgården in Allsvenskan hanno TUTTE superato 2,5 gol",
          "L'Örgryte ha segnato in tutte e 6 le gare casalinghe e non ha mai mantenuto la porta inviolata",
          "xG combinato atteso ≈ 4,01 e totale gol più probabile = 3",
          "Precedenti favorevoli: Djurgården 8 vittorie, Örgryte 4, 7 pareggi"
        ]
      },
      against: {
        fr: [
          "À 1.36, la victoire de Djurgården n'offre aucune valeur : inutile de la jouer sèche",
          "Örgryte vient de gagner 4-3 contre Häcken et retrouve de la confiance à domicile",
          "Örgryte est privé de Tobias Sana (suspendu, 3ᵉ carton) — mais il reste coté buteur sur oddschecker, c'est un piège",
          "Un match d'Allsvenskan entre une équipe en confiance et un mal-classé qui se libère reste volatil",
          "Aucune AI Probability sur l'Allsvenskan : les probabilités sont mes estimations, pas des chiffres officiels",
          "Aucune statistique de cartons publiée sur l'arbitre Granit Maqedonci"
        ],
        it: [
          "A 1.36 la vittoria del Djurgården non offre valore: inutile giocarla secca",
          "L'Örgryte ha appena vinto 4-3 con l'Häcken e ritrova fiducia in casa",
          "L'Örgryte è privo di Tobias Sana (squalificato, 3° cartellino) — ma resta quotato marcatore su oddschecker: è una trappola",
          "Una gara di Allsvenskan tra una squadra in fiducia e una in difficoltà che si libera resta volatile",
          "Nessuna AI Probability sull'Allsvenskan: le probabilità sono mie stime, non dati ufficiali",
          "Nessuna statistica cartellini pubblicata sull'arbitro Granit Maqedonci"
        ]
      }
    },

    teams: {
      home: {
        name: { fr: "Örgryte IS", it: "Örgryte IS" }, flag: "🔴", coach: "—",
        lineup: { fr: "Compo non communiquée à l'heure de l'analyse — Tobias Sana (ailier offensif) est suspendu.", it: "Formazione non comunicata al momento dell'analisi — Tobias Sana (ala offensiva) è squalificato." },
        style: { fr: "Équipe qui marque toujours à domicile mais qui encaisse systématiquement : profil offensif mais défense très perméable à Gamla Ullevi.", it: "Squadra che segna sempre in casa ma subisce sistematicamente: profilo offensivo ma difesa molto permeabile al Gamla Ullevi." },
        absences: {
          fr: ["Tobias Sana — suspendu (3ᵉ carton jaune)", "⚠ Sana reste pourtant coté buteur sur oddschecker : ne pas parier sur lui"],
          it: ["Tobias Sana — squalificato (3° cartellino giallo)", "⚠ Sana resta comunque quotato marcatore su oddschecker: non scommetterci"]
        },
        physical: { fr: "Calendrier normal de championnat. Match à domicile, pas de déplacement.", it: "Calendario normale di campionato. Gara in casa, nessuna trasferta." },
        form: { fr: "15ᵉ avec 9 points en 12 matchs. Vient de battre Häcken 4-3, mettant fin à 91 jours sans victoire en championnat.", it: "15° con 9 punti in 12 gare. Ha appena battuto l'Häcken 4-3, chiudendo 91 giorni senza vittorie in campionato." },
        xg: { fr: "A marqué dans 6 matchs sur 6 à domicile ; aucun clean sheet en 6 réceptions. Contribue fortement au scénario « beaucoup de buts ».", it: "Ha segnato in 6 gare su 6 in casa; nessun clean sheet in 6 partite interne. Contribuisce molto allo scenario « tanti gol »." },
        context: { fr: "Zone de relégation en ligne de mire : la victoire contre Häcken peut relancer la confiance, mais l'écart de niveau reste net.", it: "Zona retrocessione all'orizzonte: la vittoria con l'Häcken può rilanciare la fiducia, ma il divario tecnico resta netto." },
        source: "Betshoot / Dailysports / SportsGambler (20/07/2026)"
      },
      away: {
        name: { fr: "Djurgården IF", it: "Djurgården IF" }, flag: "🔵", coach: "—",
        lineup: "Rinne — P. Johansson, Une Larsson, Tenho, M. Larsson — Finndell, Stensson — Aslund, Hegland, Fallenius — Strømland Lien (4-2-3-1, compo probable)",
        style: { fr: "Bloc structuré en 4-2-3-1, volume offensif élevé et efficacité devant : 4-2 puis 3-0 lors des deux dernières sorties.", it: "Blocco strutturato in 4-2-3-1, alto volume offensivo ed efficacia sotto porta: 4-2 poi 3-0 nelle ultime due uscite." },
        absences: {
          fr: ["Aucune absence majeure signalée à l'heure de l'analyse"],
          it: ["Nessuna assenza rilevante segnalata al momento dell'analisi"]
        },
        physical: { fr: "Déplacement Stockholm → Göteborg, trajet interne à la Suède sans surcharge de calendrier.", it: "Trasferta Stoccolma → Göteborg, spostamento interno alla Svezia senza sovraccarico di calendario." },
        form: { fr: "5ᵉ avec 19 points en 11 matchs. Deux victoires consécutives : 4-2 en déplacement à Häcken et 3-0 contre Halmstad.", it: "5° con 19 punti in 11 gare. Due vittorie consecutive: 4-2 in trasferta a Häcken e 3-0 con l'Halmstad." },
        xg: { fr: "Les 6 derniers matchs en Allsvenskan ont tous dépassé 2,5 buts. Coté à 1.06 pour marquer et 1.34 pour inscrire au moins 2 buts.", it: "Le ultime 6 gare in Allsvenskan hanno tutte superato 2,5 gol. Quotato 1.06 per segnare e 1.34 per almeno 2 gol." },
        context: { fr: "Série en cours et ambition de recoller au haut de tableau : l'équipe aborde ce déplacement en pleine confiance.", it: "Serie aperta e ambizione di riavvicinarsi alla vetta: la squadra affronta la trasferta in piena fiducia." },
        source: "SportsGambler / Betshoot / Footballwhispers (20/07/2026)"
      }
    },

    keyPlayers: [
      { team: "🔵", name: "Kristian Strømland Lien", pos: { fr: "Attaquant", it: "Attaccante" }, stat: { fr: "Le plus court sur « 2 buts ou plus » (5.50) et hat-trick (21.0)", it: "Il più quotato su « doppietta » (5.50) e tripletta (21.0)" }, note: { fr: "Le point de référence offensif de Djurgården.", it: "Il riferimento offensivo del Djurgården." } },
      { team: "🔵", name: "Bo Asulv Hegland", pos: { fr: "Milieu offensif", it: "Trequartista" }, stat: { fr: "Coté 8.50 sur « 2 buts ou plus »", it: "Quotato 8.50 su « doppietta »" }, note: { fr: "Deuxième menace offensive du 4-2-3-1.", it: "Seconda minaccia offensiva del 4-2-3-1." } },
      { team: "🔵", name: "Hampus Finndell", pos: { fr: "Milieu défensif", it: "Mediano" }, stat: { fr: "Coté 3.10 sur « joueur cartonné »", it: "Quotato 3.10 su « giocatore ammonito »" }, note: { fr: "Récupérateur, profil à cartons.", it: "Recuperatore, profilo da cartellino." } },
      { team: "🔴", name: "Tobias Sana", pos: { fr: "Ailier offensif", it: "Ala offensiva" }, stat: { fr: "SUSPENDU (3ᵉ carton jaune)", it: "SQUALIFICATO (3° cartellino giallo)" }, note: { fr: "⚠ Toujours coté buteur sur oddschecker alors qu'il ne jouera pas.", it: "⚠ Ancora quotato marcatore su oddschecker pur non giocando." } },
      { team: "🔴", name: "Leon Hien", pos: { fr: "Défenseur", it: "Difensore" }, stat: { fr: "Le plus court sur « joueur cartonné » (2.50)", it: "Il più quotato su « giocatore ammonito » (2.50)" }, note: { fr: "Profil à cartons face à une attaque rapide.", it: "Profilo da cartellino contro un attacco rapido." } },
      { team: "🔴", name: "Joel Asoro", pos: { fr: "Attaquant", it: "Attaccante" }, stat: { fr: "Coté 10.0 sur « 2 buts ou plus »", it: "Quotato 10.0 su « doppietta »" }, note: { fr: "Principale option offensive d'Örgryte sans Sana.", it: "Principale opzione offensiva dell'Örgryte senza Sana." } }
    ],

    matchInfo: {
      h2h: { fr: "Djurgården domine l'historique : 8 victoires contre 4 à Örgryte, avec 7 matchs nuls. Le rapport de force est constant sur la durée.", it: "Il Djurgården domina i precedenti: 8 vittorie contro 4 dell'Örgryte, con 7 pareggi. Il rapporto di forza è costante nel tempo." },
      referee: { fr: "Granit Maqedonci. Aucune statistique publiée de cartons ou penaltys pour cet arbitre à l'heure de l'analyse — impossible d'en tirer un angle sur les marchés cartons.", it: "Granit Maqedonci. Nessuna statistica pubblicata su cartellini o rigori per questo arbitro al momento dell'analisi — impossibile ricavarne un angolo sui mercati cartellini." },
      stake: { fr: "13ᵉ journée d'Allsvenskan. Djurgården (5ᵉ, 19 pts) veut enchaîner une 3ᵉ victoire et se rapprocher du podium ; Örgryte (15ᵉ, 9 pts) joue son maintien et vient de relancer sa saison contre Häcken.", it: "13ª giornata di Allsvenskan. Il Djurgården (5°, 19 pt) vuole la 3ª vittoria di fila e avvicinare il podio; l'Örgryte (15°, 9 pt) gioca la salvezza e ha appena rilanciato la stagione con l'Häcken." },
      external: { fr: "Match en soirée au Gamla Ullevi de Göteborg, en plein été suédois : conditions douces et pelouse en bon état, aucun facteur météo pénalisant attendu. Déplacement interne à la Suède pour Djurgården.", it: "Gara serale al Gamla Ullevi di Göteborg, in piena estate svedese: condizioni miti e campo in buono stato, nessun fattore meteo penalizzante atteso. Trasferta interna alla Svezia per il Djurgården." },
      supercomputer: { fr: "Le marché est très tranché : Djurgården ≈70%, nul ≈18%, Örgryte ≈12%. C'est justement pour cela que la valeur est dans les marchés de buts, pas sur le résultat.", it: "Il mercato è molto netto: Djurgården ≈70%, pareggio ≈18%, Örgryte ≈12%. Proprio per questo il valore è nei mercati dei gol, non sull'esito." }
    },

    sources: [
      { label: "Betshoot — preview & stats", url: "https://www.betshoot.com/football/19635948-%C3%96rgryte-vs-Djurg%C3%A5rden-prediction/" },
      { label: "SportsGambler — lineups & odds", url: "https://www.sportsgambler.com/betting-tips/football/orgryte-ff-vs-djurgarden-prediction-lineups-odds-2026-07-20/" },
      { label: "Dailysports — forme & absences", url: "https://dailysports.net/predictions/the-visitors-are-picking-up-steam-prediction-for-rgryte-vs-djurgrden/" },
      { label: "Footballwhispers — preview", url: "https://footballwhispers.com/blog/orgryte-is-vs-djurgardens-if-prediction-20-07-2026/" },
      { label: "oddschecker — cotes du match", url: "https://www.oddschecker.com/football/sweden/allsvenskan/orgryte-v-djurgarden/winner" }
    ]
  },
  {
    id: "kalmar-malmo-2026-07-20",
    competition: { fr: "Allsvenskan (Suède) — 13ᵉ journée", it: "Allsvenskan (Svezia) — 13ª giornata" },
    date: { fr: "Lundi 20 juillet 2026", it: "Lunedì 20 luglio 2026" },
    kickoff: { fr: "19:00 (heure de Paris)", it: "19:00 (ora italiana)" },
    venue: "Guldfågeln Arena, Kalmar (Suède)",
    home: { name: { fr: "Kalmar FF", it: "Kalmar FF" }, flag: "🇸🇪" },
    away: { name: { fr: "Malmö FF", it: "Malmö FF" }, flag: "🔵" },

    odds: {
      market: { fr: "Résultat du match (1N2)", it: "Esito finale (1X2)" },
      source: "oddschecker.com",
      checkedAt: "20/07/2026",
      aiProb: { home: 36, draw: 27, away: 41 },
      best: {
        home: { dec: 2.75, frac: "7/4", book: "meilleure cote du comparateur oddschecker" },
        draw: { dec: 3.70, frac: "27/10", book: "meilleure cote du comparateur oddschecker" },
        away: { dec: 2.45, frac: "16/11", book: "meilleure cote du comparateur oddschecker" }
      }
    },

    safeBet: {
      sel: { fr: "Les deux équipes marquent — Oui (BTTS)", it: "Entrambe le squadre segnano — Sì (BTTS)" },
      dec: 1.57, frac: "4/7", book: "top des bookmakers (oddschecker)", ai: 66,
      why: {
        fr: "Retenu après avoir passé les 21 marchés de la page. Le marché des buts par équipe le confirme directement : Kalmar marque à 1.25 (≈80%) et Malmö marque à 1.22 (≈82%) — soit ≈66% que les deux marquent, pour une cote de 1.57. Malmö plante 2,08 buts/match et Kalmar en encaisse 1,42 à domicile tout en marquant dans la plupart de ses matchs. Pile dans ta cible ~1,50 et bien plus justifié qu'un double chance basique.",
        it: "Scelto dopo aver passato i 21 mercati della pagina. Il mercato dei gol per squadra lo conferma: il Kalmar segna a 1.25 (≈80%) e il Malmö a 1.22 (≈82%) — cioè ≈66% che segnino entrambe, per una quota di 1.57. Il Malmö segna 2,08 gol/partita e il Kalmar ne subisce 1,42 in casa pur segnando quasi sempre. Perfettamente nel tuo obiettivo ~1,50 e molto più giustificato di una doppia chance banale."
      }
    },
    simpleBet: {
      sel: { fr: "Erik Botheim buteur à tout moment", it: "Erik Botheim marcatore in qualsiasi momento" },
      dec: 2.38, frac: "11/8", book: "top des bookmakers (oddschecker)", ai: 50,
      why: {
        fr: "Le meilleur value de la page : Botheim est le meilleur buteur de Malmö avec 10 buts en 12 matchs (≈0,8/match), son équipe reste sur 3 victoires et affronte la défense de Kalmar qui encaisse 1,42 but/match. Ma probabilité estimée est d'environ 50% pour une cote de 2.38 (proba implicite 42%) → environ +19% de valeur. ⚠ Attention : oddschecker n'affiche pas d'AI Probability sur l'Allsvenskan, cette probabilité est MON estimation à partir des stats, pas un chiffre officiel.",
        it: "Il miglior value della pagina: Botheim è il capocannoniere del Malmö con 10 gol in 12 gare (≈0,8/partita), la squadra viene da 3 vittorie e affronta la difesa del Kalmar che subisce 1,42 gol/partita. La mia probabilità stimata è circa 50% per una quota di 2.38 (prob. implicita 42%) → circa +19% di valore. ⚠ Attenzione: oddschecker non mostra l'AI Probability sull'Allsvenskan, questa probabilità è una MIA stima dai dati, non un dato ufficiale."
      }
    },

    markets: [
      {
        category: { fr: "Résultat, doubles chances & remboursé si nul", it: "Esito, doppie chance & rimborso se pareggio" },
        rows: [
          { sel: { fr: "Kalmar FF (1)", it: "Kalmar FF (1)" }, dec: 2.75, frac: "7/4" },
          { sel: { fr: "Match nul (N)", it: "Pareggio (X)" }, dec: 3.70, frac: "27/10" },
          { sel: { fr: "Malmö FF (2)", it: "Malmö FF (2)" }, dec: 2.45, frac: "16/11" },
          { sel: { fr: "Double chance — Malmö ou nul (N2)", it: "Doppia chance — Malmö o pareggio (X2)" }, dec: 1.45, frac: "9/20" },
          { sel: { fr: "Double chance — Kalmar ou nul (1N)", it: "Doppia chance — Kalmar o pareggio (1X)" }, dec: 1.57, frac: "4/7" },
          { sel: { fr: "Double chance — Kalmar ou Malmö (12)", it: "Doppia chance — Kalmar o Malmö (12)" }, dec: 1.29, frac: "2/7" },
          { sel: { fr: "Malmö remboursé si nul (Draw No Bet)", it: "Malmö rimborso se pareggio (DNB)" }, dec: 1.80, frac: "4/5" },
          { sel: { fr: "Kalmar remboursé si nul (Draw No Bet)", it: "Kalmar rimborso se pareggio (DNB)" }, dec: 2.05, frac: "21/20" }
        ]
      },
      {
        category: { fr: "Buts par équipe & BTTS (le cœur de l'analyse)", it: "Gol per squadra & BTTS (il cuore dell'analisi)" },
        note: { fr: "Les deux équipes ont une très forte probabilité de marquer : c'est de là que sort le pari safe.", it: "Entrambe hanno un'altissima probabilità di segnare: da qui nasce la scommessa sicura." },
        rows: [
          { sel: { fr: "Kalmar marque (plus de 0,5 but)", it: "Segna il Kalmar (oltre 0,5 gol)" }, dec: 1.25, frac: "1/4" },
          { sel: { fr: "Malmö marque (plus de 0,5 but)", it: "Segna il Malmö (oltre 0,5 gol)" }, dec: 1.22, frac: "2/9" },
          { sel: { fr: "Malmö plus de 1,5 but (2+ buts)", it: "Malmö oltre 1,5 gol (2+ gol)" }, dec: 2.00, frac: "1/1" },
          { sel: { fr: "Kalmar plus de 1,5 but (2+ buts)", it: "Kalmar oltre 1,5 gol (2+ gol)" }, dec: 2.25, frac: "5/4" },
          { sel: { fr: "Les deux équipes marquent — Oui", it: "Entrambe segnano — Sì" }, dec: 1.57, frac: "4/7" },
          { sel: { fr: "Les deux équipes marquent — Non", it: "Entrambe segnano — No" }, dec: 2.50, frac: "6/4" },
          { sel: { fr: "Malmö gagne & les deux marquent", it: "Vince il Malmö & entrambe segnano" }, dec: 4.33, frac: "10/3" }
        ]
      },
      {
        category: { fr: "Nombre de buts total & marge de victoire", it: "Numero di gol totali & scarto" },
        note: { fr: "Match très serré selon le marché : le nul est la marge la plus probable, 2 ou 3 buts le total le plus probable.", it: "Gara molto equilibrata secondo il mercato: il pareggio è lo scarto più probabile, 2 o 3 gol il totale più probabile." },
        rows: [
          { sel: { fr: "Total 2 buts exact (le plus probable)", it: "Totale 2 gol esatti (il più probabile)" }, dec: 4.20, frac: "16/5" },
          { sel: { fr: "Total 3 buts exact", it: "Totale 3 gol esatti" }, dec: 4.35, frac: "57/17" },
          { sel: { fr: "Total 4 buts exact", it: "Totale 4 gol esatti" }, dec: 5.50, frac: "9/2" },
          { sel: { fr: "Total 1 but exact", it: "Totale 1 gol esatto" }, dec: 6.50, frac: "11/2" },
          { sel: { fr: "Match nul (marge la plus probable)", it: "Pareggio (scarto più probabile)" }, dec: 4.20, frac: "16/5" },
          { sel: { fr: "Malmö gagne par 1 but", it: "Malmö vince di 1 gol" }, dec: 4.50, frac: "7/2" },
          { sel: { fr: "Kalmar gagne par 1 but", it: "Kalmar vince di 1 gol" }, dec: 4.75, frac: "15/4" }
        ]
      },
      {
        category: { fr: "Mi-temps (résultat, score 1ère MT, MT/fin)", it: "Primo tempo (esito, risultato 1° tempo, PT/finale)" },
        rows: [
          { sel: { fr: "Résultat mi-temps : Nul (favori)", it: "Esito primo tempo: Pareggio (favorito)" }, dec: 2.40, frac: "7/5" },
          { sel: { fr: "Résultat mi-temps : Malmö", it: "Esito primo tempo: Malmö" }, dec: 3.00, frac: "2/1" },
          { sel: { fr: "Résultat mi-temps : Kalmar", it: "Esito primo tempo: Kalmar" }, dec: 3.30, frac: "23/10" },
          { sel: { fr: "Score 1ère MT : 0-0 (favori)", it: "Risultato 1° tempo: 0-0 (favorito)" }, dec: 3.50, frac: "5/2" },
          { sel: { fr: "Mi-temps/fin : Malmö / Malmö", it: "PT/Finale: Malmö / Malmö" }, dec: 4.00, frac: "3/1" },
          { sel: { fr: "Mi-temps/fin : Nul / Malmö", it: "PT/Finale: Pareggio / Malmö" }, dec: 6.50, frac: "11/2" }
        ]
      },
      {
        category: { fr: "Score exact & premier but", it: "Risultato esatto & primo gol" },
        rows: [
          { sel: { fr: "Nul 1-1 (score le plus probable)", it: "Pareggio 1-1 (risultato più probabile)" }, dec: 7.50, frac: "13/2" },
          { sel: { fr: "Malmö 2-1", it: "Malmö 2-1" }, dec: 10.0, frac: "9/1" },
          { sel: { fr: "Kalmar 2-1", it: "Kalmar 2-1" }, dec: 10.0, frac: "9/1" },
          { sel: { fr: "Malmö 1-0", it: "Malmö 1-0" }, dec: 11.0, frac: "10/1" },
          { sel: { fr: "Malmö marque en premier", it: "Segna per primo il Malmö" }, dec: 1.91, frac: "10/11" },
          { sel: { fr: "Kalmar marque en premier", it: "Segna per primo il Kalmar" }, dec: 2.05, frac: "21/20" },
          { sel: { fr: "Premier but entre 0 et 10 min", it: "Primo gol tra 0 e 10 min" }, dec: 4.50, frac: "7/2" }
        ]
      },
      {
        category: { fr: "Buteurs (à tout moment, premier, 2+)", it: "Marcatori (in qualsiasi momento, primo, 2+)" },
        rows: [
          { sel: "Erik Botheim (Malmö) — à tout moment", dec: 2.38, frac: "11/8" },
          { sel: "Charlie Rosenqvist (Kalmar) — à tout moment", dec: 3.25, frac: "9/4" },
          { sel: "Anthony Olusanya (Kalmar) — à tout moment", dec: 3.30, frac: "23/10" },
          { sel: "Diego Garcia — à tout moment", dec: 3.40, frac: "12/5" },
          { sel: "Sead Haksabanovic (Malmö) — à tout moment", dec: 4.00, frac: "3/1" },
          { sel: "Emmanuel Ekong (Malmö) — à tout moment", dec: 4.00, frac: "3/1" },
          { sel: "Erik Botheim — premier buteur", dec: 5.50, frac: "9/2" },
          { sel: "Erik Botheim — 2 buts ou plus", dec: 8.00, frac: "7/1" }
        ]
      },
      {
        category: { fr: "Cartons, clean sheet & corners", it: "Cartellini, clean sheet & corner" },
        note: { fr: "⚠ Piège repéré : oddschecker liste encore Malcolm Stolt (Kalmar), Anders Christiansen, Gabriel Busanello et Yanis Karabelyov (Malmö) dans les buteurs/cartons alors qu'ils sont annoncés absents. Ne pas parier sur eux.", it: "⚠ Trappola rilevata: oddschecker elenca ancora Malcolm Stolt (Kalmar), Anders Christiansen, Gabriel Busanello e Yanis Karabelyov (Malmö) tra marcatori/cartellini benché siano dati assenti. Non scommetterci." },
        rows: [
          { sel: { fr: "Otto Rosengren (Malmö) — cartonné", it: "Otto Rosengren (Malmö) — ammonito" }, dec: 2.88, frac: "15/8" },
          { sel: { fr: "Sead Haksabanovic — cartonné", it: "Sead Haksabanovic — ammonito" }, dec: 3.30, frac: "23/10" },
          { sel: { fr: "Melker Hallberg (Kalmar) — cartonné", it: "Melker Hallberg (Kalmar) — ammonito" }, dec: 3.80, frac: "14/5" },
          { sel: { fr: "Malmö gagne sans encaisser", it: "Malmö vince senza subire" }, dec: 5.00, frac: "4/1" },
          { sel: { fr: "Kalmar gagne sans encaisser", it: "Kalmar vince senza subire" }, dec: 5.75, frac: "19/4" },
          { sel: { fr: "Corners & autres lignes — voir oddschecker", it: "Corner e altre linee — vedi oddschecker" }, dec: null, frac: "voir oddschecker" }
        ]
      }
    ],

    valueBets: [
      { label: { fr: "Erik Botheim buteur à tout moment", it: "Erik Botheim marcatore in qualsiasi momento" }, dec: 2.38, ai: 50,
        note: { fr: "Meilleur buteur de Malmö (10 buts en 12 matchs) contre une défense qui encaisse 1,42 but/match. Proba estimée par mes soins ~50% vs 42% implicite → le meilleur edge de la page.", it: "Capocannoniere del Malmö (10 gol in 12 gare) contro una difesa che subisce 1,42 gol/partita. Probabilità da me stimata ~50% vs 42% implicita → il miglior edge della pagina." } },
      { label: { fr: "Malmö plus de 1,5 but", it: "Malmö oltre 1,5 gol" }, dec: 2.00, ai: 52,
        note: { fr: "Malmö marque 2,08 buts/match cette saison et reste sur 3 victoires ; Kalmar encaisse 1,42 par match. Léger value à 2.00.", it: "Il Malmö segna 2,08 gol/partita e viene da 3 vittorie; il Kalmar ne subisce 1,42. Leggero value a 2.00." } },
      { label: { fr: "Les deux équipes marquent — Oui", it: "Entrambe segnano — Sì" }, dec: 1.57, ai: 66,
        note: { fr: "Directement déduit des marchés « buts par équipe » : Kalmar marque à 1.25 et Malmö à 1.22, soit ≈66% conjoint pour une cote de 1.57. La base safe du combiné.", it: "Dedotto direttamente dai mercati « gol per squadra »: Kalmar segna a 1.25 e Malmö a 1.22, cioè ≈66% congiunto per una quota di 1.57. La base sicura della multipla." } }
    ],

    prediction: {
      pick: { fr: "Victoire Malmö (serrée)", it: "Vittoria Malmö (di misura)" },
      pickShort: "Malmö FF",
      score: "2 – 1",
      goals: { fr: "Les deux équipes marquent, plus de 2,5 buts légèrement favori", it: "Entrambe segnano, over 2,5 gol leggermente favorito" },
      confidence: "faible",
      value: true,
      summary: {
        fr: "Malmö est favori logique (2.45) : 6ᵉ avec 19 points, 3 victoires de suite, 2,08 buts marqués par match, et une domination historique nette sur Kalmar (11 victoires sur les 20 derniers duels contre 4). En face, Kalmar est 12ᵉ avec 13 points et a perdu 2 de ses 3 derniers matchs. MAIS la confiance reste « faible » et c'est important : Malmö se déplace avec cinq absents (Djuric suspendu, Busanello, Anders Christiansen, Pontus Jansson et Karabelyov blessés) alors que Kalmar est quasiment au complet et joue à domicile. Le marché confirme cette incertitude : le nul est la marge de victoire la plus probable et le 1-1 le score le plus probable. C'est pourquoi les meilleurs paris de ce match ne sont pas sur le résultat mais sur les buts (BTTS) et sur Botheim.",
        it: "Il Malmö è favorito logico (2.45): 6° con 19 punti, 3 vittorie di fila, 2,08 gol segnati a partita e un netto dominio storico sul Kalmar (11 vittorie negli ultimi 20 confronti contro 4). Di fronte, il Kalmar è 12° con 13 punti e ha perso 2 delle ultime 3. MA la fiducia resta « bassa » ed è importante: il Malmö viaggia con cinque assenti (Djuric squalificato, Busanello, Anders Christiansen, Pontus Jansson e Karabelyov infortunati) mentre il Kalmar è quasi al completo e gioca in casa. Il mercato conferma l'incertezza: il pareggio è lo scarto più probabile e l'1-1 il risultato più probabile. Per questo le migliori scommesse non sono sull'esito ma sui gol (BTTS) e su Botheim."
      },
      basedOn: {
        fr: [
          "Malmö sur 3 victoires consécutives, 2,08 buts marqués par match (25 buts en 12 journées)",
          "Kalmar 12ᵉ, 13 points, 2 défaites sur les 3 derniers matchs, 1,17 but marqué et 1,42 encaissé par match",
          "Domination historique de Malmö : 11 victoires sur les 20 derniers duels (Kalmar 4, 5 nuls)",
          "Marchés « buts par équipe » : Kalmar marque à 1.25 et Malmö à 1.22 → BTTS très probable",
          "Botheim (10 buts) et Haksabanovic (5 passes) contre une défense qui encaisse à chaque match"
        ],
        it: [
          "Malmö su 3 vittorie consecutive, 2,08 gol segnati a partita (25 gol in 12 giornate)",
          "Kalmar 12°, 13 punti, 2 sconfitte nelle ultime 3, 1,17 gol segnati e 1,42 subiti a partita",
          "Dominio storico del Malmö: 11 vittorie negli ultimi 20 confronti (Kalmar 4, 5 pareggi)",
          "Mercati « gol per squadra »: Kalmar segna a 1.25 e Malmö a 1.22 → BTTS molto probabile",
          "Botheim (10 gol) e Haksabanovic (5 assist) contro una difesa che subisce ogni partita"
        ]
      },
      against: {
        fr: [
          "Malmö privé de 5 joueurs : Djuric (suspendu), Busanello, Anders Christiansen, Pontus Jansson et Karabelyov (blessés)",
          "Kalmar quasiment au complet (seul Stolt absent) et solide à domicile au Guldfågeln Arena",
          "Le marché voit un match très serré : le nul est la marge la plus probable et le 1-1 le score favori",
          "Aucune AI Probability disponible sur l'Allsvenskan : les probabilités sont mes estimations, pas des chiffres officiels",
          "Arbitre non communiqué à l'heure de l'analyse : impossible d'exploiter une tendance cartons"
        ],
        it: [
          "Malmö privo di 5 giocatori: Djuric (squalificato), Busanello, Anders Christiansen, Pontus Jansson e Karabelyov (infortunati)",
          "Kalmar quasi al completo (solo Stolt assente) e solido in casa alla Guldfågeln Arena",
          "Il mercato vede una gara molto equilibrata: il pareggio è lo scarto più probabile e l'1-1 il risultato favorito",
          "Nessuna AI Probability disponibile sull'Allsvenskan: le probabilità sono mie stime, non dati ufficiali",
          "Arbitro non comunicato al momento dell'analisi: impossibile sfruttare una tendenza cartellini"
        ]
      }
    },

    teams: {
      home: {
        name: { fr: "Kalmar FF", it: "Kalmar FF" }, flag: "🇸🇪", coach: "—",
        lineup: "Brolin — Hallberg, Keita, Larsson, Jansson — Gustafsson, Gojani, Magashy — Rosenqvist, Sagoe, Olusanya (4-4-2, compo probable)",
        style: { fr: "Bloc compact à domicile, jeu direct vers Olusanya et Rosenqvist ; efficacité offensive limitée (1,17 but/match).", it: "Blocco compatto in casa, gioco diretto su Olusanya e Rosenqvist; efficacia offensiva limitata (1,17 gol/partita)." },
        absences: {
          fr: ["Malcolm Stolt — seul absent annoncé", "Groupe quasiment au complet"],
          it: ["Malcolm Stolt — unico assente annunciato", "Rosa quasi al completo"]
        },
        physical: { fr: "Calendrier normal de championnat, pas de surcharge signalée. Avantage du terrain au Guldfågeln Arena.", it: "Calendario normale di campionato, nessun sovraccarico segnalato. Vantaggio del campo alla Guldfågeln Arena." },
        form: { fr: "4 victoires, 1 nul, 7 défaites en 2026. 2 défaites sur les 3 derniers matchs. 12ᵉ avec 13 points en 12 journées.", it: "4 vittorie, 1 pareggio, 7 sconfitte nel 2026. 2 sconfitte nelle ultime 3. 12° con 13 punti in 12 giornate." },
        xg: { fr: "14 buts marqués (1,17/match) et 17 encaissés (1,42/match) : attaque faible, défense perméable.", it: "14 gol segnati (1,17/partita) e 17 subiti (1,42/partita): attacco debole, difesa permeabile." },
        context: { fr: "Besoin de points pour s'éloigner de la zone rouge ; le match à domicile contre un gros est une occasion de relancer la saison.", it: "Serve punti per allontanarsi dalla zona calda; la gara casalinga contro una big è l'occasione per rilanciare la stagione." },
        source: "Soccer365 / Dailysports / EaglePredict (20/07/2026)"
      },
      away: {
        name: { fr: "Malmö FF", it: "Malmö FF" }, flag: "🔵", coach: "—",
        lineup: "Olsen — Larsen, Olsson, Palsson, Åstrand — Rosengren — Haksabanovic, Skogmar, Busuladzic, Ekong — Botheim (4-1-4-1, compo probable)",
        style: { fr: "Possession et volume offensif, transitions par Haksabanovic ; meilleure attaque des deux équipes (2,08 buts/match).", it: "Possesso e volume offensivo, transizioni via Haksabanovic; miglior attacco delle due squadre (2,08 gol/partita)." },
        absences: {
          fr: ["Andrej Djuric — suspendu (cartons)", "Gabriel Busanello — blessé", "Anders Christiansen — blessé", "Pontus Jansson — blessé", "Yanis Karabelyov — blessé"],
          it: ["Andrej Djuric — squalificato (cartellini)", "Gabriel Busanello — infortunato", "Anders Christiansen — infortunato", "Pontus Jansson — infortunato", "Yanis Karabelyov — infortunato"]
        },
        physical: { fr: "Déplacement à Kalmar (traversée du sud de la Suède) mais calendrier de championnat classique. Effectif amputé de 5 éléments.", it: "Trasferta a Kalmar (attraversando il sud della Svezia) ma calendario di campionato classico. Rosa privata di 5 elementi." },
        form: { fr: "6 victoires, 1 nul, 5 défaites en 12 journées, mais 3 victoires consécutives en cours et une 4ᵉ visée. 6ᵉ avec 19 points.", it: "6 vittorie, 1 pareggio, 5 sconfitte in 12 giornate, ma 3 vittorie consecutive in corso e la 4ª nel mirino. 6° con 19 punti." },
        xg: { fr: "25 buts marqués en 12 journées (2,08/match) : de loin la meilleure production offensive du duel.", it: "25 gol in 12 giornate (2,08/partita): di gran lunga la miglior produzione offensiva del confronto." },
        context: { fr: "Série en cours et ambition de remonter au classement ; mais un onze remanié par les absences.", it: "Serie aperta e ambizione di risalire in classifica; ma undici rimaneggiato dalle assenze." },
        source: "Soccer365 / Dailysports / EaglePredict (20/07/2026)"
      }
    },

    keyPlayers: [
      { team: "🔵", name: "Erik Botheim", pos: { fr: "Attaquant", it: "Attaccante" }, stat: { fr: "10 buts — meilleur buteur de Malmö", it: "10 gol — capocannoniere del Malmö" }, note: { fr: "La principale menace, base du pari simple.", it: "La minaccia principale, base della scommessa singola." } },
      { team: "🔵", name: "Sead Haksabanovic", pos: { fr: "Milieu offensif", it: "Trequartista" }, stat: { fr: "5 passes décisives", it: "5 assist" }, note: { fr: "Créateur en chef ; aussi coté sur le marché cartons.", it: "Creatore principale; quotato anche sul mercato cartellini." } },
      { team: "🔵", name: "Otto Rosengren", pos: { fr: "Milieu défensif", it: "Mediano" }, stat: { fr: "Le plus coté sur « joueur cartonné » (2.88)", it: "Il più quotato su « giocatore ammonito » (2.88)" }, note: { fr: "Profil à cartons dans un match à enjeu.", it: "Profilo da cartellino in una gara con posta." } },
      { team: "🇸🇪", name: "Charlie Rosenqvist", pos: { fr: "Attaquant", it: "Attaccante" }, stat: { fr: "5 buts — meilleur buteur de Kalmar", it: "5 gol — capocannoniere del Kalmar" }, note: { fr: "Coté 3.25 buteur, l'option offensive n°1 de Kalmar.", it: "Quotato 3.25 marcatore, opzione offensiva n°1 del Kalmar." } },
      { team: "🇸🇪", name: "Charles Sagoe Jr", pos: { fr: "Ailier", it: "Ala" }, stat: { fr: "7 passes décisives — meilleur passeur de Kalmar", it: "7 assist — miglior assistman del Kalmar" }, note: { fr: "Le fournisseur principal des occasions de Kalmar.", it: "Il principale rifornitore delle occasioni del Kalmar." } },
      { team: "🇸🇪", name: "Anthony Olusanya", pos: { fr: "Attaquant", it: "Attaccante" }, stat: { fr: "Coté 3.30 buteur à tout moment", it: "Quotato 3.30 marcatore" }, note: { fr: "Deuxième option offensive, participe au BTTS.", it: "Seconda opzione offensiva, contribuisce al BTTS." } }
    ],

    matchInfo: {
      h2h: { fr: "49 confrontations depuis 2004 : Malmö 25 victoires, Kalmar 12, 12 nuls. Sur les 20 derniers duels : Malmö 11, Kalmar 4, 5 nuls. Domination nette de Malmö sur la durée.", it: "49 confronti dal 2004: Malmö 25 vittorie, Kalmar 12, 12 pareggi. Negli ultimi 20: Malmö 11, Kalmar 4, 5 pareggi. Netto dominio del Malmö nel tempo." },
      referee: { fr: "Arbitre non communiqué au moment de l'analyse — impossible d'exploiter une tendance cartons/penaltys. Le marché « joueur cartonné » reste disponible (Rosengren 2.88 le plus coté).", it: "Arbitro non comunicato al momento dell'analisi — impossibile sfruttare una tendenza cartellini/rigori. Il mercato « giocatore ammonito » resta disponibile (Rosengren 2.88 il più quotato)." },
      stake: { fr: "13ᵉ journée d'Allsvenskan. Malmö (6ᵉ, 19 pts) vise une 4ᵉ victoire de suite et la remontée vers le haut de tableau ; Kalmar (12ᵉ, 13 pts) doit prendre des points pour s'éloigner de la zone dangereuse.", it: "13ª giornata di Allsvenskan. Il Malmö (6°, 19 pt) punta alla 4ª vittoria di fila e alla risalita; il Kalmar (12°, 13 pt) deve fare punti per allontanarsi dalla zona calda." },
      external: { fr: "Match en soirée au Guldfågeln Arena, en plein été suédois : conditions douces, pelouse en bon état, pas de facteur météo majeur attendu. Déplacement interne à la Suède pour Malmö, sans fatigue particulière.", it: "Gara serale alla Guldfågeln Arena, in piena estate svedese: condizioni miti, campo in buono stato, nessun fattore meteo rilevante atteso. Trasferta interna alla Svezia per il Malmö, senza particolare stanchezza." },
      supercomputer: { fr: "Le marché donne Malmö favori (≈41%) devant Kalmar (≈36%) et le nul (≈27%) — un des matchs les plus ouverts analysés jusqu'ici.", it: "Il mercato dà il Malmö favorito (≈41%) davanti al Kalmar (≈36%) e al pareggio (≈27%) — una delle gare più aperte analizzate finora." }
    },

    sources: [
      { label: "Soccer365 — team news & lineups", url: "https://soccer365.net/live/match-kalmar-malme-smotret-onlayn/" },
      { label: "Dailysports — preview & absences", url: "https://dailysports.net/predictions/home-fortress-versus-in-form-favorite-prediction-for-kalmar-vs-malmo/" },
      { label: "EaglePredict — stats & forme", url: "https://eaglepredict.com/predictions/match/kalmar-vs-malmo-ff-prediction-allsvenskan-20-07-2026/" },
      { label: "SoccerPunter — H2H", url: "https://www.soccerpunter.com/h2h/Kalmar-vs-Malmoe-FF/432/354/" },
      { label: "oddschecker — cotes du match", url: "https://www.oddschecker.com/football/sweden/allsvenskan/kalmar-ff-v-malmo-ff/winner" }
    ]
  },
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
      sel: { fr: "Lionel Messi — plus de 0,5 tir cadré", it: "Lionel Messi — oltre 0,5 tiri in porta" },
      dec: 1.40, frac: "2/5", book: "top des bookmakers (oddschecker)", ai: 82,
      why: {
        fr: "Le pari le plus SÛR de toute la page, choisi après avoir passé en revue chaque marché (pas juste un DNB). Le marché « tirs cadrés » est le plus fiable pour un combiné : Messi cadre au moins un tir dans ~86% des cas selon l'AI d'oddschecker. Deux options selon la cote voulue — la version la plus sûre : Messi +0,5 tir cadré à 1.25 (AI 86%) ; la version ~1,40 retenue ici (proche de ta cible 1,50) reste très fiable. Alternatives équivalentes : Lamine Yamal +0,5 tir cadré (1.40) ou Mikel Oyarzabal +0,5 tir cadré (1.53), les deux principaux tireurs espagnols.",
        it: "La scommessa più SICURA di tutta la pagina, scelta dopo aver passato ogni mercato (non solo un DNB). Il mercato « tiri in porta » è il più affidabile per una multipla: Messi centra almeno un tiro in porta nel ~86% dei casi secondo l'AI di oddschecker. Due opzioni secondo la quota: la più sicura è Messi +0,5 tiri in porta a 1.25 (AI 86%); la versione ~1,40 qui scelta (vicina al tuo obiettivo 1,50) resta molto affidabile. Alternative equivalenti: Lamine Yamal +0,5 tiri in porta (1.40) o Mikel Oyarzabal +0,5 tiri in porta (1.53), i due principali tiratori spagnoli."
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
        category: { fr: "Résultat, doubles chances & vainqueur final", it: "Esito, doppie chance & vincitore finale" },
        rows: [
          { sel: { fr: "Espagne (1)", it: "Spagna (1)" }, dec: 2.35, frac: "27/20", ai: "50%" },
          { sel: { fr: "Match nul (N)", it: "Pareggio (X)" }, dec: 3.20, frac: "11/5", ai: "27%" },
          { sel: { fr: "Argentine (2)", it: "Argentina (2)" }, dec: 3.80, frac: "14/5", ai: "23%" },
          { sel: { fr: "Espagne remboursé si nul (Draw No Bet)", it: "Spagna rimborso se pareggio (DNB)" }, dec: 1.57, frac: "4/7", ai: "~68%" },
          { sel: { fr: "Espagne championne du monde (prolong./tab incluses)", it: "Spagna campione del mondo (suppl./rigori inclusi)" }, dec: 1.70, frac: "7/10" },
          { sel: { fr: "Argentine championne du monde (prolong./tab incluses)", it: "Argentina campione del mondo (suppl./rigori inclusi)" }, dec: 2.40, frac: "7/5" }
        ]
      },
      {
        category: { fr: "Tirs cadrés (le marché le plus fiable)", it: "Tiri in porta (il mercato più affidabile)" },
        note: { fr: "Marché idéal pour des bases de combiné à haute probabilité.", it: "Mercato ideale come base per multiple ad alta probabilità." },
        rows: [
          { sel: { fr: "Lionel Messi — plus de 0,5", it: "Lionel Messi — oltre 0,5" }, dec: 1.25, frac: "1/4", ai: "86%" },
          { sel: { fr: "Lamine Yamal — plus de 0,5", it: "Lamine Yamal — oltre 0,5" }, dec: 1.40, frac: "2/5" },
          { sel: { fr: "Mikel Oyarzabal — plus de 0,5", it: "Mikel Oyarzabal — oltre 0,5" }, dec: 1.53, frac: "8/15" },
          { sel: { fr: "Julián Álvarez — plus de 0,5", it: "Julián Álvarez — oltre 0,5" }, dec: 1.78, frac: "7/9" },
          { sel: { fr: "Ferran Torres — plus de 0,5", it: "Ferran Torres — oltre 0,5" }, dec: 1.85, frac: "17/20" },
          { sel: { fr: "Pedro Porro — moins de 0,5", it: "Pedro Porro — meno di 0,5" }, dec: 1.18, frac: "2/11", ai: "80%" }
        ]
      },
      {
        category: { fr: "Nombre de buts total & marge de victoire", it: "Numero di gol totali & scarto" },
        note: { fr: "La distribution penche vers un match fermé : 2 buts est le total le plus probable, l'Espagne par 1 but la marge la plus probable.", it: "La distribuzione indica una gara chiusa: 2 gol è il totale più probabile, la Spagna di 1 gol lo scarto più probabile." },
        rows: [
          { sel: { fr: "Total 2 buts exact (le plus probable)", it: "Totale 2 gol esatti (il più probabile)" }, dec: 3.80, frac: "14/5" },
          { sel: { fr: "Total 1 but exact", it: "Totale 1 gol esatto" }, dec: 4.33, frac: "10/3" },
          { sel: { fr: "Total 3 buts exact", it: "Totale 3 gol esatti" }, dec: 4.75, frac: "15/4" },
          { sel: { fr: "Total 0 but exact", it: "Totale 0 gol esatti" }, dec: 8.00, frac: "7/1" },
          { sel: { fr: "Espagne gagne par 1 but (marge la plus probable)", it: "Spagna vince di 1 gol (scarto più probabile)" }, dec: 4.00, frac: "3/1" },
          { sel: { fr: "Espagne gagne par 2 buts", it: "Spagna vince di 2 gol" }, dec: 7.00, frac: "6/1" },
          { sel: { fr: "Nul 0-0 (temps réglementaire)", it: "Pareggio 0-0 (tempi regolamentari)" }, dec: 8.50, frac: "15/2" }
        ]
      },
      {
        category: { fr: "Buts par équipe & BTTS", it: "Gol per squadra & BTTS" },
        rows: [
          { sel: { fr: "Espagne marque (plus de 0,5 but)", it: "Segna la Spagna (oltre 0,5 gol)" }, dec: 1.30, frac: "3/10" },
          { sel: { fr: "Espagne moins de 1,5 but", it: "Spagna meno di 1,5 gol" }, dec: 1.60, frac: "6/10" },
          { sel: { fr: "Espagne plus de 1,5 but", it: "Spagna oltre 1,5 gol" }, dec: 2.50, frac: "6/4" },
          { sel: { fr: "Argentine moins de 1,5 but (défense espagnole d'élite)", it: "Argentina meno di 1,5 gol (difesa spagnola d'élite)" }, dec: 1.36, frac: "4/11" },
          { sel: { fr: "Argentine marque (plus de 0,5 but)", it: "Segna l'Argentina (oltre 0,5 gol)" }, dec: 1.50, frac: "1/2" },
          { sel: { fr: "Argentine ne marque pas (Espagne clean sheet)", it: "Argentina non segna (Spagna clean sheet)" }, dec: 2.75, frac: "7/4" },
          { sel: { fr: "Les deux équipes marquent — Oui", it: "Entrambe segnano — Sì" }, dec: 1.95, frac: "19/20" },
          { sel: { fr: "Les deux équipes marquent — Non", it: "Entrambe segnano — No" }, dec: 2.00, frac: "1/1" }
        ]
      },
      {
        category: { fr: "Mi-temps (résultat, score, mi-temps/fin)", it: "Primo tempo (esito, risultato, PT/finale)" },
        note: { fr: "Un 0-0 à la pause est l'issue favorite : première période souvent fermée en finale.", it: "Lo 0-0 all'intervallo è l'esito favorito: primo tempo spesso chiuso in finale." },
        rows: [
          { sel: { fr: "Score à la mi-temps : 0-0 (favori)", it: "Risultato all'intervallo: 0-0 (favorito)" }, dec: 1.75, frac: "3/4" },
          { sel: { fr: "Résultat mi-temps : Nul", it: "Esito primo tempo: Pareggio" }, dec: 2.05, frac: "21/20" },
          { sel: { fr: "Résultat mi-temps : Espagne", it: "Esito primo tempo: Spagna" }, dec: 3.10, frac: "21/10" },
          { sel: { fr: "Résultat mi-temps : Argentine", it: "Esito primo tempo: Argentina" }, dec: 4.20, frac: "16/5" },
          { sel: { fr: "Mi-temps/fin : Espagne / Espagne", it: "PT/Finale: Spagna / Spagna" }, dec: 3.75, frac: "11/4" },
          { sel: { fr: "Mi-temps/fin : Nul / Espagne", it: "PT/Finale: Pareggio / Spagna" }, dec: 5.75, frac: "19/4" }
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
        category: { fr: "Passeurs, buteurs multiples & combiné", it: "Assist, doppiette & multipla" },
        rows: [
          { sel: { fr: "Lionel Messi — passe décisive (plus de 0,5)", it: "Lionel Messi — assist (oltre 0,5)" }, dec: 4.50, frac: "7/2", ai: "35%" },
          { sel: { fr: "Lionel Messi — 2 buts ou plus", it: "Lionel Messi — 2 o più gol" }, dec: 11.0, frac: "10/1" },
          { sel: { fr: "Mikel Oyarzabal — 2 buts ou plus", it: "Mikel Oyarzabal — 2 o più gol" }, dec: 11.0, frac: "10/1" },
          { sel: { fr: "Bet Builder — Messi buteur & Oyarzabal buteur & +1,5 but Argentine & Messi passeur (bet365)", it: "Bet Builder — Messi marcatore & Oyarzabal marcatore & +1,5 gol Argentina & Messi assist (bet365)" }, dec: 34.0, frac: "33/1" },
          { sel: { fr: "Aussi dispo : corners, cartons, handicaps, hat-trick — voir oddschecker", it: "Disponibili anche: corner, cartellini, handicap, tripletta — vedi oddschecker" }, dec: null, frac: "voir oddschecker" }
        ]
      }
    ],

    valueBets: [
      { label: { fr: "Victoire Espagne (1N2, 90 min)", it: "Vittoria Spagna (1X2, 90 min)" }, dec: 2.35, ai: 50,
        note: { fr: "Le meilleur pari value du 1N2 : favorite logique avec la meilleure défense du tournoi, cote généreuse à 2.35 pour une proba de 50% (cote juste 2.00).", it: "Il miglior value del 1X2: favorita logica con la miglior difesa del torneo, quota generosa a 2.35 per una probabilità del 50% (quota equa 2.00)." } },
      { label: { fr: "Lionel Messi — plus de 0,5 tir cadré", it: "Lionel Messi — oltre 0,5 tiri in porta" }, dec: 1.25, ai: 86,
        note: { fr: "Le pari le plus SÛR de toute la page avec en prime un petit edge (+7,5%) : AI 86% pour une cote de 1.25. La base idéale d'un combiné.", it: "La scommessa più SICURA di tutta la pagina con anche un piccolo edge (+7,5%): AI 86% per una quota di 1.25. Base ideale per una multipla." } },
      { label: { fr: "Mikel Oyarzabal buteur à tout moment", it: "Mikel Oyarzabal marcatore in qualsiasi momento" }, dec: 2.90, ai: 47,
        note: { fr: "Le buteur value : avant-centre d'une Espagne favorite et dominante, l'AI le donne à 47% pour une cote de 2.90. Plus crédible que la value affichée sur Messi vu la solidité défensive espagnole.", it: "Il marcatore value: centravanti di una Spagna favorita e dominante, l'AI lo dà al 47% per una quota di 2.90. Più credibile del value su Messi vista la solidità difensiva spagnola." } },
      { label: { fr: "Argentine moins de 1,5 but", it: "Argentina meno di 1,5 gol" }, dec: 1.36, ai: 74,
        note: { fr: "Adossé à la meilleure défense du tournoi (1 but encaissé en 7 matchs) : l'Argentine marquant 2 buts ou plus est peu probable. Base safe alternative à ~1.36.", it: "Appoggiato alla miglior difesa del torneo (1 gol subito in 7 gare): un'Argentina che segna 2+ gol è poco probabile. Base sicura alternativa a ~1.36." } }
    ],

    prediction: {
      pick: { fr: "Victoire Espagne", it: "Vittoria Spagna" },
      pickShort: "Espagne",
      score: "1 – 0",
      goals: { fr: "Match plutôt fermé, Under 2,5 buts plausible", it: "Gara piuttosto chiusa, Under 2,5 gol plausibile" },
      confidence: "moyen",
      value: true,
      summary: {
        fr: "L'Espagne part favorite logique (AI 50%) avec la meilleure défense du tournoi : 1 seul but encaissé en 7 matchs, dont un clean sheet contre la France, l'attaque la plus puissante de la compétition. La cote de 2.35 offre de la valeur (cote juste ~2.00). Le profil du match penche vers une finale fermée : le total le plus probable est 2 buts, le 0-0 est favori à la mi-temps, et l'Espagne par 1 but est la marge la plus probable. Mais une finale reste à variance élevée : l'Argentine est tenante du titre, spécialiste des remontées et des scénarios de prolongation, avec Messi (8 buts, 4 passes) en facteur X. D'où une confiance « moyenne » — et pour un combiné, plutôt que le résultat, la base la plus fiable est le marché des tirs cadrés (Messi/Yamal +0,5), le pari le plus sûr de toute la page.",
        it: "La Spagna parte favorita logica (AI 50%) con la miglior difesa del torneo: 1 solo gol subito in 7 gare, incluso un clean sheet contro la Francia, l'attacco più potente della competizione. La quota 2.35 offre valore (quota equa ~2.00). Il profilo della gara indica una finale chiusa: il totale più probabile è 2 gol, lo 0-0 è favorito all'intervallo e la Spagna di 1 gol è lo scarto più probabile. Ma una finale resta ad alta varianza: l'Argentina è campione in carica, specialista di rimonte e scenari da supplementari, con Messi (8 gol, 4 assist) come fattore X. Da qui la fiducia « media » — e per una multipla, più che l'esito, la base più affidabile è il mercato dei tiri in porta (Messi/Yamal +0,5), la scommessa più sicura di tutta la pagina."
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
      sel: { fr: "Les deux équipes marquent — Oui (BTTS)", it: "Entrambe le squadre segnano — Sì (BTTS)" },
      dec: 1.48, frac: "10/21", book: "top des bookmakers (oddschecker)", ai: 68,
      why: {
        fr: "Choisi après avoir passé TOUS les marchés : ce match pour la 3ᵉ place est ouvert (le total le plus probable est 3 buts, la France favorite même à la mi-temps) et les deux équipes ont des finisseurs d'élite (Mbappé côté France, Kane côté Angleterre). BTTS « Oui » à 1.48 est le meilleur pari safe (~cible 1,50) pour un combiné. Alternatives tout aussi fiables sur les tirs cadrés : Kane +0,5 tir cadré (1.40), Thuram +0,5 tir cadré (1.40) ou Mbappé +0,5 tir cadré (1.18, AI 82%).",
        it: "Scelto dopo aver passato TUTTI i mercati: questa finale per il 3° posto è aperta (il totale più probabile è 3 gol, la Francia favorita anche all'intervallo) ed entrambe hanno finalizzatori d'élite (Mbappé per la Francia, Kane per l'Inghilterra). BTTS « Sì » a 1.48 è la migliore scommessa sicura (~obiettivo 1,50) per una multipla. Alternative altrettanto affidabili sui tiri in porta: Kane +0,5 (1.40), Thuram +0,5 (1.40) o Mbappé +0,5 (1.18, AI 82%)."
      }
    },
    simpleBet: {
      sel: { fr: "Kylian Mbappé buteur à tout moment", it: "Kylian Mbappé marcatore in qualsiasi momento" },
      dec: 1.80, frac: "4/5", book: "plusieurs bookmakers", ai: 64,
      why: {
        fr: "Le meilleur rapport valeur/fiabilité en simple, retenu parmi tous les marchés : Mbappé a marqué 8 buts sur le tournoi, joue le Soulier d'Or (dernier match pour dépasser Messi) et affronte une défense remaniée. AI 64% pour une cote de 1.80 → +15,6% de valeur. Encore plus de value (mais plus risqué) : Kane buteur à 2.50 (AI 47%, +17,2%).",
        it: "Il miglior rapporto valore/affidabilità in singola, scelto tra tutti i mercati: Mbappé ha segnato 8 gol nel torneo, gioca per la Scarpa d'Oro (ultima gara per superare Messi) e affronta una difesa rimaneggiata. AI 64% per una quota di 1.80 → +15,6% di valore. Ancora più value (ma più rischioso): Kane marcatore a 2.50 (AI 47%, +17,2%)."
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
        category: { fr: "Méthode de victoire & remboursé si nul", it: "Metodo di vittoria & rimborso se pareggio" },
        rows: [
          { sel: { fr: "France gagne dans le temps réglementaire", it: "Francia vince nei tempi regolamentari" }, dec: 1.83, frac: "5/6" },
          { sel: { fr: "Angleterre gagne dans le temps réglementaire", it: "Inghilterra vince nei tempi regolamentari" }, dec: 3.80, frac: "14/5" },
          { sel: { fr: "France remboursé si nul (Draw No Bet)", it: "Francia rimborso se pareggio (DNB)" }, dec: 1.44, frac: "4/9", ai: "~72%" },
          { sel: { fr: "France se qualifie après prolongation", it: "Francia si qualifica ai supplementari" }, dec: 10.0, frac: "9/1" },
          { sel: { fr: "France se qualifie aux tirs au but", it: "Francia si qualifica ai rigori" }, dec: 13.0, frac: "12/1" }
        ]
      },
      {
        category: { fr: "Tirs cadrés (marché fiable pour combiné)", it: "Tiri in porta (mercato affidabile per multipla)" },
        rows: [
          { sel: { fr: "Kylian Mbappé — plus de 0,5", it: "Kylian Mbappé — oltre 0,5" }, dec: 1.18, frac: "2/11", ai: "82%" },
          { sel: { fr: "Harry Kane — plus de 0,5", it: "Harry Kane — oltre 0,5" }, dec: 1.40, frac: "2/5" },
          { sel: { fr: "Marcus Thuram — plus de 0,5", it: "Marcus Thuram — oltre 0,5" }, dec: 1.40, frac: "2/5" },
          { sel: { fr: "Ousmane Dembélé — plus de 0,5", it: "Ousmane Dembélé — oltre 0,5" }, dec: 1.44, frac: "4/9" },
          { sel: { fr: "Ivan Toney — plus de 0,5", it: "Ivan Toney — oltre 0,5" }, dec: 1.60, frac: "3/5" },
          { sel: { fr: "Jude Bellingham — plus de 0,5", it: "Jude Bellingham — oltre 0,5" }, dec: 1.65, frac: "13/20" }
        ]
      },
      {
        category: { fr: "Nombre de buts total & marge de victoire", it: "Numero di gol totali & scarto" },
        note: { fr: "Match ouvert : 3 buts est le total le plus probable, France par 1 but la marge la plus probable.", it: "Gara aperta: 3 gol è il totale più probabile, Francia di 1 gol lo scarto più probabile." },
        rows: [
          { sel: { fr: "Total 3 buts exact (le plus probable)", it: "Totale 3 gol esatti (il più probabile)" }, dec: 4.35, frac: "57/17" },
          { sel: { fr: "Total 2 buts exact", it: "Totale 2 gol esatti" }, dec: 4.75, frac: "15/4" },
          { sel: { fr: "Total 4 buts exact", it: "Totale 4 gol esatti" }, dec: 5.00, frac: "4/1" },
          { sel: { fr: "France gagne par 1 but (marge la plus probable)", it: "Francia vince di 1 gol (scarto più probabile)" }, dec: 4.33, frac: "10/3" },
          { sel: { fr: "France gagne par 2 buts", it: "Francia vince di 2 gol" }, dec: 5.50, frac: "9/2" },
          { sel: { fr: "France 2-1 ou nul 1-1 (scores les plus probables)", it: "Francia 2-1 o pareggio 1-1 (risultati più probabili)" }, dec: 9.50, frac: "17/2" }
        ]
      },
      {
        category: { fr: "Buts par équipe & BTTS", it: "Gol per squadra & BTTS" },
        rows: [
          { sel: { fr: "France marque (plus de 0,5 but)", it: "Segna la Francia (oltre 0,5 gol)" }, dec: 1.57, frac: "4/7" },
          { sel: { fr: "France plus de 1,5 but (2+ buts)", it: "Francia oltre 1,5 gol (2+ gol)" }, dec: 1.60, frac: "6/10" },
          { sel: { fr: "Angleterre marque (plus de 0,5 but)", it: "Segna l'Inghilterra (oltre 0,5 gol)" }, dec: 1.29, frac: "2/7" },
          { sel: { fr: "Angleterre moins de 1,5 but", it: "Inghilterra meno di 1,5 gol" }, dec: 1.62, frac: "8/13" },
          { sel: { fr: "Les deux équipes marquent — Oui", it: "Entrambe segnano — Sì" }, dec: 1.48, frac: "10/21" },
          { sel: { fr: "Les deux équipes marquent — Non", it: "Entrambe segnano — No" }, dec: 3.00, frac: "2/1" },
          { sel: { fr: "France gagne & les deux marquent", it: "Vince la Francia & entrambe segnano" }, dec: 3.00, frac: "2/1" }
        ]
      },
      {
        category: { fr: "Mi-temps (résultat & score 1ère MT)", it: "Primo tempo (esito & risultato 1° tempo)" },
        rows: [
          { sel: { fr: "Résultat mi-temps : France", it: "Esito primo tempo: Francia" }, dec: 2.35, frac: "27/20" },
          { sel: { fr: "Résultat mi-temps : Nul", it: "Esito primo tempo: Pareggio" }, dec: 2.60, frac: "8/5" },
          { sel: { fr: "Résultat mi-temps : Angleterre", it: "Esito primo tempo: Inghilterra" }, dec: 4.20, frac: "16/5" },
          { sel: { fr: "Score 1ère MT : 0-0 (favori)", it: "Risultato 1° tempo: 0-0 (favorito)" }, dec: 4.33, frac: "10/3" },
          { sel: { fr: "Score 1ère MT : France 1-0", it: "Risultato 1° tempo: Francia 1-0" }, dec: 4.60, frac: "18/5" }
        ]
      },
      {
        category: { fr: "Buteurs (à tout moment)", it: "Marcatori (in qualsiasi momento)" },
        rows: [
          { sel: "Kylian Mbappé", dec: 1.80, frac: "4/5", ai: "64%" },
          { sel: "Harry Kane", dec: 2.50, frac: "6/4", ai: "47%" },
          { sel: "Jean-Philippe Mateta", dec: 2.70, frac: "17/10", ai: "35%" },
          { sel: "Marcus Thuram", dec: 2.75, frac: "7/4" },
          { sel: "Ousmane Dembélé", dec: 2.88, frac: "15/8" },
          { sel: "Ivan Toney", dec: 3.30, frac: "23/10" },
          { sel: "Ollie Watkins", dec: 3.50, frac: "5/2" },
          { sel: "Michael Olise", dec: 3.75, frac: "11/4" },
          { sel: "Jude Bellingham", dec: 3.80, frac: "14/5" },
          { sel: "Bukayo Saka", dec: 5.00, frac: "4/1" }
        ]
      },
      {
        category: { fr: "Passeurs, buteurs multiples, arrêts & combiné", it: "Assist, doppiette, parate & multipla" },
        rows: [
          { sel: { fr: "Michael Olise — passe décisive (plus de 0,5)", it: "Michael Olise — assist (oltre 0,5)" }, dec: 3.20, frac: "11/5", ai: "40%" },
          { sel: { fr: "Kylian Mbappé — 2 buts ou plus", it: "Kylian Mbappé — 2 o più gol" }, dec: 4.60, frac: "18/5" },
          { sel: { fr: "Jordan Pickford — plus de 2,5 arrêts", it: "Jordan Pickford — oltre 2,5 parate" }, dec: 1.29, frac: "29/100" },
          { sel: { fr: "Bet Builder — Mbappé +3,5 tirs & Mbappé buteur & Kane buteur (BetMGM)", it: "Bet Builder — Mbappé +3,5 tiri & Mbappé marcatore & Kane marcatore (BetMGM)" }, dec: 5.80, frac: "24/5" },
          { sel: { fr: "Aussi dispo : corners, cartons, handicaps, hat-trick — voir oddschecker", it: "Disponibili anche: corner, cartellini, handicap, tripletta — vedi oddschecker" }, dec: null, frac: "voir oddschecker" }
        ]
      }
    ],

    valueBets: [
      { label: { fr: "Harry Kane buteur à tout moment", it: "Harry Kane marcatore in qualsiasi momento" }, dec: 2.50, ai: 47,
        note: { fr: "Le plus gros edge du match (+17%) : Kane joue le Soulier d'Or (6 buts), voudra tirer, et l'AI le donne à 47% pour une cote de 2.50. Plus risqué mais gros value.", it: "L'edge più alto della partita (+17%): Kane gioca per la Scarpa d'Oro (6 gol), vorrà tirare, e l'AI lo dà al 47% per una quota di 2.50. Più rischioso ma grande value." } },
      { label: { fr: "Kylian Mbappé buteur à tout moment", it: "Kylian Mbappé marcatore in qualsiasi momento" }, dec: 1.80, ai: 64,
        note: { fr: "Le meilleur combo valeur + fiabilité : 8 buts, Soulier d'Or en jeu, défense anglaise remaniée. AI 64% pour 1.80 → +15,6%.", it: "Il miglior mix valore + affidabilità: 8 gol, Scarpa d'Oro in palio, difesa inglese rimaneggiata. AI 64% per 1.80 → +15,6%." } },
      { label: { fr: "Victoire France (1N2)", it: "Vittoria Francia (1X2)" }, dec: 1.91, ai: 58,
        note: { fr: "Le meilleur value sur le résultat : favori logique (AI 58%) pour une cote de 1.91 (+10,8%).", it: "Il miglior value sull'esito: favorita logica (AI 58%) per una quota di 1.91 (+10,8%)." } },
      { label: { fr: "Les deux équipes marquent — Oui (BTTS)", it: "Entrambe segnano — Sì (BTTS)" }, dec: 1.48, ai: 68,
        note: { fr: "La base safe pour un combiné : match ouvert, deux attaques dangereuses, BTTS « Oui » fortement favori à 1.48.", it: "La base sicura per una multipla: gara aperta, due attacchi pericolosi, BTTS « Sì » nettamente favorito a 1.48." } }
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
