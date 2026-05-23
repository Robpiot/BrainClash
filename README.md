# BrainClash

**Real-time trivia battles with friends**

BrainClash is a real-time trivia web application where players can test their knowledge in head-to-head battles, build their friend network, and compete for the top spot on the leaderboards.

## 🎯 Overview

BrainClash brings the excitement of trivia competitions to your browser. Whether you're looking for a quick solo practice round or an intense versus battle against friends, BrainClash delivers an engaging quiz experience with seamless real-time gameplay.

## ✨ Key Features

- **🏠 Practice Mode**: Sharpen your knowledge with solo quiz sessions across multiple categories
- **⚔️ Versus Battle Mode**: Challenge friends to real-time head-to-head trivia duels
- **👥 Social System**: Create your account, add friends, and track your network's activity
- **📊 Stats & Progress**: View your game history, scores, and performance analytics
- **🏆 Leaderboards**: Compete globally or see how you stack up against your friends
- **📱 Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library for building interactive interfaces
- **React Router** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Socket.io Client** - Real-time bidirectional communication

### Backend
- **Node.js** - JavaScript runtime for server-side logic
- **Express** - Web application framework
- **PostgreSQL** - Relational database for data persistence
- **Prisma** - Modern ORM for database operations
- **Socket.io** - Real-time engine for versus battles
- **Passport.js** - Authentication middleware with JWT tokens
- **bcrypt** - Password hashing for security

### Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend and database hosting

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v15 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/brainclash.git
cd brainclash
```

2. Install frontend dependencies
```bash
cd client
npm install
```

3. Install backend dependencies
```bash
cd ../server
npm install
```

4. Set up environment variables
```bash
# Create .env file in server directory
DATABASE_URL="postgresql://user:password@localhost:5432/brainclash"
JWT_SECRET="your-secret-key"
PORT=3001
```

5. Run database migrations
```bash
npx prisma migrate dev
npx prisma db seed
```

6. Start the development servers
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

7. Open your browser to `http://localhost:5173`

## 📂 Project Structure
