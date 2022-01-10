import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Friend } from './Friend';

interface ISearchResultProps {
  data: {
    id: number;
    name: string;
    likes: number;
  }[];
}

export const FriendList = ({ data }: ISearchResultProps) => {

  const totalLikes = useMemo(() => {
    return data.reduce((acc, { likes }) => {
      return acc + likes;
    }, 0)
  }, [data]);

  return (
    <View>
      <Text>Total de likes: {totalLikes}</Text>
      {
        data.map(friend => (
          <Friend key={String(friend.id)} data={friend} />
        ))
      }
    </View>
  )
}