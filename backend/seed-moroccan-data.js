import Weather from './models/Weather.js';
import mongoose from 'mongoose';

const moroccanCities = [
  // Casablanca
  { city: "Casablanca", temperature: 22, humidity: 75, windSpeed: 20, rainfall: 8, pressure: 1015, description: "Partly cloudy", icon: "02d" },
  { city: "Casablanca", temperature: 24, humidity: 70, windSpeed: 18, rainfall: 5, pressure: 1016, description: "Sunny", icon: "01d" },
  { city: "Casablanca", temperature: 20, humidity: 78, windSpeed: 22, rainfall: 12, pressure: 1014, description: "Rainy", icon: "10d" },
  
  // Rabat
  { city: "Rabat", temperature: 23, humidity: 72, windSpeed: 15, rainfall: 6, pressure: 1013, description: "Clear", icon: "01d" },
  { city: "Rabat", temperature: 25, humidity: 68, windSpeed: 12, rainfall: 3, pressure: 1014, description: "Sunny", icon: "01d" },
  { city: "Rabat", temperature: 21, humidity: 75, windSpeed: 18, rainfall: 9, pressure: 1012, description: "Cloudy", icon: "03d" },
  
  // Marrakech
  { city: "Marrakech", temperature: 32, humidity: 45, windSpeed: 10, rainfall: 0, pressure: 1018, description: "Hot and sunny", icon: "01d" },
  { city: "Marrakech", temperature: 35, humidity: 40, windSpeed: 8, rainfall: 0, pressure: 1019, description: "Very hot", icon: "01d" },
  { city: "Marrakech", temperature: 30, humidity: 50, windSpeed: 12, rainfall: 2, pressure: 1017, description: "Warm", icon: "02d" },
  
  // Fès
  { city: "Fès", temperature: 26, humidity: 55, windSpeed: 14, rainfall: 4, pressure: 1016, description: "Partly cloudy", icon: "02d" },
  { city: "Fès", temperature: 28, humidity: 52, windSpeed: 11, rainfall: 1, pressure: 1017, description: "Sunny", icon: "01d" },
  { city: "Fès", temperature: 24, humidity: 58, windSpeed: 16, rainfall: 7, pressure: 1015, description: "Cloudy", icon: "03d" },
  
  // Tanger
  { city: "Tanger", temperature: 21, humidity: 80, windSpeed: 25, rainfall: 15, pressure: 1011, description: "Windy and rainy", icon: "09d" },
  { city: "Tanger", temperature: 23, humidity: 76, windSpeed: 22, rainfall: 10, pressure: 1012, description: "Cloudy", icon: "03d" },
  { city: "Tanger", temperature: 19, humidity: 82, windSpeed: 28, rainfall: 18, pressure: 1010, description: "Stormy", icon: "11d" },
  
  // Agadir
  { city: "Agadir", temperature: 27, humidity: 65, windSpeed: 18, rainfall: 2, pressure: 1017, description: "Sunny", icon: "01d" },
  { city: "Agadir", temperature: 29, humidity: 62, windSpeed: 15, rainfall: 0, pressure: 1018, description: "Clear", icon: "01d" },
  { city: "Agadir", temperature: 25, humidity: 68, windSpeed: 20, rainfall: 5, pressure: 1016, description: "Partly cloudy", icon: "02d" },
  
  // Meknès
  { city: "Meknès", temperature: 25, humidity: 60, windSpeed: 13, rainfall: 3, pressure: 1016, description: "Sunny", icon: "01d" },
  { city: "Meknès", temperature: 27, humidity: 57, windSpeed: 10, rainfall: 1, pressure: 1017, description: "Clear", icon: "01d" },
  { city: "Meknès", temperature: 23, humidity: 63, windSpeed: 15, rainfall: 6, pressure: 1015, description: "Cloudy", icon: "03d" },
  
  // Oujda
  { city: "Oujda", temperature: 30, humidity: 48, windSpeed: 12, rainfall: 1, pressure: 1018, description: "Hot and dry", icon: "01d" },
  { city: "Oujda", temperature: 33, humidity: 45, windSpeed: 10, rainfall: 0, pressure: 1019, description: "Very hot", icon: "01d" },
  { city: "Oujda", temperature: 28, humidity: 52, windSpeed: 14, rainfall: 3, pressure: 1017, description: "Warm", icon: "02d" },
  
  // Laâyoune
  { city: "Laâyoune", temperature: 28, humidity: 70, windSpeed: 20, rainfall: 4, pressure: 1014, description: "Partly cloudy", icon: "02d" },
  { city: "Laâyoune", temperature: 30, humidity: 67, windSpeed: 18, rainfall: 2, pressure: 1015, description: "Sunny", icon: "01d" },
  { city: "Laâyoune", temperature: 26, humidity: 73, windSpeed: 22, rainfall: 7, pressure: 1013, description: "Cloudy", icon: "03d" },
  
  // Tétouan
  { city: "Tétouan", temperature: 22, humidity: 78, windSpeed: 24, rainfall: 12, pressure: 1012, description: "Rainy", icon: "10d" },
  { city: "Tétouan", temperature: 24, humidity: 74, windSpeed: 20, rainfall: 8, pressure: 1013, description: "Partly cloudy", icon: "02d" },
  { city: "Tétouan", temperature: 20, humidity: 81, windSpeed: 26, rainfall: 15, pressure: 1011, description: "Heavy rain", icon: "09d" },
  
  // Safi
  { city: "Safi", temperature: 23, humidity: 72, windSpeed: 19, rainfall: 6, pressure: 1014, description: "Cloudy", icon: "03d" },
  { city: "Safi", temperature: 25, humidity: 68, windSpeed: 16, rainfall: 3, pressure: 1015, description: "Partly cloudy", icon: "02d" },
  { city: "Safi", temperature: 21, humidity: 76, windSpeed: 21, rainfall: 9, pressure: 1013, description: "Rainy", icon: "10d" }
];

async function seedMoroccanData() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/climatrack";
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Weather.deleteMany({});
    console.log('Cleared existing data');

    // Insert Moroccan data with different dates spanning 30 days
    const dataWithDates = moroccanCities.map((item, index) => ({
      ...item,
      createdAt: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)) // Different days
    }));

    await Weather.insertMany(dataWithDates);
    console.log(`Successfully seeded ${dataWithDates.length} weather records for Moroccan cities`);

    // Display statistics
    const cities = [...new Set(dataWithDates.map(item => item.city))];
    console.log(`Cities added: ${cities.join(', ')}`);
    console.log(`Total records per city: ${dataWithDates.length / cities.length}`);

    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error seeding Moroccan data:', error);
    process.exit(1);
  }
}

seedMoroccanData();
