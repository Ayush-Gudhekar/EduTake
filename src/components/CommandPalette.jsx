// src/components/CommandPalette.jsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Search, BookOpen, FileText, CheckCircle, ArrowRight, X, Play } from 'lucide-react';

export default function CommandPalette() {
  const { state, dispatch } = useContext(AppContext);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_COMMAND_PALETTE' });
      }
      if (e.key === 'Escape' && state.commandPaletteOpen) {
        dispatch({ type: 'TOGGLE_COMMAND_PALETTE', payload: false });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.commandPaletteOpen, dispatch]);

  useEffect(() => {
    if (state.commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [state.commandPaletteOpen]);

  // Aggregate searchable items
  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const items = [];

    // Courses
    state.courses.forEach(course => {
      if (!q || course.title.toLowerCase().includes(q) || course.category.toLowerCase().includes(q)) {
        items.push({
          type: 'Course',
          title: course.title,
          subtitle: `${course.category} • ${course.level} • ${course.duration}`,
          url: `/courses/${course.id}`,
          icon: <BookOpen className="w-4 h-4 text-indigo-400" />
        });
      }
      // Lessons
      course.modules?.forEach(mod => {
        mod.lessons?.forEach(les => {
          if (!q || les.title.toLowerCase().includes(q) || course.title.toLowerCase().includes(q)) {
            items.push({
              type: 'Lesson',
              title: les.title,
              subtitle: `${course.title} • ${les.duration}`,
              url: `/learn/${course.id}/${les.id}`,
              icon: <Play className="w-4 h-4 text-emerald-400" />
            });
          }
        });
      });
    });

    // Notes
    state.notes.forEach(note => {
      if (!q || note.title.toLowerCase().includes(q) || note.subject.toLowerCase().includes(q)) {
        items.push({
          type: 'Note',
          title: note.title,
          subtitle: `${note.subject} • ${note.readTime}`,
          url: `/notes/${note.id}`,
          icon: <FileText className="w-4 h-4 text-amber-400" />
        });
      }
    });

    // Quizzes
    state.quizzes.forEach(quiz => {
      if (!q || quiz.title.toLowerCase().includes(q) || quiz.category.toLowerCase().includes(q)) {
        items.push({
          type: 'Quiz',
          title: quiz.title,
          subtitle: `${quiz.category} • ${quiz.difficulty} • ${quiz.questions.length} Questions`,
          url: `/quizzes/${quiz.id}`,
          icon: <CheckCircle className="w-4 h-4 text-purple-400" />
        });
      }
    });

    return items.slice(0, 10);
  }, [query, state.courses, state.notes, state.quizzes]);

  const handleSelect = (url) => {
    dispatch({ type: 'TOGGLE_COMMAND_PALETTE', payload: false });
    navigate(url);
  };

  const handleKeyNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % (results.length || 1));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex].url);
    }
  };

  if (!state.commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/90 gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyNavigation}
            placeholder="Search courses, lessons, notes, quizzes... (or press Esc to close)"
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-400 bg-slate-800 border border-slate-700 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "DSA", "SQL", "Big-O", or "Python"</p>
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item.url)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                  selectedIndex === idx 
                    ? 'bg-indigo-600/20 text-white border border-indigo-500/30' 
                    : 'text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/50 shrink-0">
                    {item.icon}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-slate-100 truncate">{item.title}</span>
                      <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${selectedIndex === idx ? 'translate-x-0.5 text-indigo-400' : 'text-slate-600'}`} />
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-indigo-400/80 font-medium">EduTake Quick Search</span>
        </div>
      </div>
    </div>
  );
}
