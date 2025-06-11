# SportSee - Tableau de bord sportif

SportSee est une application web de visualisation de données sportives. Elle permet à un utilisateur de suivre ses performances via plusieurs types de graphiques.

---

## 🚀 Technologies utilisées

- Vite
- React.js
- react-router
- Axios
- Recharts
- Sass
- JavaScript (ES6+)
- API Node.js / Express (ou données mock)

---

## 📁 Structure du projet

SportSee-app/
├── public/__Mock__/         # Datas mockées
├── src/components/          # Composants réutilisables
├── src/components/charts    # Composants charts recharts
├── src/pages/               # Pages principales: accueil et profil
├── src/styles/              # Feuilles de style SCSS
├── src/utils/               # Fonctions utilitaires (API, transformation, status des données)
├── src/assets/              # Icônes, images
├── src/main.jsx             # Point d'entrée React et react-routeur

---

## 📦 Installation

### 1. Cloner le frontend

git clone https://github.com/PA-MAI/SportSee-app.git
cd SportSee-app
npm install

### 2. Cloner et lancer le backend (API)
prérequis: desktop

git clone https://github.com/PA-MAI/SportSee-master.git
cd SportSee-master
yarn
yarn dev

Par défaut, le Backend et l'api est disponible sur `http://localhost:3000`.
En cas de panne du Backend, les données seront reprise à partir des données locales situées dans /public/__Mocks__/stores.js

---

Depuis le dossier `SportSee-app` :

## ▶️ Lancement de l'application

npm run dev

L'appli sera accessible à l'adresse : http://localhost:5173 (avec Vite)

---

## Fonctionnalités actuelles

- ✅ Pages d'accueil avec l'accès aux deux profils (Karl et Cécilia.)
- ✅ Accueil personnalisé (Bonjour Karl, etc.)
- ✅ Graphique d'activité quotidienne (barchart)
- ✅ Graphique moyenne de temps de sessions (linechart)
- ✅ Graphique de performance (radarChart)
- ✅ Score (piechart)
- ✅ Repli automatique sur des données mock si l’API ne répond pas
- ✅ Affichage d’erreurs utilisateur-friendly

---

## 📊 Endpoints API utilisés

- `GET /user/:id`
- `GET /user/:id/activity`
- `GET /user/:id/average-sessions`
- `GET /user/:id/performance`

> Voir la doc de l'API dans [SportSee-master](https://github.com/PA-MAI/SportSee-master)

---

## ✍️ Auteur

- [PA-MAI](https://github.com/PA-MAI)
