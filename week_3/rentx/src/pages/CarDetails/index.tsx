import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
} from './styles';

export const CarDetails = () => {
  return (
    <Container>
      <Header>
        <BackButton color="" />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={[
            'https://img1.gratispng.com/20171220/egq/mitsubishi-lancer-png-5a3a9535027442.6133742515137887250101.jpg',
          ]}
        />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>Mitsubishi</Brand>
            <Name>Lancer</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 100</Price>
          </Rent>
        </Details>
        <About>
          Este é automovel desportivo. Surgiu do lendario touro de lide
          indultado na praça Real Maestranza de Sevilla. É um Belissimo carro
          paara quem gosta de acelerar
        </About>
      </Content>
    </Container>
  );
};
