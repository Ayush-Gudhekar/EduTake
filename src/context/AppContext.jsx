// src/context/AppContext.jsx
import React, { createContext, useReducer, useEffect, useMemo } from 'react';
import { storage } from '../utils/storage';
import { initialCourses } from '../data/coursesData';
import { initialNotes } from '../data/notesData';
import { initialQuizzes } from '../data/quizzesData';

const defaultState = {
  theme: 'dark',
  profile: {
    name: 'Alex Developer',
    role: 'Computer Science Enthusiast',
    goalWeeklyHours: 12
  },
  courses: initialCourses,
  notes: initialNotes,
  quizzes: initialQuizzes,
  completedLessons: {}, // { [lessonId]: true }
  lastLesson: {
    courseId: 'cs-fundamentals',
    lessonId: 'pf-101',
    courseTitle: 'Programming Fundamentals & Problem Solving',
    lessonTitle: 'How Computers Execute Code'
  },
  lessonNotes: {}, // { [lessonId]: string }
  bookmarks: [
    {
      id: 'bm-1',
      courseId: 'dsa-mastery',
      lessonId: 'dsa-101',
      courseTitle: 'Data Structures & Algorithms',
      lessonTitle: 'Big-O Notation & Complexity Analysis',
      timestamp: 420,
      label: 'Crucial explanation of amortized O(1) time',
      createdAt: '2026-10-18'
    }
  ],
  quizHistory: [
    {
      id: 'qh-1',
      quizId: 'quiz-programming-core',
      quizTitle: 'Programming Fundamentals & Memory Diagnostics',
      score: 3,
      totalQuestions: 3,
      percentage: 100,
      date: '2026-10-19'
    }
  ],
  plannerTasks: [
    {
      id: 't-1',
      title: 'Complete DSA Module 1 & solve Two Sum with two pointers',
      dueDate: '2026-10-23',
      priority: 'High',
      completed: false
    },
    {
      id: 't-2',
      title: 'Review DBMS ACID Properties & write summary note',
      dueDate: '2026-10-24',
      priority: 'Medium',
      completed: true
    },
    {
      id: 't-3',
      title: 'Take Computer Networks Practice Quiz',
      dueDate: '2026-10-25',
      priority: 'Low',
      completed: false
    }
  ],
  studyDays: ['2026-10-18', '2026-10-19', '2026-10-20', '2026-10-21'],
  commandPaletteOpen: false
};

export const AppContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'TOGGLE_THEME': {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      return { ...state, theme: nextTheme };
    }

    case 'SET_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.payload } };

    case 'TOGGLE_COMMAND_PALETTE':
      return { ...state, commandPaletteOpen: typeof action.payload === 'boolean' ? action.payload : !state.commandPaletteOpen };

    case 'MARK_LESSON_COMPLETE': {
      const today = new Date().toISOString().split('T')[0];
      const newDays = state.studyDays.includes(today) ? state.studyDays : [...state.studyDays, today];
      return {
        ...state,
        completedLessons: { ...state.completedLessons, [action.payload]: true },
        lastLesson: action.meta || state.lastLesson,
        studyDays: newDays
      };
    }

    case 'MARK_LESSON_INCOMPLETE': {
      const copy = { ...state.completedLessons };
      delete copy[action.payload];
      return { ...state, completedLessons: copy };
    }

    case 'SET_LAST_LESSON':
      return { ...state, lastLesson: action.payload };

    case 'SAVE_LESSON_NOTE':
      return {
        ...state,
        lessonNotes: {
          ...state.lessonNotes,
          [action.payload.lessonId]: action.payload.content
        }
      };

    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: [
          action.payload,
          ...state.bookmarks.filter(b => b.id !== action.payload.id)
        ]
      };

    case 'DELETE_BOOKMARK':
      return {
        ...state,
        bookmarks: state.bookmarks.filter(b => b.id !== action.payload)
      };

    case 'SAVE_QUIZ_RESULT':
      return {
        ...state,
        quizHistory: [action.payload, ...state.quizHistory]
      };

    case 'ADD_PLANNER_TASK':
      return {
        ...state,
        plannerTasks: [action.payload, ...state.plannerTasks]
      };

    case 'TOGGLE_PLANNER_TASK':
      return {
        ...state,
        plannerTasks: state.plannerTasks.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        )
      };

    case 'DELETE_PLANNER_TASK':
      return {
        ...state,
        plannerTasks: state.plannerTasks.filter(t => t.id !== action.payload)
      };

    // Note actions
    case 'SAVE_CUSTOM_NOTE': {
      const existing = state.notes.findIndex(n => n.id === action.payload.id);
      if (existing >= 0) {
        const updated = [...state.notes];
        updated[existing] = action.payload;
        return { ...state, notes: updated };
      }
      return { ...state, notes: [action.payload, ...state.notes] };
    }

    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(n => n.id !== action.payload)
      };

    // Admin Course Management
    case 'SAVE_COURSE': {
      const existing = state.courses.findIndex(c => c.id === action.payload.id);
      if (existing >= 0) {
        const updated = [...state.courses];
        updated[existing] = action.payload;
        return { ...state, courses: updated };
      }
      return { ...state, courses: [...state.courses, action.payload] };
    }

    case 'DELETE_COURSE':
      return {
        ...state,
        courses: state.courses.filter(c => c.id !== action.payload)
      };

    case 'RESET_ALL_DATA':
      return {
        ...defaultState,
        courses: initialCourses,
        notes: initialNotes,
        quizzes: initialQuizzes
      };

    case 'IMPORT_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState, (init) => {
    const saved = storage.get('edutake_app_state_v2') || storage.get('codeverse_app_state_v2');
    if (!saved) return init;
    return {
      ...init,
      ...saved,
      courses: saved.courses && saved.courses.length > 0 ? saved.courses : initialCourses,
      notes: saved.notes && saved.notes.length > 0 ? saved.notes : initialNotes,
      quizzes: saved.quizzes && saved.quizzes.length > 0 ? saved.quizzes : initialQuizzes
    };
  });

  useEffect(() => {
    storage.set('edutake_app_state_v2', state);
    if (typeof document !== 'undefined') {
      const isLight = state.theme === 'light';
      document.documentElement.classList.toggle('light', isLight);
      document.documentElement.classList.toggle('dark', !isLight);
    }
  }, [state]);

  // Streak calculation helper
  const streak = useMemo(() => {
    if (!state.studyDays || state.studyDays.length === 0) return 0;
    const sorted = [...new Set(state.studyDays)].sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // If neither today nor yesterday has activity, streak is 0
    if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

    let count = 0;
    let curr = new Date(sorted[0]);

    for (let i = 0; i < sorted.length; i++) {
      const dayStr = sorted[i];
      const expected = curr.toISOString().split('T')[0];
      if (dayStr === expected) {
        count++;
        curr.setDate(curr.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  }, [state.studyDays]);

  return (
    <AppContext.Provider value={{ state, dispatch, streak }}>
      {children}
    </AppContext.Provider>
  );
}
