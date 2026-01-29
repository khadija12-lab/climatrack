import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import weatherApi from '../services/weatherApi';

function TemperatureChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await weatherApi.getWeatherStats();
      const dailyData = response.data.daily || [];

      if (dailyData.length > 0) {
        // Filtrer pour n'afficher que les 7 derniers jours (semaine en cours)
        const weeklyData = dailyData.slice(-7).map(item => ({
          date: new Date(item._id).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
          avgTemp: item.avgTemp ? parseFloat(item.avgTemp.toFixed(1)) : 0,
          maxTemp: item.maxTemp ? parseFloat(item.maxTemp.toFixed(1)) : 0,
          minTemp: item.minTemp ? parseFloat(item.minTemp.toFixed(1)) : 0
        }));
        setData(weeklyData);
      }
    } catch (err) {
      console.error('Temperature chart error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="loading">Mise à jour des graphiques...</div>;

  return (
    <div className="temperature-chart-container">
      <div className="chart-header">
        <h2>Évolution des Températures</h2>
      </div>
      <div className="chart-page glass">
        <div style={{ width: '100%', height: 500 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 12 }}
                unit="°C"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="maxTemp"
                name="Max"
                stroke="#ef4444"
                strokeWidth={4}
                dot={{ r: 6, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="avgTemp"
                name="Moyenne"
                stroke="#6366f1"
                strokeWidth={4}
                dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="minTemp"
                name="Min"
                stroke="#3b82f6"
                strokeWidth={4}
                dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {data.length > 0 && (
          <div className="stat-cards-grid">
            <div className="mini-stat-card glass">
              <span>Maximum</span>
              <strong>{Math.max(...data.map(d => d.maxTemp))}°C</strong>
            </div>
            <div className="mini-stat-card glass">
              <span>Minimum</span>
              <strong>{Math.min(...data.map(d => d.minTemp))}°C</strong>
            </div>
            <div className="mini-stat-card glass">
              <span>Moyenne</span>
              <strong>{(data.reduce((sum, d) => sum + d.avgTemp, 0) / data.length).toFixed(1)}°C</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TemperatureChart;
