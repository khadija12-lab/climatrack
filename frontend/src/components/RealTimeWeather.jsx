import { useState, useEffect } from 'react';
import axios from 'axios';
import './RealTimeWeather.css';

const OPENWEATHER_API_KEY = "897718d195d4a8e7652d1a0698eefd3e";
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

function RealTimeWeather() {
    const [city, setCity] = useState('Casablanca');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchWeather = async (cityName) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather?q=${cityName}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=fr`);
            setWeatherData(response.data);
        } catch (err) {
            setError("Ville non trouvée ou erreur réseau. Veuillez réessayer.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, []);


    const moroccanCities = [
        "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger",
        "Agadir", "Meknès", "Oujda", "Tétouan", "Safi",
        "Laâyoune", "Nador", "Béni Mellal", "El Jadida", "Taza"
    ];

    const handleCitySelect = (e) => {
        const selected = e.target.value;
        if (selected) {
            setCity(selected);
            fetchWeather(selected);
        }
    };

    if (loading && !weatherData) return <div className="loading">Chargement...</div>;

    return (
        <div className="real-time-weather">
            <div className="search-container no-search">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="city-selector">
                        <select onChange={handleCitySelect} defaultValue="">
                            <option value="" disabled>Choisir une ville...</option>
                            {moroccanCities.sort().map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            {weatherData && (
                <div className="weather-display-card glass">
                    <div className="weather-header">
                        <div className="city-info">
                            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                            <p className="local-time">{new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="weather-icon-main">
                            <img
                                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                                alt={weatherData.weather[0].description}
                            />
                            <p className="description">{weatherData.weather[0].description}</p>
                        </div>
                    </div>

                    <div className="main-temp">
                        <span className="temp-value">{Math.round(weatherData.main.temp)}°</span>
                        <div className="temp-details">
                            <span>H: {Math.round(weatherData.main.temp_max)}°</span>
                            <span>B: {Math.round(weatherData.main.temp_min)}°</span>
                        </div>
                    </div>

                    <div className="weather-grid">
                        <div className="grid-item glass">
                            <span className="label">Ressenti</span>
                            <span className="value">{Math.round(weatherData.main.feels_like)}°C</span>
                        </div>
                        <div className="grid-item glass">
                            <span className="label">Humidité</span>
                            <span className="value">{weatherData.main.humidity}%</span>
                        </div>
                        <div className="grid-item glass">
                            <span className="label">Vent</span>
                            <span className="value">{weatherData.wind.speed} km/h</span>
                        </div>
                        <div className="grid-item glass">
                            <span className="label">Pression</span>
                            <span className="value">{weatherData.main.pressure} hPa</span>
                        </div>
                        <div className="grid-item glass">
                            <span className="label">Visibilité</span>
                            <span className="value">{(weatherData.visibility / 1000).toFixed(1)} km</span>
                        </div>
                        <div className="grid-item glass">
                            <span className="label">Nuages</span>
                            <span className="value">{weatherData.clouds.all}%</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RealTimeWeather;
