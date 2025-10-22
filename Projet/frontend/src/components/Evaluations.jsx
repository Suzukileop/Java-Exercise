import { useState, useEffect } from 'react';
import { Award, Star, PlusCircle, Calendar } from 'lucide-react';

function Evaluations({ apiUrl }) {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEval, setNewEval] = useState({ score: 5, notes: '' });

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    if (selectedSkill) {
      fetchEvaluations(selectedSkill.id);
    }
  }, [selectedSkill]);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${apiUrl}/skills`);
      const data = await response.json();
      setSkills(data);
      if (data.length > 0) {
        setSelectedSkill(data[0]);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const fetchEvaluations = async (skillId) => {
    try {
      const response = await fetch(`${apiUrl}/evaluations/skill/${skillId}`);
      const data = await response.json();
      setEvaluations(data);
    } catch (error) {
      console.error('Error fetching evaluations:', error);
    }
  };

  const handleAddEvaluation = async () => {
    if (!selectedSkill) return;

    try {
      const response = await fetch(`${apiUrl}/evaluations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skill_id: selectedSkill.id,
          score: newEval.score,
          notes: newEval.notes
        })
      });

      if (response.ok) {
        setShowAddModal(false);
        setNewEval({ score: 5, notes: '' });
        fetchEvaluations(selectedSkill.id);
        alert('✅ Evaluation added successfully!');
      }
    } catch (error) {
      console.error('Error adding evaluation:', error);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const getScoreColor = (score) => {
    if (score >= 9) return 'text-purple-400';
    if (score >= 7) return 'text-blue-400';
    if (score >= 5) return 'text-green-400';
    if (score >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score) => {
    if (score >= 9) return 'Excellent';
    if (score >= 7) return 'Good';
    if (score >= 5) return 'Average';
    if (score >= 3) return 'Below Average';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Skill Evaluations</h2>
            <p className="text-gray-400">Track and assess your skill development over time</p>
          </div>
          <Award className="w-16 h-16 text-purple-400 opacity-50" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Selection */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-4">
            <h3 className="text-lg font-bold text-white mb-4">Select Skill</h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <div className="text-sm font-semibold text-purple-400 mb-2 px-2">
                    {category}
                  </div>
                  {categorySkills.map(skill => (
                    <button
                      key={skill.id}
                      onClick={() => setSelectedSkill(skill)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedSkill?.id === skill.id
                          ? 'bg-purple-600/30 border-2 border-purple-500'
                          : 'bg-slate-700/30 border-2 border-transparent hover:border-purple-500/50'
                      }`}
                    >
                      <div className="font-semibold text-white text-sm">{skill.name}</div>
                      <div className="text-xs text-gray-400 mt-1">Level {skill.level}</div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Evaluation Details */}
        <div className="lg:col-span-2">
          {selectedSkill ? (
            <>
              {/* Selected Skill Info */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedSkill.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Category: {selectedSkill.category}</span>
                      <span>•</span>
                      <span>Level {selectedSkill.level}</span>
                      <span>•</span>
                      <span>{selectedSkill.xp} XP</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg text-white font-medium transition-all"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>New Evaluation</span>
                  </button>
                </div>
              </div>

              {/* Evaluations List */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Evaluation History</h3>
                {evaluations.length > 0 ? (
                  <div className="space-y-3">
                    {evaluations.map(evaluation => (
                      <div
                        key={evaluation.id}
                        className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {[...Array(10)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < evaluation.score
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${getScoreColor(evaluation.score)}`}>
                              {evaluation.score}/10
                            </div>
                            <div className="text-xs text-gray-400">
                              {getScoreLabel(evaluation.score)}
                            </div>
                          </div>
                        </div>
                        {evaluation.notes && (
                          <p className="text-gray-300 text-sm mb-2">{evaluation.notes}</p>
                        )}
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(evaluation.evaluated_at).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Award className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>No evaluations yet for this skill.</p>
                    <p className="text-sm mt-2">Click "New Evaluation" to add your first assessment.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-12 text-center">
              <p className="text-gray-400">Select a skill to view and manage evaluations</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Evaluation Modal */}
      {showAddModal && selectedSkill && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl border-2 border-purple-500/50 p-8 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">New Evaluation</h3>
            <p className="text-gray-400 mb-6">{selectedSkill.name}</p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">
                Score (1-10)
              </label>
              <div className="flex items-center space-x-2 mb-4">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setNewEval({ ...newEval, score: i + 1 })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 transition-all ${
                        i < newEval.score
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-600 hover:text-gray-500'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-center">
                <span className={`text-2xl font-bold ${getScoreColor(newEval.score)}`}>
                  {newEval.score}/10
                </span>
                <span className="text-gray-400 ml-2">- {getScoreLabel(newEval.score)}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={newEval.notes}
                onChange={(e) => setNewEval({ ...newEval, notes: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                rows="4"
                placeholder="Add any notes about your performance, challenges, or areas for improvement..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewEval({ score: 5, notes: '' });
                }}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvaluation}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg text-white font-medium transition-all"
              >
                Add Evaluation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Evaluations;
