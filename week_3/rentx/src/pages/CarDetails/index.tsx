import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedSvg from '../../assets/speed.svg';
import acelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

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
  Accessories,
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
        <Accessories>
          <Accessory name="380Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={acelerationSvg} />
          <Accessory name="800hp" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Automatico" icon={exchangeSvg} />
          <Accessory name="2" icon={peopleSvg} />
        </Accessories>
        <About>
          Este é automovel desportivo. Surgiu do lendario touro de lide
          indultado na praça Real Maestranza de Sevilla. É um Belissimo carro
          paara quem gosta de acelerar
        </About>
      </Content>
    </Container>
  );
};
