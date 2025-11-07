import { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Calendar } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  completed: string;
  learned: string;
  challenges: string;
  notes: string;
}

export const JournalSection = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : [];
  });

  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newEntry, setNewEntry] = useState<Omit<JournalEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    completed: '',
    learned: '',
    challenges: '',
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = () => {
    if (newEntry.completed || newEntry.learned) {
      const entry: JournalEntry = {
        ...newEntry,
        id: Date.now().toString()
      };
      setEntries([entry, ...entries]);
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        completed: '',
        learned: '',
        challenges: '',
        notes: ''
      });
      setShowAddEntry(false);
    }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Daily Journal</h2>
          </div>
          <button
            onClick={() => setShowAddEntry(!showAddEntry)}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Entry
          </button>
        </div>

        {showAddEntry && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">New Journal Entry</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  What did I complete today?
                </label>
                <textarea
                  value={newEntry.completed}
                  onChange={(e) => setNewEntry({ ...newEntry, completed: e.target.value })}
                  rows={3}
                  placeholder="List the tasks, exercises, or goals you completed..."
                  className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  What did I learn today?
                </label>
                <textarea
                  value={newEntry.learned}
                  onChange={(e) => setNewEntry({ ...newEntry, learned: e.target.value })}
                  rows={3}
                  placeholder="Describe new concepts, skills, or insights you gained..."
                  className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Challenges & How I Overcame Them
                </label>
                <textarea
                  value={newEntry.challenges}
                  onChange={(e) => setNewEntry({ ...newEntry, challenges: e.target.value })}
                  rows={3}
                  placeholder="What problems did you face and how did you solve them?..."
                  className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  rows={2}
                  placeholder="Any other thoughts or reflections..."
                  className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddEntry}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Save Entry
                </button>
                <button
                  onClick={() => setShowAddEntry(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No journal entries yet. Click "New Entry" to start documenting your journey!
            </div>
          ) : (
            entries.map(entry => (
              <div
                key={entry.id}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-amber-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-semibold">{formatDate(entry.date)}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {entry.completed && (
                    <div>
                      <h4 className="text-emerald-400 font-semibold mb-2 text-sm">
                        Completed Today
                      </h4>
                      <p className="text-slate-300 whitespace-pre-wrap">{entry.completed}</p>
                    </div>
                  )}

                  {entry.learned && (
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-2 text-sm">
                        What I Learned
                      </h4>
                      <p className="text-slate-300 whitespace-pre-wrap">{entry.learned}</p>
                    </div>
                  )}

                  {entry.challenges && (
                    <div>
                      <h4 className="text-amber-400 font-semibold mb-2 text-sm">
                        Challenges & Solutions
                      </h4>
                      <p className="text-slate-300 whitespace-pre-wrap">{entry.challenges}</p>
                    </div>
                  )}

                  {entry.notes && (
                    <div>
                      <h4 className="text-slate-400 font-semibold mb-2 text-sm">
                        Additional Notes
                      </h4>
                      <p className="text-slate-300 whitespace-pre-wrap">{entry.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
