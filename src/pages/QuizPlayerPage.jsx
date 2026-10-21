// src/pages/QuizPlayerPage.jsx
import React, { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  ArrowLeft, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Clock, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export default function QuizPlayerPage() {
  const { quizId } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const quiz = state.quizzes.find(q => q.id === quizId);

  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionIndex]: optionIndex }
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!quiz) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Quiz not found</h2>
        <p className="text-slate-400 text-sm">Could not find quiz with ID "{quizId}"</p>
        <Link to="/quizzes" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
          Back to Quizzes
        </Link>
      </div>
    );
  }

  const questions = quiz.questions || [];
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (qIdx, optIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    dispatch({
      type: 'SAVE_QUIZ_RESULT',
      payload: {
        id: `qh-${Date.now()}`,
        quizId: quiz.id,
        quizTitle: quiz.title,
        score,
        totalQuestions: questions.length,
        percentage,
        date: new Date().toISOString().split('T')[0]
      }
    });

    setSubmitted(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const score = submitted ? calculateScore() : 0;
  const percentage = submitted ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/quizzes')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Quizzes Catalog</span>
        </button>
      </div>

      {/* Quiz Title Banner */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
            {quiz.category} • {quiz.difficulty}
          </span>
          <h1 className="text-xl font-extrabold text-white mt-0.5">{quiz.title}</h1>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>{quiz.timeLimitMinutes} Mins</span>
          </span>
          <span>•</span>
          <span>{questions.length} Questions</span>
        </div>
      </div>

      {/* Submitted Result Scorecard */}
      {submitted ? (
        <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-6 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white">Quiz Completed!</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              You scored <span className="text-white font-bold">{score}</span> out of{' '}
              <span className="text-white font-bold">{questions.length}</span> ({percentage}%)
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
            <Link
              to="/quizzes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
            >
              <span>Explore Other Quizzes</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Progress Indicator */
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          <div className="text-xs text-slate-500">
            {answeredCount} of {questions.length} Answered
          </div>
        </div>
      )}

      {/* Questions Review list or Active Question Player */}
      {submitted ? (
        /* Full Review with Explanations */
        <div className="space-y-6">
          <h3 className="text-base font-bold text-white">Detailed Diagnostic Review</h3>
          {questions.map((q, idx) => {
            const userAnswer = selectedAnswers[idx];
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {idx + 1}. {q.question}
                    </h4>
                  </div>
                </div>

                <div className="space-y-2 pl-8">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = userAnswer === optIdx;
                    const isTargetCorrect = optIdx === q.correctIndex;

                    let style = 'bg-slate-950 border-slate-800 text-slate-400';
                    if (isTargetCorrect) {
                      style = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-medium';
                    } else if (isUserChoice && !isCorrect) {
                      style = 'bg-red-500/10 border-red-500/40 text-red-300';
                    }

                    return (
                      <div key={optIdx} className={`p-3 rounded-xl border text-xs flex items-center justify-between ${style}`}>
                        <span>{opt}</span>
                        {isTargetCorrect && <span className="text-[10px] font-bold text-emerald-400 uppercase">Correct Answer</span>}
                        {isUserChoice && !isTargetCorrect && <span className="text-[10px] font-bold text-red-400 uppercase">Your Choice</span>}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="ml-8 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
                    <div>
                      <span className="font-semibold text-indigo-200">Explanation: </span>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Single Question View */
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {currentQuestionIndex + 1}. {currentQ?.question}
          </h2>

          <div className="space-y-2.5">
            {currentQ?.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-indigo-400 bg-indigo-600 text-white' : 'border-slate-700 bg-slate-900'
                  }`}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {/* Question Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold"
            >
              Previous
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={answeredCount === 0}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                Submit Answers
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
