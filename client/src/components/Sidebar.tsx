import React from 'react';
import { LayoutDashboard, BookOpen, LineChart, MessageSquareText, GraduationCap, Sun, Moon, LogOut, User } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isMobileOpen, 
  setIsMobileOpen,
  isDarkMode,
  toggleTheme,
  user,
  onLogout
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'syllabus', label: 'Syllabus Tracker', icon: BookOpen },
    { id: 'tests', label: 'Test Analysis', icon: LineChart },
    { id: 'ai-coach', label: 'AI Mentor', icon: MessageSquareText },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-30 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 border-r border-slate-800
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex items-center space-x-3 border-b border-slate-700">
          <div className="bg-blue-500 p-2 rounded-lg">
            <GraduationCap size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">GATE Trek</h1>
            <p className="text-xs text-slate-400">CSE Edition</p>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info, Theme Toggle & Footer */}
        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800 space-y-3">
          {/* User Info */}
          {user && (
            <div className="flex items-center space-x-3 px-4 py-2 bg-slate-800 rounded-lg mb-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <User size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center space-x-2 w-full py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center justify-center space-x-2 w-full py-2 px-4 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 transition-colors border border-red-600/30"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
          
          <p className="text-xs text-slate-500 text-center pt-2">
            Focus on consistency.<br/>You got this! 🚀
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;