import { useState, useEffect } from 'react';
import { Zap, TrendingUp, Lock, Unlock } from 'lucide-react';

function SkillTree({ apiUrl }) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${apiUrl}/skills`);
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const getCategoryStats = (categorySkills) => {
    const totalXP = categorySkills.reduce((sum, s) => sum + s.xp, 0);
    const avgLevel = categorySkills.reduce((sum, s) => sum + s.level, 0) / categorySkills.length;
    const maxLevel = Math.max(...categorySkills.map(s => s.level));
    return { totalXP, avgLevel, maxLevel };
  };

  const getProgressColor = (level) => {
    if (level >= 20) return 'from-purple-500 to-pink-500';
    if (level >= 15) return 'from-blue-500 to-purple-500';
    if (level >= 10) return 'from-green-500 to-blue-500';
    if (level >= 5) return 'from-yellow-500 to-green-500';
    return 'from-gray-500 to-gray-600';
  };

  const categoryIcons = {
    'Fullstack Dev': '💻',
    'Ethical Hacking': '🔒',
    'Fitness': '💪',
    'Reading': '📚',
    'Math': '🔢',
    'Chess': '♟️'
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Skill Tree</h2>
            <p className="text-gray-400">Track your progression across all domains</p>
          </div>
          <Zap className="w-16 h-16 text-purple-400 opacity-50" />
        </div>
      </div>

      {Object.entries(groupedSkills).map(([category, categorySkills]) => {
        const stats = getCategoryStats(categorySkills);
        const categoryProgress = (stats.avgLevel / 100) * 100;

        return (
          <div key={category} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">{categoryIcons[category] || '⭐'}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{category}</h3>
                    <p className="text-gray-400 text-sm">
                      Level {stats.avgLevel.toFixed(1)} • {stats.totalXP} XP
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-400">{categoryProgress.toFixed(0)}%</div>
                  <div className="text-sm text-gray-400">Domain Mastery</div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getProgressColor(stats.avgLevel)} transition-all duration-500`}
                  style={{ width: `${categoryProgress}%` }}
                />
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorySkills.map(skill => {
                const progressPercent = (skill.xp / skill.xp_to_next_level) * 100;
                const isMaxed = skill.level >= 100;

                return (
                  <div
                    key={skill.id}
                    className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30 hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-white text-sm">{skill.name}</h4>
                      {isMaxed ? (
                        <Unlock className="w-5 h-5 text-purple-400" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-500" />
                      )}
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">Level {skill.level}</span>
                        <span className="text-xs text-purple-400">
                          {skill.xp} / {skill.xp_to_next_level} XP
                        </span>
                      </div>
                      <div className="bg-slate-900/50 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getProgressColor(skill.level)} transition-all duration-500`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {isMaxed ? 'Mastered' : `${(100 - progressPercent).toFixed(0)}% to next level`}
                      </span>
                      {skill.level >= 10 && (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Level Tiers</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full" />
            <span className="text-sm text-gray-400">0-4: Beginner</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-3 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full" />
            <span className="text-sm text-gray-400">5-9: Novice</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
            <span className="text-sm text-gray-400">10-14: Intermediate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            <span className="text-sm text-gray-400">15-19: Advanced</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            <span className="text-sm text-gray-400">20+: Master</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillTree;
