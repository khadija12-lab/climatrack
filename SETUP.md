# ClimaTrack Setup Documentation

This guide will help you set up the development environment for ClimaTrack after cloning the repository.

## Prerequisites

- **Node.js**: Version **20.19.0+** or **22.12.0+** (Required for Vite).
- **Git**: Installed and configured.
- **MongoDB**: Installed and running locally (Community Edition).

## Initial Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/khadija12-lab/climatrack.git
   cd climatrack
   ```

2. **Navigate to the corresponding directory** for the component you want to work on.

---

## Backend Setup (Express)

The backend provides the API for the application.

1. **Navigate to backend**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Create a `.env` file in the `backend` directory.
   - Add the following content:
     ```env
     MONGO_URI=mongodb://localhost:27017/climatrack
     PORT=5000
     ```

4. **Start the server**:
   ```bash
   npm start
   ```
   - The server will run on `http://localhost:5000`.
   - You should see "Connected to MongoDB (Local)" and "API running with MongoDB".

---

## Database Setup (MongoDB)

1. **Install MongoDB**: Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community).
2. **Install MongoDB Shell (mongosh)**: (Optional) To interact with the database from the terminal.
3. **Run MongoDB**: Ensure the MongoDB service is running on your machine.

---

## Frontend Setup (React + Vite)

The frontend is built with React and uses Vite as the build tool.

1. **Navigate to frontend**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   - The app will run on `http://localhost:5173`.
   - **Note**: Ensure you are using a compatible Node.js version (v20.19+ or v22.12+).

---

## Contributing

- Always pull the latest changes before starting work: `git pull origin main`.
- Create a new branch for your features: `git checkout -b feature/your-feature-name`.
- Follow the project's coding standards.
