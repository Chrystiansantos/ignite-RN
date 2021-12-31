import fetchMock from 'jest-fetch-mock';

import { renderHook, act } from '@testing-library/react-hooks';

import * as mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { mocked } from 'ts-jest/utils';
import { startAsync } from 'expo-auth-session';
import { AuthProvider, useAuth } from '../../hooks/AuthContext';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('expo-auth-session');

// Coloque no inicio do arquivo para habilitar o mock do fetch.
fetchMock.enableMocks();
describe('Auth hook', () => {
  it('user should be not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: 'cancel',
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());
    expect(result.current.user).not.toHaveProperty('id');
  });

  it('should be able to sign in with Google account existing', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      },
    });

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
});
