// src/pages/MyLearningPage.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Flame, 
  CheckCircle2, 
  Clock, 
  Award, 
  Play, 
  Calendar, 
  BookOpen, 
  TrendingUp,
  Target,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

export default function MyLearningPage() {
  const { state, streak } = useContext(AppContext);

  // Overall metric calculations
  const totalLessons = state.courses.reduce((acc, c) => 
    acc + c.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0), 0
  );
  const completedLessonsCount = Object.keys(state.completedLessons || {}).length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
  const hoursSpent = Math.round(completedLessonsCount * 0.5);

  // Recharts weekly activity dataset
  const activityData = [
    { day: 'Mon', lessons: 2, hours: 1.2 },
    { day: 'Tue', lessons: 3, hours: 1.8 },
    { day: 'Wed', lessons: 1, hours: 0.6 },
    { day: 'Thu', lessons: 4, hours: 2.4 },
    { day: 'Fri', lessons: 2, hours: 1.0 },
    { day: 'Sat', lessons: 5, hours: 3.1 },
    { day: 'Sun', lessons: completedLessonsCount > 0 ? 2 : 1, hours: 1.5 },
  ];

  // Courses with completion status
  const coursesWithProgress = state.courses.map(course => {
    const courseLessons = course.modules.flatMap(m => m.lessons);
    const completed = courseLessons.filter(l => state.completedLessons?.[l.id]).length;
    const pct = courseLessons.length > 0 ? Math.round((completed / courseLessons.length) * 100) : 0;
    return {
      ...course,
      totalLessons: courseLessons.length,
      completedLessons: completed,
      progress: pct,
      isFinished: pct === 100,
      firstLessonId: courseLessons[0]?.id
    };
  });

  const inProgressCourses = coursesWithProgress.filter(c => c.progress > 0 && !c.isFinished);
  const completedCourses = coursesWithProgress.filter(c => c.isFinished);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Personal Learning Progress</h1>
        <p className="text-sm text-slate-400 mt-1">
          Detailed metrics, daily streaks, activity timelines, and course completions.
        </p>
      </div>

      {/* Top 4 Metrics Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Flame className="w-5 h-5 fill-amber-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{streak} Days</div>
            <div className="text-xs text-slate-400">Continuous Streak</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{completedLessonsCount} / {totalLessons}</div>
            <div className="text-xs text-slate-400">Completed Lessons</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{hoursSpent} Hours</div>
            <div className="text-xs text-slate-400">Time Studied</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{overallProgress}%</div>
            <div className="text-xs text-slate-400">Overall Curriculum</div>
          </div>
        </div>
      </div>

      {/* Recharts Weekly Study Analytics & Learning Target */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Weekly Study Hours & Consistency</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Lessons completed across this current week</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Active Week
            </span>
          </div>

          <div className="h-60 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                />
                <Bar dataKey="lessons" name="Lessons Completed" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Goals Widget */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Weekly Goal Target</h2>
            </div>
            <p className="text-xs text-slate-400">
              Your weekly target: <strong>{state.profile?.goalWeeklyHours || 12} Hours</strong> of structured study.
            </p>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Progress this week</span>
                <span className="font-bold text-white">
                  {Math.min(hoursSpent, state.profile?.goalWeeklyHours || 12)} / {state.profile?.goalWeeklyHours || 12}h
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((hoursSpent / (state.profile?.goalWeeklyHours || 12)) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
            <span className="font-semibold text-slate-200">Study Streak Benefit</span>
            <p className="text-[11px] text-slate-400">
              Studying at least 15 minutes each day boosts long-term conceptual retention by 60%.
            </p>
          </div>
        </div>
      </div>

      {/* In-Progress Courses */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span>Active In-Progress Courses</span>
        </h2>

        {inProgressCourses.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400">
            <p className="text-sm font-medium">No in-progress courses right now.</p>
            <Link to="/courses" className="mt-3 inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressCourses.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-semibold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      {c.category}
                    </span>
                    <h3 className="font-bold text-white text-base mt-1">{c.title}</h3>
                  </div>
                  <span className="text-xs font-bold text-indigo-400 shrink-0">{c.progress}%</span>
                </div>

                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400">
                    {c.completedLessons} of {c.totalLessons} lessons finished
                  </span>
                  <Link
                    to={`/courses/${c.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Resume</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Courses & Certificates Showcase */}
      {completedCourses.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Mastered Courses & Certificates</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedCourses.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-950/40 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Curriculum Completed</span>
                </div>
                <h3 className="font-bold text-white text-sm">{c.title}</h3>
                <p className="text-xs text-slate-400">100% of lessons verified and mastered.</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz History Performance Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" />
          <span>Recent Quiz History</span>
        </h2>

        {state.quizHistory?.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-xs">
            No quiz attempts recorded yet. Visit the Quizzes section to test your knowledge!
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Quiz Topic</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Score</th>
                    <th className="p-3.5">Accuracy</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {state.quizHistory.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-medium text-white">{item.quizTitle}</td>
                      <td className="p-3.5 text-slate-400">{item.date}</td>
                      <td className="p-3.5 font-mono">{item.score} / {item.totalQuestions}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                          item.percentage >= 80 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {item.percentage}%
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          to={`/quizzes/${item.quizId}`}
                          className="text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                          Retake
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
