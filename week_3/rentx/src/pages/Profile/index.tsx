import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as Yup from 'yup';

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
  Section,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';

const schema = Yup.object().shape({
  driver_license: Yup.string().required('CNH é obrigatoria'),
  name: Yup.string().required('Nome é obrigatorio'),
});

export const Profile = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { user, signOut, updateUser } = useAuth();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driver_license, setDriverLicense] = useState(user.driver_license);

  const bottomTabBarHeight = useBottomTabBarHeight();
  const handleBack = () => {
    goBack();
  };

  const handleSignOut = async () => {
    try {
      Alert.alert(
        'Tem certeza ?',
        'Se você sair irá precisar se conectar novamente',
        [
          {
            text: 'Cancelar',
            // onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Sair',
            onPress: () => signOut(),
            style: 'destructive',
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionChange = (optionSelected: 'dataEdit' | 'passwordEdit') => {
    setOption(optionSelected);
  };

  const handleSelectAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      // Dessa forma ele conseguira editar somente images
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // Permitir o usuario a editar a imagem
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (result.cancelled) return;
    if (result.uri) {
      setAvatar(result.uri);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const data = { name, driver_license };
      await schema.validate(data);
      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license,
        avatar,
        token: user.token,
      });
      Alert.alert('Perfil atualizado com sucesso !');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opss ...', error.message);
      }
      Alert.alert('Opss ...', 'Não foi possivel atualizar o perfil');
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButton onPress={handleSelectAvatar}>
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
            {option === 'dataEdit' ? (
              <Section style={{ marginBottom: bottomTabBarHeight }}>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section style={{ marginBottom: bottomTabBarHeight }}>
                <InputPassword iconName="lock" placeholder="Senha atual" />
                <InputPassword iconName="lock" placeholder="Nova senha" />
                <InputPassword iconName="lock" placeholder="Repetir senha" />
              </Section>
            )}
            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
