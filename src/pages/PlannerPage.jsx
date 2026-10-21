// src/pages/PlannerPage.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Calendar, Plus, CheckCircle2, Circle, Trash2, Clock, AlertTriangle } from 'lucide-react';

export default function PlannerPage() {
  const { state, dispatch } = useContext(AppContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    dispatch({
      type: 'ADD_PLANNER_TASK',
      payload: {
        id: `t-${Date.now()}`,
        title: taskTitle.trim(),
        dueDate: dueDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        priority,
        completed: false
      }
    });

    setTaskTitle('');
    setDueDate('');
  };

  const completedCount = state.plannerTasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Computer Science Study Planner</h1>
        <p className="text-sm text-slate-400 mt-1">
          Organize your curriculum milestones, algorithmic practice targets, and examination prep.
        </p>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Plus className="w-4 h-4 text-indigo-400" />
          <span>Add Study Goal or Task</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="e.g. Master Binary Search Trees & implement AVL rotations"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            required
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium</option>
            <option value="High">High Priority</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all shrink-0"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Progress status */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Completed <strong className="text-white">{completedCount}</strong> of <strong className="text-white">{state.plannerTasks.length}</strong> tasks
        </span>
        <span className="text-xs font-bold text-indigo-400">
          {state.plannerTasks.length > 0 ? Math.round((completedCount / state.plannerTasks.length) * 100) : 0}% Done
        </span>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {state.plannerTasks.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm">No study tasks planned yet. Add your first goal above!</p>
          </div>
        ) : (
          state.plannerTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                task.completed
                  ? 'bg-slate-950/60 border-slate-800/60 opacity-60'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div 
                className="flex items-center gap-3 cursor-pointer flex-1"
                onClick={() => dispatch({ type: 'TOGGLE_PLANNER_TASK', payload: task.id })}
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 hover:text-indigo-400 shrink-0" />
                )}

                <div>
                  <p className={`text-xs sm:text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Due {task.dueDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                  task.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {task.priority}
                </span>

                <button
                  onClick={() => dispatch({ type: 'DELETE_PLANNER_TASK', payload: task.id })}
                  className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
