import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState<string>('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreetings] = useState<string>('');

  const handleNewAddSkill = () => {
    if (newSkill) {
      const data: SkillData = {
        id: String(new Date().getTime()),
        name: newSkill,
      };
      setMySkills(oldState => [...oldState, data]);
      setNewSkill('');
    }
  };
  const handleRemoveSkill = (id: string) => {
    setMySkills(oldState => oldState.filter(skill => skill.id !== id));
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreetings('Good morning !');
      return;
    }
    if (currentHour >= 12 && currentHour < 18) {
      setGreetings('Good afternoon !');
      return;
    }
    setGreetings('Good night !');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Chrystian 😄</Text>
      <Text style={styles.greetings}>{greeting}</Text>
      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
        value={newSkill}
      />
      <Button title="Add" onPress={handleNewAddSkill} />
      <Text style={[{ marginVertical: 30 }, styles.title]}>My Skills</Text>
      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard
            onPress={() => handleRemoveSkill(item.id)}
            item={item.name}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  greetings: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 8,
  },
});
