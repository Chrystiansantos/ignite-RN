# Performando app em RN

## Debugando com React Native devtools

Primeiro passo irei instalar a lib em nosso projeto da seguinte maneira:


```bash
❯ yarn add react-devtools -D
```
Pra executar o dev-tools vou rodar o seguinte comando:

```bash
❯ yarn react-devtools
```

## Memo

Utilizando a funcão memo, eu consigo memorizar as informacões do meu componente e passar pra ela um criterio de reenderizacao, pra saber quando esse componente devera ser reenderizado novamente, da seguinte forma:

```tsx
// Se o meu criterio retorna true, ele permanece o componente, caso retorne false ele reenderiza o componente novamente.

import React, { memo } from 'react';
import { Text } from 'react-native';

interface IItemProps {
  data: {
    name: string;
    likes: number
  }
}

export const FriendComponent = ({ data }: IItemProps) => {
  return <Text>{data.name} - Likes: {data.likes}</Text>;
}
// prevProps => como esta as props atual
// nextProps => com esta as props apos a nova rrenderizacao
export const Friend = memo(FriendComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.data, nextProps.data);
})
```

<b>Obs:</b> Não vou sair usando memo em todo componente, ele e usado em componentes puros, (componente que apenas possuem exibicao de dados em tela).

## useMemo

Funcao utilizada para memorizar valor, e ser recalculado somente quando esses valores forem alterados. Nao devo utilizar em calculos simples pois se nao resultara em um efeito contrario

```tsx
 const totalLikes = useMemo(() => {
    return data.reduce((acc, { likes }) => {
      return acc + likes;
    }, 0)
  }, [data]);
```

<b>Obs:</b> Indicado pra quando for realizar calculos pesados em meu app.

## useCallback

Em todas as reenderizacoes a funcao sera recriada em um novo endereco de memoria, por este motivo utiliza-se o useCallback, que consiste em não alterar o endereco de memoria, e a cada alteracao sera feito uma nova atribuicao.

```tsx
const handleFollow = useCallback(() => {
    console.log("follow user");
  }, [])
```