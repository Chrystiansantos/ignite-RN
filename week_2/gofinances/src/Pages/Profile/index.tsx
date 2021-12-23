import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export const Profile = () => {
  return (
    <View>
      <Text>Perfil</Text>
      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Chrystian"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        autoCorrect={false}
        value="Santos"
      />
      <Button title="salvar" onPress={() => console.log('clicou no button')} />
    </View>
  );
};
