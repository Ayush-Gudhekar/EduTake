// src/components/Sidebar.jsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Home, 
  BookOpen, 
  GraduationCap, 
  HelpCircle, 
  Calendar, 
  Bookmark, 
  FileText, 
  Settings, 
  ShieldCheck, 
  Flame,
  Code2,
  X
} from 'lucide-react';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { state, streak } = useContext(AppContext);

  const completedCount = Object.keys(state.completedLessons || {}).length;

  const navSections = [
    {
      title: 'LEARNING',
      links: [
        { to: '/', label: 'Dashboard', icon: Home, end: true },
        { to: '/courses', label: 'Course Catalog', icon: BookOpen, badge: state.courses.length },
        { to: '/my-learning', label: 'My Progress', icon: GraduationCap, badge: completedCount > 0 ? `${completedCount}` : null },
        { to: '/quizzes', label: 'Quizzes', icon: HelpCircle },
      ]
    },
    {
      title: 'WORKSPACE',
      links: [
        { to: '/notes', label: 'Notes Library', icon: FileText, badge: state.notes.length },
        { to: '/planner', label: 'Study Planner', icon: Calendar, badge: state.plannerTasks.filter(t => !t.completed).length || null },
        { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark, badge: state.bookmarks.length || null },
      ]
    },
    {
      title: 'SYSTEM',
      links: [
        { to: '/admin', label: 'Local Studio (Admin)', icon: ShieldCheck },
        { to: '/settings', label: 'Preferences', icon: Settings },
      ]
    }
  ];

  const content = (
    <div className="h-full flex flex-col justify-between py-4 px-3 bg-slate-900 border-r border-slate-800 text-slate-300 select-none">
      {/* Brand header */}
      <div>
        <div className="flex items-center justify-between px-2 mb-6">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-white tracking-tight">EduTake</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">PRO</span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5">Learn • Build • Master</p>
            </div>
          </NavLink>

          {mobileOpen && (
            <button 
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Streak banner */}
        <div className="mb-5 mx-1 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/20 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
            <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-semibold text-amber-300">
              {streak} Day {streak === 1 ? 'Streak' : 'Streak'}
            </div>
            <p className="text-[11px] text-slate-400">Study today to keep it active!</p>
          </div>
        </div>

        {/* Navigation links */}
        <div className="space-y-5">
          {navSections.map((section, sIdx) => (
            <div key={sIdx}>
              <div className="px-3 mb-1.5 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.end}
                      onClick={() => setMobileOpen && setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{link.label}</span>
                      </div>
                      {link.badge && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                          {link.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User micro-card at bottom */}
      <div className="pt-3 border-t border-slate-800/80">
        <NavLink 
          to="/settings"
          onClick={() => setMobileOpen && setMobileOpen(false)}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/60 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-indigo-500/30 shrink-0">
            {state.profile?.name?.[0] || 'A'}
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-slate-200 truncate">{state.profile?.name || 'Developer'}</p>
            <p className="text-[11px] text-slate-400 truncate">{state.profile?.role || 'CS Student'}</p>
          </div>
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop permanent sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-slate-800 bg-slate-900 h-screen sticky top-0 z-30">
        {content}
      </aside>

      {/* Mobile slide-over drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileOpen(false)} 
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
