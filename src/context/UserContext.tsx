import { createContext, useContext, useState } from 'react';

type UserContextType = {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: any) => {
  const [accessToken, setAccessTokenProvider] = useState<string>(
    localStorage.getItem('access_token') || '',
  );

  const setAccessToken = (accessToken: string): void => {
    setAccessTokenProvider(accessToken);
    localStorage.setItem('access_token', accessToken);
  };

  return (
    <UserContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { accessToken, setAccessToken } = context;

  return { accessToken, setAccessToken };
};

export default UserProvider;
