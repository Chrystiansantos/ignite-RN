import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../Pages/Profile';

test('check if show correctly user input name placeholder.', () => {
  const { getByPlaceholderText } = render(<Profile />);

  const inputName = getByPlaceholderText('Nome');

  expect(inputName).toBeTruthy();
});

test('checks if user data has been loaded', () => {
  const { getByTestId } = render(<Profile />);

  const inputName = getByTestId('input-name');
  const inputSurname = getByTestId('input-surname');

  expect(inputName.props.value).toEqual('Chrystian');
  expect(inputSurname.props.value).toEqual('Santos');
});

test('checks if title render correctly', () => {
  const { getByText } = render(<Profile />);
  const textTitle = getByText('Perfil');

  expect(textTitle.props.children).toContain('Perfil');
});
