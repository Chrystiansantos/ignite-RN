import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ISkillCard extends TouchableOpacityProps {
  item: string;
}

export const SkillCard = ({ item, ...rest }: ISkillCard) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.buttonSkill} {...rest}>
      <Text style={styles.textSkill}>{item}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonSkill: {
    backgroundColor: '#1f1e25',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10,
  },
  textSkill: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
