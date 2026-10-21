// src/constants/routes.js
export const routes = {
  home: '/',
  courses: '/courses',
  courseDetail: (courseId) => `/courses/${courseId}`,
  learn: (courseId, lessonId) => `/learn/${courseId}/${lessonId}`,
  myLearning: '/my-learning',
  notes: '/notes',
  noteDetail: (noteId) => `/notes/${noteId}`,
  notesEditor: (noteId) => `/notes/${noteId}/edit`,
  quizzes: '/quizzes',
  quizDetail: (quizId) => `/quizzes/${quizId}`,
  planner: '/planner',
  bookmarks: '/bookmarks',
  roadmaps: '/roadmaps',
  achievements: '/achievements',
  settings: '/settings',
  admin: '/admin',
};
