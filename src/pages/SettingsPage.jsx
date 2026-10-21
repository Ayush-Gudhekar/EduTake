// src/pages/SettingsPage.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Settings, User, Moon, Sun, RotateCcw, Save, CheckCircle2, Shield } from 'lucide-react';

export default function SettingsPage() {
  const { state, dispatch } = useContext(AppContext);

  const [name, setName] = useState(state.profile?.name || 'Alex Developer');
  const [role, setRole] = useState(state.profile?.role || 'Computer Science Undergraduate');
  const [goalHours, setGoalHours] = useState(state.profile?.goalWeeklyHours || 15);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_PROFILE',
      payload: {
        name: name.trim(),
        role: role.trim(),
        goalWeeklyHours: Number(goalHours) || 12
      }
    });

    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  const handleResetProgress = () => {
    if (confirm('Reset your study history, streak, and quiz scores? Your courses will be kept intact.')) {
      dispatch({ type: 'RESET_PROGRESS' });
      alert('Progress has been reset.');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Platform Preferences</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your personal learner profile, study goals, interface appearance, and cache.
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Learner Profile</h2>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
          >
            {savedFeedback ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{savedFeedback ? 'Saved!' : 'Save Changes'}</span>
          </button>
        </div>

        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Headline / Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Weekly Target Study Hours
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={goalHours}
              onChange={(e) => setGoalHours(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Used to calculate your weekly progress gauge on the dashboard.
            </p>
          </div>
        </div>
      </form>

      {/* Appearance & Theme */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          {state.theme === 'dark' ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
          <span>Appearance & Color Theme</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => dispatch({ type: 'SET_THEME', payload: 'dark' })}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
              state.theme === 'dark'
                ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Moon className="w-5 h-5" />
            <span className="text-xs">Dark Charcoal (Default)</span>
          </button>

          <button
            onClick={() => dispatch({ type: 'SET_THEME', payload: 'light' })}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
              state.theme === 'light'
                ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-5 h-5" />
            <span className="text-xs">Crisp Light Theme</span>
          </button>
        </div>
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-red-500/20 space-y-3">
        <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          <span>Local Progress Storage</span>
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Clear completed lesson checks, study days, and quiz history from this browser. This does not remove built-in courses.
        </p>

        <button
          onClick={handleResetProgress}
          className="px-4 py-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-colors"
        >
          Reset Learning History
        </button>
      </div>
    </div>
  );
}
