import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import * as mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { NavigationContainer } from '@react-navigation/native';
import { Register } from '../../Pages/Register';
import theme from '../../global/styles/theme';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// eslint-disable-next-line react/prop-types
const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <NavigationContainer>{children}</NavigationContainer>
  </ThemeProvider>
);

describe('Register', () => {
  it('should be open category modal when user click on the category button', async () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });
    const categoryModal = getByTestId('modal-category');
    const buttonCategory = getByTestId('button-category');

    fireEvent.press(buttonCategory);
    // WaitFor serve basicamente pra aguardar promessas serem resolvidas
    // Pra usar o wait for minha funcao precisar se async
    waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
