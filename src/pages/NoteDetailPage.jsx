// src/pages/NoteDetailPage.jsx
import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  ArrowLeft, 
  Edit3, 
  Clock, 
  Share2, 
  Check, 
  Trash2, 
  BookOpen, 
  Tag 
} from 'lucide-react';

export default function NoteDetailPage() {
  const { noteId } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const note = state.notes.find(n => n.id === noteId);

  if (!note) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Note not found</h2>
        <p className="text-slate-400 text-sm">Could not find note matching ID "{noteId}"</p>
        <Link to="/notes" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
          Return to Notes
        </Link>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      dispatch({ type: 'DELETE_NOTE', payload: note.id });
      navigate('/notes');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/notes')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notes</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs inline-flex items-center gap-1.5"
            title="Copy link to note"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
          </button>

          <Link
            to={`/notes/${note.id}/edit`}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Note</span>
          </Link>

          <button
            onClick={handleDelete}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-red-400 text-xs"
            title="Delete note"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Note Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {note.subject}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {note.readTime || '5 min read'}
          </span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-400">Last updated: {note.updatedAt || 'Recent'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {note.title}
        </h1>

        {note.summary && (
          <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-indigo-500 pl-3">
            {note.summary}
          </p>
        )}

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {note.tags.map((t, idx) => (
              <span key={idx} className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Note Body Content */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed space-y-4">
        <div className="prose prose-invert max-w-none whitespace-pre-wrap font-sans text-sm sm:text-base">
          {note.content}
        </div>
      </div>
    </div>
  );
}
