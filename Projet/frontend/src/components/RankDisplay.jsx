import { useState, useEffect } from 'react';
import { Crown, TrendingUp } from 'lucide-react';

function RankDisplay({ apiUrl }) {
  const [rankData, setRankData] = useState(null);

  useEffect(() => {
    fetchRank();
  }, []);

  const fetchRank = async () => {
    try {
      const response = await fetch(`${apiUrl}/rank`);
      const data = await response.json();
      setRankData(data);
    } catch (error) {
      console.error('Error fetching rank:', error);
    }
  };

  if (!rankData) return null;

  const getRankDescription = (rank) => {
    const descriptions = {
      'E': 'Beginner Hunter',
      'D': 'Novice Hunter',
      'C': 'Intermediate Hunter',
      'B': 'Advanced Hunter',
      'A': 'Elite Hunter',
      'S': 'S-Rank Hunter',
      'SS': 'SS-Rank Hunter',
      'SSS': 'National Level Hunter'
    };
    return descriptions[rank] || 'Unknown';
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border-2 border-purple-500/50 p-6 glow-purple">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Crown className="w-8 h-8 text-yellow-400" />
          <div>
            <h3 className="text-sm text-gray-400">Current Rank</h3>
            <p className="text-xs text-gray-500">{getRankDescription(rankData.rank)}</p>
          </div>
        </div>
        <div 
          className="text-7xl font-black tracking-wider"
          style={{ 
            color: rankData.rankColor,
            textShadow: `0 0 20px ${rankData.rankColor}80, 0 0 40px ${rankData.rankColor}40`
          }}
        >
          {rankData.rank}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Avg Level: {rankData.avgLevel}</span>
          <span className="text-purple-400 font-semibold">Next: {rankData.nextRank}</span>
        </div>
        <div className="bg-slate-900/50 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${Math.min(rankData.progress, 100)}%` }}
          />
        </div>
        <div className="text-right text-xs text-gray-500 mt-1">
          {rankData.avgLevel} / {rankData.nextRankLevel} (Level required for {rankData.nextRank})
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
        <TrendingUp className="w-4 h-4" />
        <span>Total Level: {rankData.totalLevel}</span>
      </div>

      {/* Rank Legend */}
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="text-xs text-gray-500 mb-2">Rank System</div>
        <div className="grid grid-cols-4 gap-2">
          {['E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS'].map(r => (
            <div
              key={r}
              className={`text-center py-1 rounded ${
                r === rankData.rank ? 'bg-purple-600/30 border border-purple-500' : 'bg-slate-800/50'
              }`}
            >
              <span className={`font-bold text-xs ${r === rankData.rank ? 'text-white' : 'text-gray-600'}`}>
                {r}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RankDisplay;
