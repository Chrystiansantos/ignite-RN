# Deploy android e ios.

Primeiro, preciso criar uma conta de dev, no seguinte link abaixo:

<a hrref="https://developer.apple.com/programs/">Apple Developer Program</a>
<a hrref="https://developer.apple.com/app-store/review/guidelines/">Apple Store Review Guidelines</a><br>

<a hrref="https://play.google.com/intl/pt-BR/console/about/">Google Play Console</a>

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