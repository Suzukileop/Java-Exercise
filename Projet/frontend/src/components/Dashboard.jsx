import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Flame, Star, Calendar } from 'lucide-react';

function Dashboard({ apiUrl, onProgressUpdate }) {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState({ completions: [], penalties: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, statsRes, activityRes] = await Promise.all([
        fetch(`${apiUrl}/tasks/daily`),
        fetch(`${apiUrl}/stats`),
        fetch(`${apiUrl}/activity/recent`)
      ]);

      setTasks(await tasksRes.json());
      setStats(await statsRes.json());
      setActivity(await activityRes.json());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch(`${apiUrl}/tasks/${taskId}/complete`, {
        method: 'POST'
      });

      if (response.ok) {
        fetchData();
        onProgressUpdate();
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const todaysTasks = tasks.filter(t => t.is_fixed);
  const completedCount = todaysTasks.filter(t => t.completed).length;
  const completionRate = todaysTasks.length > 0 ? (completedCount / todaysTasks.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 glow-purple">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Today's Progress</p>
              <p className="text-3xl font-bold text-white">{completedCount}/{todaysTasks.length}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-purple-400" />
          </div>
          <div className="mt-3 bg-slate-900/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Completions</p>
              <p className="text-3xl font-bold text-white">{stats?.totalCompletions || 0}</p>
            </div>
            <Star className="w-10 h-10 text-indigo-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/40 backdrop-blur-sm rounded-xl p-6 border border-orange-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Current Streak</p>
              <p className="text-3xl font-bold text-white">5</p>
            </div>
            <Flame className="w-10 h-10 text-orange-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Penalties</p>
              <p className="text-3xl font-bold text-white">{stats?.totalPenalties || 0}</p>
            </div>
            <XCircle className="w-10 h-10 text-red-400" />
          </div>
        </div>
      </div>

      {/* Today's Quests Preview */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-purple-400" />
            Today's Fixed Quests
          </h2>
          <span className="text-sm text-gray-400">{new Date().toLocaleDateString()}</span>
        </div>
        
        <div className="space-y-3">
          {todaysTasks.slice(0, 6).map(task => (
            <div 
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                task.completed 
                  ? 'bg-green-900/20 border border-green-500/30' 
                  : 'bg-slate-700/30 border border-slate-600/30 hover:border-purple-500/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {task.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-500" />
                )}
                <div>
                  <h3 className="font-semibold text-white">{task.title}</h3>
                  <p className="text-sm text-gray-400">{task.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-purple-400">+{task.xp_reward} XP</span>
                {!task.completed && (
                  <button
                    onClick={() => handleCompleteTask(task.id)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg text-white font-medium transition-all"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-green-500/20 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            Recent Completions
          </h3>
          <div className="space-y-2">
            {activity.completions.slice(0, 5).map(comp => (
              <div key={comp.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-sm text-white">{comp.title}</p>
                  <p className="text-xs text-gray-500">{comp.completed_date}</p>
                </div>
                <span className="text-green-400 text-sm font-medium">+{comp.xp_earned} XP</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-red-500/20 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <XCircle className="w-5 h-5 mr-2 text-red-400" />
            Recent Penalties
          </h3>
          <div className="space-y-2">
            {activity.penalties.length > 0 ? (
              activity.penalties.slice(0, 5).map(penalty => (
                <div key={penalty.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-sm text-white">{penalty.title}</p>
                    <p className="text-xs text-gray-500">{penalty.penalty_date}</p>
                  </div>
                  <span className="text-red-400 text-sm font-medium">-{penalty.xp_lost} XP</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No penalties yet! Keep it up!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
