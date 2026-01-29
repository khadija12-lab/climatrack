# 📚 DOCUMENTATION COMPLÈTE - BASE DE DONNÉES METEO VISION

---

## 📋 TABLE DES MATIÈRES
1. [Schéma & Structure de Données](#schéma--structure-de-données)
2. [Modèle Mongoose Détaillé](#modèle-mongoose-détaillé)
3. [Opérations CRUD Complètes](#opérations-crud-complètes)
4. [Agrégations MongoDB Avancées](#agrégations-mongodb-avancées)
5. [Endpoints API avec Exemples](#endpoints-api-avec-exemples)
6. [Queries MongoDB Pures](#queries-mongodb-pures)
7. [Indexation & Performance](#indexation--performance)
8. [Données de Seed](#données-de-seed)
9. [Architecture & Flux](#architecture--flux)

---

## 🗄️ SCHÉMA & STRUCTURE DE DONNÉES

### Vue d'ensemble de la Collection

```
┌─────────────────────────────────────────────┐
│         Collection: weather                 │
├─────────────────────────────────────────────┤
│  _id (ObjectId)                             │
│  city (String) - Index                      │
│  temperature (Number)                       │
│  humidity (Number)                          │
│  pressure (Number)                          │
│  windSpeed (Number)                         │
│  rainfall (Number)                          │
│  description (String)                       │
│  icon (String)                              │
│  createdAt (Date) - Index, Default: now()  │
└─────────────────────────────────────────────┘
```

### Document Exemple Complet

```json
{
  "_id": {
    "$oid": "65a1b2c3d4e5f6g7h8i9j0k1"
  },
  "city": "Casablanca",
  "temperature": 22.5,
  "humidity": 65,
  "pressure": 1013,
  "windSpeed": 15.8,
  "rainfall": 2.5,
  "description": "Nuageux",
  "icon": "04d",
  "createdAt": {
    "$date": "2026-01-29T10:30:00.000Z"
  }
}
```

---

## 🛠️ MODÈLE MONGOOSE DÉTAILLÉ

### Code Complet du Schéma

```javascript
// ========== FILE: backend/models/Weather.js ==========

import mongoose from "mongoose";

// ============================================================================
// DÉFINITION DU SCHÉMA
// ============================================================================
// Un schéma Mongoose définit la structure d'un document MongoDB
// Chaque propriété a un type et peut avoir des validations/configurations
// ============================================================================

const weatherSchema = new mongoose.Schema({
  
  // ─────────────────────────────────────────────────────────────────────────
  // CHAMP: city
  // ─────────────────────────────────────────────────────────────────────────
  // Type: String - Chaîne de caractères
  // required: true - Ce champ est OBLIGATOIRE
  // trim: true - Supprime les espaces avant/après
  // 
  // Exemple: "Casablanca", "Rabat", "Marrakech"
  // ─────────────────────────────────────────────────────────────────────────
  city: {
    type: String,
    required: true,
    trim: true,
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // CHAMP: temperature
  // ─────────────────────────────────────────────────────────────────────────
  // Type: Number - Nombre décimal ou entier
  // required: true - Ce champ est OBLIGATOIRE
  // 
  // Exemple: 22.5, 15.3, 28.7
  // Valeurs typiques: -10 à 50 (degrés Celsius)
  // ─────────────────────────────────────────────────────────────────────────
  temperature: {
    type: Number,
    required: true,
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // CHAMP: humidity
  // ─────────────────────────────────────────────────────────────────────────
  // Type: Number - Nombre entier (%)
  // required: true - Ce champ est OBLIGATOIRE
  // 
  // Exemple: 65, 72, 55
  // Valeurs: 0 à 100 (pourcentage)
  // ─────────────────────────────────────────────────────────────────────────
  humidity: {
    type: Number,
    required: true,
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // CHAMP: pressure
  // ─────────────────────────────────────────────────────────────────────────
  // Type: Number - Nombre décimal
  // required: true - Ce champ est OBLIGATOIRE
  // 
  // Exemple: 1013, 1015, 1010
  // Valeurs: 950 à 1050 (hPa - hectopascals)
  // ─────────────────────────────────────────────────────────────────────────
  pressure: {
    type: Number,
    required: true,
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // CHAMP: windSpeed
  // ─────────────────────────────────────────────────────────────────────────
  // Type: Number - Nombre décimal
  // required: true - Ce champ est OBLIGATOIRE
  // 
  // Exemple: 15.8, 22.3, 8.5
  // Valeurs: 0 à 50+ (km/h)
  // ─────────────────────────────────────────────────────────────────────────
  windSpeed: {
    type: Number,
    required: true,
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // CHAMP: rainfall
  // ─────────────────────────────────────────────────────────────────────────
  // Type: Number - Nombre décimal
  // required: false (OPTIONNEL avec default)
  // default: 0 - Si pas fourni, valeur par défaut = 0
  // 
  // Exemple: 2.5, 0, 12.7
  // Valeurs: 0 à 500+ (mm)
  // ─────────────────────────────────────────────────────────────────────────
  rainfall: {
    type: Number,
    default: 0,
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // CHAMP: description
  // ─────────────────────────────────────────────────────────────────────────
  // Type: String - Chaîne de caractères
  // required: true - Ce champ est OBLIGATOIRE
  // 
  // Exemple: "Nuageux", "Ensoleillé", "Orageux", "Pluvieux"
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    type: String,
    required: true,
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // CHAMP: icon
  // ─────────────────────────────────────────────────────────────────────────
  // Type: String - Code d'icône OpenWeatherMap
  // required: true - Ce champ est OBLIGATOIRE
  // 
  // Exemple: "04d", "01d", "09d", "11d"
  // Codes OpenWeatherMap:
  //   - 01d = Sunny (ensoleillé)
  //   - 02d = Partly cloudy (nuageux)
  //   - 03d = Cloudy (très nuageux)
  //   - 04d = Overcast (couvert)
  //   - 09d = Light rain (faible pluie)
  //   - 10d = Rain (pluie)
  //   - 11d = Thunderstorm (orage)
  //   - 13d = Snow (neige)
  // ─────────────────────────────────────────────────────────────────────────
  icon: {
    type: String,
    required: true,
  },
  
  // ─────────────────────────────────────────────────────────────────────────
  // CHAMP: createdAt
  // ─────────────────────────────────────────────────────────────────────────
  // Type: Date - Timestamp
  // required: false (OPTIONNEL avec default)
  // default: Date.now - Si pas fourni, utilise la date/heure actuelle
  // 
  // Exemple: "2026-01-29T10:30:00.000Z"
  // Utilisé pour: Trier chronologiquement, agrégations par date
  // ─────────────────────────────────────────────────────────────────────────
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ============================================================================
// CRÉATION DU MODÈLE
// ============================================================================
// mongoose.model(nom, schéma)
// 
// Paramètres:
//   - "Weather" = nom du modèle (singular)
//   - weatherSchema = schéma défini plus haut
//   - MongoDB crée automatiquement la collection "weathers" (pluralisé lowercase)
//
// Ce modèle permet:
//   - new Weather() - créer un nouveau document
//   - Weather.find() - lire des documents
//   - Weather.updateOne() - mettre à jour
//   - Weather.deleteOne() - supprimer
//   - Weather.aggregate() - agrégations avancées
// ============================================================================

const Weather = mongoose.model("Weather", weatherSchema);

// ============================================================================
// EXPORT
// ============================================================================
// Exporte le modèle pour utilisation dans les routes/serveur
// ============================================================================

export default Weather;
```

---

## ⚙️ OPÉRATIONS CRUD COMPLÈTES

### 1. CREATE - Ajouter un Document

#### Code Backend

```javascript
// ========== ROUTE: POST /weather ==========
// Crée un NOUVEAU document dans la collection

app.post("/weather", async (req, res) => {
  // ─────────────────────────────────────────────────────────────────────────
  // TRY-CATCH pour gestion des erreurs
  // ─────────────────────────────────────────────────────────────────────────
  try {
    // Étape 1: Créer une instance du modèle
    // req.body contient les données JSON du client
    // Exemple req.body:
    // {
    //   "city": "Casablanca",
    //   "temperature": 22,
    //   "humidity": 65,
    //   "pressure": 1013,
    //   "windSpeed": 15,
    //   "rainfall": 2.5,
    //   "description": "Nuageux",
    //   "icon": "04d"
    // }
    
    const weather = new Weather(req.body);
    
    // Étape 2: Valider & Sauvegarder dans MongoDB
    // .save() vérifie:
    //   - Types de données corrects
    //   - Champs requis présents
    //   - Insère dans la base de données
    const saved = await weather.save();
    
    // Étape 3: Répondre au client
    // Status 201 = Created (ressource créée)
    res.status(201).json(saved);
    
  } catch (err) {
    // Erreur de validation ou de base de données
    // Status 400 = Bad Request (données invalides)
    res.status(400).json({ message: err.message });
  }
});
```

#### Requête HTTP

```bash
# ═════════════════════════════════════════════════════════════════════════════
# CURL COMMAND - Créer un enregistrement
# ═════════════════════════════════════════════════════════════════════════════

curl -X POST http://localhost:5000/weather \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Casablanca",
    "temperature": 22,
    "humidity": 65,
    "pressure": 1013,
    "windSpeed": 15,
    "rainfall": 2.5,
    "description": "Nuageux",
    "icon": "04d"
  }'
```

#### Réponse MongoDB

```json
{
  "_id": {
    "$oid": "65a1b2c3d4e5f6g7h8i9j0k1"
  },
  "city": "Casablanca",
  "temperature": 22,
  "humidity": 65,
  "pressure": 1013,
  "windSpeed": 15,
  "rainfall": 2.5,
  "description": "Nuageux",
  "icon": "04d",
  "createdAt": {
    "$date": "2026-01-29T10:30:00.000Z"
  },
  "__v": 0
}
```

#### Query MongoDB Équivalente

```javascript
db.weathers.insertOne({
  city: "Casablanca",
  temperature: 22,
  humidity: 65,
  pressure: 1013,
  windSpeed: 15,
  rainfall: 2.5,
  description: "Nuageux",
  icon: "04d",
  createdAt: new Date()
})
```

---

### 2. READ - Lire Tous les Documents

#### Code Backend

```javascript
// ========== ROUTE: GET /weather ==========
// Récupère TOUS les documents, triés par date décroissante

app.get("/weather", async (req, res) => {
  // ─────────────────────────────────────────────────────────────────────────
  // TRY-CATCH pour gestion des erreurs
  // ─────────────────────────────────────────────────────────────────────────
  try {
    // Étape 1: Trouver tous les documents
    // .find() sans paramètre = retourne TOUT
    const data = await Weather.find();
    
    // Étape 2: Trier par date descendante (les plus récents d'abord)
    // { createdAt: -1 }
    //   -1 = ordre décroissant (DESC)
    //    1 = ordre croissant (ASC)
    .sort({ createdAt: -1 });
    
    // Étape 3: Répondre au client avec le tableau
    // Status 200 = OK (défaut, pas besoin de spécifier)
    res.json(data);
    
  } catch (err) {
    // Erreur serveur
    // Status 500 = Internal Server Error
    res.status(500).json({ message: err.message });
  }
});
```

#### Requête HTTP

```bash
# ═════════════════════════════════════════════════════════════════════════════
# CURL COMMAND - Lire tous les enregistrements
# ═════════════════════════════════════════════════════════════════════════════

curl -X GET http://localhost:5000/weather
```

#### Réponse JSON

```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "city": "Casablanca",
    "temperature": 22,
    "humidity": 65,
    "pressure": 1013,
    "windSpeed": 15,
    "rainfall": 2.5,
    "description": "Nuageux",
    "icon": "04d",
    "createdAt": "2026-01-29T10:30:00.000Z"
  },
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "city": "Rabat",
    "temperature": 20,
    "humidity": 72,
    "pressure": 1012,
    "windSpeed": 18,
    "rainfall": 5,
    "description": "Pluvieux",
    "icon": "10d",
    "createdAt": "2026-01-28T14:20:00.000Z"
  }
]
```

#### Query MongoDB Équivalente

```javascript
db.weathers.find({})
  .sort({ createdAt: -1 })
  .toArray()
```

---

### 3. UPDATE - Mettre à Jour un Document

#### Code Backend

```javascript
// ========== ROUTE: PUT /weather/:id ==========
// Met à jour UN document par son ID

app.put("/weather/:id", async (req, res) => {
  // ─────────────────────────────────────────────────────────────────────────
  // VALIDATION: Vérifier que l'ID est un ObjectId MongoDB valide
  // ─────────────────────────────────────────────────────────────────────────
  // Les IDs MongoDB sont en format hexadécimal de 24 caractères
  // Exemple: 65a1b2c3d4e5f6g7h8i9j0k1
  
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID invalide" });
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // TRY-CATCH pour gestion des erreurs
  // ─────────────────────────────────────────────────────────────────────────
  try {
    // Étape 1: Trouver par ID et mettre à jour
    // findByIdAndUpdate(id, updateData, options)
    //
    // req.params.id = l'ID du document à mettre à jour
    // req.body = les champs à modifier
    // { new: true } = retourne le document MIS À JOUR
    //               = si false, retournerait l'ancienne version
    
    const updated = await Weather.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // IMPORTANT: retourner le document modifié
    );
    
    // Étape 2: Vérifier si le document existe
    if (!updated) {
      return res.status(404).json({ message: "Document non trouvé" });
    }
    
    // Étape 3: Répondre au client avec le document modifié
    res.json(updated);
    
  } catch (err) {
    // Erreur serveur
    res.status(500).json({ message: err.message });
  }
});
```

#### Requête HTTP

```bash
# ═════════════════════════════════════════════════════════════════════════════
# CURL COMMAND - Mettre à jour un enregistrement
# ═════════════════════════════════════════════════════════════════════════════

curl -X PUT http://localhost:5000/weather/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Content-Type: application/json" \
  -d '{
    "temperature": 25,
    "humidity": 70,
    "rainfall": 3
  }'
```

#### Réponse JSON

```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "city": "Casablanca",
  "temperature": 25,
  "humidity": 70,
  "pressure": 1013,
  "windSpeed": 15,
  "rainfall": 3,
  "description": "Nuageux",
  "icon": "04d",
  "createdAt": "2026-01-29T10:30:00.000Z"
}
```

#### Query MongoDB Équivalente

```javascript
db.weathers.findByIdAndUpdate(
  ObjectId("65a1b2c3d4e5f6g7h8i9j0k1"),
  {
    $set: {
      temperature: 25,
      humidity: 70,
      rainfall: 3
    }
  },
  { returnDocument: "after" }
)
```

---

### 4. DELETE - Supprimer un Document

#### Code Backend

```javascript
// ========== ROUTE: DELETE /weather/:id ==========
// Supprime UN document par son ID

app.delete("/weather/:id", async (req, res) => {
  // ─────────────────────────────────────────────────────────────────────────
  // VALIDATION: Vérifier que l'ID est valide
  // ─────────────────────────────────────────────────────────────────────────
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID invalide" });
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // TRY-CATCH pour gestion des erreurs
  // ─────────────────────────────────────────────────────────────────────────
  try {
    // Étape 1: Trouver par ID et supprimer
    // findByIdAndDelete(id) = trouve et supprime
    const result = await Weather.findByIdAndDelete(req.params.id);
    
    // Étape 2: Vérifier si le document existait
    if (!result) {
      return res.status(404).json({ message: "Document non trouvé" });
    }
    
    // Étape 3: Répondre au client
    res.json({ 
      message: "Supprimé avec succès",
      deletedId: req.params.id 
    });
    
  } catch (err) {
    // Erreur serveur
    res.status(500).json({ message: err.message });
  }
});
```

#### Requête HTTP

```bash
# ═════════════════════════════════════════════════════════════════════════════
# CURL COMMAND - Supprimer un enregistrement
# ═════════════════════════════════════════════════════════════════════════════

curl -X DELETE http://localhost:5000/weather/65a1b2c3d4e5f6g7h8i9j0k1
```

#### Réponse JSON

```json
{
  "message": "Supprimé avec succès",
  "deletedId": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

#### Query MongoDB Équivalente

```javascript
db.weathers.deleteOne({
  _id: ObjectId("65a1b2c3d4e5f6g7h8i9j0k1")
})
```

---

## 📊 AGRÉGATIONS MONGODB AVANCÉES

### 1. Agrégation - Statistiques Globales

#### Code Backend Complet

```javascript
// ========== ROUTE: GET /weather/average ==========
// Calcule les statistiques GLOBALES (moyenne, min, max, tendances journalières)

app.get("/weather/average", async (req, res) => {
  try {
    // ═════════════════════════════════════════════════════════════════════════
    // PIPELINE AGGREGATION - Statistiques Globales
    // ═════════════════════════════════════════════════════════════════════════
    // Un pipeline d'agrégation est une succession d'étapes qui transforment
    // les données. Chaque étape traite le résultat de la précédente.
    // ═════════════════════════════════════════════════════════════════════════
    
    const pipeline = [
      // ───────────────────────────────────────────────────────────────────────
      // ÉTAPE 1: $facet
      // ───────────────────────────────────────────────────────────────────────
      // Permet d'exécuter PLUSIEURS sous-pipelines en parallèle
      // Chaque sous-pipeline commence avec tous les documents
      // Résultat = object avec clés = noms des sous-pipelines
      //
      // Syntaxe:
      // $facet: {
      //   "nomSousPipeline1": [...stages],
      //   "nomSousPipeline2": [...stages]
      // }
      // ───────────────────────────────────────────────────────────────────────
      
      {
        $facet: {
          
          // SOUS-PIPELINE 1: Statistiques Globales
          // Regroupe TOUS les documents en un seul groupe
          summary: [
            // ─────────────────────────────────────────────────────────────────
            // STAGE: $group
            // ─────────────────────────────────────────────────────────────────
            // Regroupe les documents selon une clé (_id)
            // Applique des opérateurs d'agrégation aux champs
            //
            // Opérateurs utilisés:
            // - $avg = moyenne arithmétique
            // - $max = valeur maximale
            // - $min = valeur minimale
            // - $sum = somme (avec 1 = compte les documents)
            //
            // _id: null = regroupe TOUS les documents en un seul groupe
            // ─────────────────────────────────────────────────────────────────
            {
              $group: {
                _id: null,  // Grouper tous les docs
                
                // Calcule la MOYENNE des températures
                // Exemple: [22, 20, 25] → (22+20+25)/3 = 22.33
                avgTemp: { $avg: "$temperature" },
                
                // Calcule le MAXIMUM des températures
                // Exemple: [22, 20, 25] → 25
                maxTemp: { $max: "$temperature" },
                
                // Calcule le MINIMUM des températures
                // Exemple: [22, 20, 25] → 20
                minTemp: { $min: "$temperature" },
                
                // Calcule la MOYENNE des humidités
                avgHumidity: { $avg: "$humidity" },
                
                // Calcule la MOYENNE des vitesses de vent
                avgWindSpeed: { $avg: "$windSpeed" },
                
                // Compte le nombre TOTAL de documents
                // $sum: 1 = ajoute 1 pour chaque document
                totalRecords: { $sum: 1 },
              },
            },
          ],
          
          // SOUS-PIPELINE 2: Tendances Journalières
          // Regroupe par DATE
          daily: [
            // ─────────────────────────────────────────────────────────────────
            // STAGE: $group
            // ─────────────────────────────────────────────────────────────────
            // Regroupe par DATE (au format "YYYY-MM-DD")
            // Chaque jour = un groupe séparé
            // ─────────────────────────────────────────────────────────────────
            {
              $group: {
                // _id = clé de groupement
                // $dateToString = convertit Date en String
                // format: "%Y-%m-%d" = YYYY-MM-DD
                // date: "$createdAt" = utilise le champ createdAt
                _id: {
                  $dateToString: { 
                    format: "%Y-%m-%d", 
                    date: "$createdAt" 
                  },
                },
                
                // Moyenne température du jour
                avgTemp: { $avg: "$temperature" },
                
                // Max température du jour
                maxTemp: { $max: "$temperature" },
                
                // Min température du jour
                minTemp: { $min: "$temperature" },
              },
            },
            
            // ─────────────────────────────────────────────────────────────────
            // STAGE: $sort
            // ─────────────────────────────────────────────────────────────────
            // Trie les résultats
            // 1 = ordre croissant (ancien → récent)
            // -1 = ordre décroissant (récent → ancien)
            // ─────────────────────────────────────────────────────────────────
            { $sort: { _id: 1 } },  // Trier par date croissante
          ],
        },
      },
    ];
    
    // ═════════════════════════════════════════════════════════════════════════
    // EXÉCUTER LE PIPELINE
    // ═════════════════════════════════════════════════════════════════════════
    // .aggregate(pipeline) = exécute les étapes du pipeline
    // Retourne un tableau avec 1 élément (objet avec clés facet)
    // ═════════════════════════════════════════════════════════════════════════
    
    const results = await Weather.aggregate(pipeline);
    
    // results[0] = le seul résultat (car $facet retourne 1 objet)
    // Contient: { summary: [...], daily: [...] }
    const data = results[0];
    
    // ═════════════════════════════════════════════════════════════════════════
    // FORMATER & ENVOYER LA RÉPONSE
    // ═════════════════════════════════════════════════════════════════════════
    
    res.json({
      summary: data.summary[0] || null,      // Premier élément du tableau summary
      daily: data.daily || [],                // Tous les jours
    });
    
  } catch (err) {
    // Erreur
    res.status(500).json({
      message: "Erreur lors du calcul des statistiques",
      error: err.message,
    });
  }
});
```

#### Query MongoDB Pure

```javascript
// ═════════════════════════════════════════════════════════════════════════════
// QUERY MONGODB - Agrégation Statistiques Globales
// ═════════════════════════════════════════════════════════════════════════════

db.weathers.aggregate([
  {
    $facet: {
      // PIPELINE 1: Statistiques globales
      summary: [
        {
          $group: {
            _id: null,
            avgTemp: { $avg: "$temperature" },
            maxTemp: { $max: "$temperature" },
            minTemp: { $min: "$temperature" },
            avgHumidity: { $avg: "$humidity" },
            avgWindSpeed: { $avg: "$windSpeed" },
            totalRecords: { $sum: 1 }
          }
        }
      ],
      // PIPELINE 2: Tendances journalières
      daily: [
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            avgTemp: { $avg: "$temperature" },
            maxTemp: { $max: "$temperature" },
            minTemp: { $min: "$temperature" }
          }
        },
        { $sort: { _id: 1 } }
      ]
    }
  }
])
```

#### Exemple de Réponse

```json
{
  "summary": {
    "_id": null,
    "avgTemp": 24.5,
    "maxTemp": 35,
    "minTemp": 15,
    "avgHumidity": 62,
    "avgWindSpeed": 16,
    "totalRecords": 33
  },
  "daily": [
    {
      "_id": "2026-01-27",
      "avgTemp": 22.3,
      "maxTemp": 28,
      "minTemp": 18
    },
    {
      "_id": "2026-01-28",
      "avgTemp": 23.5,
      "maxTemp": 29,
      "minTemp": 17
    },
    {
      "_id": "2026-01-29",
      "avgTemp": 26.1,
      "maxTemp": 35,
      "minTemp": 20
    }
  ]
}
```

---

### 2. Agrégation - Comparaison Entre Villes

#### Code Backend Complet

```javascript
// ========== ROUTE: GET /weather/compare/cities ==========
// Compare les conditions météo entre TOUTES les villes

app.get("/weather/compare/cities", async (req, res) => {
  try {
    // ═════════════════════════════════════════════════════════════════════════
    // PIPELINE AGGREGATION - Comparaison Villes
    // ═════════════════════════════════════════════════════════════════════════
    
    const pipeline = [
      // ───────────────────────────────────────────────────────────────────────
      // ÉTAPE 1: $group - Regrouper par VILLE
      // ───────────────────────────────────────────────────────────────────────
      // _id: "$city" = grouper par valeur du champ city
      // Chaque ville distincte = un groupe
      //
      // Exemple avec données:
      // [
      //   { city: "Casablanca", temperature: 22 },
      //   { city: "Casablanca", temperature: 24 },
      //   { city: "Rabat", temperature: 20 }
      // ]
      //
      // Résultat du $group:
      // [
      //   { _id: "Casablanca", ... },  // Données agrégées des 2 docs Casablanca
      //   { _id: "Rabat", ... }         // Données agrégées du 1 doc Rabat
      // ]
      // ───────────────────────────────────────────────────────────────────────
      
      {
        $group: {
          // Clé de groupement = valeur du champ city
          _id: "$city",
          
          // TEMPERATURE: Moyenne
          avgTemperature: { $avg: "$temperature" },
          
          // TEMPERATURE: Maximum
          maxTemperature: { $max: "$temperature" },
          
          // TEMPERATURE: Minimum
          minTemperature: { $min: "$temperature" },
          
          // HUMIDITY: Moyenne
          avgHumidity: { $avg: "$humidity" },
          
          // WIND SPEED: Moyenne
          avgWindSpeed: { $avg: "$windSpeed" },
          
          // RAINFALL: Accumulation (somme)
          // Exemple: [2, 5, 3] → 2+5+3 = 10 mm total
          rainfallAccumulation: { $sum: "$rainfall" },
          
          // PRESSURE: Moyenne
          avgPressure: { $avg: "$pressure" },
          
          // Nombre de points de données pour cette ville
          dataPoints: { $sum: 1 },
          
          // Date de la DERNIÈRE mise à jour
          lastUpdated: { $max: "$createdAt" },
        },
      },
      
      // ───────────────────────────────────────────────────────────────────────
      // ÉTAPE 2: $sort - Trier par température décroissante
      // ───────────────────────────────────────────────────────────────────────
      // Les villes chaudes d'abord
      // -1 = ordre décroissant
      // ───────────────────────────────────────────────────────────────────────
      {
        $sort: { avgTemperature: -1 },
      },
    ];
    
    // ═════════════════════════════════════════════════════════════════════════
    // EXÉCUTER LE PIPELINE
    // ═════════════════════════════════════════════════════════════════════════
    
    const comparison = await Weather.aggregate(pipeline);
    
    // ═════════════════════════════════════════════════════════════════════════
    // ENVOYER LA RÉPONSE
    // ═════════════════════════════════════════════════════════════════════════
    
    res.json({
      timestamp: new Date(),              // Quand la réponse a été générée
      citiesCount: comparison.length,     // Nombre total de villes
      data: comparison,                   // Données de chaque ville
    });
    
  } catch (err) {
    res.status(500).json({ 
      message: "Erreur lors de la comparaison", 
      error: err.message 
    });
  }
});
```

#### Query MongoDB Pure

```javascript
// ═════════════════════════════════════════════════════════════════════════════
// QUERY MONGODB - Comparaison Villes
// ═════════════════════════════════════════════════════════════════════════════

db.weathers.aggregate([
  // STAGE 1: Grouper par ville
  {
    $group: {
      _id: "$city",
      avgTemperature: { $avg: "$temperature" },
      maxTemperature: { $max: "$temperature" },
      minTemperature: { $min: "$temperature" },
      avgHumidity: { $avg: "$humidity" },
      avgWindSpeed: { $avg: "$windSpeed" },
      rainfallAccumulation: { $sum: "$rainfall" },
      avgPressure: { $avg: "$pressure" },
      dataPoints: { $sum: 1 },
      lastUpdated: { $max: "$createdAt" }
    }
  },
  // STAGE 2: Trier par température décroissante
  {
    $sort: { avgTemperature: -1 }
  }
])
```

#### Exemple de Réponse

```json
{
  "timestamp": "2026-01-29T10:30:00.000Z",
  "citiesCount": 11,
  "data": [
    {
      "_id": "Marrakech",
      "avgTemperature": 32.5,
      "maxTemperature": 35,
      "minTemperature": 30,
      "avgHumidity": 45,
      "avgWindSpeed": 9,
      "rainfallAccumulation": 2,
      "avgPressure": 1018,
      "dataPoints": 3,
      "lastUpdated": "2026-01-29T10:30:00.000Z"
    },
    {
      "_id": "Oujda",
      "avgTemperature": 30.3,
      "maxTemperature": 33,
      "minTemperature": 28,
      "avgHumidity": 48,
      "avgWindSpeed": 12,
      "rainfallAccumulation": 4,
      "avgPressure": 1018,
      "dataPoints": 3,
      "lastUpdated": "2026-01-29T10:20:00.000Z"
    },
    {
      "_id": "Agadir",
      "avgTemperature": 27,
      "maxTemperature": 29,
      "minTemperature": 25,
      "avgHumidity": 65,
      "avgWindSpeed": 18,
      "rainfallAccumulation": 7,
      "avgPressure": 1017,
      "dataPoints": 3,
      "lastUpdated": "2026-01-29T10:15:00.000Z"
    },
    {
      "_id": "Tanger",
      "avgTemperature": 21,
      "maxTemperature": 23,
      "minTemperature": 19,
      "avgHumidity": 79,
      "avgWindSpeed": 25,
      "rainfallAccumulation": 43,
      "avgPressure": 1011,
      "dataPoints": 3,
      "lastUpdated": "2026-01-29T10:10:00.000Z"
    }
  ]
}
```

---

### 3. Agrégation - Accumulation de Pluie

#### Code Backend Complet

```javascript
// ========== ROUTE: GET /weather/rainfall/accumulation ==========
// Calcule l'ACCUMULATION TOTALE de pluie par ville

app.get("/weather/rainfall/accumulation", async (req, res) => {
  try {
    // ═════════════════════════════════════════════════════════════════════════
    // PIPELINE AGGREGATION - Accumulation Pluie
    // ═════════════════════════════════════════════════════════════════════════
    
    const pipeline = [
      // ───────────────────────────────────────────────────────────────────────
      // ÉTAPE 1: $group - Regrouper par VILLE et calculer pluie
      // ───────────────────────────────────────────────────────────────────────
      
      {
        $group: {
          _id: "$city",
          
          // PLUIE TOTALE = somme de tous les rainfall
          // Exemple: [2.5, 3, 0, 4.2] → 2.5+3+0+4.2 = 9.7 mm
          totalRainfall: { $sum: "$rainfall" },
          
          // PLUIE MOYENNE = moyenne des rainfall
          // Exemple: [2.5, 3, 0, 4.2] → (2.5+3+0+4.2)/4 = 2.43 mm
          avgRainfall: { $avg: "$rainfall" },
          
          // PLUIE MAX = maximum enregistré
          // Exemple: [2.5, 3, 0, 4.2] → 4.2 mm
          maxRainfall: { $max: "$rainfall" },
          
          // NOMBRE D'ÉVÉNEMENTS PLUIE = count où rainfall > 0
          // $cond = opérateur conditionnel
          // Syntaxe: { $cond: [condition, valeurSiVrai, valeurSiFaux] }
          //
          // Exemple avec [2.5, 3, 0, 4.2]:
          // - 2.5 > 0 ? oui → +1
          // - 3 > 0 ? oui → +1
          // - 0 > 0 ? non → +0
          // - 4.2 > 0 ? oui → +1
          // Total: 3 événements pluie
          rainfallEvents: {
            $sum: {
              $cond: [
                { $gt: ["$rainfall", 0] },  // Si rainfall > 0
                1,                           // Ajouter 1
                0                            // Sinon ajouter 0
              ],
            },
          },
          
          // Nombre total de points de données
          dataPoints: { $sum: 1 },
        },
      },
      
      // ───────────────────────────────────────────────────────────────────────
      // ÉTAPE 2: $sort - Trier par pluie totale décroissante
      // ───────────────────────────────────────────────────────────────────────
      // Les villes les plus humides d'abord
      // ───────────────────────────────────────────────────────────────────────
      {
        $sort: { totalRainfall: -1 },
      },
    ];
    
    // ═════════════════════════════════════════════════════════════════════════
    // EXÉCUTER LE PIPELINE
    // ═════════════════════════════════════════════════════════════════════════
    
    const rainfall = await Weather.aggregate(pipeline);
    
    // ═════════════════════════════════════════════════════════════════════════
    // ENVOYER LA RÉPONSE
    // ═════════════════════════════════════════════════════════════════════════
    
    res.json({
      timestamp: new Date(),
      rainfallData: rainfall,
    });
    
  } catch (err) {
    res.status(500).json({ 
      message: "Erreur lors du calcul de pluie", 
      error: err.message 
    });
  }
});
```

#### Query MongoDB Pure

```javascript
// ═════════════════════════════════════════════════════════════════════════════
// QUERY MONGODB - Accumulation Pluie
// ═════════════════════════════════════════════════════════════════════════════

db.weathers.aggregate([
  // STAGE 1: Grouper par ville et calculer pluie
  {
    $group: {
      _id: "$city",
      totalRainfall: { $sum: "$rainfall" },
      avgRainfall: { $avg: "$rainfall" },
      maxRainfall: { $max: "$rainfall" },
      rainfallEvents: {
        $sum: {
          $cond: [
            { $gt: ["$rainfall", 0] },
            1,
            0
          ]
        }
      },
      dataPoints: { $sum: 1 }
    }
  },
  // STAGE 2: Trier par pluie décroissante
  {
    $sort: { totalRainfall: -1 }
  }
])
```

#### Exemple de Réponse

```json
{
  "timestamp": "2026-01-29T10:30:00.000Z",
  "rainfallData": [
    {
      "_id": "Tanger",
      "totalRainfall": 43,
      "avgRainfall": 14.33,
      "maxRainfall": 18,
      "rainfallEvents": 3,
      "dataPoints": 3
    },
    {
      "_id": "Casablanca",
      "totalRainfall": 25,
      "avgRainfall": 8.33,
      "maxRainfall": 12,
      "rainfallEvents": 3,
      "dataPoints": 3
    },
    {
      "_id": "Tétouan",
      "totalRainfall": 35,
      "avgRainfall": 11.67,
      "maxRainfall": 15,
      "rainfallEvents": 3,
      "dataPoints": 3
    },
    {
      "_id": "Marrakech",
      "totalRainfall": 2,
      "avgRainfall": 0.67,
      "maxRainfall": 2,
      "rainfallEvents": 1,
      "dataPoints": 3
    }
  ]
}
```

---

### 4. Agrégation - Comparaison Détaillée avec Extremes

#### Code Backend Complet

```javascript
// ========== ROUTE: GET /weather/compare/detailed?cities=Casablanca,Rabat ==========
// Comparaison DÉTAILLÉE avec possibilité de filtrer par villes

app.get("/weather/compare/detailed", async (req, res) => {
  try {
    // ─────────────────────────────────────────────────────────────────────────
    // RÉCUPÉRER & PARSER LES VILLES DU QUERY STRING
    // ─────────────────────────────────────────────────────────────────────────
    // req.query.cities = string des villes séparées par virgule
    // Exemple: "Casablanca,Rabat,Marrakech"
    //
    // .split(",") = convertit en array
    // Exemple: ["Casablanca", "Rabat", "Marrakech"]
    
    const cities = req.query.cities ? req.query.cities.split(",") : [];
    
    // ─────────────────────────────────────────────────────────────────────────
    // CONSTRUIRE LE STAGE $match (optionnel)
    // ─────────────────────────────────────────────────────────────────────────
    // Si cities fourni: filtrer uniquement ces villes
    // Si cities vide: garder tous les documents
    //
    // $in = filtrer où city est DANS l'array cities
    // Exemple avec ["Casablanca", "Rabat"]:
    // Retourne uniquement les docs où city = "Casablanca" OU city = "Rabat"
    
    const match =
      cities.length > 0 ? { $match: { city: { $in: cities } } } : {};
    
    // ═════════════════════════════════════════════════════════════════════════
    // PIPELINE AGGREGATION - Comparaison Détaillée
    // ═════════════════════════════════════════════════════════════════════════
    
    const pipeline = [
      // Inclure le stage $match seulement s'il y a des villes
      ...(Object.keys(match).length > 0 ? [match] : []),
      
      // ───────────────────────────────────────────────────────────────────────
      // ÉTAPE: $facet - 3 sous-pipelines en parallèle
      // ───────────────────────────────────────────────────────────────────────
      
      {
        $facet: {
          
          // SOUS-PIPELINE 1: Comparaison par Ville
          // Statistiques moyennes par ville
          cityComparison: [
            {
              $group: {
                _id: "$city",
                temp: { $avg: "$temperature" },
                humidity: { $avg: "$humidity" },
                windSpeed: { $avg: "$windSpeed" },
                pressure: { $avg: "$pressure" },
                rainfall: { $sum: "$rainfall" },
                records: { $sum: 1 },
              },
            },
            { $sort: { temp: -1 } },  // Trier par temp décroissante
          ],
          
          // SOUS-PIPELINE 2: Extremes Globales
          // Les valeurs extrêmes sur TOUS les documents (ou filtrés)
          extremes: [
            {
              $group: {
                _id: null,
                
                // Température MAXIMALE jamais enregistrée
                hottest: { $max: "$temperature" },
                
                // Température MINIMALE jamais enregistrée
                coldest: { $min: "$temperature" },
                
                // Pluie MAXIMALE jamais enregistrée
                wettest: { $max: "$rainfall" },
                
                // Vent MAXIMAL jamais enregistré
                windiest: { $max: "$windSpeed" },
              },
            },
          ],
          
          // SOUS-PIPELINE 3: Tendances Journalières par Ville
          // Moyenne par jour ET par ville
          dailyTrends: [
            {
              $group: {
                // Grouper par DATE et VILLE
                _id: {
                  date: {
                    $dateToString: { 
                      format: "%Y-%m-%d", 
                      date: "$createdAt" 
                    },
                  },
                  city: "$city",
                },
                
                // Moyenne température du jour pour la ville
                avgTemp: { $avg: "$temperature" },
                
                // Pluie totale du jour pour la ville
                totalRain: { $sum: "$rainfall" },
              },
            },
            // Trier par date décroissante (récent d'abord)
            { $sort: { "_id.date": -1 } },
          ],
        },
      },
    ];
    
    // ═════════════════════════════════════════════════════════════════════════
    // EXÉCUTER LE PIPELINE
    // ═════════════════════════════════════════════════════════════════════════
    
    const results = await Weather.aggregate(pipeline);
    const data = results[0];
    
    // ═════════════════════════════════════════════════════════════════════════
    // ENVOYER LA RÉPONSE
    // ═════════════════════════════════════════════════════════════════════════
    
    res.json({
      timestamp: new Date(),
      query: {
        cities: cities.length > 0 ? cities : "all",
        citiesRequested: cities.length,
      },
      cityComparison: data.cityComparison,
      extremes: data.extremes[0] || {},
      dailyTrends: data.dailyTrends,
    });
    
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de l'analyse détaillée",
      error: err.message,
    });
  }
});
```

#### Query MongoDB Pure

```javascript
// ═════════════════════════════════════════════════════════════════════════════
// QUERY MONGODB - Comparaison Détaillée
// ═════════════════════════════════════════════════════════════════════════════

db.weathers.aggregate([
  // STAGE 1: Filtrer par villes (OPTIONNEL)
  {
    $match: {
      city: { $in: ["Casablanca", "Rabat", "Marrakech"] }
    }
  },
  
  // STAGE 2: $facet - 3 analyses en parallèle
  {
    $facet: {
      cityComparison: [
        {
          $group: {
            _id: "$city",
            temp: { $avg: "$temperature" },
            humidity: { $avg: "$humidity" },
            windSpeed: { $avg: "$windSpeed" },
            pressure: { $avg: "$pressure" },
            rainfall: { $sum: "$rainfall" },
            records: { $sum: 1 }
          }
        },
        { $sort: { temp: -1 } }
      ],
      
      extremes: [
        {
          $group: {
            _id: null,
            hottest: { $max: "$temperature" },
            coldest: { $min: "$temperature" },
            wettest: { $max: "$rainfall" },
            windiest: { $max: "$windSpeed" }
          }
        }
      ],
      
      dailyTrends: [
        {
          $group: {
            _id: {
              date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              city: "$city"
            },
            avgTemp: { $avg: "$temperature" },
            totalRain: { $sum: "$rainfall" }
          }
        },
        { $sort: { "_id.date": -1 } }
      ]
    }
  }
])
```

#### Exemple de Réponse

```json
{
  "timestamp": "2026-01-29T10:30:00.000Z",
  "query": {
    "cities": ["Casablanca", "Rabat"],
    "citiesRequested": 2
  },
  "cityComparison": [
    {
      "_id": "Rabat",
      "temp": 23,
      "humidity": 72,
      "windSpeed": 15,
      "pressure": 1013,
      "rainfall": 18,
      "records": 3
    },
    {
      "_id": "Casablanca",
      "temp": 22.67,
      "humidity": 71,
      "windSpeed": 18.3,
      "pressure": 1015,
      "rainfall": 25,
      "records": 3
    }
  ],
  "extremes": {
    "_id": null,
    "hottest": 24,
    "coldest": 20,
    "wettest": 12,
    "windiest": 22
  },
  "dailyTrends": [
    {
      "_id": {
        "date": "2026-01-29",
        "city": "Rabat"
      },
      "avgTemp": 21,
      "totalRain": 0
    },
    {
      "_id": {
        "date": "2026-01-29",
        "city": "Casablanca"
      },
      "avgTemp": 22,
      "totalRain": 0
    }
  ]
}
```

---

## 🌐 ENDPOINTS API AVEC EXEMPLES

### Tableau Récapitulatif

| Method | Endpoint | Description | Paramètres |
|--------|----------|-------------|-----------|
| **POST** | `/weather` | Créer un enregistrement | Body JSON |
| **GET** | `/weather` | Lire tous | - |
| **PUT** | `/weather/:id` | Mettre à jour | ID, Body JSON |
| **DELETE** | `/weather/:id` | Supprimer | ID |
| **GET** | `/weather/average` | Stats globales | - |
| **GET** | `/weather/compare/cities` | Comparer villes | - |
| **GET** | `/weather/rainfall/accumulation` | Pluie totale | - |
| **GET** | `/weather/compare/detailed` | Détails complets | ?cities=... |
| **GET** | `/weather/stats/cities` | Stats par ville | - |

### Exemples Pratiques

#### 1. Ajouter une Observation

```bash
curl -X POST http://localhost:5000/weather \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Casablanca",
    "temperature": 22,
    "humidity": 65,
    "pressure": 1013,
    "windSpeed": 15,
    "rainfall": 2.5,
    "description": "Nuageux",
    "icon": "04d"
  }'
```

#### 2. Récupérer Tous les Enregistrements

```bash
curl http://localhost:5000/weather
```

#### 3. Statistiques Globales

```bash
curl http://localhost:5000/weather/average
```

#### 4. Comparer Toutes les Villes

```bash
curl http://localhost:5000/weather/compare/cities
```

#### 5. Accumulation Pluie

```bash
curl http://localhost:5000/weather/rainfall/accumulation
```

#### 6. Comparaison Détaillée Filtrée

```bash
curl "http://localhost:5000/weather/compare/detailed?cities=Casablanca,Rabat,Marrakech"
```

---

## 📊 QUERIES MONGODB PURES

### Commandes mongosh

```javascript
// ═════════════════════════════════════════════════════════════════════════════
// SE CONNECTER À LA BASE DE DONNÉES
// ═════════════════════════════════════════════════════════════════════════════

// Dans mongosh CLI
use climatrack

// ═════════════════════════════════════════════════════════════════════════════
// 1. VOIR TOUS LES DOCUMENTS
// ═════════════════════════════════════════════════════════════════════════════

db.weathers.find({}).pretty()

// Avec limite
db.weathers.find({}).limit(5).pretty()

// ═════════════════════════════════════════════════════════════════════════════
// 2. TROUVER PAR CRITÈRE
// ═════════════════════════════════════════════════════════════════════════════

// Tous les enregistrements de Casablanca
db.weathers.find({ city: "Casablanca" }).pretty()

// Où température > 25
db.weathers.find({ temperature: { $gt: 25 } }).pretty()

// Où température entre 20 et 25
db.weathers.find({
  temperature: { $gte: 20, $lte: 25 }
}).pretty()

// ═════════════════════════════════════════════════════════════════════════════
// 3. COMPTER LES DOCUMENTS
// ═════════════════════════════════════════════════════════════════════════════

// Total de documents
db.weathers.countDocuments({})

// Nombre d'enregistrements pour Casablanca
db.weathers.countDocuments({ city: "Casablanca" })

// Nombre de villes distinctes
db.weathers.distinct("city").length

// ═════════════════════════════════════════════════════════════════════════════
// 4. STATISTIQUES SIMPLES
// ═════════════════════════════════════════════════════════════════════════════

// Température moyenne
db.weathers.aggregate([
  {
    $group: {
      _id: null,
      avgTemp: { $avg: "$temperature" }
    }
  }
])

// Min/Max/Avg par ville
db.weathers.aggregate([
  {
    $group: {
      _id: "$city",
      min: { $min: "$temperature" },
      max: { $max: "$temperature" },
      avg: { $avg: "$temperature" }
    }
  }
])

// ═════════════════════════════════════════════════════════════════════════════
// 5. TRIER ET LIMITER
// ═════════════════════════════════════════════════════════════════════════════

// 10 documents les plus récents
db.weathers.find({})
  .sort({ createdAt: -1 })
  .limit(10)
  .pretty()

// 5 documents les plus anciens
db.weathers.find({})
  .sort({ createdAt: 1 })
  .limit(5)
  .pretty()

// ═════════════════════════════════════════════════════════════════════════════
// 6. MISE À JOUR
// ═════════════════════════════════════════════════════════════════════════════

// Mettre à jour UN document par ID
db.weathers.updateOne(
  { _id: ObjectId("...") },
  { $set: { temperature: 25, humidity: 70 } }
)

// Mettre à jour PLUSIEURS documents
db.weathers.updateMany(
  { city: "Casablanca" },
  { $set: { humidity: 75 } }
)

// ═════════════════════════════════════════════════════════════════════════════
// 7. SUPPRESSION
// ═════════════════════════════════════════════════════════════════════════════

// Supprimer UN document
db.weathers.deleteOne({ _id: ObjectId("...") })

// Supprimer TOUS les documents d'une ville
db.weathers.deleteMany({ city: "Casablanca" })

// ═════════════════════════════════════════════════════════════════════════════
// 8. AGRÉGATIONS AVANCÉES
// ═════════════════════════════════════════════════════════════════════════════

// Pluie par jour et par ville
db.weathers.aggregate([
  {
    $group: {
      _id: {
        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        city: "$city"
      },
      totalRain: { $sum: "$rainfall" }
    }
  },
  { $sort: { "_id.date": -1 } }
])

// Villes classées par température
db.weathers.aggregate([
  {
    $group: {
      _id: "$city",
      avgTemp: { $avg: "$temperature" },
      records: { $sum: 1 }
    }
  },
  { $sort: { avgTemp: -1 } }
])
```

---

## 🔧 INDEXATION & PERFORMANCE

### Créer les Index

```javascript
// ═════════════════════════════════════════════════════════════════════════════
// CRÉER LES INDEX
// ═════════════════════════════════════════════════════════════════════════════

// INDEX 1: Par ville (très utilisé dans les filtres)
db.weathers.createIndex({ "city": 1 })

// INDEX 2: Par date (pour tris et agrégations)
db.weathers.createIndex({ "createdAt": -1 })

// INDEX 3: Composé (ville + date)
db.weathers.createIndex({ "city": 1, "createdAt": -1 })

// INDEX 4: Par pluie (pour filtres rainfall)
db.weathers.createIndex({ "rainfall": 1 })

// INDEX 5: TTL - Supprimer automatiquement après 90 jours
// Utile pour ne pas garder trop de données
db.weathers.createIndex(
  { "createdAt": 1 },
  { expireAfterSeconds: 7776000 }  // 90 jours
)
```

### Vérifier les Index

```javascript
// Voir tous les index
db.weathers.getIndexes()

// Résultat:
// [
//   { v: 2, key: { _id: 1 }, name: "_id_" },
//   { v: 2, key: { city: 1 }, name: "city_1" },
//   { v: 2, key: { createdAt: -1 }, name: "createdAt_-1" },
//   ...
// ]
```

### Analyser les Performances

```javascript
// Voir comment MongoDB exécute une requête
db.weathers.find({ city: "Casablanca" }).explain("executionStats")

// Résultat inclut:
// - executionStages: comment les données sont récupérées
// - totalDocsExamined: documents examinés
// - totalKeysExamined: clés d'index examinées
// - executionTimeMillis: temps d'exécution
//
// OPTIMAL: totalDocsExamined = totalKeysExamined
// (Cela signifie qu'un index a été utilisé efficacement)
```

---

## 📦 DONNÉES DE SEED

### Fichier Seed Complet

```javascript
// ========== FILE: backend/seed-moroccan-data.js ==========

import Weather from './models/Weather.js';
import mongoose from 'mongoose';

// ═════════════════════════════════════════════════════════════════════════════
// DONNÉES - 11 Villes Marocaines
// ═════════════════════════════════════════════════════════════════════════════
// Structure: 3 observations par ville (= 33 documents)
// ═════════════════════════════════════════════════════════════════════════════

const moroccanCities = [
  // CASABLANCA (Côte Atlantique - Chaude & Humide)
  { 
    city: "Casablanca", 
    temperature: 22, 
    humidity: 75, 
    windSpeed: 20, 
    rainfall: 8, 
    pressure: 1015, 
    description: "Partly cloudy",
    icon: "02d" 
  },
  { 
    city: "Casablanca", 
    temperature: 24, 
    humidity: 70, 
    windSpeed: 18, 
    rainfall: 5, 
    pressure: 1016, 
    description: "Sunny", 
    icon: "01d" 
  },
  { 
    city: "Casablanca", 
    temperature: 20, 
    humidity: 78, 
    windSpeed: 22, 
    rainfall: 12, 
    pressure: 1014, 
    description: "Rainy", 
    icon: "10d" 
  },
  
  // RABAT (Capitale - Climat Atlantique)
  { 
    city: "Rabat", 
    temperature: 23, 
    humidity: 72, 
    windSpeed: 15, 
    rainfall: 6, 
    pressure: 1013, 
    description: "Clear", 
    icon: "01d" 
  },
  { 
    city: "Rabat", 
    temperature: 25, 
    humidity: 68, 
    windSpeed: 12, 
    rainfall: 3, 
    pressure: 1014, 
    description: "Sunny", 
    icon: "01d" 
  },
  { 
    city: "Rabat", 
    temperature: 21, 
    humidity: 75, 
    windSpeed: 18, 
    rainfall: 9, 
    pressure: 1012, 
    description: "Cloudy", 
    icon: "03d" 
  },
  
  // MARRAKECH (Intérieur - Chaud & Sec)
  { 
    city: "Marrakech", 
    temperature: 32, 
    humidity: 45, 
    windSpeed: 10, 
    rainfall: 0, 
    pressure: 1018, 
    description: "Hot and sunny", 
    icon: "01d" 
  },
  { 
    city: "Marrakech", 
    temperature: 35, 
    humidity: 40, 
    windSpeed: 8, 
    rainfall: 0, 
    pressure: 1019, 
    description: "Very hot", 
    icon: "01d" 
  },
  { 
    city: "Marrakech", 
    temperature: 30, 
    humidity: 50, 
    windSpeed: 12, 
    rainfall: 2, 
    pressure: 1017, 
    description: "Warm", 
    icon: "02d" 
  },
  
  // ... plus 8 autres villes
];

// ═════════════════════════════════════════════════════════════════════════════
// FONCTION DE SEED
// ═════════════════════════════════════════════════════════════════════════════

async function seedMoroccanData() {
  try {
    // Étape 1: Se connecter à MongoDB
    const mongoUri = 
      process.env.MONGO_URI || 
      "mongodb://127.0.0.1:27017/climatrack";
    
    await mongoose.connect(mongoUri);
    console.log('✓ Connecté à MongoDB');
    
    // Étape 2: Supprimer les ANCIENNES données
    // db.weathers.deleteMany({}) = TOUT supprimer
    await Weather.deleteMany({});
    console.log('✓ Anciennes données supprimées');
    
    // Étape 3: Ajouter des DATES différentes
    // Chaque doc = jour différent (pour avoir de la variété dans les dates)
    const dataWithDates = moroccanCities.map((item, index) => ({
      ...item,
      // Chaque doc a une date différente
      // index * 24h avant maintenant
      // Exemple:
      // index 0 = aujourd'hui
      // index 1 = hier
      // index 2 = avant-hier
      createdAt: new Date(Date.now() - (index * 24 * 60 * 60 * 1000))
    }));
    
    // Étape 4: Insérer les NOUVELLES données
    // Weather.insertMany() = insert plusieurs documents
    await Weather.insertMany(dataWithDates);
    console.log(
      `✓ ${dataWithDates.length} enregistrements créés`
    );
    
    // Étape 5: Afficher les stats
    const cities = [...new Set(dataWithDates.map(item => item.city))];
    console.log(`✓ Villes: ${cities.join(', ')}`);
    console.log(
      `✓ Enregistrements par ville: ${dataWithDates.length / cities.length}`
    );
    
    // Étape 6: Fermer la connexion
    await mongoose.connection.close();
    console.log('✓ Connexion fermée');
    
  } catch (error) {
    console.error('✗ Erreur:', error);
    process.exit(1);
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// EXÉCUTER LE SEED
// ═════════════════════════════════════════════════════════════════════════════

seedMoroccanData();
```

### Exécuter le Seed

```bash
# ═════════════════════════════════════════════════════════════════════════════
# Dans le terminal
# ═════════════════════════════════════════════════════════════════════════════

cd backend

# Exécuter le script de seed
node seed-moroccan-data.js

# Output attendu:
# ✓ Connecté à MongoDB
# ✓ Anciennes données supprimées
# ✓ 33 enregistrements créés
# ✓ Villes: Casablanca, Rabat, Marrakech, Fès, Tanger, ...
# ✓ Enregistrements par ville: 3
# ✓ Connexion fermée
```

---

## 🏗️ ARCHITECTURE & FLUX

### Diagramme Complet de Flux

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ CLIENT (Frontend React / Postman)                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Exemple:                                                                    │
│  GET http://localhost:5000/weather/compare/cities                           │
│                                                                              │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │ HTTP Request
                                        ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ BACKEND (Express.js)                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. Router: app.get("/weather/compare/cities", async (req, res) => {        │
│                                                                              │
│  2. Valider les paramètres                                                   │
│     - Récupérer req.query                                                    │
│     - Vérifier les formats                                                   │
│                                                                              │
│  3. Construire le pipeline MongoDB                                           │
│     - $group, $facet, $sort, etc.                                           │
│                                                                              │
│  4. Exécuter: const results = await Weather.aggregate(pipeline)             │
│                                                                              │
│  5. Formater et envoyer: res.json(results)                                  │
│                                                                              │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │ Query MongoDB
                                        ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ DATABASE (MongoDB)                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Collection: weathers                                                        │
│  ┌──────────────────────────────────────────────────────────────┐            │
│  │ _id  │ city       │ temperature │ humidity │ ... │ createdAt │           │
│  ├──────┼────────────┼─────────────┼──────────┼─────┼───────────┤           │
│  │ 001  │ Casablanca │ 22          │ 75       │ ... │ 2026-01-29│           │
│  │ 002  │ Rabat      │ 23          │ 72       │ ... │ 2026-01-28│           │
│  │ 003  │ Marrakech  │ 32          │ 45       │ ... │ 2026-01-27│           │
│  │ ...  │ ...        │ ...         │ ...      │ ... │ ...       │           │
│  └──────┴────────────┴─────────────┴──────────┴─────┴───────────┘            │
│                                                                              │
│  Pipeline Aggregation:                                                       │
│  1. $group par city → Calcule moyennes                                       │
│  2. $sort par avgTemperature                                                 │
│  3. Retour des résultats groupés                                            │
│                                                                              │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │ Résultats Agrégés
                                        ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ RÉPONSE (JSON)                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  {                                                                           │
│    "timestamp": "2026-01-29T10:30:00.000Z",                                 │
│    "citiesCount": 11,                                                        │
│    "data": [                                                                 │
│      {                                                                       │
│        "_id": "Marrakech",                                                   │
│        "avgTemperature": 32.5,                                               │
│        "maxTemperature": 35,                                                 │
│        "minTemperature": 30,                                                 │
│        "avgHumidity": 45,                                                    │
│        "avgWindSpeed": 9,                                                    │
│        "rainfallAccumulation": 2,                                            │
│        "avgPressure": 1018,                                                  │
│        "dataPoints": 3,                                                      │
│        "lastUpdated": "2026-01-29T10:30:00.000Z"                            │
│      }                                                                       │
│      // ... autres villes                                                    │
│    ]                                                                         │
│  }                                                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │ Response
                                        ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│ CLIENT Reçoit & Affiche les Données                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Frontend React:                                                             │
│  1. useEffect(() => {                                                        │
│       weatherApi.getCitiesComparison().then(res => setState(res.data))      │
│     }, [])                                                                    │
│                                                                              │
│  2. Afficher avec Recharts:                                                  │
│     <BarChart data={data}>                                                   │
│       <Bar dataKey="avgTemperature" />                                       │
│     </BarChart>                                                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📝 RÉSUMÉ - CE QU'IL FAUT RETENIR

### Base de Données
- ✅ **Collection**: `weathers` (9 champs)
- ✅ **Type**: MongoDB NoSQL (flexible)
- ✅ **Modèle**: Mongoose (ODM)
- ✅ **Validation**: Requises au niveau schéma

### Opérations
- ✅ **CRUD**: Créer, Lire, Mettre à jour, Supprimer
- ✅ **Agrégations**: Statistiques, groupements, agrégations avancées
- ✅ **Indexes**: city, createdAt, composés pour performance
- ✅ **Filtres**: Par ville, date, plage de valeurs

### Endpoints Clés
- ✅ `/weather` - CRUD basique
- ✅ `/weather/average` - Statistiques globales
- ✅ `/weather/compare/cities` - Comparaison villes
- ✅ `/weather/rainfall/accumulation` - Pluie cumulée
- ✅ `/weather/compare/detailed?cities=...` - Détails filtrés

### Performance
- ✅ Indexes sur `city` et `createdAt`
- ✅ $facet pour exécutions parallèles
- ✅ Agrégation côté serveur (pas de traitement frontend)
- ✅ TTL possible pour nettoyage automatique

---

**Fin de la Documentation Complète** ✨
