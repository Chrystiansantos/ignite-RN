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

Irei abri o xcode, para isso irei abrir a pasta do meu projeto, irei na pasta ios, e irei abrir o arquivo nomeProjeto.xcodeproj