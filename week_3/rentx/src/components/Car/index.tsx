import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { ICarDTO } from '../../dtos/ICarDTO';

import { getAcessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface ICarProps extends RectButtonProps {
  data: ICarDTO;
}

export const Car = ({ data, ...rest }: ICarProps) => {
  const MotorIcon = getAcessoryIcon(data.fuel_type);
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}`</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>
      <CarImage
        resizeMode="contain"
        source={{
          uri: data.thumbnail,
        }}
      />
    </Container>
  );
};
