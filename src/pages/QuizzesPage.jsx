// src/pages/QuizzesPage.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { HelpCircle, Clock, Award, CheckCircle, ArrowRight, Filter, Search } from 'lucide-react';

export default function QuizzesPage() {
  const { state } = useContext(AppContext);
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Programming', 'DSA', 'DBMS', 'Operating Systems', 'Computer Networks'];

  const filteredQuizzes = state.quizzes.filter(q => {
    const matchCat = selectedCat === 'All' || q.category === selectedCat;
    const matchSearch = q.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Interactive Knowledge Quizzes</h1>
        <p className="text-sm text-slate-400 mt-1">
          Validate your computer science proficiency with verified diagnostic MCQs, time-boxed tests, and in-depth explanations.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quizzes by topic..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Domain:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
                selectedCat === cat
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quizzes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => {
          // Check if user has taken this quiz before
          const pastAttempts = state.quizHistory?.filter(h => h.quizId === quiz.id) || [];
          const bestScore = pastAttempts.length > 0
            ? Math.max(...pastAttempts.map(h => h.percentage))
            : null;

          return (
            <div
              key={quiz.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {quiz.category}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {quiz.difficulty}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base leading-snug">{quiz.title}</h3>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{quiz.questions.length} MCQs</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{quiz.timeLimitMinutes} Mins</span>
                  </span>
                </div>

                {bestScore !== null && (
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Personal Best:</span>
                    <span className={`font-bold ${bestScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {bestScore}%
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800">
                <Link
                  to={`/quizzes/${quiz.id}`}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 transition-all"
                >
                  <span>{bestScore !== null ? 'Retake Quiz' : 'Start Assessment'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
