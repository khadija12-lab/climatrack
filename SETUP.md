# ClimaTrack Setup Documentation

This guide will help you set up the development environment for ClimaTrack after cloning the repository.

## Prerequisites

- **Node.js**: Version **20.19.0+** or **22.12.0+** (Required for Vite).
- **Git**: Installed and configured.

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

3. **Start the server**:
   ```bash
   npm start
   ```
   - The server will run on `http://localhost:5000`.
   - You should see "API running" at the root URL.

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
