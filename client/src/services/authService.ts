const API_BASE_URL = '/api';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Token management
export const tokenService = {
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },
  
  setToken: (token: string): void => {
    localStorage.setItem('auth_token', token);
  },
  
  removeToken: (): void => {
    localStorage.removeItem('auth_token');
  },
  
  getUser: (): User | null => {
    const userStr = localStorage.getItem('auth_user');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  setUser: (user: User): void => {
    localStorage.setItem('auth_user', JSON.stringify(user));
  },
  
  removeUser: (): void => {
    localStorage.removeItem('auth_user');
  },
};

// Helper to parse JSON response safely
const parseJSON = async (response: Response) => {
  const text = await response.text();
  if (!text) {
    throw new Error('Empty response from server');
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`Server error: ${response.status} ${response.statusText}`);
  }
};

export const authService = {
  signup: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await parseJSON(response);

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      tokenService.setToken(data.token);
      tokenService.setUser(data.user);
      return data;
    } catch (error: any) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect to server. Please make sure the server is running.');
      }
      throw error;
    }
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await parseJSON(response);

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      tokenService.setToken(data.token);
      tokenService.setUser(data.user);
      return data;
    } catch (error: any) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Cannot connect to server. Please make sure the server is running.');
      }
      throw error;
    }
  },

  logout: (): void => {
    tokenService.removeToken();
    tokenService.removeUser();
  },

  verify: async (): Promise<User | null> => {
    const token = tokenService.getToken();
    if (!token) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        tokenService.removeToken();
        tokenService.removeUser();
        return null;
      }

      const data = await parseJSON(response);
      tokenService.setUser(data.user);
      return data.user;
    } catch (error) {
      tokenService.removeToken();
      tokenService.removeUser();
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!tokenService.getToken();
  },
};

