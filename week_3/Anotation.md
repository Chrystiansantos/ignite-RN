# Integrando calendario ao App.

Primeiro passo irei instalar a lib react-native-calendars

```bash
❯ yarn add react-native-calendar
```

# Animações

Primeiro passo irei instalar o react-native-reanimaed, da seguinte forma:

```bash
❯ expo install react-native-reanimated
```

Após a instalação preciso configurar um plugin no babel, irei no arquivo babel.config.js e irei adicionar o seguinte plugin:

plugins: ['react-native-reanimated/plugin'],

## Fazendo a splashScreen animada

Dentro das minhas pages irei criar um arquivo chamado Splash, que sera a splashScreen

# Semana 4 Offiline First

## Tipando interface com as opcoes de nomes dos icones do Feather:

```tsx
import { Feather } from "@expo/vector-icons";
import { TextInputProps } from "react-native";

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}
```

Dessa forma quando der um cmd + espaco no meu componente pai ira aparecer as opcoes de nomes de icones

## KeyboardType:

Caso deseje posso alterar o type do teclado fazendo o apresentar apenas os caracters par cada atividade, exemplo:

- Ligação apresentar apenas numeros.
- Email mostrar o teclado email.
  Para fazer isso basta que eu use essa props em um textInput da seguinte forma:

```tsx
<Input keyboardType="email-address" />
```

<b>Sempre verificar na docs, quais funcionam em ios e quais funciona em android </b>

## Empurrando os elementos da tela para cima ao abrir o teclado

Irei importar o seguinte componente, que sua funcao e movimentar os elementos da tela quando o teclado aparece

```tsx
import { KeyboardAvoidingView } from "react-native";
```

Irei envolver toda a interface que eu desejo movimentar por esete componente

```tsx
<KeyboardAvoidingView behavior="position" enabled>
behavio => seria o tipo de movimentacao podendo ser tbm margin e paddin
enabled => informa que esta habilitado

Todos elementos que desejo movimentar quando abrir o teclado
</KeyboardAvoidingView>
```

Para que o usuario consiga fechar o teclado clicando em qualquer lugar fora do input precisarei importar o seguinte componente:

```tsx
import { TouchableWithoutFeedback, Keyboard } from "react-native";
```

Dentro do meu KeyboardAvoidingView irei passar o TouchableWithoutFeedback, e fechar ele antes de fechar o KeyboardAvoidingView da seguinte forma:

```tsx
<KeyboardAvoidingView behavior="position" enabled>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //Conteudo da page
  </TouchableWithoutFeedback>
</KeyboardAvoidingView>
```

## Refactor, devido ao teclado no android abrir e fechar ao clicar pela primeira vez

O problema ocorria ao atulizar uma props do compoenente pai do input o "Container", que ao atulizar a props era reenderizado novamente, sendo assim alteramos o a props e a estilizacao para ficar agregada somente ao input da seguinte forma, resolvendo o problema:

```tsx
// Antes
<Container isFocused={isFocused}>
  <IconContainer>
    <Feather
      name={iconName}
    />
  </IconContainer>
  <InputText
    onFocus={handleInputFocused}
    onBlur={handleInputBlur}
    {...rest}
  />
</Container>
// Depois
<Container>
  <IconContainer>
    <Feather
      name={iconName}
    />
  </IconContainer>
  <InputText
    isFocused={isFocused}
    onFocus={handleInputFocused}
    onBlur={handleInputBlur}
    {...rest}
  />
</Container>
```

## Validação utilizando o Yup

Primeiro passo precisarei instalar o yup da seguinte maneira:

```bash
❯ yarn add yup
```

Irei importalo da e a seguir utiliza-lo da seguinte maneira:

```tsx
import * as Yup from "yup";

// Aqui crio um schema com as regras de validacao
const schema = Yup.object().shape({
  email: Yup.string()
    .required("E-mail obrigatório")
    .email("Digite um e-mail válido"),
  password: Yup.string()
    .required("A senha é obrigatoria")
    .min(8, "No minimo 8 caracters"),
});

// A seguir irei verificar as informacoes:

try {
  await schema.validate({ email, password });
  Alert.alert("Deu certo");
} catch (error) {
  // Aqui verifico se o erro e do yup pois pode ser um erro da api etc
  if (error instanceof Yup.ValidationError) {
    return Alert.alert("Opa", error.message);
  }
  return Alert.alert(
    "Erro na autenticação",
    "Ocorreu um erro ao fazer login verifique suas credenciais"
  );
}
```

## Usando watermelon para salvar dados no app.

- Configurando o database:

  <b>Como o watermelon, é um banco de dados que ira usar recursos nativos do proprio cell, por isso nao consigo acessar o banco de dados do wattermelon atraves da cli do expo, por isso irei iniciar com o seguinte comando

  ```bash
    ❯ yarn run ios
    ❯ yarn run android
  ```

  </b>

  Primeiro preciso instalar as libs:

  ```bash
  ❯ yarn add @nozbe/watermelondb
  ❯ yarn add --dev @babel/plugin-proposal-decorators
  ```

  Irei no arquivo .babelrc e irei adicionar o seguinte codigo, caso ja tenha alguma informacao dentro destes array, irei adicionar em uma nova posicao

