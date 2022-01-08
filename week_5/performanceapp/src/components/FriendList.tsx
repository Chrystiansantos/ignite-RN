import React from 'react';
import { View } from 'react-native';
import { Friend } from './Friend';

interface ISearchResultProps {
  data: {
    id: number;
    name: string;
    likes: number;
  }[];
}

export const FriendList = ({ data }: ISearchResultProps) => {
  return (
    <View>
      {
        data.map(friend => (
          <Friend key={String(friend.id)} data={friend} />
        ))
      }
    </View>
  )
}