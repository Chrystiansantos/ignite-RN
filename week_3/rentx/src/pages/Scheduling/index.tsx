import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import {
  Calendar,
  generateInterval,
  IDayProps,
  IMarkedDatesProps,
} from '../../components/Calendar';

export const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<IDayProps>(
    {} as IDayProps,
  );
  const [markedDates, setMarkedDate] = useState<IMarkedDatesProps>(
    {} as IMarkedDatesProps,
  );

  const { colors } = useTheme();
  const { navigate, goBack } = useNavigation();
  const handleConfirmRental = () => {
    navigate('SchedulingDetails');
  };

  const handleBack = () => {
    goBack();
  };

  const handleChangeDate = (date: IDayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      const aux = start;
      start = end;
      end = aux;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDate(interval);
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={colors.shape} onPress={handleBack} />
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
      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
};
