import { useState, useEffect } from 'react';
import type { Subject, TestRecord, Chapter } from './types';
import { api } from './services/dataService';
import { authService, tokenService, type User } from './services/authService';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SyllabusTracker from './components/SyllabusTracker';
import TestTracker from './components/TestTracker';
import AICoach from './components/AICoach';
import Auth from './components/Auth';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });
  const [syllabus, setSyllabus] = useState<Subject[]>([]);
  const [tests, setTests] = useState<TestRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = tokenService.getToken();
        if (token) {
          const verifiedUser = await authService.verify();
          if (verifiedUser) {
            setUser(verifiedUser);
            setIsAuthenticated(true);
          } else {
            authService.logout();
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        authService.logout();
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  // Load initial data when authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [syllabusData, testsData] = await Promise.all([
          api.getSyllabus(),
          api.getTests()
        ]);
        setSyllabus(syllabusData);
        setTests(testsData);
      } catch (error) {
        console.error('Error loading data:', error);
        // If unauthorized, logout
        if (error instanceof Error && error.message.includes('Unauthorized')) {
          handleLogout();
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [isAuthenticated]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleToggleStatus = async (
    subjectId: string,
    chapterId: string,
    field: keyof Chapter
  ) => {
    const updatedSyllabus = syllabus.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          chapters: subject.chapters.map(chapter => {
            if (chapter.id === chapterId) {
              return { ...chapter, [field]: !chapter[field] };
            }
            return chapter;
          })
        };
      }
      return subject;
    });

    setSyllabus(updatedSyllabus);
    await api.updateChapterStatus(
      subjectId,
      chapterId,
      field,
      !syllabus
        .find(s => s.id === subjectId)
        ?.chapters.find(c => c.id === chapterId)?.[field] || false,
      updatedSyllabus
    );
  };

  const handleAddTest = async (test: TestRecord) => {
    const updatedTests = [...tests, test];
    setTests(updatedTests);
    await api.addTest(test, updatedTests);
  };

  const handleDeleteTest = async (id: string) => {
    const updatedTests = tests.filter(t => t.id !== id);
    setTests(updatedTests);
    await api.deleteTest(id, updatedTests);
  };

  const handleAuthSuccess = () => {
    const user = tokenService.getUser();
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setSyllabus([]);
    setTests([]);
  };

  // Show auth screen if not authenticated
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading your GATE journey...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard syllabus={syllabus} tests={tests} isDarkMode={isDarkMode} />;
      case 'syllabus':
        return <SyllabusTracker syllabus={syllabus} onToggleStatus={handleToggleStatus} />;
      case 'tests':
        return (
          <TestTracker
            subjects={syllabus}
            tests={tests}
            onAddTest={handleAddTest}
            onDeleteTest={handleDeleteTest}
          />
        );
      case 'ai-coach':
        return <AICoach />;
      default:
        return <Dashboard syllabus={syllabus} tests={tests} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-slate-50 dark:bg-slate-900`}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        user={user}
        onLogout={handleLogout}
      />
      <main className={`min-h-screen w-full transition-all duration-300 overflow-x-hidden ${
        isSidebarOpen ? 'md:ml-64 md:w-[calc(100%-16rem)]' : 'md:ml-0 md:w-full'
      }`}>
        {/* Mobile Menu Button */}
        {!isMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden fixed top-3 left-3 sm:top-4 sm:left-4 z-40 p-2.5 bg-slate-800 dark:bg-slate-700 text-white rounded-lg shadow-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors touch-manipulation"
            aria-label="Open menu"
          >
            <Menu size={22} className="sm:w-6 sm:h-6" />
          </button>
        )}
        {/* Desktop Sidebar Toggle Button */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="hidden md:flex fixed top-4 left-4 z-40 p-2.5 bg-slate-800 dark:bg-slate-700 text-white rounded-lg shadow-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>
        )}
        <div className="p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 w-full max-w-full overflow-x-hidden pt-14 sm:pt-16 md:pt-4">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
