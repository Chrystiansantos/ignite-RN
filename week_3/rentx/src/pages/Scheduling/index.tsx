import React from 'react';
import { useTheme } from 'styled-components/native';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import { Button } from '../../components/Button';

export const Scheduling = () => {
  const { colors } = useTheme();
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={colors.shape} />
        <Title>
          Escolha uma{'\n'}data de inicio e {'\n'}fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            {/* <DateValue >26/08/2021</DateValue> */}
            <DateValue selected={false} />
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            {/* <DateValue>26/08/2021</DateValue> */}
            <DateValue selected={false} />
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content />
      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
};
