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

