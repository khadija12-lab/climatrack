# 🌍 ClimaTrack - Frontend Connecté au Backend

## ✅ Ce qui a été implémenté

### 1. **Installation d'Axios**

- Librairie HTTP pour faire les appels API
- `npm install axios` ✓

### 2. **Service API Centralisé**

Fichier: [`src/services/weatherApi.js`](frontend/src/services/weatherApi.js)

Fonctions disponibles:

- `getAllWeather()` - Toutes les données météo
- `getCitiesComparison()` - Comparaison entre villes
- `getRainfallAccumulation()` - Accumulation de pluie
- `getDetailedComparison(cities)` - Analyse détaillée
- `getCitiesStats()` - Statistiques par ville
- `getWeatherStats()` - Statistiques globales
- CRUD: `createWeather()`, `updateWeather()`, `deleteWeather()`

### 3. **Composants React avec Hooks**

- `useEffect()` - Charger les données au montage
- `useState()` - Gérer l'état (données, loading, erreur)

#### Composants créés:

- **[CitiesComparison.jsx](frontend/src/components/CitiesComparison.jsx)** - Affiche la comparaison des villes en cartes
- **[RainfallAccumulation.jsx](frontend/src/components/RainfallAccumulation.jsx)** - Tableau d'accumulation de pluie

### 4. **App.jsx Réstructuré**

- Navigation par onglets (tabs)
- Import et utilisation des composants
- État React pour switcher entre vues

### 5. **Styles CSS Professionnels**

- Design gradient bleu-violet
- Cartes avec hover effects
- Tableau responsive
- Animation fade-in
- Adaptation mobile

---

## 🚀 Comment Tester

### Prérequis

1. **Backend lancé** sur `http://localhost:5000`

   ```bash
   cd backend
   npm start
   ```

2. **Frontend en développement**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Navigateur** ouvert sur `http://localhost:5173`

### Flux de Test

#### Étape 1: Ajouter des données au Backend

```bash
curl -X POST http://localhost:5000/weather \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Paris",
    "temperature": 15.5,
    "humidity": 65,
    "pressure": 1013,
    "windSpeed": 12,
    "rainfall": 5.2,
    "description": "Nuageux",
    "icon": "cloud"
  }'
```

Ajouter plusieurs villes et observations pour voir les comparaisons!

#### Étape 2: Vérifier le Frontend

1. Ouvrir le navigateur à `http://localhost:5173`
2. Cliquer sur "📊 Comparaison Villes"
   - Les cartes avec données doivent s'afficher
   - Chaque ville montre: temp avg/min/max, humidité, vent, pluie cumul
3. Cliquer sur "🌧️ Accumulation Pluie"
   - Tableau affichant la pluie totale par ville
   - Nombre d'événements pluie

#### Étape 3: Vérifier la Console

- Ouvrir Developer Tools (F12)
- Onglet "Network" pour voir les appels API
- Onglet "Console" pour les logs

### États Possibles

| État               | Affichage                    |
| ------------------ | ---------------------------- |
| **Chargement**     | ⏳ Chargement des données... |
| **Erreur**         | ❌ Erreur lors du chargement |
| **Pas de données** | Aucune donnée disponible     |
| **Succès**         | Cartes/Tableau avec données  |

---

## 📁 Structure du Projet

```
frontend/
├── src/
│   ├── components/
│   │   ├── CitiesComparison.jsx      ✨ Nouvelle
│   │   └── RainfallAccumulation.jsx  ✨ Nouvelle
│   ├── services/
│   │   └── weatherApi.js             ✨ Nouvelle (Axios)
│   ├── App.jsx                       ✏️ Modifié
│   ├── App.css                       ✏️ Modifié
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## 🔗 Communication Frontend-Backend

```
Frontend                          Backend
┌─────────────┐                  ┌──────────────┐
│ App.jsx     │                  │ server.js    │
├─────────────┤                  ├──────────────┤
│ Navigation  │────────────────→ │ Express API  │
│ Tabs        │                  │              │
└─────────────┘                  ├──────────────┤
      ↓                          │ MongoDB      │
┌─────────────┐   ┌──────────┐   ├──────────────┤
│ Components  │→→→│ weatherApi│→→→│ Endpoints    │
├─────────────┤   ├──────────┤   ├──────────────┤
│ CitiesComp. │   │ Axios    │   │ /compare/... │
│ Rainfall    │   │ HTTP     │   │ /rainfall/...│
└─────────────┘   └──────────┘   └──────────────┘
      ↓
┌─────────────┐
│ Affichage   │
│ Données     │
└─────────────┘
```

---

## ✨ Résultat Final

✅ **Frontend connecté au backend**

- Axios installé
- Service API créé et centralisé
- Composants React avec hooks
- Communication HTTP fonctionnelle

✅ **Données visibles à l'écran**

- Comparaison des villes en cartes
- Accumulation de pluie en tableau
- États de chargement/erreur gérés

✅ **Communication OK**

- API calls depuis `weatherApi.js`
- Gestion d'état React avec `useState`
- Appels asynchrones avec `useEffect`
- Gestion des erreurs

---

## 🐛 Troubleshooting

### "Network error" ou CORS

- Vérifier que le backend tourne sur `http://localhost:5000`
- Si le port est différent, modifier `API_BASE_URL` dans `weatherApi.js`

### "Aucune donnée disponible"

- Vérifier que vous avez ajouté des données au backend
- Vérifier dans DevTools que l'API retourne des données

### Frontend ne démarre pas

```bash
cd frontend
npm install
npm run dev
```

### Backend ne démarre pas

```bash
cd backend
npm install
npm start
```

Vérifier que MongoDB est accessible sur `mongodb://127.0.0.1:27017`

---

## 🎯 Prochaines Étapes (Optionnel)

- [ ] Ajouter des graphiques (Chart.js, Recharts)
- [ ] Filtrer par date
- [ ] Exporter les données (CSV, PDF)
- [ ] Pagination
- [ ] Tests unitaires
