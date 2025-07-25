import React, { createContext, useContext, useState, useEffect } from 'react';

interface ApiContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  isConfigured: boolean;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

interface ApiProviderProps {
  children: React.ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('premio-api-key');
    if (savedApiKey) {
      setApiKeyState(savedApiKey);
    }
  }, []);

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    if (key) {
      localStorage.setItem('premio-api-key', key);
    } else {
      localStorage.removeItem('premio-api-key');
    }
  };

  const isConfigured = Boolean(apiKey.trim());

  return (
    <ApiContext.Provider value={{ apiKey, setApiKey, isConfigured }}>
      {children}
    </ApiContext.Provider>
  );
};