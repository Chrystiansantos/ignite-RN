import React from 'react';
import { Text } from 'react-native';

interface IItemProps {
  data: {
    name: string;
    likes: number
  }
}

export const Friend = ({ data }: IItemProps) => {
  return <Text>{data.name} - Likes: {data.likes}</Text>;
}