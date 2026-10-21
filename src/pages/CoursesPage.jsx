// src/pages/CoursesPage.jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Search, BookOpen, Clock, Star, Users, Filter, CheckCircle2, Play } from 'lucide-react';

export default function CoursesPage() {
  const { state } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = ['All', 'Programming', 'DSA', 'DBMS', 'Operating Systems', 'Computer Networks'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = state.courses.filter(course => {
    const matchQuery = course.title.toLowerCase().includes(search.toLowerCase()) || 
                       course.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All' || course.category === selectedCategory;
    const matchLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchQuery && matchCat && matchLevel;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Computer Science Curriculum</h1>
        <p className="text-sm text-slate-400 mt-1">
          Explore structured curriculums designed to take you from foundational concepts to systems-level engineering.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, keyword, or course name..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Domain:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-base font-semibold">No courses match your filter</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting search filters or explore all domains</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedLevel('All'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredCourses.map((course) => {
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
                  <div className="relative h-44 overflow-hidden bg-slate-800">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/90 backdrop-blur-md text-indigo-300 border border-slate-700/50">
                        {course.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/90 backdrop-blur-md text-slate-300 border border-slate-700/50">
                        {course.level}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-900/90 text-amber-400 flex items-center gap-1 border border-slate-800">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                      <Link to={`/courses/${course.id}`}>{course.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{courseLessons.length} Lessons</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-3">
                  {/* Progress Indicator */}
                  {progress > 0 && (
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{courseCompleted} of {courseLessons.length} completed</span>
                        </span>
                        <span className="font-semibold text-slate-300">{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <Link
                      to={`/courses/${course.id}`}
                      className="flex-1 text-center py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                    >
                      Syllabus Details
                    </Link>

                    {firstLessonId && (
                      <Link
                        to={`/learn/${course.id}/${firstLessonId}`}
                        className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>{progress > 0 ? 'Resume' : 'Learn'}</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
