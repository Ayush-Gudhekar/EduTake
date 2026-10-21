// src/pages/NotesPage.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FileText, Search, Plus, Filter, Clock, Tag, ArrowRight } from 'lucide-react';

export default function NotesPage() {
  const { state } = useContext(AppContext);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [search, setSearch] = useState('');

  const subjects = ['All', 'Programming', 'DSA', 'DBMS', 'Operating Systems', 'Computer Networks'];

  const filteredNotes = state.notes.filter(note => {
    const matchSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    const matchSearch = note.title.toLowerCase().includes(search.toLowerCase()) ||
                        (note.summary && note.summary.toLowerCase().includes(search.toLowerCase()));
    return matchSubject && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Computer Science Notes & Cheat Sheets</h1>
          <p className="text-sm text-slate-400 mt-1">
            Curated high-yield conceptual summaries, complexity references, and system design notes.
          </p>
        </div>

        <Link
          to="/notes/new/edit"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </Link>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes by title, topic, or keyword..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Subject:
          </span>
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
                selectedSubject === sub
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-base font-semibold">No notes found matching your criteria</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {note.subject}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {note.readTime || '5 min'}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base leading-snug">
                  <Link to={`/notes/${note.id}`} className="hover:text-indigo-400 transition-colors">
                    {note.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {note.summary || note.content?.slice(0, 140) + '...'}
                </p>

                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {note.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Updated {note.updatedAt || 'Recent'}</span>
                <Link
                  to={`/notes/${note.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  <span>Read Note</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
