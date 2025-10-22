import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Award, Skull } from 'lucide-react';

function DailyQuests({ apiUrl, onProgressUpdate }) {
  const [tasks, setTasks] = useState([]);
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${apiUrl}/tasks/daily`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch(`${apiUrl}/tasks/${taskId}/complete`, {
        method: 'POST'
      });

      if (response.ok) {
        const result = await response.json();
        alert(`✨ Quest completed! +${result.xpEarned} XP earned!`);
        fetchTasks();
        onProgressUpdate();
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleApplyPenalty = async () => {
    if (!selectedTask) return;

    try {
      const response = await fetch(`${apiUrl}/tasks/${selectedTask.id}/penalty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: new Date().toISOString().split('T')[0],
          reason: 'Missed daily task'
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(`⚠️ Penalty applied! -${result.xpLost} XP`);
        setShowPenaltyModal(false);
        setSelectedTask(null);
        fetchTasks();
        onProgressUpdate();
      }
    } catch (error) {
      console.error('Error applying penalty:', error);
    }
  };

  const categoryColors = {
    'Fullstack Dev': 'from-blue-600 to-cyan-600',
    'Ethical Hacking': 'from-red-600 to-orange-600',
    'Fitness': 'from-green-600 to-emerald-600',
    'Reading': 'from-purple-600 to-pink-600',
    'Math': 'from-indigo-600 to-blue-600',
    'Chess': 'from-yellow-600 to-orange-600'
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.skill_category]) {
      acc[task.skill_category] = [];
    }
    acc[task.skill_category].push(task);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Daily Quest Log</h2>
            <p className="text-gray-400">Complete your daily tasks to gain experience and level up your skills</p>
          </div>
          <Award className="w-16 h-16 text-purple-400 opacity-50" />
        </div>
      </div>

      {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
        <div key={category} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden">
          <div className={`bg-gradient-to-r ${categoryColors[category] || 'from-gray-600 to-gray-700'} p-4`}>
            <h3 className="text-xl font-bold text-white">{category}</h3>
            <p className="text-sm text-gray-200">
              {categoryTasks.filter(t => t.completed).length} / {categoryTasks.length} completed
            </p>
          </div>

          <div className="p-4 space-y-3">
            {categoryTasks.map(task => (
              <div
                key={task.id}
                className={`relative p-5 rounded-lg transition-all ${
                  task.completed
                    ? 'bg-green-900/20 border-2 border-green-500/50'
                    : 'bg-slate-700/30 border-2 border-slate-600/30 hover:border-purple-500/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {task.completed ? (
                      <CheckCircle className="w-8 h-8 text-green-400 mt-1 flex-shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full border-3 border-gray-500 mt-1 flex-shrink-0" />
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-bold text-white">{task.title}</h4>
                        {task.is_fixed && (
                          <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-xs text-purple-300 font-medium">
                            FIXED
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-3">{task.description}</p>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-400 font-semibold">+{task.xp_reward} XP</span>
                        </div>
                        {task.completed && (
                          <span className="text-green-400 text-sm flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Completed Today
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    {!task.completed && (
                      <>
                        <button
                          onClick={() => handleCompleteTask(task.id)}
                          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-purple-500/50"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTask(task);
                            setShowPenaltyModal(true);
                          }}
                          className="px-6 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-500/50 rounded-lg text-red-300 font-medium transition-all"
                        >
                          Penalty
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Penalty Modal */}
      {showPenaltyModal && selectedTask && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl border-2 border-red-500/50 p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <Skull className="w-16 h-16 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-2">Apply Penalty?</h3>
            <p className="text-gray-400 text-center mb-6">
              You are about to apply a penalty for missing: <br />
              <span className="text-white font-semibold">"{selectedTask.title}"</span>
            </p>
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">XP Loss:</span>
                <span className="text-red-400 font-bold text-xl">-{Math.floor(selectedTask.xp_reward * 0.5)} XP</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowPenaltyModal(false);
                  setSelectedTask(null);
                }}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyPenalty}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all"
              >
                Apply Penalty
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyQuests;
