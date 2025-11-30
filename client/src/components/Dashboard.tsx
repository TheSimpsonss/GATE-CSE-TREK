import React, { useMemo } from 'react';
import type { Subject, TestRecord } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { Trophy, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

interface DashboardProps {
  syllabus: Subject[];
  tests: TestRecord[];
  isDarkMode: boolean;
}

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

const Dashboard: React.FC<DashboardProps> = ({ syllabus, tests, isDarkMode }) => {
  
  const stats = useMemo(() => {
    let totalChapters = 0;
    let completed = 0;
    let rev1 = 0;
    let rev2 = 0;
    let pyq = 0;

    syllabus.forEach(sub => {
      sub.chapters.forEach(ch => {
        totalChapters++;
        if (ch.isCompleted) completed++;
        if (ch.revision1) rev1++;
        if (ch.revision2) rev2++;
        if (ch.pyqSolved) pyq++;
      });
    });

    return { totalChapters, completed, rev1, rev2, pyq };
  }, [syllabus]);

  const completionData = [
    { name: 'Done', value: stats.completed },
    { name: 'Remaining', value: stats.totalChapters - stats.completed },
  ];

  const testPerformanceData = useMemo(() => {
    const sortedTests = [...tests].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return sortedTests.map(t => ({
      name: t.name.length > 10 ? t.name.substring(0, 10) + '...' : t.name,
      percentage: ((t.marksObtained / t.totalMarks) * 100).toFixed(1),
      type: t.type,
      date: t.date
    })).slice(-10);
  }, [tests]);

  const axisColor = isDarkMode ? '#94a3b8' : '#64748b';
  const gridColor = isDarkMode ? '#334155' : '#e2e8f0';
  const tooltipStyle = isDarkMode 
    ? { backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' } 
    : { backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#1e293b' };

  return (
    <div className="space-y-6 animate-fade-in w-full max-w-full overflow-x-hidden">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center space-x-4 transition-colors">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Syllabus Completion</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{Math.round((stats.completed / (stats.totalChapters || 1)) * 100)}%</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center space-x-4 transition-colors">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Revision 1 Done</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.rev1} <span className="text-sm font-normal text-slate-400 dark:text-slate-500">/ {stats.totalChapters}</span></p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center space-x-4 transition-colors">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">PYQs Solved</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.pyq} <span className="text-sm font-normal text-slate-400 dark:text-slate-500">/ {stats.totalChapters}</span></p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center space-x-4 transition-colors">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Tests Taken</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{tests.length}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Pie Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Syllabus Status</h3>
          <div className="h-64 w-full min-h-[256px]">
            <ResponsiveContainer width="100%" height={256}>
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  stroke={isDarkMode ? '#1e293b' : '#fff'}
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : (isDarkMode ? '#334155' : '#e2e8f0')} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: axisColor }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Test Performance Line Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Recent Test Performance (%)</h3>
          {tests.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-slate-400 dark:text-slate-500 min-h-[256px]">
              No tests recorded yet.
            </div>
          ) : (
            <div className="h-64 w-full min-h-[256px]">
              <ResponsiveContainer width="100%" height={256}>
                <LineChart data={testPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis dataKey="name" tick={{fontSize: 12, fill: axisColor}} stroke={gridColor} />
                  <YAxis domain={[0, 100]} tick={{fill: axisColor}} stroke={gridColor} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="percentage" stroke="#3b82f6" strokeWidth={2} dot={{r: 4, fill: '#3b82f6', strokeWidth: 0}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;