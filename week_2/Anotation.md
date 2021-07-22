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