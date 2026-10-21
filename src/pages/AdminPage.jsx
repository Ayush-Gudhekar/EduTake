// src/pages/AdminPage.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw, 
  BookOpen, 
  Video, 
  Layers, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function AdminPage() {
  const { state, dispatch } = useContext(AppContext);

  // New Course Form state
  const [courseTitle, setCourseTitle] = useState('');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner');
  const [duration, setDuration] = useState('10 Hours');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60');

  // First module & lesson initial inputs
  const [moduleTitle, setModuleTitle] = useState('Module 1: Foundations');
  const [lessonTitle, setLessonTitle] = useState('Introduction & Overview');
  const [lessonDuration, setLessonDuration] = useState('15m');
  const [videoId, setVideoId] = useState('AkFi90lZmXA');

  const [feedback, setFeedback] = useState(null);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!courseTitle.trim() || !lessonTitle.trim()) {
      setFeedback({ type: 'error', text: 'Please fill in required course and lesson titles.' });
      return;
    }

    const newCourseId = `course-${Date.now()}`;
    const newCourse = {
      id: newCourseId,
      title: courseTitle.trim(),
      category,
      level,
      duration: duration.trim(),
      description: description.trim() || 'Comprehensive computer science course module.',
      thumbnail: thumbnail.trim(),
      rating: 4.9,
      students: '1.2k',
      modules: [
        {
          id: `mod-${Date.now()}`,
          title: moduleTitle.trim(),
          lessons: [
            {
              id: `les-${Date.now()}`,
              title: lessonTitle.trim(),
              duration: lessonDuration.trim(),
              videoId: videoId.trim(),
              objectives: ['Understand core topic fundamentals', 'Practical hands-on implementation'],
              description: 'Introductory lesson with key takeaways.'
            }
          ]
        }
      ]
    };

    dispatch({ type: 'SAVE_COURSE', payload: newCourse });
    setFeedback({ type: 'success', text: `Course "${newCourse.title}" successfully created!` });

    // Reset inputs
    setCourseTitle('');
    setDescription('');
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleExportJSON = () => {
    const exportData = {
      courses: state.courses,
      notes: state.notes,
      quizzes: state.quizzes,
      version: '2.0.0',
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edutake_curriculum_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.courses && Array.isArray(parsed.courses)) {
          dispatch({
            type: 'IMPORT_STATE',
            payload: {
              courses: parsed.courses,
              notes: parsed.notes || state.notes,
              quizzes: parsed.quizzes || state.quizzes
            }
          });
          setFeedback({ type: 'success', text: 'Curriculum JSON successfully imported!' });
        } else {
          setFeedback({ type: 'error', text: 'Invalid JSON schema: missing courses array.' });
        }
      } catch (err) {
        setFeedback({ type: 'error', text: 'Failed to parse JSON file.' });
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to restore the curriculum and state to original defaults?')) {
      dispatch({ type: 'RESET_ALL_DATA' });
      setFeedback({ type: 'success', text: 'Curriculum reset to defaults.' });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-200 leading-relaxed">
          <strong className="text-white">Local Content Management Studio:</strong> This is a browser-side demonstration content editor. All modifications persist to your browser's LocalStorage and instantaneously update the active Course Catalog, Learning Room, and Notes Library.
        </div>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
          feedback.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* JSON Import/Export & Reset strip */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Curriculum Backup & Migration</h2>
          <p className="text-xs text-slate-400 mt-0.5">Export courses and quizzes as JSON, or import custom datasets.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export JSON</span>
          </button>

          <label className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={handleResetData}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Add New Course Form */}
      <form onSubmit={handleAddCourse} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white">Create New Curriculum Course</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Course Title *
            </label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g. Distributed Systems & Consensus Algorithms"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
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
                Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 18 Hours"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Detailed syllabus overview..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Cover Thumbnail URL
            </label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Initial Lesson */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Initial Module & Lesson Setup
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                placeholder="Module Title"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="text"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Lesson Title *"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                required
              />
              <input
                type="text"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                placeholder="YouTube Video ID (e.g. AkFi90lZmXA)"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
              <input
                type="text"
                value={lessonDuration}
                onChange={(e) => setLessonDuration(e.target.value)}
                placeholder="Duration (e.g. 20m)"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all"
        >
          Add Course to Catalog
        </button>
      </form>

      {/* Existing Courses List & Deletion */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Active Catalog Courses ({state.courses.length})</h2>

        <div className="space-y-2">
          {state.courses.map((course) => (
            <div
              key={course.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-sm font-bold text-white">{course.title}</h3>
                <span className="text-xs text-slate-400">
                  {course.category} • {course.level} • {course.modules?.length || 0} Modules
                </span>
              </div>

              <button
                onClick={() => dispatch({ type: 'DELETE_COURSE', payload: course.id })}
                className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                title="Delete course"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
