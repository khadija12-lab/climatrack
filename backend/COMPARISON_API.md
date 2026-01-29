# API de Comparaison Multi-Villes - ClimaTrack

## Endpoints de Comparaison

### 1. Comparaison des Villes (GET)

**Endpoint:** `GET /weather/compare/cities`

Retourne une comparaison globale de toutes les villes avec les statistiques moyennes.

**Réponse:**

```json
{
  "timestamp": "2026-01-26T10:30:00.000Z",
  "citiesCount": 3,
  "data": [
    {
      "_id": "Paris",
      "avgTemperature": 15.5,
      "maxTemperature": 22,
      "minTemperature": 8,
      "avgHumidity": 65,
      "avgWindSpeed": 12,
      "rainfallAccumulation": 45.3,
      "avgPressure": 1013,
      "dataPoints": 10,
      "lastUpdated": "2026-01-26T10:25:00.000Z"
    }
  ]
}
```

---

### 2. Accumulation de Pluie (GET)

**Endpoint:** `GET /weather/rainfall/accumulation`

Calcule l'accumulation totale de pluie par ville avec statistiques détaillées.

**Réponse:**

```json
{
  "timestamp": "2026-01-26T10:30:00.000Z",
  "rainfallData": [
    {
      "_id": "Lyon",
      "totalRainfall": 85.2,
      "avgRainfall": 8.52,
      "maxRainfall": 25.5,
      "rainfallEvents": 7,
      "dataPoints": 10
    }
  ]
}
```

---

### 3. Comparaison Détaillée (GET)

**Endpoint:** `GET /weather/compare/detailed?cities=Paris,Lyon,Marseille`

Analyse détaillée avec filtrage par villes (optionnel).

**Paramètres:**

- `cities` (optionnel): liste de villes séparées par des virgules

**Réponse:**

```json
{
  "timestamp": "2026-01-26T10:30:00.000Z",
  "query": {
    "cities": ["Paris", "Lyon"],
    "citiesRequested": 2
  },
  "cityComparison": [
    {
      "_id": "Paris",
      "temp": 15.5,
      "humidity": 65,
      "windSpeed": 12,
      "pressure": 1013,
      "rainfall": 45.3,
      "records": 10
    }
  ],
  "extremes": {
    "hottest": 28,
    "coldest": 5,
    "wettest": 25.5,
    "windiest": 45
  },
  "dailyTrends": [
    {
      "_id": {
        "date": "2026-01-26",
        "city": "Paris"
      },
      "avgTemp": 16,
      "totalRain": 5.2
    }
  ]
}
```

---

### 4. Statistiques par Ville (GET)

**Endpoint:** `GET /weather/stats/cities`

Retourne les statistiques complètes pour chaque ville, prêtes pour la visualisation.

**Réponse:**

```json
{
  "timestamp": "2026-01-26T10:30:00.000Z",
  "totalCities": 3,
  "statistics": [
    {
      "_id": "Paris",
      "temperature": {
        "avg": 15.5,
        "max": 22,
        "min": 8
      },
      "humidity": {
        "avg": 65,
        "max": 85,
        "min": 45
      },
      "windSpeed": {
        "avg": 12,
        "max": 35
      },
      "rainfall": {
        "total": 45.3,
        "avg": 4.53,
        "max": 15.2
      },
      "pressure": {
        "avg": 1013
      },
      "observations": 10
    }
  ]
}
```

---

## Modèle de Données Mis à Jour

Le modèle Weather inclut maintenant le champ `rainfall`:

```javascript
{
  city: String,
  temperature: Number,
  humidity: Number,
  pressure: Number,
  windSpeed: Number,
  rainfall: Number,        // ✨ NOUVEAU
  description: String,
  icon: String,
  createdAt: Date
}
```

---

## Cas d'Usage

### 1. Tableau de Bord de Comparaison

- Utiliser `/weather/compare/cities` pour afficher toutes les villes
- Afficher un graphique comparatif de température

### 2. Analyse de Pluie

- Utiliser `/weather/rainfall/accumulation` pour voir les villes les plus humides
- Identifier les tendances de précipitations

### 3. Détails Multi-Villes

- Utiliser `/weather/compare/detailed?cities=Paris,Lyon` pour comparer spécifiquement
- Afficher les extremes et tendances journalières

### 4. Visualisations

- Utiliser `/weather/stats/cities` pour obtenir toutes les données structurées
- Prêt pour charts, graphiques comparatifs, heatmaps

---

## Exemple d'Utilisation Frontend

```javascript
// Récupérer la comparaison des villes
const response = await fetch("http://localhost:5000/weather/compare/cities");
const data = await response.json();

// Extraire les données pour un graphique
const cities = data.data.map((city) => city._id);
const temperatures = data.data.map((city) => city.avgTemperature);

// Afficher le graphique comparatif
displayComparisonChart(cities, temperatures);
```

---
