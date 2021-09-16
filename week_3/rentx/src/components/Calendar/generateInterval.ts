import { eachDayOfInterval, format } from 'date-fns';
import { IMarkedDatesProps, IDayProps } from '.';

import theme from '../../styles/theme';
import { getPlataformDate } from '../../utils/getPlataformDate';

export function generateInterval(start: IDayProps, end: IDayProps) {
  let interval: IMarkedDatesProps = {};
  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach(item => {
    const date = format(getPlataformDate(item), 'yyyy-MM-dd');
    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,
        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main_light
            : theme.colors.main,
      },
    };
  });
  return interval;
}