```js
 {
 "presets": ["module:metro-react-native-babel-preset"],
 "plugins": [
   ["@babel/plugin-proposal-decorators", { "legacy": true }]
 ]
 }
```

## Instalação para ios

Primeiro passo irei instalar as libs:

```bash
  ❯ yarn add @nozbe/watermelondb
  ❯ yarn add --dev @babel/plugin-proposal-decorators
```

Após instalar as libs irei adicionar essa posicao o meu array do babel, da seguinte forma:
```js
"plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
```

Apos feito isso irei abrir meu app no xcode, e no nome do app da raiz irei criar uma file com o seguinte nome:

<b>wmelon.swift</b>

irei adicionar o seguinte ao meu podfile

```ruby
# If you're using autolinking, this line might not be needed
pod 'WatermelonDB', :path => '../node_modules/@nozbe/watermelondb'

# NOTE: Do not remove, needed to keep WatermelonDB compiling:
pod 'React-jsi', :path => '../node_modules/react-native/ReactCommon/jsi', :modular_headers => true

# NOTE: This is required as of v0.23
pod 'simdjson', path: '../node_modules/@nozbe/simdjson'
```

Feito isso irei na pasta ios, e rodar 
```bash
  ❯ pod install
```

A seguir iremos criar a estrutura da nossa base de dados. Entao dentro de src irei criar uma pasta chamada databases, e dentro dessa pasta vou criar outr chamada models, onde ira ficar as models da seguinte forma:

```ts
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class User extends Model {
  // Nome do nossa tabe e modelo
  static table = 'users';

  // Nome do campo na table
  @field('user_id')
  // nome do campo no model
  user_id!: string;

  @field('name')
  name!: string;

  @field('email')
  email!: string;

  @field('driver_license')
  driver_license!: string;

  @field('avatar')
  avatar!: string;

  @field('token')
  token!: string;
}

```

Para usar decorator preciso ir no ts-config e adicioanr o seguite trecho de codigo dentro de compileOptions:
```json
"experimentalDecorators": true
```

Agora irei criar uma pasta chamada schema. Que sera basicamente a representacao da tabela no banco de dados. Schema seria a definicao da tabela em si. Da seguinte forma:

```ts
  import { tableSchema } from '@nozbe/watermelondb';

export const userSchema = tableSchema({
  name: 'users',
  columns: [
    {
      name: 'user_id',
      type: 'string',
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'driver_license',
      type: 'string',
    },
    {
      name: 'avatar',
      type: 'string',
    },
    {
      name: 'token',
      type: 'string',
    },
  ],
});
```

Dentro de schema, irei criar um arquivo chamado index, pra quando precisar importar todos os schemas eu usar ele, farei isso da seguinte forma:

```ts
import { appSchema } from '@nozbe/watermelondb';

import { userSchema } from './userSchemas';

export const schemas = appSchema({
  version: 1,
  tables: [userSchema],
});
```

Na raiz da pasta database, irei criar uma file, chamada index.ts que sera o arquivo responsavel pela conexao com o banco de dados, com o seguinte codigo:

```ts
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schemas';

import { User } from './models/user';

const adapter = new SQLiteAdapter({
  schema: schemas,
});

export const database = new Database({
  adapter,
  modelClasses: [User],
});
```

## Persisntindo dados no watermelon

Primeiramente irei importar o database, a seguir irei importar o model, para que eu consiga usar a tipagem:


```ts
import { database } from '../../database';
import { User as ModelUser } from '../../database/models/user';
```
Irei fazer a insercao da seguinte maneira:

```ts

  // Toda a modificacao de escrita edicao ou exclusao deve ser feita dentro desse write
      await database.write(async () => {
        // Primeiro resgato a minha colecao
        const userCollection = database.get<ModelUser>('users');
        // Toda a insercao de dados no watermelonprecisa ser dentro de uma action
        await userCollection.create(newUser => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });
```
****
## Buscando dados no watermelon
```ts
  // Primeiro chamo a collection
      const userCollection = database.get<ModelUser>('users');
      // A seguir executo a query
      const response = await userCollection.query().fetch();
      // Aqui consigo pegar os dados, sempre preciso passar esse unknown e depos a tipoagem
      const userData = response[0]._raw as unknown as IUser;
  }, []);
```

## Acesando a galeria para coletar uma imagem

Para poder selecionar a imagem irei utilizar o image-picker do expo.

Primeiramente irei instalar da seguinte forma:

```bash
❯ expo install expo-image-picker
```

irei importa-lo da seguinte forma:

```tsx
import * as ImagePicker from 'expo-image-picker';

const handleSelectAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      // Dessa forma ele conseguira editar somente images
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // Permitir o usuario a editar a imagem
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (result.cancelled) return;
    if (result.uri) {
      setAvatar(result.uri);
    }
  };
```
