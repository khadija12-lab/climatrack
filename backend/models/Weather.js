import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  pressure: {
    type: Number,
    required: true,
  },
  windSpeed: {
    type: Number,
    required: true,
  },
  rainfall: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Weather = mongoose.model("Weather", weatherSchema);

export default Weather;
