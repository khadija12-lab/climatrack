import { useState, useEffect } from 'react';
import CitiesComparison from './components/CitiesComparison';
import RainfallAccumulation from './components/RainfallAccumulation';
import TemperatureChart from './components/TemperatureChart';
import PrecipitationChart from './components/PrecipitationChart';
import HumidityChart from './components/HumidityChart';
import RealTimeWeather from './components/RealTimeWeather';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <header className="app-header">
        <div className="header-content">
          <div className="header-text">
            <h1>MeteoVision</h1>
            <p>Visualisation Intelligence & Données en Temps Réel</p>
          </div>
          <div className="header-actions">
            <button
              className="refresh-btn glass global-refresh"
              onClick={() => window.location.reload()}
              title="Actualiser toute l'application"
            >
              🔄 Actualiser
            </button>
            <button
              className="theme-toggle glass"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
            </button>
          </div>
        </div>
      </header>

      <nav className="app-nav">
        {[
          { id: 'dashboard', label: 'Tableau de bord' },
          { id: 'realtime', label: 'Temps Réel' },
          { id: 'temperature', label: 'Températures' },
          { id: 'humidity', label: 'Humidité' },
          { id: 'comparison', label: 'Comparaison' },
          { id: 'rainfall', label: 'Précipitations' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`nav-btn glass ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            <div className="dashboard-hero">
              <RealTimeWeather />
            </div>
            <div className="chart-container glass">
              <TemperatureChart />
            </div>
          </div>
        )}
        {activeTab === 'realtime' && <RealTimeWeather />}
        {activeTab === 'temperature' && <div className="chart-page glass"><TemperatureChart /></div>}
        {activeTab === 'humidity' && <div className="chart-page glass"><HumidityChart /></div>}
        {activeTab === 'comparison' && <div className="chart-page glass"><CitiesComparison /></div>}
        {activeTab === 'rainfall' && <div className="chart-page glass"><RainfallAccumulation /></div>}
      </main>

      <footer className="app-footer">
        <p>© 2026 MeteoVision - By HANAE & KHADIJA</p>
      </footer>
    </div>
  );
}

export default App;
