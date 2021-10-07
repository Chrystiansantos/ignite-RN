import React from 'react';
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
import { StatusBar } from 'react-native';
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
} from './styles';
import { Button } from '../../components/Button';
import { ICarDTO } from '../../dtos/ICarDTO';
import { getAcessoryIcon } from '../../utils/getAccessoryIcon';

interface IRouteParams {
  car: ICarDTO;
}

export const CarDetails = () => {
  const { dispatch, goBack } = useNavigation();
  const route = useRoute();
  const { car } = route.params as IRouteParams;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const headerStyeAnimation = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
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

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View style={[headerStyeAnimation]}>
        <Header>
          <BackButton color="" onPress={handleBack} />
        </Header>
        <CarImages>
          <ImageSlider imagesUrl={car.photos} />
        </CarImages>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          alignItems: 'center',
          paddingTop: getStatusBarHeight(),
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAcessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>
        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          onPress={handleConfirmRental}
          title="Escolher período do aluguel"
        />
      </Footer>
    </Container>
  );
};
