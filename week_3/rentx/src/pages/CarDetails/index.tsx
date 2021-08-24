import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { Container, Header, CarImages } from './styles';

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
    </Container>
  );
};
