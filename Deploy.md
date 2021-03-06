# Deploy android e ios.

Primeiro, preciso criar uma conta de dev, no seguinte link abaixo:

<a href="https://developer.apple.com/programs/">Apple Developer Program</a>
<a href="https://developer.apple.com/app-store/review/guidelines/">Apple Store Review Guidelines</a><br>

<a href="https://play.google.com/intl/pt-BR/console/about/">Google Play Console</a>

**Quando meu app tiver umas pequenas funcionalides, funcionando que permite utilizar o minimo, ja devo fazer um deploy pra ios**

### Irei clonar o template pro meu Figma para facilitar a criacao de assets, (icons, splash, screens).

# Android

## Extraindo screen shot do emulador.

Irei abrir o android studio:
  - Irei clicar em open project exist.
  - Irei abrir a pasta do meu projeto, e irei abrir a pasta andoid.
    - Irei no final da tela e clicar em "Logcat", clicarei nas 3 setinhas e irei clicar na camerazinha ele ira abrir uma tela com um screendshot.
    - Posso tirar a screen shot, pelo prorip app, clicarei nos 3 potinhos ao lado do app e em settings, vou criar uma pasta no campo screenshot save location, onde ficara salvo as minhas imagens.

## Gerando icones

  Dentroda minha aplicacão, irei criar uma pasta chamada resources, onde irei deixar os assets de publicacao.
  
  No meu template irei adicionar o icone,no centro da imagem para eu ter uma ideia de como ficaria, apos isso irei exporta-lo como **png**. Então irei salva-lo dentro de resource/logo.png

- Irei abrir o meu projeto no android studio.
- irei clicar na seta apos o android.
- clicar em Project.
- Irei abrir a pasta do projeto, clicar em app com o botao direito.
- Na opcao new, irei clicar em **Image Asset**
- Ira abrir uma janela para configuracao de imagem, nessa janela irei conseguir configurar o icone da nossa aplicacao

### Irei selecionar **Foreground Layer**

- Assets type, irei selecionar Image
- Irei clicar no path, irei buscar pelo icone que baixei do figma
- Trim, irei selecionar yes, ele dara uma reajustada automaticamente no icone
- Resize, eu consigo redmensionar o tamanho do meu icone
  
### Irei selecionar **Background Layer**

  - Assets type, irei selecionar Color, ele ira habilitar uma caixa pra eu selecionar a cor de fundo

Irei clicar em next, ele ira dar um resumo do que foi realizado nos passos anteriores em seguida após clicar em **Finish** ele ira criar varias pastas com as configuracoes de icones.

Após executar meu app novamente ele deverá apresentar o icone da nossa aplicacão.

## Mudando o nome do app

No vs-code, irei acessar o seguinte arquivo:
```
project_name/android/app/src/main/res/values/strings.xml
```

Em app_name, irei adicionar o nome do meu app da seguinte forma:

```xml
<string name="app_name">MySkills</string>
```

Após executar meu app novamente ele deverá apresentar o nome do app conforme informado.

## Gerando a Splash Screen

Primeiramente irei criar uma pasta com o nome **drawable** no seguinte diretorio
```
project_name/android/app/src/main/res/drawable
```

Em seguida dentro da pasta que acabei de criar irei criar o seguinte arquivo **background_splash.xml**

Dentro desse arquivo irei adicionar esse codigo xml.

Onde cada valor dentro de **background_splash.xml** significa:
 - width, largura do icone
 - heigth, altura do icone
 - drawable, nome do icone
 - gravity, posicao do icone

```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item
    android:drawable="@color/splashscreen_bg"/>

  <item
    android:width="300dp"
    android:height="300dp"
    android:drawable="@mipmap/splash_icon"
    android:gravity="center" />
</layer-list>
```

Após essa configuracao irei dentro da pasta:
```
project_name/android/app/src/main/res/values
```

Criar uma file com o seguinte nome **colors.xml** e adicionar o seguinte codigo:

Onde cada valor dentro de **background_splash.xml** significa:
 - splashscreen_bg, cor de fundo da splash screen
 - app_bg, cor de fundo padrao do app.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <color name="splashscreen_bg">#121015</color>
  <color name="app_bg">#121015</color>
</resources>
```

Agora irei atualizar o meu arquivo

```
project_name/android/app/src/main/res/values/styles.xml
```

E irei atualizar ele com o seguinte conteudo.

Onde cada valor dentro de **styles.xml** significa:
 - android:textColor, cor padrão do texto.
 - android:statusBarColor, cor padrão da statusbar, @colors/app_bg, estou herdando essa cor la de dentro do arquivo colors.xml
 - android:windowLightStatusBar, para a statusbar ficar com um fundo branco
 - android:windowBackground, cor de background das telas do app
 - android:statusBarColor, cor de fundo da statusBar na splash
 - android:background, cor de fundo do icone, @drawable/background_splash estou herdando essa cor de dentro do arquivo @drawable

```xml
<resources>
  <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="android:textColor">#fff</item>
    <item name="android:statusBarColor">@color/app_bg</item>
    <item name="android:windowLightStatusBar">true</item>
    <item name="android:windowBackground">@color/app_bg</item>
  </style>

  <style name="SplashTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="android:statusBarColor">@color/splashscreen_bg</item>
    <item name="android:background">@drawable/background_splash</item>
  </style>
</resources>
```

Agora irei atualizar também o meu arquivo **AndroidManifest.xml** pra configurar qual o arquivo deve ser aberto quando nosso app e carregado como uma spash.

Dentro do meu arquivo vou adicionar as seguintes linhas, acima do activity existente.

```xml
<activity
  android:name=".SplashActivity"
  android:theme="@style/SplashTheme"
  android:label="@string/app_name">
    <intent-filter>
      <action android:name="android.intent.action.MAIN" />
      <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```


No activity abaixo irei remover o **<intent-filter>**, pois iremos utilizar oque adicionamos acima. E também irei adicionar a seguinte linha, dentro do activity.

```xml
    <activity
      ...
      android:exported="true"
    ></activity>
```

Após essa configuracao irei dentro da pasta:
```
android/app/src/main/java/com/project_name
```

Criar uma file com o seguinte nome **SplashActivity.java** e adicionar o seguinte codigo:

Irei atualizar o rn_splashscreen_tutorial, com o nome do meu projeto

```java
package com.rn_splashscreen_tutorial; // Altere para o seu pacote

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    Intent intent = new Intent(this, MainActivity.class);
    startActivity(intent);
    finish();
  }
}
```

Irei no meu template do figma, e irei expotar o meu icone tanto em 1x, 2x e 3x e irei salvar dentro da pasta que criei chamada resources.

Irei abrir o arquivo **background_splash.xml** e irei copiar o nome que esta em **drawable** e irei renomear os meus icones com esse nome.

Irei pegar os arquivos baixados e copia-los para o seguinte diretorio.

- Imagem 1x:
  Vou remover a informacao de 1x deixando somente o nome, pois ja irei copia-la para a pasta referente a 1x. No seguinte diretorio
    ```
    myskills/android/app/src/main/res/mipmap-hdpi
    myskills/android/app/src/main/res/mipmap-mdpi
    ```

- Imagem 2x:
  Vou remover a informacao de 2x deixando somente o nome, pois ja irei copia-la para a pasta referente a 2x. No seguinte diretorio
    ```
    myskills/android/app/src/main/res/mipmap-xhdpi
    ```
- Imagem 3x:
  Vou remover a informacao de 3x deixando somente o nome, pois ja irei copia-la para a pasta referente a 3x. No seguinte diretorio
    ```
    myskills/android/app/src/main/res/mipmap-xxhdpi
    myskills/android/app/src/main/res/mipmap-xxxhdpi
    ```

### Segurando a splash ate que o app seja totalmente carregado

Irei instalar a seguinte lib no terminal.

```bash
❯ yarn add react-native-splash-screen
❯ npx react-native link react-native-splash-screen
```

Irei acessar o seguinte arquivo:

```
project_name/android/app/src/main/java/com/project_name/MainActivity.java
```

Dentro do **MainActivity** irei adicionar o seguinte trecho de codigo, antes do primeiro @override. E adicionar as 2 importacoes

```java
import org.devio.rn.splashscreen.SplashScreen; // Adicione esse import
import android.os.Bundle; // Adicione esse import

 @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
```

Agora dentro do seguinte diretorio irei criar uma nova pasta chamada **layout**. E dentro dessa pasta irei criar uma arquivo com o seguinte nome **"launch_screen.xml"**.

```
project_name/android/app/src/main/res
```

Apos criar o arquivo irei adicionar o seguinte trecho de codigo:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="@drawable/background_splash"
  android:orientation="vertical">
</LinearLayout>
```

Após essas configuracoes irei no meu arquivo App.tsx, e irei adicionar a importacao e um useEffct pra remover a splash somente apos o app ser carregado.

```tsx
import SplashScreen from 'react-native-splash-screen';

useEffect(() => {
    SplashScreen.hide();
  }, []);
```

  ## Gerando Android App Bundle

  Gerando o arquivo de distribuicao do nosso App. Para poder envia-lo a Google Play.

  Irei acessar o seguinte link pra seguir a documentacao:

  <a href="https://reactnative.dev/docs/signed-apk-android">Publishing to Google Play Store</a><br>

  Primeiramente preciso gerar uma assinatura pra fazer upload do meu app. Pra isso vou entrar dentro da pasta android/app, em seguida vou executar o seguinte comando, que ira gerar um arquivo chamado **production-android.keystore**

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore production-android.keystore -alias production-android -keyalg RSA -keysize 2048 -validity 10000
```

Em seguida irei criar uma senha pra minha chave. E irei confirmar, apos isso ele pedira algumas informacoes eu digitarei tudo enter. Pois depois irei preencher.

Agora irei definir as variaveis para acessar essa minha chave.

Irei acessar a seguinte pasta para configurar minha chave local, na minha maquina acessando o seguinte endereco:

```bash
code ~/.gradle/gradle.properties
```
E dentro dele irei inserir o seguinte codigo:

```gradle
MYAPP_UPLOAD_STORE_FILE= nome da minha chave que acabei de criar dentro da pasta android "production-android.keystore"
MYAPP_UPLOAD_KEY_ALIAS= nome da minha alias referente a chave que acabei de criar "production-android"
MYAPP_UPLOAD_STORE_PASSWORD=Senha que criei
MYAPP_UPLOAD_KEY_PASSWORD=senha que criei
```


Agora precisarei acessar o seguinte arquivo:

```bash
project_name/android/app/build.gradle
```

Irei procurar por signingConfigs e dentro da chaves irei adicionar a seguinte configuracao de release

```gradle
release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
```

Logo abaixo irei alterar a seguinte linha de debbug para release, dentro de 
buildTypes: {
  releases:{
    
  }
}

signingConfig signingConfigs.debug => signingConfig signingConfigs.release

Irei pesquisar por essa linha dentro da minha file de gradle e alterar para true.
```gradle
<!-- Mecanismo pra acelerar a inicializacao de aplicacoes -->
project.ext.react = [
    enableHermes: true,  // clean and rebuild if changing
]
<!-- Para o meu app enviar o bundle pra store, e ela redirecionar o mais otimizado ao usuario -->
def enableProguardInReleaseBuilds = true 
```

**Agora irei gerar minha build executando o seguinte comando dentro da pasta android:**

```bash
./gradlew bundleRelease
```
O meu bundle sera gerando dentro do seguinte diretorio:

```bash
projetct_name/app/build/outputs/bundle/release/app-release.aab
```

## Configurando a Google Play Store

Primeiramente irei acessar a **Google Play Console** no seguinte linke:

<a href="https://play.google.com/intl/pt-BR/console/about/">Google Play Console</a><br>

Irei clicar em **Criar App**.
 
 Irei inserir as seguintes informacoes:
  - Nome do app.
  - Selecionar o idioma padrão.
  - Informar se e um App ou um jogo.
  - Informar se e gratuito ou pago.
  - Confirmar as delcaracões

Após esses passos irei clicar novamente em **Criar App**

Agora irei clicar em **Presenca na loja** e em seguida **Versao principal da pagina detalhes di app**

- Teremos o nome do app.
- Podemos adicionar uma breve descricao.
- Abaixo poderemos adicionar uma descricao mais completa.

Agora iremos adicionar os elementso graficos.

No nosso template do Figma irei exportar o meu icone que esta ao lado da splash com a cor de fundo pra fazer upload no **Icone do aplicativo**. Esse será o icone que ira aparecer na loja no momento de fazer a instalacao.

Para o **Recurso Grafico**, existe um banner no template que eu posso exporta-lo, e irei fazer upload desse baner.

Para **Capturas de tela do telefone** irei abrir meu template no figma e irei pegar algumas screendshots do meu app para fazer upload.

Após isso irei clicar em **Salvar**.

Agora irei clicar em Painel, e vou em configurar o App.

E vou configurar o **Acesso do app**

  E vou informar se todos os recursos estao disponiveis ou se algum sao restritos.
   - Caso tenha algum recursos que seja restrito (Por exemplo um app com autenticacao) precisarei preencher um usuario de teste. No caso se possuir autenticacao social nao preciso informar pois eles ja possuem

E vou configurar o **Os anuncios**
  - Caso meu app tenha anuncios irei clicar em sim, caso contrario nao

E vou configurar o **Classificacao de conteudo**
  - Vou responder um questionario para receber uma classificao, referente ao meu app.

E vou configurar o **publico alvo do app**.
  - Vou selecionar a faixa de idade.

E vou configurar se e um app de noticias, no caso ele faz essa pergunta devido a questoes de fake news.
 - Vou selecionar sim ou nao.

Agora irei selecionar uma categoria do app e fornecer alguns detalhes.

Antes de publicar e disponibilizar nosso app pra todos os usuario precisamos testar, entao podemos disponibilizar primeiramente pra tester, e apos os testes conseguimos liberar pra producao.

Irei clicar em **Teste, Teste interno**.
 Após isso irei clicar em criar uma nova versão.
  - Irei cliecar em continuar.
  - Em seguida irei pegar o meu bundle e irei arrasta-lo pra dentro do navegador.
  - Apos isso irei atualizar as informacoes de versao
  - Agora irei clciar em teste interno, irei clicar em testadores, e poderei adicionar uma lista de testadores. clicando em Criar lista de emails.
  - Irei clicar em **Salvar alteracoes**.
  - Sera disponibilizado um link, que poderei enviar pra algum usuario que eu  queira que ele teste.

Agora irei clicar em **Visao Geral das Versoes**, vou clicar em e clico na seta pra visualizar a versão, e posso clicar em **Avaliar a versao** e clicarei em **Iniciar lancamento para testes internos**.

## Instalando app pra teste.

 Irei clicar em **Teste**, **Teste interno** clicarei em testaadores e irei copiar o link ao final da pagina, que sera o link de download do meu app.

## Disponiblizando o App em producao.

Irei clicar em **Visao Geral das Versoes**, irei clicar em **Producão** logo abaixo.

  Em seguida irei selecionar **Paises/regiões**
   - Vou selecionar quais paises e regioes eu desejo que meu app esteja disponivel.
   - Após isso irei clicar em **Criar uma nova versão**, porém não precisamos fazer o upload novamente, irei clicar em **Adicionar biblioteca** e selecionar o bundle que enviei anteriormente.
   - Logo abaixo irei preencher os detalhes de versao novamente.
   - Clico em **Avaliar versão**, e em seguida clico em **Iniciar lancamento para Producão**.
   - Agora irei aguardar a revisao ser concluida.
  <br>
  <br>
  <br>
# IOS

## Configurando icones no ios.

Primeiro passo irei acessar a pasta ios e rodar o seguinte comando:

```bash
❯ pod install
```

Irei abrir o meu projeto, no xcode, navegando ate a pasta do meu projeto e abrindo o seguinte arquivo dentro de ios/project_name.xcworkspace.
  - Em seguida irei clicar no nome do meu app e ira abrir uma cascata de pastas abaixo.
  - Irei clicar em **Images**, e logo em seguida clicar em **AppIcon**
  - Irei no meu template do figma e irei baixar os meus icones para que eu possa utiliza-los.
    - Clicando no icone do Figma a esquerda, **File, Export**, e irei exportar todos os arquivos necessarios.
  - Irei abrir a pasta onde salve os icones e irei arrastar eles pra respectiva box, dentro do Xcode.


## Alterando o nome do App.
  Irei clicar no nome do projeto. Em seguida em General e irei editar o input **Display Name** sendo assim ele ira atualizar o nome do meu app.

  No identificador do bundle, irei fazer da mesma forma que fiz no android:
  **com.myskills**

### Desativando a rotacao, caso o usuario gire a tela ela nao vire o app.
  Irei clicar no nome do projeto. Em seguida em General e irei desmarcar os seguintes check-box:
   - Landscap Left
   - Landscap Right
  
## Configurando a SplashScreen

  Irei clicar em **LaunshScreen** dentro do meu projeto no xcode.

  Irei clicar nos textos, que estao na tela e pressionar delete no teclado.
  E pra customizar minha splash eu seleciono o fundo e posso clicar no background a direita pra altera-lo.
  Irei clicar em Images, dentro do meu projeto **Mesmo que cliquei pra criar o icone**, e logo abaixo irei clicar no +.
  E irei clicar em Image Set
  - Entao vou no figma, vou selecioanr o icone da minha aplicacão. **Agora e somente o icone e irei exporta-lo em 1x 2x e 3x**
  - Agora vou clicar em LaunchScreen novamente. Para eu adicionar a imagem que acabei de importar na tela.
  - Irei clicar em View, e em seguida no +, irei selecionar Image View e arrastar pra tela.
  - Irei clicar no meu box de image, e em seguida a direita irei clicar no input de image, e selecionar a imagem que acabei de inserir

### Segurando a splash ate que o app seja totalmente carregado IOS

Irei instalar a seguinte lib no terminal.

```bash
❯ yarn add react-native-splash-screen
❯ npx react-native link react-native-splash-screen
```
Entrar  na pasta ios e rodar o seguinte comando:

```bash
❯ pod install
```

A seguir irei abrir a pasta IOS, dentro dela terei o arquivo com o seguinte nome, **AppDelegate.m**. E irei adicionar as seguintes linhas:

```m
// Abaixo do <React/RCTootView.h>
#import <RNSplashScreen.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ...
  [RNSplashScreen show];
  return YES;
}
```

Após essas configuracoes irei no meu arquivo App.tsx, e irei adicionar a importacao e um useEffct pra remover a splash somente apos o app ser carregado.

```tsx
import SplashScreen from 'react-native-splash-screen';

useEffect(() => {
    SplashScreen.hide();
  }, []);
```
## Criando um App Id

Primeiramente irei fazer login no site de developers, da apple:

<a href="https://developer.apple.com/">Apple Developer Program</a>

Irei clicar em:
 - Certificates, Identifiers & Profiles.
 - Identifiers
 - Sinalzinho de +
 - AppIds, continue.
 - App, continue

Irei adicionar uma descricao.

A seguire em **BUndle ID**, irei selecionar explicit, e irei pegar o bundle do meu app dentro do xcode. Entrando no projeto, clicando **NomeProjeto** abaixo de **Targets** e irei pegar o **Bundle Identifier** a direita.

Logo abaixo irei marcar as opcoes que contenha em meu app. Exemplo:
 - Autenticacao com apple.
 - Push Notifications.
 - Entre outros.

Em seguida irei clicar em continue.

A seguir clicar em **Register**.

Irei voltar no Xcode, clicar em Signing & Capabilities. E no select de **Team** irei selecionar o meu usuario.

Apos isso irei clicar em project_nameTests abaixo de **Targets** e irei fazer o mesmo processo. Clicar no select de **Team** e selecionar o meu usuario

**Muito importante que eu esteja logando com minha conta Apple**

## Gerando IPA do App.

Irei clicar em **info.plist**, dentro da pasta do meu projeto.

Irei no final, clicar com o direito e **Add row**, irei adicionar a seguinte informacao:

| Key                            |  Type   | Value |
| ------------------------------ | :-----: | ----: |
| App Uses Non-Exempt Encryption | Boolean |    NO |

**App Uses Non-Exempt Encryption** => Se meu app usa criptografia além do que a Apple disponibiliza

Onde eu seleciono o device, irei clicar no seguinte **Any IOS Device(arm64, armv7)**

Irei clicar em **Product** no topo da tela. Em seguida **Archive**. Apos clicar ele ira comecar a gerar o App para que consigamos, detribui-lo na loja.

Em seguida ele ira abrir uma janela. Para que possa enviar o App pra loja. Mas antes preciso criar o projeto dentro da Apple Store.

<a href="https://developer.apple.com/">Apple Developer Program</a>

Irei acessar, clicar em:
  - Account
  - App Store Connect
  - Go To App Store Connect
  - Meus Apps
  - Sinal de +, para adicionar um novo App.
  - Selecionarei as seguinte opcoes:
    - Plataforma: IOS
    - Nome do meu App.
    - Idioma Principal: PT-BR
    - Irei escolher o meu projeto, que acabei de criar, posso indentifica-lo pelo bundle.
    - Irei colocar o nome do meu app novamente.
    - Acesso total ou limitado
  
Clico em **Criar App**.

Agora irei clicar na janela que havia aparecido antes, clicar em:
  - **Distribute App**
  - **App Store Connect**
  - **Upload**
  - **Next**
  - **Automatically manage signing**
  - **Generate an Apple Distribuiton certificate**

**Caso eu deseje posso exportar o meu certificado e salva-lo em uma pasta caso queira utilizar novamente**

Agora ele ira resumir sobre o App, e caso esteja tudo ok, irei clicar em upload. Para ele enviar o app, pra store.

Agora irei na loja, e poderei clicar em **TestFlight** e aguardar ele carregar o app.

## Distribuindo o App pra tester.

Dentro da loja irei clciar no meu app, em seguida no canto direito em grupo externo, irei clicar no **+** e irei inserir o nome do grupo de testers, e irei adicionar os emails em seguida.

Apos a insercao do email, irei clicar em adicionar compilacao, e irei selecionar o nosso app. E clicar em proximo.

## Testando com TesstFligth

Primeiramente preciso instalar o app, pra isso basta busca-lo na loja **TestFlight**
Apos a instalacao, irei no email e clciar em **View in TestFlight**  e serei redirecionado para o app. E irei aceitar, e instalar o App.

## Distribuindo o app em Producao

Irei exportar todas as screenshots do meu layout do figma, pra IOS.

- Irei em App Store e irei enviar as screend shots, baixados do Figma
- Irei adicionar o texto promocional, que e basicamente um texto curto sobre o app.
- irei adicionar a descricao, que vai ser sobre o meu app, porem com mais detalhes.

Agora irei em **Compilacao**  e irei selecionar uma compilacão antes de fazer o envio do app. E irei selecionar a versao que ira pra prod.
Clicar em **Salvar** e Enviar para a revisao.

## Gerando build utilizando Expo

Primeira coisa, que preciso fazer é configurar meu app.json, entao irei abrir o arquivo. E alterar as seguintes informacoes.
Irei criar uma pasta chamada assets na raiz do projeto. Onde ire deixar os assets do app, (Icon, splash etc)

  - Irei adicionar o icone.
  - Em seguida as configs de ios e android.
Ira ficar da seguinte maneira:


```json
{
  "expo": {
    "name": "gofinances",
    "slug": "gofinances",
    "icon":"./assets/logo.png",
    "scheme": "gofinances",
    "version": "1.0.0",
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "bundleIdentifier": "com.gofinance",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.gofinance",
      "versionCode": 1
    }
  },
  "name": "gofinances"
}
```

## Buid Android


Apos fazer as configs no app.json irei ir no terminal e digitar o seguinte comando:

```bash
❯ expo build:andoid
```

Na sequencia ele pergunta se desejo gerar um apk, app-bundle, irei escolher oque desejar e ele comecar a gerar.


## Buid IOS

Apos fazer as configs no app.json irei ir no terminal e digitar o seguinte comando:

```bash
❯ expo build:ios
```

Agora eu posso escolher se eu desejo distribuir na loja ou utilizar no simulador:
Como desejo distribuir na loja irei selecionar **archive**, e dar enter.

Em seguida ele ira perguntar se eu desejo submeter o app pra loja, entao irei entrar com meu AppleId e senha e ele ja fará todo o processo automatizado.

Em seguida ele pergunta se desejo gerar um certificado ele ira gerar automatico pra min, e das chaves tambem.

No final dele apresenta um resumo e gera o build do app.

Apos a build ele gera um link para eu baixar o **IPA**.

Irei entrar na AppStore, e baixar o app **Transporter**, irei fazer login, irei na minha conta Apple:

 - Irei em App Store connect.
 - Go to App Store Connet.
 - Meus Apps.
 - Sinalzinho de **+**, pra eu adicionar um novo app.
 - Nome do app
 - Idioma
 - id do pacote, escolher o id do pacote que criamos la no **app.json**
 - Sku, nome do app ou nome do pacote.
 - Acesso total.

Irei abrir o Transporter. Irei pegar meu arquivo IPA, e irei solta-lo dentro do Transporter e apos clicar em enviar ele seria encaminhado pra loja.

Apos um tempo, irei entrar na loja e selecionar uma versao de compilacao. E clicar em concluido.