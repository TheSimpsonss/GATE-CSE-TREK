import React from 'react';
import { LayoutDashboard, BookOpen, LineChart, MessageSquareText, GraduationCap, Sun, Moon, LogOut, User, X } from 'lucide-react';

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
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
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
  isSidebarOpen,
  setIsSidebarOpen,
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
        fixed top-0 left-0 h-full w-64 sm:w-72 bg-slate-900 text-white z-30 transform transition-transform duration-300 ease-in-out
        border-r border-slate-800
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isSidebarOpen ? 'md:translate-x-0' : 'md:-translate-x-full'}
      `}>
        <div className="p-4 sm:p-5 md:p-6 flex items-center justify-between space-x-2 sm:space-x-3 border-b border-slate-700">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <div className="bg-blue-500 p-1.5 sm:p-2 rounded-lg shrink-0">
              <GraduationCap size={20} className="sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">GATE Trek</h1>
              <p className="text-xs text-slate-400">CSE Edition</p>
            </div>
          </div>
          {/* Close button for mobile and desktop */}
          <button
            onClick={() => {
              setIsMobileOpen(false);
              setIsSidebarOpen(false);
            }}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white shrink-0"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-2 sm:p-4 space-y-1 sm:space-y-2 flex-1 overflow-y-auto">
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
                className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon size={18} className="sm:w-5 sm:h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info, Theme Toggle & Footer */}
        <div className="absolute bottom-0 w-full p-3 sm:p-4 md:p-6 border-t border-slate-800 space-y-2 sm:space-y-3">
          {/* User Info */}
          {user && (
            <div className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 bg-slate-800 rounded-lg mb-2 sm:mb-3">
              <div className="bg-blue-500 p-1.5 sm:p-2 rounded-lg shrink-0">
                <User size={14} className="sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-[10px] sm:text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center space-x-2 w-full py-2 px-3 sm:px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs sm:text-sm"
          >
            {isDarkMode ? <Sun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
            <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center justify-center space-x-2 w-full py-2 px-3 sm:px-4 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 transition-colors border border-red-600/30 text-xs sm:text-sm"
          >
            <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="font-medium">Logout</span>
          </button>
          
          <p className="text-[10px] sm:text-xs text-slate-500 text-center pt-1 sm:pt-2">
            Focus on consistency.<br/>You got this! 🚀
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;