import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import weatherApi from '../services/weatherApi';

function HumidityChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('area');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await weatherApi.getCitiesComparison();
      if (response.data && response.data.data && response.data.data.length > 0) {
        const realData = response.data.data.map(item => ({
          city: item._id,
          avgHumidity: item.avgHumidity ? parseFloat(item.avgHumidity.toFixed(1)) : 0,
          temperature: item.avgTemperature ? parseFloat(item.avgTemperature.toFixed(1)) : 0,
          windSpeed: item.avgWindSpeed ? parseFloat(item.avgWindSpeed.toFixed(1)) : 0
        }));
        setData(realData);
      }
    } catch (err) {
      console.error('Humidity chart error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="loading">Mise à jour des données d'humidité...</div>;

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 60 }
    };

    const gradientOffset = () => {
      const dataMax = Math.max(...data.map((i) => i.avgHumidity));
      const dataMin = Math.min(...data.map((i) => i.avgHumidity));
      if (dataMax <= 0) return 0;
      if (dataMin >= 0) return 1;
      return dataMax / (dataMax - dataMin);
    };

    const ChartComponent = chartType === 'bar' ? BarChart : chartType === 'area' ? AreaChart : LineChart;

    return (
      <ResponsiveContainer width="100%" height={550}>
        <ChartComponent {...commonProps}>
          <defs>
            <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00d2ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="city"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 11 }}
            angle={-30}
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
          {chartType === 'area' ? (
            <Area type="monotone" dataKey="avgHumidity" name="Humidité %" stroke="#00d2ff" fillOpacity={1} fill="url(#colorHum)" strokeWidth={3} />
          ) : chartType === 'bar' ? (
            <Bar dataKey="avgHumidity" name="Humidité %" fill="#00d2ff" radius={[10, 10, 0, 0]} />
          ) : (
            <Line type="monotone" dataKey="avgHumidity" name="Humidité %" stroke="#00d2ff" strokeWidth={4} dot={{ r: 6 }} />
          )}
          <Line type="monotone" dataKey="windSpeed" name="Vent km/h" stroke="#f472b6" strokeWidth={2} dot={{ r: 4 }} />
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="humidity-chart-container">
      <div className="chart-header">
        <h2>Humidité & Vent par Ville</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="chart-toggle-group glass">
            <button className={chartType === 'area' ? 'active' : ''} onClick={() => setChartType('area')}>Aire</button>
            <button className={chartType === 'line' ? 'active' : ''} onClick={() => setChartType('line')}>Ligne</button>
            <button className={chartType === 'bar' ? 'active' : ''} onClick={() => setChartType('bar')}>Barres</button>
          </div>
        </div>
      </div>

      {renderChart()}

      <div className="stat-cards-grid">
        <div className="mini-stat-card glass">
          <span>Humidité Max</span>
          <strong>{data.length ? Math.max(...data.map(d => d.avgHumidity)) : 0}%</strong>
        </div>
        <div className="mini-stat-card glass">
          <span>Humidité Moyenne</span>
          <strong>{data.length ? (data.reduce((sum, d) => sum + d.avgHumidity, 0) / data.length).toFixed(1) : 0}%</strong>
        </div>
        <div className="mini-stat-card glass">
          <span>Vent Max</span>
          <strong>{data.length ? Math.max(...data.map(d => d.windSpeed)) : 0} km/h</strong>
        </div>
      </div>
    </div>
  );
}

export default HumidityChart;
