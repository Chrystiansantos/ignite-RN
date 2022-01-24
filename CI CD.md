# CI e CD para apps

**Irei utilizar App Center para auxiliar neste fluxo de CI CD**

## CI

Irei acessar o **App Center** no seguinte link, e irei clicar em **Add new app**.

<a href="https://appcenter.ms">App Center</a>

Irei preencher os campos conforme solicitados **Irei fazer um processo pra Android e outro pra IOS**:
 - Nome, nome do meu app. **Entre parentese colocar a plataforma. Pois irei criar um app pra android e outro pra IOS dentro do App Center**
 - Icon, irei clicar, e poderei selecionar o icone do meu app.
 - Release Type, irei clciar e selecionar **Production**.
 - OS, irei selecionar **Android ou IOS** com base no app.
 - Platform, React-Native.
 - E por fim clicar em **Add new app**


## Automatizando a build Android

Apos ter meu codigo no Github ou afins, irei abrir o **App Center** e clicar no nome do projeto e ir em **Build**

Irei clicar em **Github** e autorizar acesso a minha conta.
Então irei buscar o nome do meu projeto e seleciona-lo.

Irei clicar na **chave de boca** a direita, para eu fazer as configuracoes de build.

**Grande parte das configs ele identifica de forma automatica.**

  - Build Frequency, irei selecionar **Build this branch on every push**, Ele ira gerar uma nova build a cada mudanca que ocorrer na branch.
  - Build Android App Bundle, irei selecionar **on**.
  - Automatically increment version code, ele ira gerar uma versao de codigo automatizada.
  - Sign builds, precisarei assinar a build de forma automatica. E pra isso irei utilizar o arquivo que gerei dentro do meu projeto na pasta android. Irei fazer-upload dele.
  - Irei comentar a seguinte linha dentro do seguinte arquivo: **project_name/android/app/build.gradle**
      Pois quem ira cuidar dessa parte de build, agora seria o **App Center**
      ```gradle
      // signingConfig signingConfigs.release
      ```
  - Advanced, irei ativa-la, e irei selecionar **Image Url** ele ira me disponibilizar um link que poderei copiar e usar no meu readme do github, pra apresentar a versão que esta em prod. Ficando da seguinte maneira:

      [![Build status](https://build.appcenter.ms/v0.1/apps/3a31427f-dd65-442c-b6de-67ec72a88069/branches/master/badge)](https://appcenter.ms)
  
## Distribuindo o app na **Play Store**

Primeiramente irei acessar o link e fazer login:

<a href="https://play.google.com/intl/pt-BR/console/about/">Google Play Console</a>

Irei clicar em **Configuracão -> Acesso a API**

  - Irei clicar em **Criar novo projeto**
  - Em seguida irei clicar em **Vincular projeto**

A seguir irei no Google Claud Plataform, no seguinte link e fazer login.

<a href="https://cloud.google.com/">Google Cloud Platform</a>

Irei clicar em **Selecione um projeto**, e irei selecionar o projeto que acabou de ser criado la no **Google Play Console**.

Irei clicar no icone de **hamburguer**. e Em seguida em **IAM e administrador**, após ser redirecionado clicar em **Contas de servicos**, Irei clicar em **Criar uma conta de servico**.

  - Nome da conta de servico, interessante colocar um nome que faca sentido pra identificar o App.
  - Descricão da conta de servico, CI/CD com App Center,
  - Irei clicar em **criar e continuar**
  - Selecionar papel, irei buscar por **Projeto**, e clicar em **Proprietario**.
  - Clicar em **Continuar**
  - Em seguida clicar em **conluir**.
  - Irei clicar nos **3 pontinhos** abaixo de acões, e clicar em **Gerenciar chaves.**
  - Irei clicar em **Adicionar chave** em seguida **Criar nova chave**, Irei selecionar **JSON** e clicar em criar. E farei o download da chave.
  
Irei entrar no **App Center**, irei selecionar o meu projeto e clicar em:
 - Distribuite
 - Store
 - Connect to Store.
 - Google Play
 - E fazer Upload da minha chave que acabei de criar no **Google Cloud Platform**
  
Agora precisarei ir no **Google Play Console** e na pagina do meu projeto que acabei de criar, irei clicar em **Atualizar contas de servico**

E irei clicar em **Conceder acesso**. Para ele conseguir fazer a distribuicao completamente automatica. Irei selecionar:
- Administrador(Todas as permissões).

E irei clicar em **Convidar Usuario**. **Enviar convite**, Terei a parte de acesso definida.

Agora irei voltar ao **App Center** e clicar em **Connect**.
Irei informar o nome do meu pacote. irei pegar esse nome dentro do meu projeto no seguinte arquivo:
```
project_name/android/app/src/main/AndroidManifest.xml
```
package="Nome do meu pacote"

E irei adicionar o nome do meu projeto e clicar em **Assign**.
Agora irei clicar em **Build**, no canto esquerdo da tela, e em seguida na **chave de boca**. Irei buscar por **Distribute builds**
 Irei habilita-la. em seguida irei selecionar Store. E no select irei selecionar Production.

 Em release note, tenho a opcao de colocar uma mensagem padrão. **Nós estamos incluindo novas atualizacões para melhorar a experiência do usuário e corrigir bugs. Espero que voce goste.**.

 Apos isso irei clicar em save.

 Agora todos os meu commits em **Master** serão gerados uma nova build.

 ## Envio para Testers

 No meu repositorio irei criar uma nova branch.

 ```bash
❯ git checkout -b homolog
❯ git push origin homolog
 ```

 Irei abrir o **App Center**, Irei abrir o meu projeto, em seguida irei clicar em **Distribute**. E em seguida em **Groups**. E **Add Groups**, entao irei criar minha equipe de teste:
  - **Group name**, nome da equipe
  - Adicionar o email dos meus testers.
Agora irei clicar em **Build** a direita novamente. Irei clicar em Homolog. E irei clicar em **configurar**. E irei inserir os seguintes dados:
 - Build Android App bundle, **on**
 - Automatically increment version code, **on**
 - Sign buids, **on**
 - Irei pegar minha keyStore e irei adiciona-la
 - Irei preencher a senha e os dados referentes a keystore.
 - Distribute builds, irei selecionar **Groups** e irei selecionar minha equipe de teste.
 - E irei clicar em **Save e build**

Pra enviar pra producao. Irei pegar o codigo de homolog e jogar em master. E fara o build pra producao.

## Automatizando a build IOS

Irei abrir o projeto que criei pra ios clicar em **Build**, e conectar com meu repositorio.

Irei clicar em master, e irei realizar as seguintes configuracoes:
  - Automatically increment version code, ele ira gerar uma versao de codigo automatizada.
  - Sign builds, precisarei assinar a build de forma automatica. Pra isso precisarei de 2 arquivos um de **Provisionamento de perfil** e outro de **Certificado**.
  
  Para obter o meu certificado poderei ir na minha conta de desenvolvedor da Apple. Irei clicar em:

   - Certificates, Identifiers & Profiles
   - Irei clicar no **+** Para criar um certificado.
   - Apos criado irei clicar no meu certificado e fazer download.
   - Irei abrir o usando cmd+espaco **keynote**, e arrastar o certificado la pra dentro ou instala-lo.
   - Irei clicar com o botao direito no certificado dentro do **keynote** e irei exporta-lo. Entao conseguirei salvar como .p12, Vou deixar sem senha. <br><br>
  
  Para obter o meu perfil de provisionamento:
   
   - Certificates, Identifiers & Profiles
   - Irei clicar em **Profiles**.
   - Irei clicar no botao de **+**. pra adicionar um novo perfil de provisionamento. Irei selecionar o seguinte:
     - Distribution -> **App Store**
     - Clico em continuar
   - Seleciono o meu App ID.
   - E agora irei selecionar o meu certificado que acabei de criar.
   - Irei dar um nome pro meu Perfil de provisionamento pode ser "ProductionProfile"
   - E clico em Download e em seguida irei fazer upload dele no **App Center**
  
  - Automatically increment version code, ele ira gerar uma versao de codigo automatizada.
  
  Advanced, irei ativa-la, e irei selecionar **Image Url** ele ira me disponibilizar um link que poderei copiar e usar no meu readme do github, pra apresentar a versão que esta em prod. Ficando da seguinte maneira:

  [![Build status](https://build.appcenter.ms/v0.1/apps/3a31427f-dd65-442c-b6de-67ec72a88069/branches/master/badge)](https://appcenter.ms)

  Irei clicar em **Save e Build**

  ## Distribuindo o app na **Apple Store**

  Irei clicar no nome do meu app, na tela inicial do **App Center**. Em seguida irei clicar em **Distribute**, e apos isso clicar em **Store**. E entao escolher **App Store Connect**. E a seguir fazer login com meu email e usuario Apple.

  Apos esses passos irei selecionar o meu time, que criei la dentro da Apple developers. Apos selecionar o time, ele ira listar os apps que estao publicados.

  **Como esta habilitado autenticacao de 2 fatores precisarei criar uma senha para isso no App Center**

  Para isso irei clicar em **Add**, e irei seguir todo o passo a passo, que esta no link abaixo do input. E irei colar a senha no input.

  Após esse passo irei clicar em **Assign**. 

  Agora irei clicar em Build novamente, na **chave de boca**, irei em:

    - Distribute builds.
    - Selecionar store.
    - No destino irei selecionar Production.
  
  Apos essas configuracoes irei clicar em **Save e build**

  **Sempre verificar na loja pois ele disponibiliza o app porem nao publica de forma automatica como no Android, então precisarei clicar para enviar para a revisão**


 ## Envio para Testers

 Irei abrir o **App Center**, Irei abrir o meu projeto, em seguida irei clicar em **Distribute**. E em seguida em **Groups**. E **Add Groups**, entao irei criar minha equipe de teste:
  - **Group name**, nome da equipe
  - Adicionar o email dos meus testers.
Agora irei clicar em **Build** a direita novamente. Irei clicar em Homolog. E irei clicar em **configurar**. E irei inserir os seguintes dados:
   - Irei Marcar **Automatically increment build number**
   - Na parte de signIn vou carregar meus arquivos gerados, arquivo de provisionamento e certificado.
   - Distribute builds, on, Irei selecionar Store, e em seguida selecionar a equipe de teste que configurei dentro do Apple developers
   - Advaced habilitado

  Irei clicar em **Salvar**


# Code Push (OTA)

**Quando faco alteracoes em codigo nativo ou alteracoes de libs nativas, eu preciso enviar o app a loja novamente pra ser feito analise**

## Android

Primeiro passo e instalar o **Code Push** dentro do nosso app.

```bash
❯ yarn add react-native-code-push
```

Primeiramente irei abrir o arquivo:

```
project_name/android/settings.gradle
```
No final dele irei acrescentar as seguinte linhas:
```gradle
...
include ':app', ':react-native-code-push'
project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')
```

Apos inserir essas 2 linhas irei abrir este outro arquivo:

```
project_name/android/app/build.gradle
```

Abaixo desta importacao **apply from: "../../node_modules/react-native/react.gradle"** irei adicionar a seguinte linha:

```gradle
apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"
```

Agora irei abrir o seguinte arquivo:

```
project_name/android/app/src/main/java/com/myskills/MainApplication.java
```

Dentro dele irei adicionar a importarcao

```java
import com.microsoft.codepush.react.CodePush;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        
        // No final da funcao irei adicionar esse trecho de codigo
        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }
    };
}
```

Irei abrir o seguinte file:

```
project_name/android/app/build.gradle
```

Irei pesquisar por **buildTypes** e dentro de **debug** irei adicionar a seguinte line:

``` gradle
    debug {
            signingConfig signingConfigs.debug
            <!-- Linha adicionada -->
            resValue "string", "CodePushDeploymentKey", '""'
        }
```

Logo abaixo de **debug**, apos fechar a chave irei adicionar esta linha:

```gradle
 releaseStaging {
            resValue "string", "CodePushDeploymentKey", '"<INSERT_HOMOLOG_KEY>"'
            matchingFallbacks = ['release']
        }
```

Logo abaixo de release Staging dentro de **release** vou adicionar o seguinte trecho antes do fechamento da chave.
```
    resValue "string", "CodePushDeploymentKey", '"<INSERT_PRODUCTION_KEY>"'
```

Irei no **App Center**, vou abrir meu projeto irei clicar em **Distribute -> CodePush** Irei clicar em **Create standard deployment**

Irei clicar na **chave de boca** no canto direito da tela e ele vai me mostrar as 2 chaves, por eu ter um ambiente de prod e homolog.

Apos ter a chave de prod e de homolog irei copia-las e irei atualizar as chaves acima com base nas informacoes recebidas pelo **App Center**

## Utilizando Code Push Android

Irei abrir o meu **App.tsx**, e irei adicionar o seguinte codigo.

```tsx
import codePush from 'react-native-code-push';
import { Home } from './src/pages/Home';

function App() {

  useEffect(() => {
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }, []);
  
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Home />
    </>
  );
}

export default codePush({
  // Com qual frequencia ele ira verificar por atualizacoes em nosso app
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
```

Irei instalar a CLI do **App Center** global no meu pc.

```bash
npm install -g appcenter-cli
```

E agora irei fazer login no **AppCenter**

```bash
appcenter login
```

Ele ira abrir uma pagina no navegador com um codigo de autenticacao, irei copiar o codigo informado no navegador e colar no terminal.

```bash
appcenter codepush release-react -a nome_organizacao/nomeProgeto -d nomeDaBranch
```