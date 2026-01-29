import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Weather from "./models/Weather.js";

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// URI MongoDB
const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/climatrack";

if (!process.env.MONGO_URI) {
  console.warn(
    "MONGO_URI non défini, utilisation de MongoDB local :",
    mongoUri,
  );
}

// Connexion MongoDB (sans top-level await pour compatibilité)
mongoose
  .connect(mongoUri)
  .then(() => console.log(" MongoDB connecté"))
  .catch((err) => {
    console.error(" Erreur MongoDB :", err.message);
    process.exit(1);
  });

// ROUTES
app.get("/weather", async (req, res) => {
  try {
    const data = await Weather.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/weather", async (req, res) => {
  try {
    const weather = new Weather(req.body);
    const saved = await weather.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET average temperature
// GET analytics data (Average, Min, Max, and Daily Trends for Charts)
app.get("/weather/average", async (req, res) => {
  try {
    const pipeline = [
      {
        $facet: {
          // Global statistics
          summary: [
            {
              $group: {
                _id: null,
                avgTemp: { $avg: "$temperature" },
                maxTemp: { $max: "$temperature" },
                minTemp: { $min: "$temperature" },
                avgHumidity: { $avg: "$humidity" },
                avgWindSpeed: { $avg: "$windSpeed" },
                totalRecords: { $sum: 1 },
              },
            },
          ],
          // Daily trends for charts
          daily: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                avgTemp: { $avg: "$temperature" },
                maxTemp: { $max: "$temperature" },
                minTemp: { $min: "$temperature" },
              },
            },
            { $sort: { _id: 1 } }, // Sort by date ascending
          ],
        },
      },
    ];

    const results = await Weather.aggregate(pipeline);
    const data = results[0];

    res.json({
      summary: data.summary[0] || null,
      daily: data.daily || [],
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error calculating weather statistics",
        error: err.message,
      });
  }
});

app.put("/weather/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID invalide" });
  }

  try {
    const updated = await Weather.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/weather/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "ID invalide" });
  }

  try {
    await Weather.findByIdAndDelete(req.params.id);
    res.json({ message: "Supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ENDPOINTS DE COMPARAISON MULTI-VILLES
// GET comparison between cities
app.get("/weather/compare/cities", async (req, res) => {
  try {
    const pipeline = [
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
          lastUpdated: { $max: "$createdAt" },
        },
      },
      {
        $sort: { avgTemperature: -1 },
      },
    ];

    const comparison = await Weather.aggregate(pipeline);

    res.json({
      timestamp: new Date(),
      citiesCount: comparison.length,
      data: comparison,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la comparaison", error: err.message });
  }
});

// GET rainfall accumulation by city
app.get("/weather/rainfall/accumulation", async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$city",
          totalRainfall: { $sum: "$rainfall" },
          avgRainfall: { $avg: "$rainfall" },
          maxRainfall: { $max: "$rainfall" },
          rainfallEvents: {
            $sum: {
              $cond: [{ $gt: ["$rainfall", 0] }, 1, 0],
            },
          },
          dataPoints: { $sum: 1 },
        },
      },
      {
        $sort: { totalRainfall: -1 },
      },
    ];

    const rainfall = await Weather.aggregate(pipeline);

    res.json({
      timestamp: new Date(),
      rainfallData: rainfall,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors du calcul de pluie", error: err.message });
  }
});

// GET detailed comparison for specific cities
app.get("/weather/compare/detailed", async (req, res) => {
  try {
    const cities = req.query.cities ? req.query.cities.split(",") : [];

    const match =
      cities.length > 0 ? { $match: { city: { $in: cities } } } : {};

    const pipeline = [
      ...(Object.keys(match).length > 0 ? [match] : []),
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
                records: { $sum: 1 },
              },
            },
            { $sort: { temp: -1 } },
          ],
          extremes: [
            {
              $group: {
                _id: null,
                hottest: { $max: "$temperature" },
                coldest: { $min: "$temperature" },
                wettest: { $max: "$rainfall" },
                windiest: { $max: "$windSpeed" },
              },
            },
          ],
          dailyTrends: [
            {
              $group: {
                _id: {
                  date: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                  },
                  city: "$city",
                },
                avgTemp: { $avg: "$temperature" },
                totalRain: { $sum: "$rainfall" },
              },
            },
            { $sort: { "_id.date": -1 } },
          ],
        },
      },
    ];

    const results = await Weather.aggregate(pipeline);
    const data = results[0];

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
    res
      .status(500)
      .json({
        message: "Erreur lors de l'analyse détaillée",
        error: err.message,
      });
  }
});

// GET city statistics for visualization
app.get("/weather/stats/cities", async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$city",
          temperature: {
            avg: { $avg: "$temperature" },
            max: { $max: "$temperature" },
            min: { $min: "$temperature" },
          },
          humidity: {
            avg: { $avg: "$humidity" },
            max: { $max: "$humidity" },
            min: { $min: "$humidity" },
          },
          windSpeed: {
            avg: { $avg: "$windSpeed" },
            max: { $max: "$windSpeed" },
          },
          rainfall: {
            total: { $sum: "$rainfall" },
            avg: { $avg: "$rainfall" },
            max: { $max: "$rainfall" },
          },
          pressure: {
            avg: { $avg: "$pressure" },
          },
          observations: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          temperature: 1,
          humidity: 1,
          windSpeed: 1,
          rainfall: 1,
          pressure: 1,
          observations: 1,
        },
      },
      {
        $sort: { observations: -1 },
      },
    ];

    const stats = await Weather.aggregate(pipeline);

    res.json({
      timestamp: new Date(),
      totalCities: stats.length,
      statistics: stats,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erreur lors du calcul des statistiques",
        error: err.message,
      });
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
