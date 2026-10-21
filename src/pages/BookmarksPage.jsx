// src/pages/BookmarksPage.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Bookmark, Play, Trash2, Clock, BookOpen, ArrowRight } from 'lucide-react';

export default function BookmarksPage() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Saved Lesson Bookmarks</h1>
        <p className="text-sm text-slate-400 mt-1">
          Review timestamped highlights, important conceptual explanations, and saved lecture bookmarks.
        </p>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {state.bookmarks.length === 0 ? (
          <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400">
            <Bookmark className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold">No bookmarks saved yet</p>
            <p className="text-xs text-slate-500 mt-1">
              While learning in any lesson room, use the "Bookmarks" tab to save timestamps for quick review.
            </p>
            <Link
              to="/courses"
              className="mt-4 inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          state.bookmarks.map((bm) => (
            <div
              key={bm.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    {bm.courseTitle}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Saved on {bm.createdAt}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mt-1">
                  {bm.lessonTitle}
                </h3>

                <p className="text-xs text-slate-300 italic">
                  "{bm.label}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/learn/${bm.courseId}/${bm.lessonId}`}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Resume Lesson</span>
                </Link>

                <button
                  onClick={() => dispatch({ type: 'DELETE_BOOKMARK', payload: bm.id })}
                  className="p-2 text-slate-500 hover:text-red-400 rounded-xl hover:bg-slate-800 transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
