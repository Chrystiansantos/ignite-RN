import React, { createContext, ReactNode, useContext } from 'react';

const AuthContext = createContext({});

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProvider) => {
  return (
    <AuthContext.Provider value={{ name: 'Chrystian' }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
