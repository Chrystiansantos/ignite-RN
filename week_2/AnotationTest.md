## Testando App com React Native Testing Library

Primeiro passo irei instalar a lib, da seguinte maneira:

```bash
❯ yarn add --dev @testing-library/react-native
❯ yarn add --dev @testing-library/jest-native
```

A seguir irei no meu package.json e verificar se existe o atributo, jest, caso nao tenha irei cria-ló da seguinte forma:

```json
"jest": {
    "preset": "jest-expo",
    "setupFilesAfterEnv": [
      "@testing-library/jest-native/extend-expect"
    ]
  }
```