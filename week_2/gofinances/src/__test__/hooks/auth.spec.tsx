import fetchMock from 'jest-fetch-mock';

import { renderHook, act } from '@testing-library/react-hooks';

import * as mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { AuthProvider, useAuth } from '../../hooks/AuthContext';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
// jest.mock('expo-auth-session');
jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => ({
      type: 'success',
      params: {
        access_token: 'any_token',
      },
    }),
  };
});

// Coloque no inicio do arquivo para habilitar o mock do fetch.
fetchMock.enableMocks();
it('should be able to sign in with Google account existing', async () => {
  // Agora que temos o Token, vamos mockar a requisição ttp dos dados de profile do usuário.
  fetchMock.mockResponseOnce(
    JSON.stringify({
      id: 'any_id',
      email: 'chrystian@gmail.com',
      name: 'Chrystian',
      photo: 'any_photo.png',
    }),
  );

  const { result } = renderHook(() => useAuth(), {
    wrapper: AuthProvider,
  });

  // eslint-disable-next-line no-return-await
  await act(async () => await result.current.signInWithGoogle());
  // await waitForNextUpdate();

  expect(result.current.user.email).toBe('chrystian@gmail.com');
});
