# GATE CSE Trek 🚀

A comprehensive GATE CSE preparation tracker with authentication, progress monitoring, and AI-powered study assistance.

![GATE CSE Trek](https://img.shields.io/badge/GATE-CSE%20Trek-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔐 Authentication System
- User signup and login
- Secure JWT-based authentication
- User-specific data isolation
- Session management

### 📊 Progress Tracking
- **Syllabus Tracker**: Track completion status for all GATE CSE subjects
- **Chapter Management**: Mark chapters as completed, revision 1, revision 2, and PYQ solved
- **Test Analysis**: Record and analyze mock test performance
- **Visual Dashboard**: Interactive charts and statistics

### 🎯 GATE CSE Subjects Covered
- Engineering Mathematics
- Digital Logic
- Computer Organization & Architecture
- Programming & Data Structures
- Algorithms
- Theory of Computation
- Compiler Design
- Operating Systems
- Database Management Systems
- Computer Networks
- General Aptitude

### 🤖 AI Mentor
- Powered by Google Gemini 2.5 Flash
- Concept explanations
- Study plan suggestions
- Quick revision notes
- Subject-specific assistance

### 📱 Responsive Design
- Fully responsive for mobile, tablet, and desktop
- Dark/Light mode toggle
- Modern, intuitive UI
- Touch-friendly interface

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4.x** - Styling
- **Recharts** - Data visualization
- **Vite** - Build tool
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher) - Running locally or MongoDB Atlas
- **npm** or **yarn**
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TheSimpsonss/GATE-CSE-TREK.git
cd GATE-CSE-TREK
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the `server` directory:

```bash
cd server
touch .env
```

2. Add the following environment variables:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/gate-cse-trek

# JWT Secret (change this to a secure random string in production)
JWT_SECRET=your-secret-key-change-in-production

# Server Port (optional, defaults to 5000)
PORT=5000
```

### Frontend Configuration

1. Create a `.env` file in the `client` directory (optional):

```bash
cd client
touch .env
```

2. Add environment variables if needed:

```env
# API Configuration
VITE_USE_API=true

# Gemini API Key (for AI Mentor feature)
VITE_GEMINI_API_KEY=your-gemini-api-key
```

> **Note**: For AI Mentor feature, you'll need a Gemini API key. See [API Key Setup](#api-key-setup) below.

## 🏃 Running the Application

### Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### Start the Backend Server

```bash
cd server
npm start
```

The server will start on `http://localhost:5000`

### Start the Frontend Development Server

Open a new terminal:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
gate-cse-trek/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Auth.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SyllabusTracker.tsx
│   │   │   ├── TestTracker.tsx
│   │   │   └── AICoach.tsx
│   │   ├── services/       # API services
│   │   │   ├── authService.ts
│   │   │   ├── dataService.ts
│   │   │   └── geminiService.ts
│   │   ├── types.ts        # TypeScript types
│   │   ├── constants.ts    # Constants
│   │   └── App.tsx         # Main app component
│   ├── package.json
│   └── vite.config.ts
│
├── server/                 # Backend Express application
│   ├── models/            # Mongoose models
│   │   ├── User.js
│   │   ├── Subject.js
│   │   └── Test.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── syllabusRoutes.js
│   │   └── testRoutes.js
│   ├── middleware/        # Express middleware
│   │   └── auth.js
│   ├── seed.js            # Database seeding script
│   ├── index.js           # Server entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Syllabus
- `GET /api/syllabus` - Get user's syllabus (requires auth)
- `PATCH /api/syllabus/:subjectId/chapters/:chapterId` - Update chapter status (requires auth)
- `POST /api/syllabus/initialize` - Initialize syllabus for new user (requires auth)

### Tests
- `GET /api/tests` - Get user's test records (requires auth)
- `POST /api/tests` - Add new test record (requires auth)
- `DELETE /api/tests/:id` - Delete test record (requires auth)

### Health Check
- `GET /api/health` - Server health status

## 🎮 Usage

### First Time Setup

1. **Sign Up**: Create a new account with your email and password
2. **Login**: Sign in to access your dashboard
3. **Initial Syllabus**: The system automatically initializes the GATE CSE syllabus for new users

### Tracking Progress

1. **Syllabus Tracker**:
   - Click on any subject to expand and view chapters
   - Toggle checkboxes to mark:
     - ✅ Completed
     - 🔄 Revision 1
     - 🔄 Revision 2
     - 📝 PYQ Solved

2. **Test Analysis**:
   - Click "Add Test Result" to record a new test
   - Enter test details (name, type, marks, date)
   - View performance trends in the dashboard

3. **Dashboard**:
   - View overall progress statistics
   - See completion percentages
   - Analyze test performance with charts

4. **AI Mentor**:
   - Ask questions about GATE CSE concepts
   - Get explanations and study tips
   - Request revision notes

## 🔑 API Key Setup (Optional - for AI Mentor)

To enable the AI Mentor feature:

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to `client/.env`:
   ```
   VITE_GEMINI_API_KEY=your-api-key-here
   ```
3. Restart the frontend server

> **Note**: The application works without the AI Mentor feature. It's optional.

## 🗄️ Database Seeding

To seed the database with initial syllabus data (for testing):

```bash
cd server
npm run seed
```

> **Note**: This is typically not needed as the system auto-initializes syllabus for new users.

## 🧪 Development

### Backend Development

```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

### Frontend Development

```bash
cd client
npm run dev
```

### Build for Production

```bash
# Frontend
cd client
npm run build

# Backend
cd server
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- GATE CSE syllabus structure
- Google Gemini for AI assistance
- All the open-source libraries that made this project possible

## 📧 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Made with ❤️ for GATE CSE aspirants**

Good luck with your GATE preparation! 🎓

