import { useState, useEffect } from 'react';
import { Trophy, Target, Zap, TrendingUp, Award, Activity, Crown, BookOpen, Clock } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DailyQuests from './components/DailyQuests';
import SkillTree from './components/SkillTree';
import Statistics from './components/Statistics';
import Evaluations from './components/Evaluations';
import Achievements from './components/Achievements';
import Goals from './components/Goals';
import PomodoroTimer from './components/PomodoroTimer';
import DailyNotes from './components/DailyNotes';
import RankDisplay from './components/RankDisplay';

const API_URL = 'http://localhost:3000/api';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [overallProgress, setOverallProgress] = useState(null);

  useEffect(() => {
    fetchOverallProgress();
  }, []);

  const fetchOverallProgress = async () => {
    try {
      const response = await fetch(`${API_URL}/progress/overall`);
      const data = await response.json();
      setOverallProgress(data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'quests', label: 'Daily Quests', icon: Target },
    { id: 'skills', label: 'Skill Tree', icon: Zap },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'pomodoro', label: 'Focus Timer', icon: Clock },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'evaluations', label: 'Evaluations', icon: Award },
    { id: 'stats', label: 'Statistics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-darker via-dark to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center glow-purple">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Ayanokoji System
                </h1>
                <p className="text-sm text-gray-400">Evolution Protocol Active</p>
              </div>
            </div>
            
            {overallProgress && (
              <div className="bg-slate-800/50 rounded-lg px-6 py-3 border border-purple-500/20">
                <div className="text-xs text-gray-400 mb-1">Overall Progress</div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold text-purple-400">
                    {overallProgress.overallProgress}%
                  </div>
                  <div className="text-sm text-gray-300">
                    <div>Level: {parseFloat(overallProgress.averageLevel).toFixed(1)}</div>
                    <div className="text-xs text-gray-500">{overallProgress.totalXP} XP</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-500/10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Dashboard apiUrl={API_URL} onProgressUpdate={fetchOverallProgress} />
              </div>
              <div className="space-y-6">
                <RankDisplay apiUrl={API_URL} />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'quests' && <DailyQuests apiUrl={API_URL} onProgressUpdate={fetchOverallProgress} />}
        {activeTab === 'skills' && <SkillTree apiUrl={API_URL} />}
        {activeTab === 'achievements' && <Achievements apiUrl={API_URL} />}
        {activeTab === 'goals' && <Goals apiUrl={API_URL} />}
        {activeTab === 'pomodoro' && <PomodoroTimer apiUrl={API_URL} />}
        {activeTab === 'journal' && <DailyNotes apiUrl={API_URL} />}
        {activeTab === 'evaluations' && <Evaluations apiUrl={API_URL} />}
        {activeTab === 'stats' && <Statistics apiUrl={API_URL} />}
      </main>
    </div>
  );
}

export default App;
