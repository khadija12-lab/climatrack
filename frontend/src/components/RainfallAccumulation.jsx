import { useState, useEffect } from 'react';
import weatherApi from '../services/weatherApi';

function RainfallAccumulation() {
  const [rainfall, setRainfall] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await weatherApi.getRainfallAccumulation();
      if (response.data && response.data.rainfallData && response.data.rainfallData.length > 0) {
        setRainfall(response.data.rainfallData);
      }
    } catch (err) {
      console.error('Rainfall accumulation error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="loading">Mise à jour des précipitations...</div>;

  return (
    <div className="rainfall-accumulation-container">
      <div className="chart-header">
        <h2>Précipitations par Ville</h2>
      </div>
      <div className="rainfall-table-container glass">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Ville</th>
              <th>Cumul (mm)</th>
              <th>Moyenne</th>
              <th>Record</th>
              <th>Événements</th>
              <th>Total Obs.</th>
            </tr>
          </thead>
          <tbody>
            {rainfall.map((city) => (
              <tr key={city._id}>
                <td className="city-name">{city._id}</td>
                <td className="rainfall-total highlight">
                  {city.totalRainfall.toFixed(1)}
                </td>
                <td>{city.avgRainfall.toFixed(1)}</td>
                <td>{city.maxRainfall.toFixed(1)}</td>
                <td>
                  <span className="events-badge">{city.rainfallEvents}</span>
                </td>
                <td className="obs-count">{city.dataPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RainfallAccumulation;
