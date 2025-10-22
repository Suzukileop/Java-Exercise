import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Award, Zap } from 'lucide-react';
import ProgressHistory from './ProgressHistory';

function Statistics({ apiUrl }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${apiUrl}/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (!stats) {
    return <div className="text-white text-center py-12">Loading statistics...</div>;
  }

  const radarData = stats.xpByCategory.map(cat => ({
    category: cat.category,
    level: parseFloat(cat.avgLevel),
    xp: cat.totalXP
  }));

  const barData = stats.xpByCategory.map(cat => ({
    name: cat.category.split(' ')[0],
    XP: cat.totalXP,
    Level: parseFloat(cat.avgLevel)
  }));

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Statistics & Analytics</h2>
            <p className="text-gray-400">Comprehensive overview of your progression</p>
          </div>
          <TrendingUp className="w-16 h-16 text-purple-400 opacity-50" />
        </div>
      </div>

      {/* Progress History Chart */}
      <ProgressHistory apiUrl={apiUrl} />

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
          <div className="flex items-center space-x-3 mb-2">
            <Award className="w-8 h-8 text-purple-400" />
            <span className="text-gray-400">Total Completions</span>
          </div>
          <div className="text-4xl font-bold text-white">{stats.totalCompletions}</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-8 h-8 text-green-400" />
            <span className="text-gray-400">Completed Today</span>
          </div>
          <div className="text-4xl font-bold text-white">{stats.completedToday}</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
          <div className="flex items-center space-x-3 mb-2">
            <Award className="w-8 h-8 text-red-400" />
            <span className="text-gray-400">Total Penalties</span>
          </div>
          <div className="text-4xl font-bold text-white">{stats.totalPenalties}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4">XP by Domain</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #8b5cf6',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Bar dataKey="XP" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4">Skill Balance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="category" stroke="#94a3b8" />
              <PolarRadiusAxis stroke="#94a3b8" />
              <Radar
                name="Level"
                dataKey="level"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #8b5cf6',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-purple-500/20">
          <h3 className="text-xl font-bold text-white">Category Breakdown</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {stats.xpByCategory.map((cat, index) => {
              const progress = (parseFloat(cat.avgLevel) / 100) * 100;
              const colors = [
                'from-blue-500 to-cyan-500',
                'from-red-500 to-orange-500',
                'from-green-500 to-emerald-500',
                'from-purple-500 to-pink-500',
                'from-indigo-500 to-blue-500',
                'from-yellow-500 to-orange-500'
              ];

              return (
                <div key={cat.category} className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{cat.category}</h4>
                    <div className="text-right">
                      <span className="text-purple-400 font-bold text-lg">
                        Level {parseFloat(cat.avgLevel).toFixed(1)}
                      </span>
                      <span className="text-gray-400 text-sm ml-2">({cat.totalXP} XP)</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${colors[index % colors.length]} transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    {progress.toFixed(1)}% Complete
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-slate-700/30 rounded-lg">
            <div className="text-3xl font-bold text-purple-400">
              {stats.totalCompletions > 0 ? ((stats.completedToday / stats.totalTasks) * 100).toFixed(0) : 0}%
            </div>
            <div className="text-sm text-gray-400 mt-1">Today's Rate</div>
          </div>
          <div className="text-center p-4 bg-slate-700/30 rounded-lg">
            <div className="text-3xl font-bold text-green-400">
              {stats.totalCompletions}
            </div>
            <div className="text-sm text-gray-400 mt-1">All-Time Tasks</div>
          </div>
          <div className="text-center p-4 bg-slate-700/30 rounded-lg">
            <div className="text-3xl font-bold text-blue-400">
              {stats.totalCompletions > 0 ? ((stats.totalCompletions / (stats.totalCompletions + stats.totalPenalties)) * 100).toFixed(0) : 0}%
            </div>
            <div className="text-sm text-gray-400 mt-1">Success Rate</div>
          </div>
          <div className="text-center p-4 bg-slate-700/30 rounded-lg">
            <div className="text-3xl font-bold text-yellow-400">
              {stats.xpByCategory.length}
            </div>
            <div className="text-sm text-gray-400 mt-1">Active Domains</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
