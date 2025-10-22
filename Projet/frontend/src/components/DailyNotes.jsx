import { useState, useEffect } from 'react';
import { BookOpen, Save, Smile, Meh, Frown } from 'lucide-react';

function DailyNotes({ apiUrl }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState({ content: '', mood: 'neutral' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchNote(date);
  }, [date]);

  const fetchNote = async (selectedDate) => {
    try {
      const response = await fetch(`${apiUrl}/notes/${selectedDate}`);
      const data = await response.json();
      if (data && data.content) {
        setNote({ content: data.content, mood: data.mood || 'neutral' });
      } else {
        setNote({ content: '', mood: 'neutral' });
      }
      setSaved(false);
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${apiUrl}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          content: note.content,
          mood: note.mood
        })
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const moods = [
    { value: 'happy', icon: Smile, color: 'text-green-400', label: 'Great' },
    { value: 'neutral', icon: Meh, color: 'text-yellow-400', label: 'Okay' },
    { value: 'sad', icon: Frown, color: 'text-red-400', label: 'Tough' }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-purple-400" />
          Daily Journal
        </h3>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            fetchNote(e.target.value);
          }}
          className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Mood Selector */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-white mb-2">How was your day?</label>
        <div className="flex space-x-2">
          {moods.map(mood => {
            const Icon = mood.icon;
            return (
              <button
                key={mood.value}
                onClick={() => setNote({ ...note, mood: mood.value })}
                className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                  note.mood === mood.value
                    ? 'border-purple-500 bg-purple-600/20'
                    : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto ${mood.color}`} />
                <div className="text-xs text-gray-400 mt-1">{mood.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Note Content */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-white mb-2">Notes & Reflections</label>
        <textarea
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
          rows="8"
          placeholder="How did today go? What did you learn? What challenges did you face? What are you grateful for?"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
          saved
            ? 'bg-green-600 text-white'
            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
        }`}
      >
        <Save className="w-5 h-5" />
        <span>{saved ? 'Saved!' : 'Save Note'}</span>
      </button>

      <div className="mt-4 text-xs text-gray-500 text-center">
        💡 Daily reflection helps track your mental and emotional progress
      </div>
    </div>
  );
}

export default DailyNotes;
