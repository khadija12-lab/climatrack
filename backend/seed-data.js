import Weather from './models/Weather.js';

const sampleData = [
  { city: "Paris", temperature: 22, humidity: 65, windSpeed: 15, rainfall: 5, pressure: 1013 },
  { city: "Londres", temperature: 18, humidity: 70, windSpeed: 20, rainfall: 8, pressure: 1010 },
  { city: "New York", temperature: 25, humidity: 60, windSpeed: 12, rainfall: 3, pressure: 1015 },
  { city: "Tokyo", temperature: 28, humidity: 75, windSpeed: 10, rainfall: 12, pressure: 1008 },
  { city: "Sydney", temperature: 20, humidity: 55, windSpeed: 18, rainfall: 2, pressure: 1012 }
];

async function seedData() {
  try {
    await Weather.deleteMany({});
    await Weather.insertMany(sampleData);
    console.log('Sample data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seedData();
