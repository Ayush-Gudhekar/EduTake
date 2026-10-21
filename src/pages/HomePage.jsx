// src/pages/HomePage.jsx
import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Play, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  Sparkles,
  TrendingUp,
  Compass
} from 'lucide-react';

export default function HomePage() {
  const { state, streak, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  // Metrics
  const completedCount = Object.keys(state.completedLessons || {}).length;
  const totalLessons = state.courses.reduce((acc, c) => 
    acc + c.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0), 0
  );
  const totalHours = Math.round(completedCount * 0.5);
  
  const avgQuizScore = state.quizHistory?.length > 0 
    ? Math.round(state.quizHistory.reduce((acc, q) => acc + (q.percentage || 0), 0) / state.quizHistory.length)
    : 85;

  // Find active course for lastLesson
  const activeCourse = state.courses.find(c => c.id === state.lastLesson?.courseId) || state.courses[0];
  const activeLesson = activeCourse?.modules
    .flatMap(m => m.lessons)
    .find(l => l.id === state.lastLesson?.lessonId) || activeCourse?.modules?.[0]?.lessons?.[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero / Banner with Resume action */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-semibold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Computer Science Learning Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Ready to learn, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{state.profile?.name || 'Engineer'}</span>?
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Continue your structured journey across core Computer Science subjects, algorithmic mastery, and systems engineering.
            </p>
          </div>

          {/* Quick Resume Card */}
          {activeCourse && activeLesson && (
            <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 p-4 rounded-2xl md:max-w-xs w-full shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-indigo-400 uppercase">
                  Continue Lesson
                </span>
                <h2 className="text-sm font-bold text-white mt-1 line-clamp-1">{activeLesson.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{activeCourse.title}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">{activeLesson.duration}</span>
                <Link
                  to={`/learn/${activeCourse.id}/${activeLesson.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-md shadow-indigo-600/30 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Resume</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4 Core App Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Flame className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{streak} Days</div>
            <div className="text-xs text-slate-400">Current Streak</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{completedCount} / {totalLessons}</div>
            <div className="text-xs text-slate-400">Lessons Mastered</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{totalHours}h+</div>
            <div className="text-xs text-slate-400">Time Invested</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{avgQuizScore}%</div>
            <div className="text-xs text-slate-400">Quiz Precision</div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Core Computer Science Catalog</h2>
            <p className="text-xs text-slate-400">Structured curriculums designed for modern developers</p>
          </div>
          <Link 
            to="/courses"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
          >
            <span>View all {state.courses.length} courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {state.courses.slice(0, 3).map((course) => {
            const courseLessons = course.modules.flatMap(m => m.lessons);
            const courseCompleted = courseLessons.filter(l => state.completedLessons?.[l.id]).length;
            const progress = courseLessons.length > 0 ? Math.round((courseCompleted / courseLessons.length) * 100) : 0;
            const firstLessonId = courseLessons[0]?.id;

            return (
              <div 
                key={course.id}
                className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-indigo-500/10"
              >
                <div>
                  <div className="relative h-40 overflow-hidden bg-slate-800">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/80 backdrop-blur-md text-indigo-300 border border-slate-700/50">
                        {course.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700/50">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-indigo-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 space-y-3">
                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Progress</span>
                      <span className="font-medium text-slate-200">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span className="text-xs text-slate-500">{courseLessons.length} Lessons • {course.duration}</span>
                    <Link
                      to={firstLessonId ? `/learn/${course.id}/${firstLessonId}` : `/courses/${course.id}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white transition-colors"
                    >
                      {progress > 0 ? 'Resume' : 'Start'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two columns: High-Yield Notes & Daily Quiz / Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revision Notes Library Preview */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">High-Yield Revision Notes</h2>
            </div>
            <Link to="/notes" className="text-xs text-indigo-400 hover:text-indigo-300">Browse all</Link>
          </div>

          <div className="space-y-2.5">
            {state.notes.slice(0, 3).map((note) => (
              <Link
                key={note.id}
                to={`/notes/${note.id}`}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/30 flex items-center justify-between group transition-colors"
              >
                <div>
                  <h3 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                    {note.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-medium text-amber-400/90">{note.subject}</span>
                    <span className="text-[10px] text-slate-500">•</span>
                    <span className="text-[10px] text-slate-400">{note.readTime}</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Study Planner Tasks & Daily Quiz Challenge */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Active Study Tasks</h2>
            </div>
            <Link to="/planner" className="text-xs text-indigo-400 hover:text-indigo-300">View Planner</Link>
          </div>

          <div className="space-y-2">
            {state.plannerTasks.slice(0, 3).map((task) => (
              <div 
                key={task.id}
                onClick={() => dispatch({ type: 'TOGGLE_PLANNER_TASK', payload: task.id })}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3 cursor-pointer hover:bg-slate-800/40 transition-colors"
              >
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  readOnly 
                  className="rounded text-indigo-600 focus:ring-0 w-4 h-4 bg-slate-800 border-slate-700 pointer-events-none"
                />
                <span className={`text-xs font-medium flex-1 ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                  {task.title}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                  task.priority === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/quizzes"
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Award className="w-4 h-4 text-indigo-400" />
              <span>Practice Today's Topic Quiz</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
