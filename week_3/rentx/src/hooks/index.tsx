import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';

interface IAppProvider {
  children: ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  return <AuthProvider>{children}</AuthProvider>;
}
