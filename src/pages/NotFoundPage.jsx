// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, BookOpen } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="py-24 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-xl">
        <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '8s' }} />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">404 Error</span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Endpoint Not Found</h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          The requested route doesn't exist or may have been reorganized. Use the navigation below to jump back into the platform.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span>Explore Courses</span>
        </Link>
      </div>
    </div>
  );
}
