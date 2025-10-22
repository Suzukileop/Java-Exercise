# 🚀 Ayanokoji System - Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## Step-by-Step Installation

### 1. Install Dependencies

Open PowerShell in the project root directory and run:

```powershell
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

Or use the convenient command:
```powershell
npm run install-all
```

### 2. Start the Application

From the project root, run:

```powershell
npm run dev
```

This will start:
- **Backend API** on `http://localhost:3000`
- **Frontend** on `http://localhost:5173`

The frontend will automatically open in your default browser.

### 3. Alternative: Start Services Separately

If you prefer to run services separately:

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

## 🎮 Using the Application

### Dashboard
- View today's progress and overall statistics
- Quick access to incomplete tasks
- Recent activity feed

### Daily Quests
- Complete fixed daily tasks to earn XP
- Apply penalties for missed tasks
- Track completion status

### Skill Tree
- Monitor progression across all domains
- View XP and level for each skill
- Track domain mastery percentage

### Evaluations
- Assess your skills with 1-10 ratings
- Add notes about your performance
- Track improvement over time

### Statistics
- Visual charts of your progression
- Domain-wise XP breakdown
- Performance metrics

## 🎯 Default Skills & Domains

### Fullstack Development
- Web Development
- Backend Development
- Database Design

### Ethical Hacking
- Network Security
- Penetration Testing
- Cryptography

### Fitness
- Strength Training
- Cardio Endurance
- Flexibility

### Reading
- Technical Reading
- Philosophy

### Mathematics
- Algebra
- Calculus

### Chess
- Chess Strategy
- Chess Tactics

## 📊 Progression System

### XP & Leveling
- Complete tasks → Earn XP
- XP is distributed across skills in the task's category
- Each level requires progressively more XP
- Formula: `XP_needed = 100 × (1.5 ^ current_level)`

### Penalties
- Missing a task costs 50% of its XP reward
- Penalties are deducted from the relevant skill category
- Use penalties to maintain discipline

### Levels
- **0-4**: Beginner
- **5-9**: Novice
- **10-14**: Intermediate
- **15-19**: Advanced
- **20+**: Master

## 🔧 Customization

### Adding New Tasks

You can add custom tasks through the API:

```javascript
POST http://localhost:3000/api/tasks
{
  "title": "Your Task",
  "description": "Task description",
  "skill_category": "Fullstack Dev",
  "xp_reward": 100,
  "is_fixed": true
}
```

### Modifying Skills

Edit the default skills in `backend/server.js` in the `initializeDatabase()` function.

## 📱 Database

The application uses SQLite. The database file `progress.db` is automatically created in the `backend` folder on first run.

To reset your progress, simply delete `backend/progress.db` and restart the backend.

## ⚠️ Troubleshooting

### Port Already in Use

If port 3000 or 5173 is already in use:

1. **Backend**: Edit `backend/server.js` and change the `PORT` constant
2. **Frontend**: Edit `frontend/vite.config.js` and change the port
3. Update the API_URL in `frontend/src/App.jsx` if you changed the backend port

### Dependencies Not Installing

Try clearing npm cache:
```powershell
npm cache clean --force
npm run install-all
```

### Database Errors

Delete `backend/progress.db` to reset the database:
```powershell
rm backend/progress.db
```

## 🎨 UI Features

- **Dark Mode**: Built-in dark theme inspired by Solo Leveling
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Animations**: Smooth transitions and glow effects
- **Real-time Updates**: Progress updates instantly

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, Lucide Icons, Recharts
- **Backend**: Node.js, Express
- **Database**: SQLite (better-sqlite3)
- **Build Tool**: Vite

## 📝 Notes

- All tasks reset daily at midnight
- XP is cumulative and never resets
- Evaluations are permanent and can be used to track long-term progress
- The system is designed to be used daily for maximum effectiveness

## 🎯 Tips for Success

1. **Be Consistent**: Complete tasks daily
2. **Be Honest**: Apply penalties when deserved
3. **Evaluate Regularly**: Use evaluations to identify weak areas
4. **Track Progress**: Check statistics weekly
5. **Set Goals**: Aim for specific level targets

---

**Built to help you evolve into the best version of yourself, just like Ayanokoji from Classroom of the Elite!**
