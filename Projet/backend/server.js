import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Database setup
const db = new Database(join(__dirname, 'progress.db'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize database
function initializeDatabase() {
  // Skills table
  db.exec(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      level INTEGER DEFAULT 0,
      xp INTEGER DEFAULT 0,
      xp_to_next_level INTEGER DEFAULT 100,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Daily tasks table
  db.exec(`
    CREATE TABLE IF NOT EXISTS daily_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      skill_category TEXT NOT NULL,
      xp_reward INTEGER DEFAULT 50,
      is_fixed BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Task completions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS task_completions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER NOT NULL,
      completed_date DATE NOT NULL,
      xp_earned INTEGER NOT NULL,
      FOREIGN KEY (task_id) REFERENCES daily_tasks(id),
      UNIQUE(task_id, completed_date)
    )
  `);

  // Penalties table
  db.exec(`
    CREATE TABLE IF NOT EXISTS penalties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER NOT NULL,
      penalty_date DATE NOT NULL,
      xp_lost INTEGER NOT NULL,
      reason TEXT,
      FOREIGN KEY (task_id) REFERENCES daily_tasks(id)
    )
  `);

  // Evaluations table
  db.exec(`
    CREATE TABLE IF NOT EXISTS evaluations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      skill_id INTEGER NOT NULL,
      score INTEGER NOT NULL,
      notes TEXT,
      evaluated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (skill_id) REFERENCES skills(id)
    )
  `);

  // Achievements table
  db.exec(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      requirement_type TEXT NOT NULL,
      requirement_value INTEGER NOT NULL,
      unlocked BOOLEAN DEFAULT 0,
      unlocked_at DATETIME
    )
  `);

  // Daily notes table
  db.exec(`
    CREATE TABLE IF NOT EXISTS daily_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATE NOT NULL UNIQUE,
      content TEXT,
      mood TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Goals table
  db.exec(`
    CREATE TABLE IF NOT EXISTS goals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      target_value INTEGER NOT NULL,
      current_value INTEGER DEFAULT 0,
      category TEXT,
      deadline DATE,
      completed BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Pomodoro sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS pomodoro_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER,
      duration INTEGER NOT NULL,
      completed BOOLEAN DEFAULT 1,
      session_date DATE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (task_id) REFERENCES daily_tasks(id)
    )
  `);

  // Initialize default skills if empty
  const skillCount = db.prepare('SELECT COUNT(*) as count FROM skills').get();
  if (skillCount.count === 0) {
    const defaultSkills = [
      { name: 'Web Development', category: 'Fullstack Dev' },
      { name: 'Backend Development', category: 'Fullstack Dev' },
      { name: 'Database Design', category: 'Fullstack Dev' },
      { name: 'Network Security', category: 'Ethical Hacking' },
      { name: 'Penetration Testing', category: 'Ethical Hacking' },
      { name: 'Cryptography', category: 'Ethical Hacking' },
      { name: 'Strength Training', category: 'Fitness' },
      { name: 'Cardio Endurance', category: 'Fitness' },
      { name: 'Flexibility', category: 'Fitness' },
      { name: 'Technical Reading', category: 'Reading' },
      { name: 'Philosophy', category: 'Reading' },
      { name: 'Algebra', category: 'Math' },
      { name: 'Calculus', category: 'Math' },
      { name: 'Chess Strategy', category: 'Chess' },
      { name: 'Chess Tactics', category: 'Chess' }
    ];

    const insert = db.prepare('INSERT INTO skills (name, category) VALUES (?, ?)');
    for (const skill of defaultSkills) {
      insert.run(skill.name, skill.category);
    }
  }

  // Initialize default daily tasks if empty
  const taskCount = db.prepare('SELECT COUNT(*) as count FROM daily_tasks').get();
  if (taskCount.count === 0) {
    const defaultTasks = [
      { title: 'Code 2 hours', description: 'Work on programming projects', category: 'Fullstack Dev', xp: 100, fixed: 1 },
      { title: 'Security Lab', description: 'Practice ethical hacking exercises', category: 'Ethical Hacking', xp: 100, fixed: 1 },
      { title: 'Workout Session', description: 'Complete daily training routine', category: 'Fitness', xp: 80, fixed: 1 },
      { title: 'Read 30 minutes', description: 'Read technical or philosophical books', category: 'Reading', xp: 50, fixed: 1 },
      { title: 'Math Problems', description: 'Solve 10 math problems', category: 'Math', xp: 70, fixed: 1 },
      { title: 'Chess Practice', description: 'Play 3 chess games or solve puzzles', category: 'Chess', xp: 60, fixed: 1 }
    ];

    const insert = db.prepare('INSERT INTO daily_tasks (title, description, skill_category, xp_reward, is_fixed) VALUES (?, ?, ?, ?, ?)');
    for (const task of defaultTasks) {
      insert.run(task.title, task.description, task.category, task.xp, task.fixed);
    }
  }
}

initializeDatabase();

// API Routes

// Get all skills
app.get('/api/skills', (req, res) => {
  const skills = db.prepare('SELECT * FROM skills ORDER BY category, name').all();
  res.json(skills);
});

// Get skills by category
app.get('/api/skills/category/:category', (req, res) => {
  const skills = db.prepare('SELECT * FROM skills WHERE category = ? ORDER BY name').all(req.params.category);
  res.json(skills);
});

// Get overall progress
app.get('/api/progress/overall', (req, res) => {
  const skills = db.prepare('SELECT * FROM skills').all();
  const totalXP = skills.reduce((sum, skill) => sum + skill.xp, 0);
  const totalLevel = skills.reduce((sum, skill) => sum + skill.level, 0);
  const averageLevel = skills.length > 0 ? totalLevel / skills.length : 0;
  const overallProgress = Math.min(100, averageLevel);

  res.json({
    totalXP,
    totalLevel,
    averageLevel: averageLevel.toFixed(2),
    overallProgress: overallProgress.toFixed(2),
    skillCount: skills.length
  });
});

// Get daily tasks
app.get('/api/tasks/daily', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const tasks = db.prepare(`
    SELECT dt.*, 
           tc.completed_date IS NOT NULL as completed
    FROM daily_tasks dt
    LEFT JOIN task_completions tc ON dt.id = tc.task_id AND tc.completed_date = ?
    ORDER BY dt.is_fixed DESC, dt.skill_category
  `).all(today);
  
  res.json(tasks);
});

// Complete a task
app.post('/api/tasks/:id/complete', (req, res) => {
  const taskId = req.params.id;
  const today = new Date().toISOString().split('T')[0];

  try {
    // Get task info
    const task = db.prepare('SELECT * FROM daily_tasks WHERE id = ?').get(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check if already completed today
    const existing = db.prepare('SELECT * FROM task_completions WHERE task_id = ? AND completed_date = ?').get(taskId, today);
    if (existing) {
      return res.status(400).json({ error: 'Task already completed today' });
    }

    // Record completion
    db.prepare('INSERT INTO task_completions (task_id, completed_date, xp_earned) VALUES (?, ?, ?)').run(taskId, today, task.xp_reward);

    // Update skill XP
    const skills = db.prepare('SELECT * FROM skills WHERE category = ?').all(task.skill_category);
    const xpPerSkill = Math.floor(task.xp_reward / skills.length);

    for (const skill of skills) {
      const newXP = skill.xp + xpPerSkill;
      let newLevel = skill.level;
      let xpToNextLevel = skill.xp_to_next_level;

      // Level up logic
      if (newXP >= xpToNextLevel) {
        newLevel++;
        xpToNextLevel = Math.floor(100 * Math.pow(1.5, newLevel));
      }

      db.prepare('UPDATE skills SET xp = ?, level = ?, xp_to_next_level = ? WHERE id = ?').run(newXP, newLevel, xpToNextLevel, skill.id);
    }

    res.json({ success: true, xpEarned: task.xp_reward });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Apply penalty for missed task
app.post('/api/tasks/:id/penalty', (req, res) => {
  const taskId = req.params.id;
  const { date, reason } = req.body;

  try {
    const task = db.prepare('SELECT * FROM daily_tasks WHERE id = ?').get(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const penaltyXP = Math.floor(task.xp_reward * 0.5);

    // Record penalty
    db.prepare('INSERT INTO penalties (task_id, penalty_date, xp_lost, reason) VALUES (?, ?, ?, ?)').run(taskId, date, penaltyXP, reason);

    // Reduce XP from skills
    const skills = db.prepare('SELECT * FROM skills WHERE category = ?').all(task.skill_category);
    const xpPerSkill = Math.floor(penaltyXP / skills.length);

    for (const skill of skills) {
      const newXP = Math.max(0, skill.xp - xpPerSkill);
      db.prepare('UPDATE skills SET xp = ? WHERE id = ?').run(newXP, skill.id);
    }

    res.json({ success: true, xpLost: penaltyXP });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new task
app.post('/api/tasks', (req, res) => {
  const { title, description, skill_category, xp_reward, is_fixed } = req.body;

  try {
    const result = db.prepare('INSERT INTO tasks (title, description, skill_category, xp_reward, is_fixed) VALUES (?, ?, ?, ?, ?)').run(title, description, skill_category, xp_reward, is_fixed ? 1 : 0);
    
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get statistics
app.get('/api/stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  
  const completedToday = db.prepare('SELECT COUNT(*) as count FROM task_completions WHERE completed_date = ?').get(today).count;
  const totalTasks = db.prepare('SELECT COUNT(*) as count FROM daily_tasks WHERE is_fixed = 1').get().count;
  const totalCompletions = db.prepare('SELECT COUNT(*) as count FROM task_completions').get().count;
  const totalPenalties = db.prepare('SELECT COUNT(*) as count FROM penalties').get().count;
  
  const xpByCategory = db.prepare(`
    SELECT category, SUM(xp) as totalXP, AVG(level) as avgLevel
    FROM skills
    GROUP BY category
  `).all();

  res.json({
    completedToday,
    totalTasks,
    totalCompletions,
    totalPenalties,
    xpByCategory
  });
});

// Get recent activity
app.get('/api/activity/recent', (req, res) => {
  const completions = db.prepare(`
    SELECT tc.*, dt.title, dt.skill_category
    FROM task_completions tc
    JOIN daily_tasks dt ON tc.task_id = dt.id
    ORDER BY tc.completed_date DESC
    LIMIT 10
  `).all();

  const penalties = db.prepare(`
    SELECT p.*, dt.title, dt.skill_category
    FROM penalties p
    JOIN daily_tasks dt ON p.task_id = dt.id
    ORDER BY p.penalty_date DESC
    LIMIT 10
  `).all();

  res.json({ completions, penalties });
});

// Add evaluation
app.post('/api/evaluations', (req, res) => {
  const { skill_id, score, notes } = req.body;

  try {
    const result = db.prepare('INSERT INTO evaluations (skill_id, score, notes) VALUES (?, ?, ?)').run(skill_id, score, notes);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get evaluations for a skill
app.get('/api/evaluations/skill/:skillId', (req, res) => {
  const evaluations = db.prepare('SELECT * FROM evaluations WHERE skill_id = ? ORDER BY evaluated_at DESC').all(req.params.skillId);
  res.json(evaluations);
});

// ========== NEW FEATURES ==========

// Achievements
app.get('/api/achievements', (req, res) => {
  const achievements = db.prepare('SELECT * FROM achievements').all();
  res.json(achievements);
});

app.post('/api/achievements/check', (req, res) => {
  try {
    const stats = db.prepare('SELECT COUNT(*) as count FROM task_completions').get();
    const skills = db.prepare('SELECT MAX(level) as maxLevel FROM skills').get();
    
    const achievements = [
      { name: 'First Steps', desc: 'Complete your first task', type: 'completions', value: 1, icon: '🎯' },
      { name: 'Getting Started', desc: 'Complete 10 tasks', type: 'completions', value: 10, icon: '⭐' },
      { name: 'Dedicated', desc: 'Complete 50 tasks', type: 'completions', value: 50, icon: '🔥' },
      { name: 'Unstoppable', desc: 'Complete 100 tasks', type: 'completions', value: 100, icon: '💪' },
      { name: 'Legend', desc: 'Complete 500 tasks', type: 'completions', value: 500, icon: '👑' },
      { name: 'Novice', desc: 'Reach level 5 in any skill', type: 'level', value: 5, icon: '🌟' },
      { name: 'Intermediate', desc: 'Reach level 10 in any skill', type: 'level', value: 10, icon: '✨' },
      { name: 'Advanced', desc: 'Reach level 15 in any skill', type: 'level', value: 15, icon: '💫' },
      { name: 'Master', desc: 'Reach level 20 in any skill', type: 'level', value: 20, icon: '🏆' },
      { name: 'SSS Rank', desc: 'Reach level 50 in any skill', type: 'level', value: 50, icon: '👑' }
    ];

    const unlocked = [];
    for (const achievement of achievements) {
      const existing = db.prepare('SELECT * FROM achievements WHERE name = ?').get(achievement.name);
      if (!existing) {
        db.prepare('INSERT INTO achievements (name, description, icon, requirement_type, requirement_value) VALUES (?, ?, ?, ?, ?)').run(
          achievement.name, achievement.desc, achievement.icon, achievement.type, achievement.value
        );
      }

      let shouldUnlock = false;
      if (achievement.type === 'completions' && stats.count >= achievement.value) {
        shouldUnlock = true;
      } else if (achievement.type === 'level' && skills.maxLevel >= achievement.value) {
        shouldUnlock = true;
      }

      if (shouldUnlock) {
        const result = db.prepare('UPDATE achievements SET unlocked = 1, unlocked_at = CURRENT_TIMESTAMP WHERE name = ? AND unlocked = 0').run(achievement.name);
        if (result.changes > 0) {
          unlocked.push(achievement);
        }
      }
    }

    res.json({ unlocked, total: db.prepare('SELECT COUNT(*) as count FROM achievements WHERE unlocked = 1').get().count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Daily Notes
app.get('/api/notes/:date', (req, res) => {
  const note = db.prepare('SELECT * FROM daily_notes WHERE date = ?').get(req.params.date);
  res.json(note || {});
});

app.post('/api/notes', (req, res) => {
  const { date, content, mood } = req.body;
  try {
    db.prepare('INSERT OR REPLACE INTO daily_notes (date, content, mood) VALUES (?, ?, ?)').run(date, content, mood);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Goals
app.get('/api/goals', (req, res) => {
  const goals = db.prepare('SELECT * FROM goals ORDER BY completed ASC, deadline ASC').all();
  res.json(goals);
});

app.post('/api/goals', (req, res) => {
  const { title, description, target_value, category, deadline } = req.body;
  try {
    const result = db.prepare('INSERT INTO goals (title, description, target_value, category, deadline) VALUES (?, ?, ?, ?, ?)').run(
      title, description, target_value, category, deadline
    );
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/goals/:id', (req, res) => {
  const { current_value, completed } = req.body;
  try {
    db.prepare('UPDATE goals SET current_value = ?, completed = ? WHERE id = ?').run(current_value, completed ? 1 : 0, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/goals/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM goals WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pomodoro Sessions
app.post('/api/pomodoro', (req, res) => {
  const { task_id, duration } = req.body;
  const today = new Date().toISOString().split('T')[0];
  try {
    const result = db.prepare('INSERT INTO pomodoro_sessions (task_id, duration, session_date) VALUES (?, ?, ?)').run(
      task_id, duration, today
    );
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pomodoro/stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const todayMinutes = db.prepare('SELECT SUM(duration) as total FROM pomodoro_sessions WHERE session_date = ?').get(today);
  const totalMinutes = db.prepare('SELECT SUM(duration) as total FROM pomodoro_sessions').get();
  const sessionCount = db.prepare('SELECT COUNT(*) as count FROM pomodoro_sessions').get();

  res.json({
    todayMinutes: todayMinutes.total || 0,
    totalMinutes: totalMinutes.total || 0,
    sessionCount: sessionCount.count
  });
});

// Get progression history
app.get('/api/progress/history', (req, res) => {
  const { days = 7 } = req.query;
  
  const history = db.prepare(`
    SELECT 
      completed_date as date,
      COUNT(*) as completions,
      SUM(xp_earned) as xp
    FROM task_completions
    WHERE completed_date >= date('now', '-${days} days')
    GROUP BY completed_date
    ORDER BY completed_date ASC
  `).all();

  res.json(history);
});

// Get rank based on total level
app.get('/api/rank', (req, res) => {
  const skills = db.prepare('SELECT * FROM skills').all();
  const totalLevel = skills.reduce((sum, skill) => sum + skill.level, 0);
  const avgLevel = totalLevel / skills.length;

  let rank = 'E';
  let rankColor = '#94a3b8';
  let nextRank = 'D';
  let nextRankLevel = 10;

  if (avgLevel >= 50) {
    rank = 'SSS';
    rankColor = '#fbbf24';
    nextRank = 'MAX';
    nextRankLevel = 100;
  } else if (avgLevel >= 40) {
    rank = 'SS';
    rankColor = '#f59e0b';
    nextRank = 'SSS';
    nextRankLevel = 50;
  } else if (avgLevel >= 30) {
    rank = 'S';
    rankColor = '#ef4444';
    nextRank = 'SS';
    nextRankLevel = 40;
  } else if (avgLevel >= 25) {
    rank = 'A';
    rankColor = '#8b5cf6';
    nextRank = 'S';
    nextRankLevel = 30;
  } else if (avgLevel >= 20) {
    rank = 'B';
    rankColor = '#3b82f6';
    nextRank = 'A';
    nextRankLevel = 25;
  } else if (avgLevel >= 15) {
    rank = 'C';
    rankColor = '#10b981';
    nextRank = 'B';
    nextRankLevel = 20;
  } else if (avgLevel >= 10) {
    rank = 'D';
    rankColor = '#22d3ee';
    nextRank = 'C';
    nextRankLevel = 15;
  }

  res.json({
    rank,
    rankColor,
    nextRank,
    nextRankLevel,
    avgLevel: avgLevel.toFixed(2),
    totalLevel,
    progress: (avgLevel / nextRankLevel) * 100
  });
});

// Export data
app.get('/api/export', (req, res) => {
  const skills = db.prepare('SELECT * FROM skills').all();
  const tasks = db.prepare('SELECT * FROM daily_tasks').all();
  const completions = db.prepare('SELECT * FROM task_completions').all();
  const penalties = db.prepare('SELECT * FROM penalties').all();
  const evaluations = db.prepare('SELECT * FROM evaluations').all();
  const achievements = db.prepare('SELECT * FROM achievements').all();
  const goals = db.prepare('SELECT * FROM goals').all();

  res.json({
    exportDate: new Date().toISOString(),
    data: {
      skills,
      tasks,
      completions,
      penalties,
      evaluations,
      achievements,
      goals
    }
  });
});

app.listen(PORT, () => {
  console.log(`🎮 Ayanokoji System API running on http://localhost:${PORT}`);
});
