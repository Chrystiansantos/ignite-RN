import React, { memo } from 'react';
import { Text } from 'react-native';

interface IItemProps {
  data: {
    id: number;
    name: string;
    likes: number
  }
}

export const FriendComponent = ({ data }: IItemProps) => {
  return <Text>{data.name} - Likes: {data.likes}</Text>;
}

export const Friend = memo(FriendComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.data, nextProps.data);
})