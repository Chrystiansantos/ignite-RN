import React, { createContext, useState, useContext, ReactNode } from 'react';
import { api } from '../../service/api';

interface IUser {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: IUser;
  signIn: (creadentials: ISignInCredentials) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: IAuthProviderProps) {
  const [data, setData] = useState<IAuthState>({} as IAuthState);

  const signIn = async ({ email, password }: ISignInCredentials) => {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });
      const { token, user } = response.data;
      setData({ token, user });
      api.defaults.headers.authorization = `Bearer ${token}`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
