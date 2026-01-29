import Weather from './models/Weather.js';
import mongoose from 'mongoose';

const sampleData = [
  { city: "Paris", temperature: 22, humidity: 65, windSpeed: 15, rainfall: 5, pressure: 1013, description: "Partly cloudy", icon: "02d" },
  { city: "Londres", temperature: 18, humidity: 70, windSpeed: 20, rainfall: 8, pressure: 1010, description: "Rainy", icon: "10d" },
  { city: "New York", temperature: 25, humidity: 60, windSpeed: 12, rainfall: 3, pressure: 1015, description: "Sunny", icon: "01d" },
  { city: "Tokyo", temperature: 28, humidity: 75, windSpeed: 10, rainfall: 12, pressure: 1008, description: "Heavy rain", icon: "09d" },
  { city: "Sydney", temperature: 20, humidity: 55, windSpeed: 18, rainfall: 2, pressure: 1012, description: "Clear", icon: "01d" },
  { city: "Paris", temperature: 24, humidity: 62, windSpeed: 13, rainfall: 0, pressure: 1014, description: "Sunny", icon: "01d" },
  { city: "Londres", temperature: 16, humidity: 72, windSpeed: 22, rainfall: 10, pressure: 1009, description: "Cloudy", icon: "03d" },
  { city: "New York", temperature: 27, humidity: 58, windSpeed: 11, rainfall: 1, pressure: 1016, description: "Partly cloudy", icon: "02d" },
  { city: "Tokyo", temperature: 30, humidity: 73, windSpeed: 8, rainfall: 15, pressure: 1007, description: "Thunderstorm", icon: "11d" },
  { city: "Sydney", temperature: 18, humidity: 52, windSpeed: 20, rainfall: 0, pressure: 1011, description: "Clear", icon: "01d" }
];

async function seedData() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/climatrack";
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Weather.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data with different dates
    const dataWithDates = sampleData.map((item, index) => ({
      ...item,
      createdAt: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)) // Different days
    }));

    await Weather.insertMany(dataWithDates);
    console.log('Sample data seeded successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
