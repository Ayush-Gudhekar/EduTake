// src/pages/LearnPage.jsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Bookmark, 
  FileText, 
  List, 
  HelpCircle, 
  ExternalLink, 
  Save, 
  Trash2, 
  Clock,
  Sparkles,
  Keyboard
} from 'lucide-react';

export default function LearnPage() {
  const { courseId, lessonId } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'objectives' | 'bookmarks' | 'shortcuts'
  const [focusMode, setFocusMode] = useState(false);
  const [personalNote, setPersonalNote] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [bookmarkLabel, setBookmarkLabel] = useState('');
  const [videoTimestamp, setVideoTimestamp] = useState(0);

  // Find course and lesson
  const course = state.courses.find(c => c.id === courseId);
  const allLessons = course ? course.modules.flatMap(m => m.lessons) : [];
  const currentLessonIndex = allLessons.findIndex(l => l.id === lessonId);
  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const isCompleted = !!state.completedLessons?.[currentLesson?.id];

  // Update lastLesson on visit
  useEffect(() => {
    if (course && currentLesson) {
      dispatch({
        type: 'SET_LAST_LESSON',
        payload: {
          courseId: course.id,
          lessonId: currentLesson.id,
          courseTitle: course.title,
          lessonTitle: currentLesson.title
        }
      });
    }
  }, [courseId, lessonId, course, currentLesson, dispatch]);

  // Load existing personal note
  useEffect(() => {
    if (currentLesson) {
      setPersonalNote(state.lessonNotes?.[currentLesson.id] || '');
    }
  }, [currentLesson?.id, state.lessonNotes]);

  // Keyboard shortcuts handler (ignores if typing in input/textarea)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'n' || e.key === 'N') {
        if (nextLesson) navigate(`/learn/${course.id}/${nextLesson.id}`);
      } else if (e.key === 'p' || e.key === 'P') {
        if (prevLesson) navigate(`/learn/${course.id}/${prevLesson.id}`);
      } else if (e.key === 'm' || e.key === 'M') {
        toggleComplete();
      } else if (e.key === 'f' || e.key === 'F') {
        setFocusMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextLesson, prevLesson, course, isCompleted]);

  if (!course || !currentLesson) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Lesson not found</h2>
        <p className="text-slate-400 text-sm">Could not find lesson matching ID "{lessonId}"</p>
        <Link to="/courses" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
          Back to Courses
        </Link>
      </div>
    );
  }

  const toggleComplete = () => {
    if (isCompleted) {
      dispatch({ type: 'MARK_LESSON_INCOMPLETE', payload: currentLesson.id });
    } else {
      dispatch({ 
        type: 'MARK_LESSON_COMPLETE', 
        payload: currentLesson.id,
        meta: {
          courseId: course.id,
          lessonId: currentLesson.id,
          courseTitle: course.title,
          lessonTitle: currentLesson.title
        }
      });
    }
  };

  const handleSaveNote = () => {
    dispatch({
      type: 'SAVE_LESSON_NOTE',
      payload: { lessonId: currentLesson.id, content: personalNote }
    });
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  const handleAddBookmark = (e) => {
    e.preventDefault();
    if (!bookmarkLabel.trim()) return;

    dispatch({
      type: 'ADD_BOOKMARK',
      payload: {
        id: `bm-${Date.now()}`,
        courseId: course.id,
        lessonId: currentLesson.id,
        courseTitle: course.title,
        lessonTitle: currentLesson.title,
        timestamp: videoTimestamp,
        label: bookmarkLabel.trim(),
        createdAt: new Date().toISOString().split('T')[0]
      }
    });
    setBookmarkLabel('');
  };

  const completedCount = allLessons.filter(l => state.completedLessons?.[l.id]).length;
  const progressPercent = Math.round((completedCount / allLessons.length) * 100);

  // Lesson bookmarks
  const lessonBookmarks = state.bookmarks?.filter(b => b.lessonId === currentLesson.id) || [];

  return (
    <div className={`space-y-6 ${focusMode ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto' : 'animate-in fade-in duration-200'}`}>
      {/* Top Header / Navigation Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to={`/courses/${course.id}`}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Return to syllabus"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-indigo-400">{course.title}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Lesson {currentLessonIndex + 1} of {allLessons.length}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white mt-0.5">{currentLesson.title}</h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mark Complete Button */}
          <button
            onClick={toggleComplete}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              isCompleted 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>

          {/* Focus Mode Toggle */}
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`p-2 rounded-xl border transition-colors ${
              focusMode
                ? 'bg-indigo-600 border-indigo-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title={focusMode ? 'Exit Focus Mode (F)' : 'Enter Focus Mode (F)'}
          >
            {focusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Grid: Video Player + Course Playlist Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Responsive Video Player + Bottom Workspace */}
        <div className="lg:col-span-2 space-y-4">
          {/* Responsive YouTube Embed Container */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            {currentLesson.videoId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentLesson.videoId}?rel=0&modestbranding=1`}
                title={currentLesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400">
                <p className="text-sm">Video source currently unavailable.</p>
              </div>
            )}
          </div>

          {/* Video fallback and external link notice */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Duration: {currentLesson.duration}
            </span>
            {currentLesson.videoId && (
              <a
                href={`https://www.youtube.com/watch?v=${currentLesson.videoId}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Previous / Next Lesson Bar */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
            {prevLesson ? (
              <Link
                to={`/learn/${course.id}/${prevLesson.id}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Previous: {prevLesson.title}</span>
                <span className="sm:hidden">Prev</span>
              </Link>
            ) : <div />}

            {nextLesson ? (
              <Link
                to={`/learn/${course.id}/${nextLesson.id}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
              >
                <span className="hidden sm:inline">Next: {nextLesson.title}</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <span className="text-xs text-emerald-400 font-semibold px-3 py-1">
                🎉 Course Complete!
              </span>
            )}
          </div>

          {/* Interactive Lesson Tabs Workspace */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-slate-800 bg-slate-900/60 px-3 pt-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-colors ${
                  activeTab === 'notes'
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>My Lecture Notes</span>
              </button>

              <button
                onClick={() => setActiveTab('objectives')}
                className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-colors ${
                  activeTab === 'objectives'
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Objectives & Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-colors ${
                  activeTab === 'bookmarks'
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-purple-400" />
                <span>Bookmarks ({lessonBookmarks.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('shortcuts')}
                className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-colors ${
                  activeTab === 'shortcuts'
                    ? 'border-indigo-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Keyboard className="w-3.5 h-3.5 text-slate-400" />
                <span>Shortcuts</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-5">
              {activeTab === 'notes' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                      Personal notes auto-saved to your local browser storage.
                    </p>
                    <button
                      onClick={handleSaveNote}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{noteSavedFeedback ? 'Saved ✓' : 'Save Notes'}</span>
                    </button>
                  </div>

                  <textarea
                    value={personalNote}
                    onChange={(e) => setPersonalNote(e.target.value)}
                    rows={6}
                    placeholder="Jot down key algorithmic invariants, formulas, thoughts, or questions while watching..."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              {activeTab === 'objectives' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Lesson Summary
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentLesson.description}
                    </p>
                  </div>

                  {currentLesson.objectives?.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Key Learning Takeaways
                      </h3>
                      <ul className="space-y-1.5">
                        {currentLesson.objectives.map((obj, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'bookmarks' && (
                <div className="space-y-4">
                  {/* Add Bookmark form */}
                  <form onSubmit={handleAddBookmark} className="flex gap-2">
                    <input
                      type="text"
                      value={bookmarkLabel}
                      onChange={(e) => setBookmarkLabel(e.target.value)}
                      placeholder="Add a timestamp note or bookmark label..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      disabled={!bookmarkLabel.trim()}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold"
                    >
                      Save Bookmark
                    </button>
                  </form>

                  {/* List of bookmarks */}
                  {lessonBookmarks.length === 0 ? (
                    <p className="text-xs text-slate-500 italic py-2">No bookmarks saved for this lesson yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {lessonBookmarks.map((bm) => (
                        <div key={bm.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-slate-200">{bm.label}</p>
                            <span className="text-[10px] text-slate-500">Saved on {bm.createdAt}</span>
                          </div>
                          <button
                            onClick={() => dispatch({ type: 'DELETE_BOOKMARK', payload: bm.id })}
                            className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'shortcuts' && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">Next Lesson</span>
                    <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-400 font-mono">N</kbd>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">Previous Lesson</span>
                    <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-400 font-mono">P</kbd>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">Mark Complete</span>
                    <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-400 font-mono">M</kbd>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">Toggle Focus Mode</span>
                    <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-400 font-mono">F</kbd>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Playlist & Module Syllabus Navigation */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Course Progress</span>
              <span className="text-xs font-bold text-indigo-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              {completedCount} of {allLessons.length} lessons completed
            </p>
          </div>

          {/* Module Lessons Accordion list */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden divide-y divide-slate-800">
            <div className="p-3.5 bg-slate-900/90 font-bold text-xs text-slate-300 flex items-center gap-2">
              <List className="w-4 h-4 text-indigo-400" />
              <span>Lessons Playlist</span>
            </div>

            <div className="max-h-[600px] overflow-y-auto divide-y divide-slate-800/60">
              {course.modules.map((module) => (
                <div key={module.id} className="p-2">
                  <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {module.title}
                  </div>
                  <div className="space-y-1 mt-1">
                    {module.lessons.map((lesson) => {
                      const isCurrent = lesson.id === currentLesson.id;
                      const done = !!state.completedLessons?.[lesson.id];

                      return (
                        <Link
                          key={lesson.id}
                          to={`/learn/${course.id}/${lesson.id}`}
                          className={`p-2.5 rounded-xl flex items-center justify-between text-xs transition-colors ${
                            isCurrent
                              ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                              : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {done ? (
                              <CheckCircle2 className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-white' : 'text-emerald-400'}`} />
                            ) : (
                              <Circle className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-indigo-200' : 'text-slate-600'}`} />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className={`text-[10px] shrink-0 ml-2 ${isCurrent ? 'text-indigo-200' : 'text-slate-500'}`}>
                            {lesson.duration}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
