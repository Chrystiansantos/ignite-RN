/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container } from './styles';

export const Splash = () => {
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => ({
    opacity: interpolate(splashAnimation.value, [0, 25, 50], [1, 0.3, 0]),
    transform: [
      { translateX: interpolate(splashAnimation.value, [0, 50], [0, -50]) },
    ],
  }));
  const logoStyle = useAnimatedStyle(() => ({
    opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
    transform: [
      { translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0]) },
    ],
  }));

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 });
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>
      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
};