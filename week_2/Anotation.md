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

## Usando navegação, com tab navigation

Primeiro passo irei instalar a lib, para fazer navegação:

```bash
❯ yarn add @react-navigation/native
❯ yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

Para ios, precisarei acessar a pasta ios e rodar pod install.

Agora no meu arquivo principal, (App.tsx) irei importar o seguinte:

```tsx
import "react-native-gesture-handler";
```

## Utilizando Tab Navigation

Irei instalar a seguinte lib para usar a navegação em tab, navegacao que os botoes ficam embaixo da tela.

```bash
❯ yarn add @react-navigation/bottom-tabs
```

A seguir irei criar uma pasta dentro de src, chamada routes, com o arquivo app.routes.tsx

```tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../Pages/Dashboard";
import { Register } from "../Pages/Register";

const { Navigator, Screen } = createBottomTabNavigator();

export const routes: React.FC = () => {
  return (
    <Navigator>
      <Screen name="Listagem" component={Dashboard} />
      <Screen name="Cadastrar" component={Register} />
    </Navigator>
  );
};
```

Dentro do meu App.tsx irei importar o novigatorContainer a seguinte forma e envolver ele por toda a aplicação:

```tsx
import { NavigationContainer } from "@react-navigation/native";

return (
  return (
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
  );
);
```

## Estilizando a tab-navigation

Dentro do meu componente de rota consigo passar algumas props para eles para estilizar segue exemplo abaixo:

```tsx
import React from "react";
import { useTheme } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { Dashboard } from "../Pages/Dashboard";
import { Register } from "../Pages/Register";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const { colors } = useTheme();
  return (
    <Navigator
      tabBarOptions={{
        // cor do menu, quando esta selecionado
        activeTintColor: colors.secondary,
        // cor quando o elemento esta inativo
        inactiveTintColor: colors.text,
        // adiciona um icone ao lado do outro
        labelPosition: "beside-icon",
        style: {
          paddingVertical: Platform.OS === "ios" ? 20 : 10,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        // adicionando um icone ao lado do nome da rota
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
```

## Usando Async Storage para persistencia de dados.

Primeiro passo irei instalar a lib com o seguinte comando:

```bash
❯ expo install @react-native-async-storage/async-storage
```

A seguir irei importar o seguinte metodo:

```tsx
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

// Para armazenar as informações no meu device irei executar o seguinte metodo
await AsyncStorage.setItem(
  "chave",
  JSON.stringify(dadosSemprePrecisoConvertelosComJSON)
);

//removendo intens do asyncStorage
const removeAll = async () => {
  await AsyncStorage.removeItem(dataKey);
};
removeAll();
```

## Usando Uuids gerados com a lib react-native-uuid

Irei instalar a lib com o seguitne comando:

```bash
  ❯ yarn add react-native-uuid
```

Irei importar-lo da seguinte maneira e ao executa-lo ele irá me retornar um hash.

```ts
import uuid from "react-native-uuid";

uuid.v4();
```

## Usando Intl no android.

Para eu usar as funcoes de formatacao Intl, irei precisar instalar a seguinte lib:

```bash
❯ yarn add intl
```

Dentro do App.tsx, o meu arquivo de entrada irei fazer a seguinte importação:

```tsx
import "intl";
import "intl/locale-data/jsonp/pt-BR";
```

## Usando useFocusEffect

É um hook que sera disparado toda vez que minha interface tiver um foco por exemplo quando uso o tabNavigator ele recarrega as pages umas vez e depois fica apenas alterando entre si, entao caso precise atualizar algo ao abrir uma page preciso que esse hook seja disparado.

```tsx
useFocusEffect(
    useCallback(() => {
      // toda vez que abrir a page ele ira recarregar essa lista
      loadTransactions();
    }, []),
```

## Integrando grafico com RN

Para trabalhar com graficos irei utilizar uma lib chamada victory e para instalar irei usar o seguinte comando:

```bash
❯ yarn add victory-native
❯ yarn add react-native-svg
```

E a utilização e bem simples, irei importar o componente do grafico e utiliza-lo simplesmente assim:

```tsx
import { VictoryPie } from "victory-native";

return (
  <VictoryPie
    data={totalByCategories}
    colorScale={totalByCategories.map((category) => category.color)}
    style={{
      labels: {
        fontSize: RFValue(18),
        fontWeight: "bold",
        fill: colors.shape,
      },
    }}
    labelRadius={50}
    x="percent"
    y="total"
  />
);
```

## Usando React-Native-SVG-Transformer

Para se utilizar icones svg irei instalar a seguinte lib para utilizar o mesmo:

```bash
❯ yarn add --dev react-native-svg-transformer
```

Dentro do meu arquivo metro.config.js, irei fazer a seguinte configuração:

```ts
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };
})();
```

Dentro de src irei criar uma pasta chamada types, onde irei faze a configuracao de tipagem do meu SVG.

Dentro de types irei criar o seguinte diretorio svg/index.d.ts, irei adicionar o seguinte codigo

```ts
declare module "*.svg" {
  import React from "react";
  import { SVGProps } from "react-native-svg";

  const content: React.FC<SVGProps>;
  export default content;
}
```

## Adicionando Autenticação social no App

Irei acessar a documentação do expo no seguinte link:

https://docs.expo.dev/guides/authentication/

### Google:

A seguir precisarei clicar em Create Google Apps.

A seguir irei clicar em selecionar um projeto, apos isso irei clicar em Novo Projeto e irei criar um novo projeto.

Irei dar um nome pro meu app e irei clicar em criar.
A seguir irei clicar em "Tela de permissão OAuth.

- Irei selecionar externo para que qualquer usuario consiga se conectar
- Irei clicar em criar
- Agora irei informar algumas informacoes do meu app:
  - Apos informar esses dados irei clicar em salvar e continuar
- Irei ser direcionado para a tela de escopo e irei adicionar os escopos que desejo, nesse cenario irei escolher estes:

  - .../auth/userinfo.email
  - .../auth/userinfo.profile

- Irei clicar em atualizar
- Irei novamente clicar em salvar e continuar
- Irei clicar em salvar e continuar novamente pois nao terei usuario de teste
- E por final apos toda a config ele me fornecera um resumo.

- Irei em tela de consentimento Oatuh e irei clciar em em "Publicar Aplicativo"

### Agora irei configurar as credenciais de autenticação

Agora irei em credenciais, irei clicar em criar credencias, irei selecionar:

- Id do cliente Oath

A Seguir irei selecionar as seguintes configurações:

- Tipo de aplicativo => Aplicativo da web
- Nome => goFinances
- Adicionar Uri:
  Irei na doc do expo e irei pegar a uri, por exemplo essa:
  https://auth.expo.io
  Irei na doc do expo e irei pegar a uri de redirecionamento, por exemplo essa aqui:
  https://auth.expo.io/@your-username/your-project-slug - Lembrando que irei pegar o meu user-name do expo - Irei pegar também o nome do slug do meu app dentro do arquivo app.json

Dentro de app.json abaixo de slug irei adicionar o seguite atributo:

- "scheme":"gofinances"

Agora irei clicar em criar :)

A seguir no meu AuthContext irei criar um metodo chamado signInWithGoogle, para que eu consiga me autenticar com o Google irei utilizar o seguinte codigo:

Irei abrir a doc do google e irei pegar a url:

https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow

Irei clicar em OAuth 2.0 Endpoints e irei copiar a url informada abaixo:

Precisarei instalar as seguintes libs:

```bash
❯ expo install expo-auth-session expo-random
```

A seguir irei acessar o console no google cloud plataforma e irei pegar as seguintes informações:

ID do cliente
Chave secreta do cliente
URIs de redirecionamento autorizados

```tsx
const signInWithGoogle = async () => {
    try {
      const CLIENT_ID ='';
      const REDIRECT_URI = '';
      const RESPONSE_TYPE = '';
      const SCOPE = encodeURI('');
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      // 17:19
      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizantionResponse;
      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );
        const userInfo = await response.json();

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          photo: userInfo.picture,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
```

## Autenticando com uma conta Apple

Primeiro passo irei instalar as seguintes lib:
❯ expo install expo-apple-authentication

# Quando for utilizar a autenticacao social da Apple me atentar que eles entregam as infomações do usuario uma unica vez

```tsx
const signInWithApple = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    if (credential) {
      const userLogged = {
        id: String(credential.user),
        email: credential.email,
        name: credential.fullName?.givenName,
        photo: undefined,
      } as IUser;

      setUser(userLogged);
      await AsyncStorage.setItem(
        "@gofinances:user",
        JSON.stringify(userLogged)
      );
    }
  } catch (error) {
    throw new Error(error);
  }
};
```

## Usando variaveis de ambiente

Primeiro passo irei instalar a seguinte lib:

```bash
❯ yarn add babel-plugin-inline-dotenv
```

Agora no meu arquivo babel.config.js irei adicionar a seguinte config:

```js
plugins: ['inline-dotenv'],
```

Agora na raiz do projeto irei criar um arquivo chamado .env onde irei armarzenas as variaveis de ambiente

e irei acessa-las da seguinte forma:

const { CLIENT_ID } = process.env;

## Usando rotas privadas e publicas

Irei criar 2 arquivos de rotas um para publicas e outro par aprivadas.

Irei criar também um index que sera responsavel por favor a condicional se essa rota privda deverá ou nao ser apresentada da seguinte forma:

```tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/AuthContext";

export const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
```

```tsx
/* eslint-disable react/prop-types */
import React from "react";
import { useTheme } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { Dashboard } from "../Pages/Dashboard";
import { Register } from "../Pages/Register";
import { Resume } from "../Pages/Resume";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        // cor se estiver ativo
        tabBarActiveTintColor: colors.secondary,
        // cor quando nao estiver ativa
        tabBarInactiveTintColor: colors.text,
        // posicao do icone ao lado do texto
        tabBarLabelPosition: "beside-icon",
        // nao apresentar a status com titulo da rota
        headerShown: false,
        //estilo
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 10,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        // adicionando um icone ao lado do nome da rota
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Navigator>
  );
};
```

```tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "../Pages/SignIn";

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
};
```
