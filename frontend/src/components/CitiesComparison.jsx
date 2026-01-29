import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import weatherApi from '../services/weatherApi';

function CitiesComparison() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await weatherApi.getCitiesComparison();
        if (response.data && response.data.data && response.data.data.length > 0) {
          setCities(response.data.data);
        }
      } catch (err) {
        console.error('Cities comparison error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Analyse comparative des villes...</div>;

  return (
    <div className="cities-comparison-container">
      <div className="chart-header">
        <h2>Comparaison Multicritères des Villes</h2>
      </div>
      <div className="chart-page glass">
        <div style={{ width: '100%', height: 500 }}>
          <ResponsiveContainer>
            <BarChart data={cities} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="_id"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 11 }}
                angle={-40}
                textAnchor="end"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 11 }}
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
              <Bar dataKey="avgTemperature" name="Temp. Moy (°C)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgHumidity" name="Humidité (%)" fill="#22d3ee" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgWindSpeed" name="Vent (km/h)" fill="#f472b6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CitiesComparison;
