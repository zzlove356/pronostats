# PronoStats — Guide

Site statique de pronostics football + gestion de bankroll. Aucune dépendance, aucun serveur : 3 pages HTML et un dossier `assets/`.

```
pronostics-foot/
├── index.html        → Accueil : liste des matchs analysés
├── match.html        → Page détail d’un match (analyse complète + cotes)
├── bankroll.html     → Tableau de bord bankroll (mises, historique, calcul)
└── assets/
    ├── style.css     → Design
    ├── data.js       → ★ LES ANALYSES (le seul fichier à modifier pour ajouter un match)
    ├── app.js        → Rendu accueil + page match
    └── bankroll.js   → Logique de bankroll (mise, Kelly, suivi)
```

---

## 1. Tester en local (immédiat)

Double-clique simplement sur `index.html` : le site s’ouvre dans ton navigateur. Tout marche sauf que pour naviguer proprement mieux vaut le mettre en ligne (ci-dessous).

---

## 2. Mettre en ligne gratuitement avec GitHub Pages

### Étape 1 — Créer un compte GitHub (gratuit)
Va sur https://github.com → **Sign up**. C’est gratuit et suffisant.

### Étape 2 — Créer un dépôt (repository)
1. En haut à droite, clique sur **+** → **New repository**.
2. **Repository name** : par exemple `pronostats` (minuscules, sans espace).
3. Coche **Public** (obligatoire pour GitHub Pages gratuit).
4. Clique **Create repository**.

### Étape 3 — Envoyer les fichiers
Le plus simple, sans ligne de commande :
1. Sur la page du dépôt vide, clique sur **uploading an existing file** (lien « upload »).
2. Glisse-dépose **le contenu** du dossier `pronostics-foot` : les 3 fichiers `.html` **et** le dossier `assets`.
   > Important : dépose `index.html` **à la racine** du dépôt, pas dans un sous-dossier.
3. En bas, clique **Commit changes**.

### Étape 4 — Activer GitHub Pages
1. Dans le dépôt : onglet **Settings** → menu de gauche **Pages**.
2. Sous **Source**, choisis **Deploy from a branch**.
3. **Branch** : sélectionne `main` puis dossier `/ (root)` → **Save**.
4. Attends 1–2 minutes. La page affichera :
   **« Your site is live at »** suivi d’une adresse du type
   `https://TON-PSEUDO.github.io/pronostats/`

Voilà : ton site est en ligne, gratuit, accessible partout. 🎉

### Étape 5 — Mettre à jour plus tard
Quand je te donne une nouvelle version de `data.js` (nouveaux matchs), tu retournes dans le dépôt → dans `assets/` → clique sur `data.js` → icône crayon ✏️ → colle le nouveau contenu → **Commit changes**. Le site se met à jour tout seul en ~1 min.

---

## 3. Alternative encore plus simple : Netlify Drop
Si tu ne veux pas de compte GitHub :
1. Va sur https://app.netlify.com/drop
2. Glisse-dépose le dossier `pronostics-foot` entier.
3. Tu obtiens une adresse en ligne instantanément. (Créer un compte gratuit permet de garder l’adresse.)

---

## 4. Comment fonctionne l’ajout d’un match
Tu n’as **rien à coder**. Tu me demandes dans Cowork :
> « analyse les matchs de Ligue 1 de ce week-end »
> ou tu m’envoies une capture d’écran d’un match.

Je fais les recherches (stats, compos, blessures, xG…), je vais sur oddschecker chercher la meilleure cote, et je te renvoie un `data.js` mis à jour (ou le bloc à coller). Le nouveau match apparaît alors sur l’accueil, avec sa page d’analyse et un bouton « Calculer ma mise » relié au bankroll.

Le match le plus récent (placé en haut de la liste `MATCHES` dans `data.js`) s’affiche en premier.

---

## 5. Bankroll — comment ça marche
- Tes données (capital, paris) sont stockées **uniquement sur ton navigateur** (localStorage). Rien n’est envoyé en ligne.
- Le calculateur combine **ta méthode par paliers** (30 € / 50 € / 100 € selon le bankroll, modulée par la confiance) et le **critère de Kelly fractionné** (version prudente) pour proposer une mise qui protège ton capital.
- « Value » = la cote proposée est-elle supérieure à ce que ta probabilité estimée justifie ? Si oui, il y a de la valeur ; sinon l’outil conseille de ne pas jouer.
- **Le site ne place jamais aucun pari.** C’est un outil de calcul et de conseil. La décision finale t’appartient.

> ⚠️ 18+. Les paris sportifs restent aléatoires. Joue de façon responsable, uniquement avec de l’argent que tu peux te permettre de perdre.
