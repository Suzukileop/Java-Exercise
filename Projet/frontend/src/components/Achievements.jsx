import { useState, useEffect } from 'react';
import { Trophy, Lock, Sparkles } from 'lucide-react';

function Achievements({ apiUrl }) {
  const [achievements, setAchievements] = useState([]);
  const [newUnlocks, setNewUnlocks] = useState([]);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  useEffect(() => {
    fetchAchievements();
    checkAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch(`${apiUrl}/achievements`);
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const checkAchievements = async () => {
    try {
      const response = await fetch(`${apiUrl}/achievements/check`, {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.unlocked && data.unlocked.length > 0) {
        setNewUnlocks(data.unlocked);
        setShowUnlockModal(true);
        fetchAchievements();
      }
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progress = achievements.length > 0 ? (unlockedCount / achievements.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Achievements</h2>
            <p className="text-gray-400">Unlock achievements by completing tasks and leveling up</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">{unlockedCount}/{achievements.length}</div>
            <div className="text-sm text-gray-400">{progress.toFixed(0)}% Complete</div>
          </div>
        </div>
        <div className="mt-4 bg-slate-900/50 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`rounded-xl p-6 border-2 transition-all ${
              achievement.unlocked
                ? 'bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/50 glow-purple'
                : 'bg-slate-800/30 border-slate-700/30 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-5xl">{achievement.icon}</div>
              {achievement.unlocked ? (
                <Trophy className="w-6 h-6 text-yellow-400" />
              ) : (
                <Lock className="w-6 h-6 text-gray-600" />
              )}
            </div>
            
            <h3 className="text-lg font-bold text-white mb-1">{achievement.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>
            
            {achievement.unlocked ? (
              <div className="text-xs text-green-400 flex items-center">
                <Sparkles className="w-4 h-4 mr-1" />
                Unlocked {achievement.unlocked_at ? new Date(achievement.unlocked_at).toLocaleDateString() : ''}
              </div>
            ) : (
              <div className="text-xs text-gray-500">
                {achievement.requirement_type === 'completions' 
                  ? `Complete ${achievement.requirement_value} tasks`
                  : `Reach level ${achievement.requirement_value}`}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Unlock Modal */}
      {showUnlockModal && newUnlocks.length > 0 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl border-2 border-yellow-500 p-8 max-w-md w-full mx-4 shadow-2xl animate-pulse-slow">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🏆</div>
              <h3 className="text-3xl font-bold text-yellow-400 mb-2">Achievement Unlocked!</h3>
              {newUnlocks.map((achievement, index) => (
                <div key={index} className="mt-4 p-4 bg-slate-900/50 rounded-lg">
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <div className="text-xl font-bold text-white">{achievement.name}</div>
                  <div className="text-sm text-gray-300 mt-1">{achievement.desc}</div>
                </div>
              ))}
              <button
                onClick={() => {
                  setShowUnlockModal(false);
                  setNewUnlocks([]);
                }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 rounded-lg text-white font-bold transition-all"
              >
                Awesome!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Achievements;
