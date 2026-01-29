import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
const OPENWEATHER_API_KEY = "897718d195d4a8e7652d1a0698eefd3e";
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Moroccan cities with their coordinates
const MOROCCAN_CITIES = [
  { name: "Casablanca", lat: 33.5731, lon: -7.5898 },
  { name: "Rabat", lat: 34.0209, lon: -6.8416 },
  { name: "Marrakech", lat: 31.6295, lon: -7.9811 },
  { name: "Fès", lat: 34.0181, lon: -5.0078 },
  { name: "Tanger", lat: 35.7595, lon: -5.8340 },
  { name: "Agadir", lat: 30.4278, lon: -9.5981 },
  { name: "Meknès", lat: 33.8725, lon: -5.5402 },
  { name: "Oujda", lat: 34.6820, lon: -1.9086 },
  { name: "Laâyoune", lat: 27.1536, lon: -13.2033 },
  { name: "Tétouan", lat: 35.5889, lon: -5.3635 },
  { name: "Safi", lat: 32.2994, lon: -9.2372 }
];

const weatherApi = {
  // Récupérer toutes les données météo depuis notre backend
  getAllWeather: () => {
    return axios.get(`${API_BASE_URL}/weather`);
  },

  // Récupérer la comparaison entre toutes les villes
  getCitiesComparison: () => {
    return axios.get(`${API_BASE_URL}/weather/compare/cities`);
  },

  // Récupérer l'accumulation de pluie par ville
  getRainfallAccumulation: () => {
    return axios.get(`${API_BASE_URL}/weather/rainfall/accumulation`);
  },

  // Récupérer la comparaison détaillée (optionnel: filtrer par villes)
  getDetailedComparison: (cities = null) => {
    const params = cities ? `?cities=${cities.join(",")}` : "";
    return axios.get(`${API_BASE_URL}/weather/compare/detailed${params}`);
  },

  // Récupérer les statistiques par ville
  getCitiesStats: () => {
    return axios.get(`${API_BASE_URL}/weather/stats/cities`);
  },

  // Récupérer les statistiques globales (moyenne, min, max)
  getWeatherStats: () => {
    return axios.get(`${API_BASE_URL}/weather/average`);
  },

  // Récupérer les données météo actuelles depuis OpenWeatherMap
  getCurrentWeather: (city) => {
    const cityData = MOROCCAN_CITIES.find(c => c.name.toLowerCase() === city.toLowerCase());
    if (cityData) {
      return axios.get(`${OPENWEATHER_BASE_URL}/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=fr`);
    }
    return axios.get(`${OPENWEATHER_BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=fr`);
  },

  // Récupérer les données météo actuelles pour toutes les villes marocaines
  getAllMoroccanWeather: async () => {
    try {
      const promises = MOROCCAN_CITIES.map(city => 
        axios.get(`${OPENWEATHER_BASE_URL}/weather?lat=${city.lat}&lon=${city.lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=fr`)
      );
      const responses = await Promise.all(promises);
      return responses.map((response, index) => ({
        city: MOROCCAN_CITIES[index].name,
        ...response.data,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        rainfall: response.data.rain ? response.data.rain['1h'] || 0 : 0,
        pressure: response.data.main.pressure,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon
      }));
    } catch (error) {
      console.error('Error fetching Moroccan weather data:', error);
      throw error;
    }
  },

  // Sauvegarder les données météo dans notre backend
  saveWeatherData: async (weatherData) => {
    try {
      const promises = weatherData.map(data => 
        axios.post(`${API_BASE_URL}/weather`, {
          city: data.city,
          temperature: data.temperature,
          humidity: data.humidity,
          windSpeed: data.windSpeed,
          rainfall: data.rainfall,
          pressure: data.pressure,
          description: data.description,
          icon: data.icon
        })
      );
      return await Promise.all(promises);
    } catch (error) {
      console.error('Error saving weather data:', error);
      throw error;
    }
  },

  // Récupérer et sauvegarder les données actuelles
  fetchAndSaveCurrentData: async () => {
    try {
      const currentData = await weatherApi.getAllMoroccanWeather();
      await weatherApi.saveWeatherData(currentData);
      return currentData;
    } catch (error) {
      console.error('Error fetching and saving current data:', error);
      throw error;
    }
  },

  // Créer une nouvelle entrée météo
  createWeather: (weatherData) => {
    return axios.post(`${API_BASE_URL}/weather`, weatherData);
  },

  // Mettre à jour une entrée météo
  updateWeather: (id, weatherData) => {
    return axios.put(`${API_BASE_URL}/weather/${id}`, weatherData);
  },

  // Supprimer une entrée météo
  deleteWeather: (id) => {
    return axios.delete(`${API_BASE_URL}/weather/${id}`);
  },
};

export default weatherApi;
