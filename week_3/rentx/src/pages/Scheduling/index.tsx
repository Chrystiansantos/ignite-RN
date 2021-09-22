import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { StatusBar } from 'react-native';
import {
  useNavigation,
  useRoute,
  CommonActions,
} from '@react-navigation/native';
import { format } from 'date-fns';
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
import { getPlataformDate } from '../../utils/getPlataformDate';
import { ICarDTO } from '../../dtos/ICarDTO';

interface IRentalPeriod {
  startFormatted: string;
  endFormatted: string;
}
interface IRouteParams {
  car: ICarDTO;
}

export const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<IDayProps>(
    {} as IDayProps,
  );
  const [markedDates, setMarkedDate] = useState<IMarkedDatesProps>(
    {} as IMarkedDatesProps,
  );
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod,
  );

  const { colors } = useTheme();
  const { dispatch, goBack } = useNavigation();
  const route = useRoute();
  const { car } = route.params as IRouteParams;

  const handleConfirmRental = () => {
    dispatch(
      CommonActions.navigate({
        name: 'SchedulingDetails',
        params: {
          car,
          dates: Object.keys(markedDates),
        },
      }),
    );
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
    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
    setRentalPeriod({
      startFormatted: format(
        getPlataformDate(new Date(firstDate)),
        'dd/MM/yyyy',
      ),
      endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
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
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.endFormatted}
        />
      </Footer>
    </Container>
  );
};
