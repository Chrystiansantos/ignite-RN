import React, { createContext, ReactNode, useContext, useState } from 'react';

interface IAuthProviderProps {
  children: ReactNode;
}
interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: IUser;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState({
    id: '1234',
    name: 'Chrystian Santos',
    email: 'chrystian@gmail.com',
    photo: '',
  } as IUser);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
