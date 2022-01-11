import React, { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Friend } from './Friend';

interface ISearchResultProps {
  data: {
    id: number;
    name: string;
    likes: number;
  }[];
  follow: () => void;
}

export const FriendList = ({ data, follow }: ISearchResultProps) => {

  const totalLikes = useMemo(() => {
    return data.reduce((acc, { likes }) => {
      return acc + likes;
    }, 0)
  }, [data]);

  return (
    <View>
      <Text>Total de likes: {totalLikes}</Text>
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Friend data={item} follow={follow} />
        )}
      />
    </View>
  )
}