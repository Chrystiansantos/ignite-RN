import React from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
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
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';
import { Button } from '../../components/Button';

export const SchedulingDetails = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const handleConfirmRental = () => {
    navigate('SchedulingComplete');
  };

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
        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={colors.shape} />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>27/08/2021</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={colors.text}
          />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>30/08/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          onPress={handleConfirmRental}
          title="Alugar agora"
          color={colors.success}
        />
      </Footer>
    </Container>
  );
};
