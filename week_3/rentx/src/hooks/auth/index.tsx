/* eslint-disable no-param-reassign */
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { api } from '../../service/api';
import { database } from '../../database';
import { User as ModelUser } from '../../database/models/user';

interface IUser {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
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
  const [data, setData] = useState<IUser>({} as IUser);

  const signIn = async ({ email, password }: ISignInCredentials) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });
      const { token, user } = response.data;
      setData({ token, ...user });
      api.defaults.headers.authorization = `Bearer ${token}`;
      // Toda a modificacao de escrita edicao ou exclusao deve ser feita dentro desse write
      await database.write(async () => {
        // Primeiro resgato a minha colecao
        const userCollection = database.get<ModelUser>('users');
        // Toda a insercao de dados no watermelonprecisa ser dentro de uma action
        await userCollection.create(newUser => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();
      if (response.length) {
        // eslint-disable-next-line no-underscore-dangle
        const userData = response[0]._raw as unknown as IUser;
        setData(() => userData);
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
      }
    }
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
