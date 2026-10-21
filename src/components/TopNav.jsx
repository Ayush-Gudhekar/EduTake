// src/components/TopNav.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Sun, Moon, Search, Menu, Play, Bell, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopNav({ onMenuToggle }) {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const handleResume = () => {
    if (state.lastLesson) {
      navigate(`/learn/${state.lastLesson.courseId}/${state.lastLesson.lessonId}`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <header className="h-16 px-4 sm:px-6 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile hamburger & Command Palette search trigger */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global search trigger */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_COMMAND_PALETTE', payload: true })}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all text-xs group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="truncate">Search lessons, notes, algorithms...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-slate-900 border border-slate-700 rounded text-slate-400">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Resume button */}
        {state.lastLesson && (
          <button
            onClick={handleResume}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-colors"
            title={`Resume: ${state.lastLesson.lessonTitle}`}
          >
            <Play className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
            <span className="max-w-[150px] truncate">Resume: {state.lastLesson.lessonTitle}</span>
          </button>
        )}

        {/* Dark/Light mode toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-700/60 bg-slate-800/60 text-slate-300 hover:text-white hover:border-slate-600 transition-all text-xs"
          title={`Switch to ${state.theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle theme"
        >
          {state.theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline font-medium">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline font-medium text-slate-700">Dark</span>
            </>
          )}
        </button>

        {/* User avatar / profile shortcut */}
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 pl-2 border-l border-slate-800"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-500/20">
            {state.profile?.name?.[0] || 'U'}
          </div>
        </button>
      </div>
    </header>
  );
}
