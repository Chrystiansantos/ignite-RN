import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface IItemProps {
  data: {
    id: number;
    name: string;
    likes: number
  },
  follow: () => void;
}

export const FriendComponent = ({ data, follow }: IItemProps) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text>{data.name} - Likes: {data.likes}</Text>
      <TouchableOpacity onPress={follow}>
        <Text>Deixar de seguir</Text>
      </TouchableOpacity>
    </View>
  );
}

export const Friend = memo(FriendComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.data, nextProps.data);
})