import React, { createContext, ReactNode, useContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session';

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
  signInWithGoogle: () => Promise<void>;
  // signInWithApple: () => Promise<void>;
}

interface IAuthorizantionResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState({} as IUser);

  const signInWithGoogle = async () => {
    try {
      const CLIENT_ID = '';
      const REDIRECT_URI = '';
      const RESPONSE_TYPE = '';
      const SCOPE = encodeURI('');
      // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}`;
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      // 17:19
      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizantionResponse;
      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );
        const userInfo = await response.json();

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          photo: userInfo.picture,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
