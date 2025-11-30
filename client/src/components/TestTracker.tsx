import React, { useState } from 'react';
import type { Subject, TestRecord } from '../types';
import { TestType } from '../types';
import { Plus, Trash2, TrendingUp, Calendar } from 'lucide-react';

interface TestTrackerProps {
  subjects: Subject[];
  tests: TestRecord[];
  onAddTest: (test: TestRecord) => void;
  onDeleteTest: (id: string) => void;
}

const TestTracker: React.FC<TestTrackerProps> = ({ subjects, tests, onAddTest, onDeleteTest }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<TestRecord>>({
    name: '',
    subjectId: 'ALL',
    type: TestType.FULL_LENGTH,
    marksObtained: 0,
    totalMarks: 100,
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.marksObtained === undefined || !formData.totalMarks) return;

    const newTest: TestRecord = {
      id: Date.now().toString(),
      name: formData.name,
      subjectId: formData.subjectId || 'ALL',
      type: formData.type || TestType.FULL_LENGTH,
      marksObtained: Number(formData.marksObtained),
      totalMarks: Number(formData.totalMarks),
      date: formData.date || new Date().toISOString().split('T')[0],
    };

    onAddTest(newTest);
    setIsFormOpen(false);
    setFormData({
      name: '',
      subjectId: 'ALL',
      type: TestType.FULL_LENGTH,
      marksObtained: 0,
      totalMarks: 100,
      date: new Date().toISOString().split('T')[0],
    });
  };

  const getPercentage = (obtained: number, total: number) => {
    return ((obtained / total) * 100).toFixed(1);
  };

  const getSubjectName = (id: string) => {
    if (id === 'ALL') return 'Full Syllabus';
    return subjects.find(s => s.id === id)?.name || 'Unknown Subject';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Test Analysis</h2>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Add Test Result</span>
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-blue-100 dark:border-slate-700 transition-colors">
          <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-200">New Test Entry</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Test Name</label>
              <input
                type="text"
                required
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400"
                placeholder="e.g. Mock Test 1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Test Type</label>
              <select
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as TestType })}
              >
                {Object.values(TestType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Subject</label>
              <select
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 disabled:opacity-50"
                value={formData.subjectId}
                onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                disabled={formData.type === TestType.FULL_LENGTH}
              >
                <option value="ALL">All Subjects (Full Length)</option>
                {subjects.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Marks Obtained</label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                value={formData.marksObtained}
                onChange={(e) => setFormData({ ...formData, marksObtained: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Total Marks</label>
              <input
                type="number"
                required
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                value={formData.totalMarks}
                onChange={(e) => setFormData({ ...formData, totalMarks: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Date</label>
              <input
                type="date"
                required
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3 flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Result
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Test List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <th className="p-4">Date</th>
                <th className="p-4">Test Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Subject</th>
                <th className="p-4 text-center">Score</th>
                <th className="p-4 text-center">%</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {tests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 dark:text-slate-500">
                    No tests recorded yet. Add one to track your progress!
                  </td>
                </tr>
              ) : (
                tests.slice().reverse().map((test) => (
                  <tr key={test.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400 dark:text-slate-500"/> {test.date}
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-800 dark:text-slate-100">{test.name}</td>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-300">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        test.type === TestType.FULL_LENGTH ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                        test.type === TestType.SUBJECT ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                      }`}>
                        {test.type}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-300">{getSubjectName(test.subjectId)}</td>
                    <td className="p-4 text-sm text-center font-semibold text-slate-800 dark:text-slate-100">
                      {test.marksObtained} / {test.totalMarks}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <TrendingUp size={14} className={Number(getPercentage(test.marksObtained, test.totalMarks)) >= 70 ? 'text-green-500' : 'text-slate-400 dark:text-slate-500'} />
                        <span className={`text-sm font-bold ${
                           Number(getPercentage(test.marksObtained, test.totalMarks)) >= 70 ? 'text-green-600 dark:text-green-400' :
                           Number(getPercentage(test.marksObtained, test.totalMarks)) >= 40 ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {getPercentage(test.marksObtained, test.totalMarks)}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => onDeleteTest(test.id)}
                        className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestTracker;