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

Após essas configuracoes irei no meu arquivo App.tsx, e irei adicionara importacao e um useEffct pra remover a splash somente apos o app ser carregado.

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

  Primeiramente preciso gerar uma assinatura pra fazer upload do meu app. Pra isso vou entrar dentro da pasta android, em seguida vou executar o seguinte comando, que ira gerar um arquivo na raiz chamado **production-android.keystore**

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

Logo abaixo irei alterar a seguinte linha de debbug para release:

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