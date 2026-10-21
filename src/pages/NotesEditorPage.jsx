// src/pages/NotesEditorPage.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ArrowLeft, Save, X } from 'lucide-react';

export default function NotesEditorPage() {
  const { noteId } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const isNew = noteId === 'new';
  const existingNote = state.notes.find(n => n.id === noteId);

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Programming');
  const [readTime, setReadTime] = useState('5 min read');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (existingNote && !isNew) {
      setTitle(existingNote.title || '');
      setSubject(existingNote.subject || 'Programming');
      setReadTime(existingNote.readTime || '5 min read');
      setSummary(existingNote.summary || '');
      setContent(existingNote.content || '');
      setTags(existingNote.tags?.join(', ') || '');
    }
  }, [existingNote, isNew]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const id = isNew ? `note-${Date.now()}` : noteId;
    const noteObj = {
      id,
      title: title.trim(),
      subject,
      readTime: readTime.trim() || '5 min read',
      summary: summary.trim(),
      content: content.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      updatedAt: new Date().toISOString().split('T')[0]
    };

    dispatch({ type: 'SAVE_CUSTOM_NOTE', payload: noteObj });
    navigate(`/notes/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel & Back</span>
        </button>

        <h1 className="text-base font-bold text-white">
          {isNew ? 'Create New Revision Note' : 'Edit Revision Note'}
        </h1>

        <button
          onClick={handleSave}
          disabled={!title.trim()}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Note</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Note Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Asymptotic Complexity & Two-Pointer Patterns"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Subject Domain
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="Programming">Programming</option>
              <option value="DSA">DSA</option>
              <option value="DBMS">DBMS</option>
              <option value="Operating Systems">Operating Systems</option>
              <option value="Computer Networks">Computer Networks</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Estimated Read Time
            </label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="e.g. 8 min read"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Short Summary
          </label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="A quick 1-2 sentence overview of key points covered in this note"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. Big-O, Sorting, Heap, Trees"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Content (Supports Markdown format)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            placeholder="# Note Heading&#10;&#10;Key observations and formulas...&#10;&#10;### Section 1&#10;- Point A&#10;- Point B"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
      </form>
    </div>
  );
}
