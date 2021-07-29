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

## Lib para utilizar fonts responsivas:

Irei instalar a seguinte lib para utilizacao de fonts, em alguns devices ela ira adptar melhor a fonte:

```bash
❯ yarn add react-native-responsive-fontsize
```

Apos a instalacao irei no meu arquivo styles, e irei usar da seguinte forma, dessa forma ele usa uma medida de proporção será a mesma em diferentes dispositivos

```ts
import { RFPercentage } from "react-native-responsive-fontsize";
// Utilizo para porcentagens
export const Header = styled.View`
  height: ${RFPercentage(42)}px;
`;
// Utilizo para valores fixos
export const Photo = styled.Image`
  width: ${RFValue(55)};
  height: ${RFValue(55)};
`;
```

## Usando icones no app

No expo por padrao ja temos uma lib para lidarmos com icones chama @expo/vector-icons, para usar-los precisamos fazer basicamente o seguinte:

Para conseguir ver todos os icones abrangentes por essa lib posso acessar o site https://icons.expo.fyi/

A seguir irei no meu style.ts e irei importar o lib de icons que desejo utilizar, apos isso irei criar uma constante e irei exporta-la atribuindo a ela o styled(COM_NOME_DA_LI_ICON), e caso deseje estilizado irei colocar crase e adicionar a estilizacao da seguitne forma:

styles.ts

```ts
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;
```

Dentro do meu TSX irei importar esse componente e utiliza-lo da seguitne forma:

```tsx
import { Icon } from "./styles";

return <Icon name="power" />;
```

Acessando props de um elemento pelo styleds componentes. Ao inves de passar as props pelo TSX posso passar pelo style, dessa forma deixando o TSX de forma mais didatica, sendo assim no style, irei usar o atributo attrs apos o nome do elemento da seguinte maneira:

```ts
export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})``;
```

## Ajustando a aultura da statusBar utilizando a lib react-native-iphone-x-helper

Primeiro passo irei instalar a seguinte lib:

```bash
  ❯ yarn add react-native-iphone-x-helper
```

No meu arquivo de styles irei fazer a seguinte importacao:

```ts
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const UserWrapper = styled.View`
  margin-top: ${getStatusBarHeight() + 28}px;
`;
```

Dessa forma ele ira considerar os 28pxs abaixo da statusbar, a lib funcionou para meu android

## Passando props para dentro do meu component do styled component:

Primeiro passo irei criar uma interface com as props que irei passar dentro do style.ts, apos isso irei passar essa interface para o component, e dentro do componente no index irei passar as props, da seguinte maneira:

```ts
import { css } from "styled-components/native";
interface IIconProps {
  type: "up" | "down" | "total";
}

export const Icon = styled(Feather)<IIconProps>`
  font-size: ${RFValue(40)}px;
  ${(props) =>
    props.type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `};
`;
export const Container = styled.View<ITypeProps>`
  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.secondary : theme.colors.shape};
`;
```

```tsx
export const HighlightCard = ({ type }: IHighlightCardProps) => {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
    </Container>
  );
};
```

### Extendendo tipagem em components

Ao extender a tipagem de um component no RN por exemplo de um input ele ira dar um erro ao passar o rest par a aquele component no style para isso irei fazer da seguinte forma:

```ts
import styled from "styled-components/native";
import { TextInput } from "react-native";

export const Container = styled(TextInput)``;
```

```tsx
import { TextInputProps } from "react-native";
import { Container } from "./styles";

type IInputProps = TextInputProps;

export const Input = ({ ...rest }: IInputProps) => {
  return <Container {...rest} />;
};
```

## Criando um component de input para ser reutilizado

Irei na pasta components irei criar uma pasta chamada form onde irei armazenar os meu campos do form reutilizaveis("Input","Select", etc). Da seguite forma.

```ts
import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
  width: 100%;
  padding: 16px 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(14)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  margin-bottom: 8px;
`;
```

```tsx
import React from "react";
import { TextInputProps } from "react-native";
import { Container } from "./styles";

type IInputProps = TextInputProps;

export const Input = ({ ...rest }: IInputProps) => {
  return <Container {...rest} />;
};
```

## Usando modal

Primeiro passo irei importar o modal da seguinte forma:

```tsx
import { Modal } from "react-native";

<Modal visible={false}>
  <CategorySelect />
</Modal>;
```

Farei da seguinte forma, para abrir o modal, visible sera responsavel por apresentar ou nao esse modal

## Integrando React Hook Form com RN

Primeiro passo irei instala-lo com o seguinte comando:

```bash
❯ yarn add react-hook-form
```

No React native nao tenho o form, igual na web, por isso no irei precisar usar um component chamado Controller, de dentro de react-hook-form.

Em cada input obrigatoriamente preciso passar o componente controler do react-hook-form antes.

Irei criar um novo componente chamando InputForm.tsx que sera o meu componente responsavel po controlar as informacoes digitadas no form

Irei montar meu input do form da seguinte forma:

```tsx
import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";

import { Container } from "./styles";

interface IInputFormProps extends TextInputProps {
  control: Control;
  name: string;
}

export const InputForm = ({ control, name, ...rest }: IInputFormProps) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
    </Container>
  );
};
```

irei dentro do meu componente onde sera usando o form e irei importar o seguinte hook:

```tsx
import { useForm } from "react-hook-form";
const { control, handleSubmit } = useForm();

const handleRegister = form => {
    const data = {};
    console.log(form);
  };

// irei passar o control dessa maneira para dentro do meu input
<InputForm control={control} name="name" placeholder="Nome" />
<InputForm control={control} name="amount" placeholder="Preço" />

// ao envovler o metodo pelo handleSubmit ele ira fazer o submit assim que eu clicar nele
<Button onPress={handleSubmit(handleRegister)} title="Enviar" />
```

## Fechando o teclado ao clicar em qualquer area da tela

irei importar o seguinte componente:

```tsx
import { TouchableWithoutFeedback } from "react-native";

// Irei envolver ele por todo meu app

return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    Interface do meu app
  </TouchableWithoutFeedback>
);
```

## Validando inputs nos forms:

Primeiro passo irei instalar a lib:

```bash
❯ yarn add @hookform/resolvers yup
```

irei fazer a seguinte importacão:

```ts
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
```

Dentro do meu useForm irei passar a seguinte informação:

```tsx
const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .positive("O valor não pode ser negativo")
    .typeError("Informe um valor númerico")
    .required("O valor é obrigatorio"),
});

const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(schema),
});

<InputForm error={errors.name && errors.name.message} />;
```
