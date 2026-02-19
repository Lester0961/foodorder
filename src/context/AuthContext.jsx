import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('lutongPinoyUser');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email && parsed.token) {
          setUser(parsed);
        } else {
          localStorage.removeItem('lutongPinoyUser');
        }
      } catch (err) {
        localStorage.removeItem('lutongPinoyUser');
      }
    }
  }, []);

  const login = (email) => {
    const fakeUser = {
      email,
      name: email.split('@')[0] || 'User',
      token: `fake-jwt-${Date.now()}-${Math.random().toString(36).slice(2)}`,
     
    };

    localStorage.setItem('lutongPinoyUser', JSON.stringify(fakeUser));
    setUser(fakeUser);
    return true;
  };

  const register = (email, password) => {
    if (!email || !password) return false;

    const existing = localStorage.getItem('lutongPinoyUser');
    if (existing && JSON.parse(existing).email === email) {
      alert('This email is already registered.');
      return false;
    }

    return login(email); 
  };

  const logout = () => {
    localStorage.removeItem('lutongPinoyUser');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};