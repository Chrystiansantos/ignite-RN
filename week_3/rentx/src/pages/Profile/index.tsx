import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
} from './styles';

import { BackButton } from '../../components/BackButton';

export const Profile = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const handleBack = () => {
    goBack();
  };

  const handleSignOut = () => {
    console.log('Signout');
  };

  const handleOptionChange = (optionSelected: 'dataEdit' | 'passwordEdit') => {
    setOption(optionSelected);
  };

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={colors.shape} onPress={handleBack} />
          <HeaderTitle>Editar perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather name="power" size={24} color={colors.shape} />
          </LogoutButton>
        </HeaderTop>
        <PhotoContainer>
          <Photo
            source={{
              uri: 'https://avatars.githubusercontent.com/u/33062949?v=4',
            }}
          />
          <PhotoButton onPress={() => console.log('Trocar image')}>
            <Feather name="camera" size={24} color={colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>
      <Content>
        <Options>
          <Option
            active={option === 'dataEdit'}
            onPress={() => handleOptionChange('dataEdit')}
          >
            <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
          </Option>
          <Option
            active={option === 'passwordEdit'}
            onPress={() => handleOptionChange('passwordEdit')}
          >
            <OptionTitle active={option === 'passwordEdit'}>
              Trocar senha
            </OptionTitle>
          </Option>
        </Options>
      </Content>
    </Container>
  );
};
