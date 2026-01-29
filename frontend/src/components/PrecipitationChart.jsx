import { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import weatherApi from '../services/weatherApi';

function PrecipitationChart() {
  const [data, setData] = useState([
    { city: "Casablanca", totalRainfall: 8.5, avgRainfall: 2.83, maxRainfall: 5.0, rainfallEvents: 3 },
    { city: "Rabat", totalRainfall: 6.0, avgRainfall: 2.00, maxRainfall: 3.0, rainfallEvents: 3 },
    { city: "Marrakech", totalRainfall: 2.0, avgRainfall: 0.67, maxRainfall: 1.0, rainfallEvents: 3 },
    { city: "Fès", totalRainfall: 4.0, avgRainfall: 1.33, maxRainfall: 2.0, rainfallEvents: 3 },
    { city: "Tanger", totalRainfall: 43.0, avgRainfall: 14.33, maxRainfall: 18.0, rainfallEvents: 3 },
    { city: "Agadir", totalRainfall: 2.0, avgRainfall: 0.67, maxRainfall: 1.0, rainfallEvents: 3 },
    { city: "Meknès", totalRainfall: 3.0, avgRainfall: 1.00, maxRainfall: 1.5, rainfallEvents: 3 },
    { city: "Oujda", totalRainfall: 1.0, avgRainfall: 0.33, maxRainfall: 0.5, rainfallEvents: 3 },
    { city: "Laâyoune", totalRainfall: 0.5, avgRainfall: 0.17, maxRainfall: 0.3, rainfallEvents: 3 },
    { city: "Tétouan", totalRainfall: 15.0, avgRainfall: 5.00, maxRainfall: 8.0, rainfallEvents: 3 },
    { city: "Safi", totalRainfall: 7.0, avgRainfall: 2.33, maxRainfall: 4.0, rainfallEvents: 3 }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('bar');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1', '#D084D0'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to get real data in background
        try {
          const response = await weatherApi.getRainfallAccumulation();
          if (response.data && response.data.rainfallData && response.data.rainfallData.length > 0) {
            const realData = response.data.rainfallData.map(item => ({
              city: item._id,
              totalRainfall: item.totalRainfall ? parseFloat(item.totalRainfall) : 0,
              avgRainfall: item.avgRainfall ? parseFloat(item.avgRainfall) : 0,
              maxRainfall: item.maxRainfall ? parseFloat(item.maxRainfall) : 0,
              rainfallEvents: item.rainfallEvents || 0
            }));
            setData(realData);
          }
        } catch (apiError) {
          console.log('API error, keeping sample data');
        }
      } catch (err) {
        console.error('Precipitation chart error:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="loading">Chargement des données de précipitations...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="precipitation-chart">
      <div className="chart-header">
        <h2>Précipitations - Villes du Maroc</h2>
        <div className="chart-toggle">
          <button 
            className={`toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
            onClick={() => setChartType('bar')}
          >
            Graphique en Barres
          </button>
          <button 
            className={`toggle-btn ${chartType === 'pie' ? 'active' : ''}`}
            onClick={() => setChartType('pie')}
          >
            Graphique Circulaire
          </button>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="no-data">
          <p>Aucune donnée de précipitation disponible</p>
          <p>Veuillez patienter pendant le chargement des données...</p>
        </div>
      ) : (
        <>
          {chartType === 'bar' ? (
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="city" 
                  tick={{ fontSize: 12, fill: '#999' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#999' }}
                  label={{ value: 'Pluie (mm)', angle: -90, position: 'insideLeft', fill: '#999' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 30, 46, 0.95)', 
                    border: '1px solid #9333ea',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => {
                    const labels = {
                      totalRainfall: 'Pluie Totale',
                      avgRainfall: 'Pluie Moyenne',
                      maxRainfall: 'Pluie Maximale'
                    };
                    return [`${value} mm`, labels[name] || name];
                  }}
                />
                <Legend 
                  wrapperStyle={{ color: '#fff' }}
                  formatter={(value) => {
                    const labels = {
                      totalRainfall: 'Pluie Totale',
                      avgRainfall: 'Pluie Moyenne', 
                      maxRainfall: 'Pluie Maximale'
                    };
                    return labels[value] || value;
                  }}
                />
                <Bar dataKey="totalRainfall" fill="#0088FE" name="totalRainfall" />
                <Bar dataKey="avgRainfall" fill="#00C49F" name="avgRainfall" />
                <Bar dataKey="maxRainfall" fill="#FFBB28" name="maxRainfall" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ city, totalRainfall }) => `${city}: ${totalRainfall}mm`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="totalRainfall"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 30, 46, 0.95)', 
                    border: '1px solid #9333ea',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value} mm`, 'Pluie Totale']} 
                />
                <Legend wrapperStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          )}
          
          <div className="precipitation-summary">
            <h3>Résumé des Précipitations</h3>
            <div className="summary-grid">
              {data.map((city, index) => (
                <div key={city.city} className="summary-card">
                  <h4>{city.city}</h4>
                  <p><strong>Total:</strong> {city.totalRainfall} mm</p>
                  <p><strong>Moyenne:</strong> {city.avgRainfall} mm</p>
                  <p><strong>Maximum:</strong> {city.maxRainfall} mm</p>
                  <p><strong>Événements:</strong> {city.rainfallEvents}</p>
                </div>
              ))}
            </div>
            
            <div className="summary-stats">
              <div className="stat-card">
                <h4>Pluie Totale Maximale</h4>
                <p>{Math.max(...data.map(d => parseFloat(d.totalRainfall))).toFixed(1)} mm</p>
                <p>{data.find(d => parseFloat(d.totalRainfall) === Math.max(...data.map(d => parseFloat(d.totalRainfall))))?.city}</p>
              </div>
              <div className="stat-card">
                <h4>Pluie Totale Minimale</h4>
                <p>{Math.min(...data.map(d => parseFloat(d.totalRainfall))).toFixed(1)} mm</p>
                <p>{data.find(d => parseFloat(d.totalRainfall) === Math.min(...data.map(d => parseFloat(d.totalRainfall))))?.city}</p>
              </div>
              <div className="stat-card">
                <h4>Pluie Moyenne</h4>
                <p>{(data.reduce((sum, d) => sum + parseFloat(d.totalRainfall), 0) / data.length).toFixed(1)} mm</p>
                <p>Toutes villes</p>
              </div>
              <div className="stat-card">
                <h4>Événements Pluvieux</h4>
                <p>{data.reduce((sum, d) => sum + d.rainfallEvents, 0)}</p>
                <p>Total événements</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PrecipitationChart;
