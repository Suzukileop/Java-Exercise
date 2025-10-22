import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

function PomodoroTimer({ apiUrl, taskId, taskTitle }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(25);
  const [stats, setStats] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleComplete();
            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, minutes, seconds]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${apiUrl}/pomodoro/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching pomodoro stats:', error);
    }
  };

  const handleComplete = async () => {
    setIsRunning(false);
    setMinutes(sessionTime);
    setSeconds(0);

    // Save session
    try {
      await fetch(`${apiUrl}/pomodoro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task_id: taskId,
          duration: sessionTime
        })
      });
      
      fetchStats();
      
      // Browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Complete! 🎉', {
          body: `You completed a ${sessionTime} minute session!`
        });
      }
      
      alert(`🎉 Pomodoro session complete! Time for a break!`);
    } catch (error) {
      console.error('Error saving pomodoro session:', error);
    }
  };

  const toggleTimer = () => {
    if (!isRunning && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(sessionTime);
    setSeconds(0);
  };

  const progress = ((sessionTime * 60 - (minutes * 60 + seconds)) / (sessionTime * 60)) * 100;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Clock className="w-6 h-6 mr-2 text-purple-400" />
          Pomodoro Timer
        </h3>
        {taskTitle && (
          <span className="text-sm text-gray-400">Task: {taskTitle}</span>
        )}
      </div>

      {/* Timer Display */}
      <div className="relative mb-6">
        <svg className="w-full h-64" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#1e293b"
            strokeWidth="10"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 80}`}
            strokeDashoffset={`${2 * Math.PI * 80 * (1 - progress / 100)}`}
            transform="rotate(-90 100 100)"
            className="transition-all duration-1000"
          />
        </svg>
        
        {/* Time Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold text-white mb-2">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-400">{sessionTime} minute session</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button
          onClick={toggleTimer}
          className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full transition-all shadow-lg hover:shadow-purple-500/50"
        >
          {isRunning ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white" />
          )}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 bg-slate-700 hover:bg-slate-600 rounded-full transition-all"
        >
          <RotateCcw className="w-8 h-8 text-white" />
        </button>
      </div>

      {/* Session Length Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-white mb-2">Session Length</label>
        <div className="flex space-x-2">
          {[15, 25, 45, 60].map(time => (
            <button
              key={time}
              onClick={() => {
                setSessionTime(time);
                setMinutes(time);
                setSeconds(0);
                setIsRunning(false);
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                sessionTime === time
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {time}m
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.todayMinutes}</div>
            <div className="text-xs text-gray-400">Today (min)</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-indigo-400">{stats.totalMinutes}</div>
            <div className="text-xs text-gray-400">Total (min)</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-pink-400">{stats.sessionCount}</div>
            <div className="text-xs text-gray-400">Sessions</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PomodoroTimer;
