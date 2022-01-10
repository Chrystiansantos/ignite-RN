import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';

import { FriendList } from '../components/FriendList'

export const Home = () => {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([]);

  const handleSearch = async () => {
    const response = await (await fetch(`http://192.168.1.9:3333/friends?q=${name}`)).json();
    setFriends(response)
  }

  const handleFollow = useCallback(() => {
    console.log("follow user");
  }, [])



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>
      <TextInput
        placeholder="Nome do cliente"
        onChangeText={setName}
        value={name}
        style={styles.input}
      />
      <Button title="Buscar" onPress={handleSearch}></Button>
      <ScrollView style={styles.list}>
        <FriendList data={friends} follow={handleFollow} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',

  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginBottom: 10,
    marginVertical: 10
  },
  list: {
    marginTop: 20
  }
})