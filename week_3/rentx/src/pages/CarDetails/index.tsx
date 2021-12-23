/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
  useNavigation,
  CommonActions,
  useRoute,
} from '@react-navigation/native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
  OfflineInfo,
} from './styles';
import { Button } from '../../components/Button';
import { Car as ModelCar } from '../../database/models/car';
import { ICarDTO } from '../../dtos/ICarDTO';
import { getAcessoryIcon } from '../../utils/getAccessoryIcon';
import { api } from '../../service/api';

interface IRouteParams {
  car: ModelCar;
}

export const CarDetails = () => {
  const { colors } = useTheme();
  const { dispatch, goBack } = useNavigation();
  const route = useRoute();
  const { car } = route.params as IRouteParams;
  const [carUpdated, setCarUpdated] = useState<ICarDTO>({} as ICarDTO);
  const { isConnected } = useNetInfo();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const headerStyeAnimation = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
  }));
  const sliderCarsStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
  }));

  const handleConfirmRental = () => {
    dispatch(
      CommonActions.navigate({
        name: 'Scheduling',
        params: {
          car,
        },
      }),
    );
  };

  const handleBack = () => {
    goBack();
  };

  useEffect(() => {
    async function fetchCarUpdated() {
      const { data } = await api.get(`/cars/${car.id}`);
      setCarUpdated(data);
    }
    if (isConnected) {
      fetchCarUpdated();
    }
  }, [isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          headerStyeAnimation,
          styles.header,
          { backgroundColor: colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton color="" onPress={handleBack} />
        </Header>
        <Animated.View style={sliderCarsStyleAnimation}>
          <CarImages>
            <ImageSlider
              imagesUrl={
                carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          alignItems: 'center',
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {isConnected ? car.price : '...'}</Price>
          </Rent>
        </Details>
        {carUpdated.id && (
          <Accessories>
            {carUpdated.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAcessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}
        <About>{car.about}</About>
      </Animated.ScrollView>
      <Footer>
        <Button
          onPress={handleConfirmRental}
          title="Escolher período do aluguel"
          enabled={!!isConnected}
        />
        {!isConnected && (
          <OfflineInfo>
            Conecte-se a Internet para ver masi detalhes e agendar seu carro
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
});
