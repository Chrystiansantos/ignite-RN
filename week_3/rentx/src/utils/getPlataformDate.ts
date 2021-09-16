import { addDays } from 'date-fns';
import { Platform } from 'react-native';

export function getPlataformDate(date: Date) {
  // No android tbm ta com o role de retornar o dia anterior oo selecionado
  // if (Platform.OS === 'ios') {
  return addDays(date, 1);
  // }
  // return date;
}
