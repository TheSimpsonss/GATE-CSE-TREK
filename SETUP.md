# GATE CSE Trek - Setup Guide

## Prerequisites
- Node.js installed
- MongoDB installed and running (or MongoDB Atlas connection string)

## Setup Steps

### 1. Server Setup

Create a `.env` file in the `server` directory with the following content:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/gate-cse-trek
```

**For MongoDB Atlas**, use:
```
MONGO_URI=your_mongodb_atlas_connection_string
```

### 2. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Start MongoDB

Make sure MongoDB is running:
- **Local MongoDB**: Start the MongoDB service
- **MongoDB Atlas**: No action needed, just use your connection string in `.env`

### 4. Seed Initial Data (First Time Only)

After starting the server, you can seed the initial syllabus data by making a POST request to:
```
POST http://localhost:5000/api/syllabus/seed
```

With the body containing the initial syllabus data from `client/src/constants.ts`

### 5. Run the Application

**Option 1: Run separately**
```bash
# Terminal 1 - Server
cd server
npm start

# Terminal 2 - Client
cd client
npm run dev
```

**Option 2: Use the background processes** (already started)

## Access the Application

- **Client**: http://localhost:5173 (or the port shown in terminal)
- **Server API**: http://localhost:5000/api

## API Integration

The client is now configured to use the API. The `dataService.ts` has been updated to:
- Connect to the backend API at `http://localhost:5000/api`
- Fall back to local storage if the API is unavailable
- Proxy API requests through Vite dev server

## Troubleshooting

1. **MongoDB Connection Error**: Make sure MongoDB is running or your connection string is correct
2. **Port Already in Use**: Change the PORT in `.env` or kill the process using the port
3. **CORS Errors**: The server already has CORS enabled, but check if both servers are running

