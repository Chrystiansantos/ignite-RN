import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  signInWithApple: () => Promise<void>;
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
  const [userStorageLoading, setUserStorageLoading] = useState(true);
  const userStorageKey = '@gofinances:user';

  useEffect(() => {
    const loadUserStorageData = async () => {
      const userStorage = await AsyncStorage.getItem(userStorageKey);
      if (userStorage) {
        const userLogged = JSON.parse(userStorage) as IUser;
        setUser(userLogged);
      }
      setUserStorageLoading(false);
    };
    loadUserStorageData();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { CLIENT_ID } = process.env;
      const { REDIRECT_URI } = process.env;
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizantionResponse;
      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );
        const userInfo = await response.json();
        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          photo: userInfo.picture,
        };
        setUser(userLogged);

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email,
          name: credential.fullName?.givenName,
          photo: undefined,
        } as IUser;

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
