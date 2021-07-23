# Anotações segunda semana RN

### Criando o projeto com expo:

```bash
❯ expo init meuappcomexpo
```

#### Expo Managed:

Não há as pastas android ios, sendo assim ocorre alguns bloqueios ao tentar utilizar algumas apis nativas.<br>
Utilizar para apps pequenos que não irão ser escalados, e quando desejo ter maior produtividade.<br>
Sempre que possivel ao comecar os novos apps utilize o <b>Expo Bare Workflow.</b>

Irei selecionar as seguintes opções:

- blank (TS)

#### Expo Bare Workflow:

Irei selecionar as seguintes opções:

- minimal, abaixo de Bare workflow

#### Instalando TS no projeto

- Na raiz do projeto irei criar o arquivo tsconfig.json na raiz do projeto

```bash
❯ touch tsconfig.json
```

A seguir irei excutar o comando expo start na raiz do projeto

```bash
  ❯ touch tsconfig.json
  Would you like to install typescript, @types/react, @types/react-native? … yes
```

Apos gerar as informações no tsconfig.json irei dentro do objeto compilerOptions e irei passar o seguinte atributo:

```json
"compilerOptions": {
    "strict": true
  },
```

Agora irei renomear os meus arquivos com .js para tsx e bora codar 🚀
<br><br>

## INTEGRANDO STYLEDS COMPONENTS NO APP

Primeiro passo irei instalar a seguinte lib:

```bash
❯ yarn add styled-components
❯ yarn add @types/styled-components-react-native -D
```

Agora dentro do meu componente ou page irei criar um arquivo chamado styles.ts, onde irei configurar meu css in ts

Exemplo basico de utilizacao:

### index.ts

```ts
import styled from "styled-components/native";
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 30px;
`;
```

### index.tsx

```tsx
import React from "react";

import { Container, Title } from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Title>Dashboard</Title>
    </Container>
  );
}
```

### Criando estilos globais

Dentro de src irei criar uma pasta chamada global, onde irei deixar todas as configurações globais do meu app, irei criar uma pasta styles, e dentro dessa pasta irei criar um arquivo chama theme.ts, onde irei configurar o estilo global. <b>src/global/styles/theme.ts</n>

Dentro desse arquivo irei fazer um export default de um objeto da seguitne forma:

```ts
export default {
  colors: {
    primary: "#5636d3",
    // ...aqui embaixo coloco as demais configuracoes
  },
};
```

Irei no meu app e irei importar o ThemeProvider de dentro do styled-components, e importar tbm o meu theme que acabei de criar em styles, e irei envolver minha app com o ThemeProvider passando o theme como props da seguitne forma:

```tsx
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";
import { Dashboard } from "./src/Pages/Dashboard";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
```

Usando o estilo global:

```ts
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
`;
```

Para corrigir o erro de tipagem que ocorre ao usar o estilo global, irei criar um arquivo styled.d.ts dentro de styles e irei adicionar a seguinte configuracao:

```ts
import "styled-components";
import theme from "./theme";

declare module "styled-components" {
  type themeType = typeof theme;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends themeType {}
}
```

### Usando fonts personalizadas

Irei acessar o google fonts e escolher as fonts desejadas.

A seguir irei executar o seguinte comando para instalar a font no nosso app:

```bash
❯ expo install expo-font @expo-google-fonts/poppins
```

Irei no arquivo App.tsx para configurar a fonte pois la e primeiro arquivo a ser executado entao irei fazer a seguinte config:

Para conseguir segurar a minha splashScreen ate que seja carregado as fontes precisarei instalar a seguinte lib:

```bash
  ❯ expo install expo-app-loading
```

```tsx
// irei importar as fonts
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

// aqui ele ira carregar as fonts e pode ser que demore um pouco entao quando todos estiverem carregados ele ira retornar true dentro dessa constante contsLoaded

const [fontsLoaded] = useFonts({
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
});

// se o fontLoaded nao estiver carregador as font irei sergurar a splash usando o seguinde comando
if (!fonstLoaded) {
  return <AppLoading />;
}

return (
  <ThemeProvider theme={theme}>
    <Dashboard />
  </ThemeProvider>
);
```

Apos isso irei no meu theme dentro da pasta global e posso configurar minhas fontes para serem usadas a partir de la da seguinte forma:

```ts
export default {
  colors: {
    primary: "#5636d3",
  },
  fonts: {
    regular: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    bold: "Poppins_700Bold",
  },
};
```
