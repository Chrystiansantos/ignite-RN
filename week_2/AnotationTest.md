## Testando App com React Native Testing Library

Primeiro passo irei instalar a lib, da seguinte maneira:

```bash
❯ expo install jest-expo jest
❯ yarn add --dev @testing-library/react-native
❯ yarn add --dev @testing-library/jest-native
❯ yarn add react-test-renderer@17 --dev
❯ yarn add @types/jest -D
```

A seguir irei no meu package.json e verificar se existe o atributo, jest, caso nao tenha irei cria-ló da seguinte forma:

```json
"jest": {
    "preset": "jest-expo",
    "setupFilesAfterEnv": [
      "@testing-library/jest-native/extend-expect"
    ]
  },
  "scripts": {
    "test": "jest"
  },
```

Irei apagar a pasta __test__, e irei criar uma nova pasta chamada __test__, dentro de src.

Dentro da minha pasta de teste, irei criar uma outra pasta chamada screens, onde ficara os testes das minhas pages da seguinte forma:

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';

import { ComponentASerTestado } from '../../Pages/ComponentTestado';

describe('Nome do componente', () => {
  it('Nome do caso de teste', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName).toBeTruthy();
  });
});

```

Criando um arquivo de configuracao na raiz do projeto:

Na raiz do meu projeto irei criar um arquivo com o seguinte nome "jest.config.js", com o seguinte codigo que copiei do package.js, da segiunte maneira:

module.exports = {
  preset: "jest-expo",
  <!-- Pastas que irei ignorar ao realizar o teste, para ganhar um pouco de performace -->
  testPathIgnorePatterns: ['/node_modules', '/android', '/ios'],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect"
  ]
}

## Testando componentes que depende de contexto, de tema do styled-components

Pra isso irei instalar a seguinte lib, *** No caso do styled-components ***

```bash
❯ yarn add jest-styled-components -D
```
Dentro da minha file de config "jest.config.js", no array de setupFilesAfterEnv irei adicionar uma nova posicao com o styled-components, da seguinte maneira

```ts
setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components"
  ]
```

Dentro da minha file de teste irei precisar importar o tema, e o themeProvider

```tsx
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';
```

A seguir precisarei criar uma constante que ira receber um componente que sera o pai do componente que estou testando, e assim irei conseguir testar envonvendo meu componente por conta do wrapper, que basicamente transforma o componente que esta dentro dele em pai, e o componente testando em filho, nesse caso esse children da constante abaixo se refere ao componente input, no caso

```tsx
const Providers:React.FC = ({children}) =>(
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

it('must have specific border colors when active', () => {
    const { getByTestId } = render(
      <Input
        testID='="input-email"'
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        active
      />,
      {
        // wrapper seria algum coponent infor por volta do meu component de imput exemplo o contexto
        wrapper: Providers,
      },
    );
    const inputComponent = getByTestId('input-email');
    expect(inputComponent.props.style[0].borderColor).toEqual('#e83f5b');
    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
```

## Testando hooks

Antes de tudo irei instalar uma lib pra testar os hooks, da seguinte forma:

```bash
❯ yarn add  @testing-library/react-hooks -D                      
```
A seguir na minha file de teste, vou importar o meu hook e meu provider, e irei executar o teste da seguinte forma:

```tsx
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
```