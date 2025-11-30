import React, { useState } from 'react';
import type { Subject, Chapter } from '../types';
import { ChevronDown, ChevronRight, CheckSquare, Square, Book, RotateCw, ListChecks } from 'lucide-react';

interface SyllabusTrackerProps {
  syllabus: Subject[];
  onToggleStatus: (subjectId: string, chapterId: string, field: keyof Chapter) => void;
}

const SyllabusTracker: React.FC<SyllabusTrackerProps> = ({ syllabus, onToggleStatus }) => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedSubject(expandedSubject === id ? null : id);
  };

  const calculateProgress = (subject: Subject) => {
    const total = subject.chapters.length;
    if (total === 0) return 0;
    const completed = subject.chapters.filter(c => c.isCompleted).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 animate-fade-in w-full max-w-7xl mx-auto">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 sm:mb-5 md:mb-6">Subject Tracker</h2>
      
      <div className="grid gap-3 sm:gap-4 md:gap-5 w-full">
        {syllabus.map((subject) => {
          const progress = calculateProgress(subject);
          const isExpanded = expandedSubject === subject.id;

          return (
            <div key={subject.id} className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-200 w-full">
              {/* Header */}
              <div 
                className="p-2.5 sm:p-3 md:p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 touch-manipulation"
                onClick={() => toggleExpand(subject.id)}
              >
                <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                  <div className={`p-1.5 sm:p-2 rounded-lg shrink-0 ${
                    progress === 100 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    <Book size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1 gap-2">
                      <h3 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-100 truncate">{subject.name}</h3>
                      <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 shrink-0">{progress}% Done</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 sm:h-2">
                      <div 
                        className={`h-1.5 sm:h-2 rounded-full ${progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="ml-2 sm:ml-4 text-slate-400 dark:text-slate-500 shrink-0">
                  {isExpanded ? <ChevronDown size={18} className="sm:w-5 sm:h-5" /> : <ChevronRight size={18} className="sm:w-5 sm:h-5" />}
                </div>
              </div>

              {/* Chapters List */}
              {isExpanded && (
                <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 p-2 sm:p-4">
                  <div className="overflow-x-auto -mx-2 sm:mx-0">
                    <table className="w-full min-w-[500px] sm:min-w-[600px] text-left border-collapse">
                      <thead>
                        <tr className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                          <th className="pb-2 sm:pb-3 pl-2 pr-1 sm:pr-2">Chapter</th>
                          <th className="pb-2 sm:pb-3 text-center w-16 sm:w-24">Done</th>
                          <th className="pb-2 sm:pb-3 text-center w-16 sm:w-24">Rev 1</th>
                          <th className="pb-2 sm:pb-3 text-center w-16 sm:w-24">Rev 2</th>
                          <th className="pb-2 sm:pb-3 text-center w-16 sm:w-24">PYQs</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {subject.chapters.map((chapter) => (
                          <tr key={chapter.id} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <td className="py-2 sm:py-3 pl-2 pr-1 sm:pr-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                              <span className="line-clamp-2">{chapter.name}</span>
                            </td>
                            {/* Checkboxes */}
                            {(['isCompleted', 'revision1', 'revision2', 'pyqSolved'] as const).map((field) => (
                              <td key={field} className="py-2 sm:py-3 text-center">
                                <button
                                  onClick={() => onToggleStatus(subject.id, chapter.id, field)}
                                  className={`p-0.5 sm:p-1 rounded transition-colors touch-manipulation ${
                                    chapter[field] 
                                      ? 'text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20' 
                                      : 'text-slate-300 hover:text-slate-400 hover:bg-slate-200 dark:text-slate-600 dark:hover:text-slate-500 dark:hover:bg-slate-800'
                                  }`}
                                >
                                  {chapter[field] ? <CheckSquare size={16} className="sm:w-5 sm:h-5" /> : <Square size={16} className="sm:w-5 sm:h-5" />}
                                </button>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SyllabusTracker;