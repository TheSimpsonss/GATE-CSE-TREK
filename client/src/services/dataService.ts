import type { Subject, TestRecord, Chapter } from '../types';
import { INITIAL_SYLLABUS } from '../constants';
import { tokenService } from './authService';

// --- CONFIGURATION ---
// Set this to true to connect to your Node/Express backend
// Or use environment variable: import.meta.env.VITE_USE_API === 'true'
const USE_API = import.meta.env.VITE_USE_API === 'true' || true; 

// Use relative URL to leverage Vite proxy (avoids CORS issues)
const API_BASE_URL = '/api';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = tokenService.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

// --- Local Storage Helpers ---
const getLocalSyllabus = (): Subject[] => {
  const saved = localStorage.getItem('gate_syllabus');
  return saved ? JSON.parse(saved) : INITIAL_SYLLABUS;
};

const saveLocalSyllabus = (data: Subject[]) => {
  localStorage.setItem('gate_syllabus', JSON.stringify(data));
};

const getLocalTests = (): TestRecord[] => {
  const saved = localStorage.getItem('gate_tests');
  return saved ? JSON.parse(saved) : [];
};

const saveLocalTests = (data: TestRecord[]) => {
  localStorage.setItem('gate_tests', JSON.stringify(data));
};

// --- API Service ---
export const api = {
  // 1. Fetch Syllabus
  getSyllabus: async (): Promise<Subject[]> => {
    if (USE_API) {
      try {
        const res = await fetch(`${API_BASE_URL}/syllabus`, {
          headers: getAuthHeaders(),
        });
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Unauthorized - Please login');
          }
          throw new Error('Failed to fetch syllabus');
        }
        const data = await res.json();
        
        // If empty, initialize with default syllabus
        if (data.length === 0) {
          try {
            const initRes = await fetch(`${API_BASE_URL}/syllabus/initialize`, {
              method: 'POST',
              headers: getAuthHeaders(),
              body: JSON.stringify(INITIAL_SYLLABUS),
            });
            if (initRes.ok) {
              const initData = await initRes.json();
              return initData.subjects || INITIAL_SYLLABUS;
            }
          } catch (initError) {
            console.error("Error initializing syllabus:", initError);
          }
          return INITIAL_SYLLABUS;
        }
        
        return data;
      } catch (error) {
        console.error("API Connection Error (Syllabus):", error);
        console.warn("Falling back to Local Storage due to API error.");
        return getLocalSyllabus();
      }
    }
    return getLocalSyllabus();
  },

  // 2. Update Chapter Status
  updateChapterStatus: async (
    subjectId: string, 
    chapterId: string, 
    field: keyof Chapter, 
    value: boolean, 
    optimisticSyllabus: Subject[] 
  ): Promise<void> => {
    // Always save to local storage as backup or primary
    if (!USE_API) {
      saveLocalSyllabus(optimisticSyllabus);
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/syllabus/${subjectId}/chapters/${chapterId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ field, value }),
      });
    } catch (error) {
      console.error("API Error updating chapter:", error);
      // Fallback: save to local so user doesn't lose progress locally
      saveLocalSyllabus(optimisticSyllabus);
    }
  },

  // 3. Fetch Tests
  getTests: async (): Promise<TestRecord[]> => {
    if (USE_API) {
      try {
        const res = await fetch(`${API_BASE_URL}/tests`, {
          headers: getAuthHeaders(),
        });
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Unauthorized - Please login');
          }
          throw new Error('Failed to fetch tests');
        }
        return await res.json();
      } catch (error) {
        console.error("API Connection Error (Tests):", error);
        return getLocalTests();
      }
    }
    return getLocalTests();
  },

  // 4. Add Test
  addTest: async (test: TestRecord, optimisticTests: TestRecord[]): Promise<void> => {
    if (!USE_API) {
      saveLocalTests(optimisticTests);
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/tests`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(test),
      });
    } catch (error) {
      console.error("API Error adding test:", error);
      saveLocalTests(optimisticTests);
    }
  },

  // 5. Delete Test
  deleteTest: async (id: string, optimisticTests: TestRecord[]): Promise<void> => {
    if (!USE_API) {
      saveLocalTests(optimisticTests);
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/tests/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
    } catch (error) {
      console.error("API Error deleting test:", error);
      saveLocalTests(optimisticTests);
    }
  }
};