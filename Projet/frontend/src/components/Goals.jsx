import { useState, useEffect } from 'react';
import { Target, Plus, CheckCircle, Trash2, Calendar } from 'lucide-react';

function Goals({ apiUrl }) {
  const [goals, setGoals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target_value: 0,
    category: 'Fullstack Dev',
    deadline: ''
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch(`${apiUrl}/goals`);
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal.title || !newGoal.target_value) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal)
      });

      if (response.ok) {
        setShowAddModal(false);
        setNewGoal({ title: '', description: '', target_value: 0, category: 'Fullstack Dev', deadline: '' });
        fetchGoals();
        alert('✅ Goal created successfully!');
      }
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleUpdateGoal = async (goalId, currentValue, completed) => {
    try {
      const response = await fetch(`${apiUrl}/goals/${goalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_value: currentValue, completed })
      });

      if (response.ok) {
        fetchGoals();
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (!confirm('Are you sure you want to delete this goal?')) return;

    try {
      const response = await fetch(`${apiUrl}/goals/${goalId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchGoals();
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const categories = ['Fullstack Dev', 'Ethical Hacking', 'Fitness', 'Reading', 'Math', 'Chess', 'General'];

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Personal Goals</h2>
            <p className="text-gray-400">Set and track your custom objectives</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg text-white font-medium transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>New Goal</span>
          </button>
        </div>
      </div>

      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Active Goals</h3>
          <div className="space-y-4">
            {activeGoals.map(goal => {
              const progress = (goal.current_value / goal.target_value) * 100;
              const isOverdue = goal.deadline && new Date(goal.deadline) < new Date();

              return (
                <div key={goal.id} className="bg-slate-700/30 rounded-lg p-5 border border-slate-600/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-bold text-white">{goal.title}</h4>
                        <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-xs text-purple-300">
                          {goal.category}
                        </span>
                      </div>
                      {goal.description && (
                        <p className="text-sm text-gray-400 mb-2">{goal.description}</p>
                      )}
                      {goal.deadline && (
                        <div className={`flex items-center text-xs ${isOverdue ? 'text-red-400' : 'text-gray-500'}`}>
                          <Calendar className="w-4 h-4 mr-1" />
                          Deadline: {new Date(goal.deadline).toLocaleDateString()}
                          {isOverdue && ' (Overdue!)'}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-2 hover:bg-red-900/30 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-semibold text-purple-400">
                        {goal.current_value} / {goal.target_value}
                      </span>
                    </div>
                    <div className="bg-slate-900/50 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-1">{progress.toFixed(0)}%</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={goal.current_value}
                      onChange={(e) => handleUpdateGoal(goal.id, parseInt(e.target.value) || 0, progress >= 100)}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-purple-500"
                      min="0"
                      max={goal.target_value}
                    />
                    {progress >= 100 && (
                      <button
                        onClick={() => handleUpdateGoal(goal.id, goal.current_value, true)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium transition-all flex items-center space-x-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Complete</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-green-500/20 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
            Completed Goals
          </h3>
          <div className="space-y-3">
            {completedGoals.map(goal => (
              <div key={goal.id} className="bg-green-900/20 rounded-lg p-4 border border-green-500/30 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">{goal.title}</h4>
                  <p className="text-sm text-gray-400">{goal.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">{goal.target_value} ✓</div>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-xs text-red-400 hover:text-red-300 mt-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {goals.length === 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-12 text-center">
          <Target className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No goals yet. Create your first goal to get started!</p>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl border-2 border-purple-500/50 p-8 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Create New Goal</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Title *</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., Complete 100 coding challenges"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                  rows="3"
                  placeholder="Optional description..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Target Value *</label>
                <input
                  type="number"
                  value={newGoal.target_value}
                  onChange={(e) => setNewGoal({ ...newGoal, target_value: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g., 100"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Deadline (Optional)</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewGoal({ title: '', description: '', target_value: 0, category: 'Fullstack Dev', deadline: '' });
                }}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg text-white font-medium transition-all"
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Goals;
