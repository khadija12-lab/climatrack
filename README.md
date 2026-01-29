# MeteoVision

## Présentation du Projet

**MeteoVision** est une application web moderne de surveillance météorologique spécialisée pour les villes du Maroc. Elle offre des visualisations dynamiques et en temps réel des données climatiques, permettant aux utilisateurs de suivre les tendances météorologiques à travers 11 villes marocaines majeures.

### Fonctionnalités Principales

- **Dashboard Complet**: Vue d'ensemble de toutes les métriques météorologiques
- **Analyse des Températures**: Suivi des tendances sur 7 jours avec min/max/moyennes
- **Précipitations**: Visualisation détaillée des pluies par ville
- **Humidité**: Analyse multi-métriques (humidité, température, vent)
- **Comparaison des Villes**: Comparaison côte à côte des conditions météo
- **Accumulation de Pluie**: Statistiques détaillées des précipitations
- **Mode Sombre/Clair**: Interface adaptable
- **Responsive Design**: Compatible tous écrans

### Villes Couvertes

L'application couvre les principales villes marocaines :
- Casablanca, Rabat, Marrakech, Fès, Tanger
- Agadir, Meknès, Oujda, Laâyoune, Tétouan, Safi

---

## Stack Technique

### Frontend
- **React 19.2.0** - Framework JavaScript moderne
- **Vite** - Outil de build rapide et efficace
- **Recharts** - Bibliothèque de visualisation de données
- **Axios** - Client HTTP pour les appels API
- **CSS3** - Styles modernes avec dark mode

### Backend
- **Node.js** - Runtime JavaScript serveur
- **Express.js** - Framework web minimaliste
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM MongoDB pour Node.js

### API Externe
- **OpenWeatherMap API** - Données météorologiques en temps réel
- **Clé API**: `897718d195d4a8e7652d1a0698eefd3e`

### Architecture
```
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── services/        # Services API
│   │   └── App.css         # Styles globaux
├── backend/                 # Serveur Express
│   ├── models/             # Modèles Mongoose
│   ├── routes/             # Routes API
│   └── server.js           # Point d'entrée serveur
└── README.md               # Documentation
```

---

## Instructions de Lancement

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- MongoDB (local ou cloud)
- Clé API OpenWeatherMap

### Installation

1. **Cloner le projet**
```bash
git clone https://github.com/20Hanae20/MeteoVision.git
cd MeteoVision
```

2. **Installer les dépendances backend**
```bash
cd backend
npm install
```

3. **Installer les dépendances frontend**
```bash
cd ../frontend
npm install
```

4. **Configurer les variables d'environnement**

Dans `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/climatrack
OPENWEATHER_API_KEY=897718d195d4a8e7652d1a0698eefd3e
```

Dans `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### Démarrage

1. **Démarrer MongoDB**
```bash
# Si MongoDB est installé localement
mongod
```

2. **Démarrer le backend**
```bash
cd backend
npm run dev
```

3. **Démarrer le frontend**
```bash
cd frontend
npm run dev
```

4. **Accéder à l'application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## Liens Utiles

### Documentation
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/fr/guide/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Recharts Documentation](https://recharts.org/)
- [OpenWeatherMap API](https://openweathermap.org/api)

### Outils de Développement
- [Node.js Download](https://nodejs.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [VS Code](https://code.visualstudio.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

### API et Services
- [OpenWeatherMap Dashboard](https://home.openweathermap.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [GitHub Repository](https://github.com/20Hanae20/MeteoVision)

---

## Démo

### Captures d'écran

*Section à compléter avec des captures d'écran de l'application*

### Vidéo de Démonstration

*Lien vers une vidéo de démonstration de l'application*

---

## Contribution

Pour contribuer au projet :

1. Forker le repository
2. Créer une branche de fonctionnalité (`git checkout -b feature/nouvelle-fonction`)
3. Committer les changements (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. Pousser vers la branche (`git push origin feature/nouvelle-fonction`)
5. Créer une Pull Request

---

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## Contact

- **Développeur**: Hanae & Khadija
- **Email**: [hanaechaib3@gmail.com]
- **GitHub**: [@20Hanae20](https://github.com/20Hanae20)
- **Projet**: https://github.com/20Hanae20/MeteoVision

---

## Remerciements

- OpenWeatherMap pour les données météorologiques
- La communauté React et Express
- Tous les contributeurs du projet
