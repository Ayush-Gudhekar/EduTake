// src/pages/CourseDetailPage.jsx
import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Clock, 
  Star, 
  Users, 
  BookOpen, 
  Layers, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  const course = state.courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="py-20 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Course Not Found</h2>
        <p className="text-slate-400 text-sm">The course with ID "{courseId}" does not exist in the curriculum.</p>
        <Link to="/courses" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const allLessons = course.modules.flatMap(m => m.lessons);
  const completedLessonsCount = allLessons.filter(l => state.completedLessons?.[l.id]).length;
  const progressPercent = allLessons.length > 0 ? Math.round((completedLessonsCount / allLessons.length) * 100) : 0;
  const firstLesson = allLessons[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </button>
      </div>

      {/* Course Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col lg:flex-row gap-8 justify-between items-start">
        <div className="space-y-4 max-w-2xl">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {course.category}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {course.level}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{course.rating}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-6 text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>{course.duration} Total Content</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>{allLessons.length} Comprehensive Lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400" />
              <span>{course.students} Learners Enrolled</span>
            </div>
          </div>
        </div>

        {/* Action card */}
        <div className="w-full lg:w-80 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 shrink-0 shadow-lg">
          <div className="rounded-xl overflow-hidden aspect-video bg-slate-800 relative">
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Overall Progress</span>
              <span className="font-bold text-slate-200">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              {completedLessonsCount} of {allLessons.length} lessons completed
            </p>
          </div>

          {firstLesson && (
            <Link
              to={`/learn/${course.id}/${firstLesson.id}`}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{progressPercent > 0 ? 'Resume Learning' : 'Start Course Now'}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Curriculum Syllabus Accordion / Tree */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Course Curriculum & Modules</h2>
        </div>

        <div className="space-y-4">
          {course.modules.map((module, mIdx) => (
            <div key={module.id || mIdx} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              <div className="p-4 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">{module.title}</h3>
                  <span className="text-[11px] text-slate-400">{module.lessons.length} Lessons</span>
                </div>
              </div>

              <div className="divide-y divide-slate-800/60">
                {module.lessons.map((lesson) => {
                  const isDone = !!state.completedLessons?.[lesson.id];
                  return (
                    <Link
                      key={lesson.id}
                      to={`/learn/${course.id}/${lesson.id}`}
                      className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${isDone ? 'text-slate-300' : 'text-slate-200'} group-hover:text-indigo-300 transition-colors`}>
                            {lesson.title}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{lesson.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">{lesson.duration}</span>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
