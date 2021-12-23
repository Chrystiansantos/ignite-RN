import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../Pages/Profile';

describe('Profile', () => {
  it('should have placeholder corrctly in input user name', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName).toBeTruthy();
  });

  it('should be loaded user data has been loaded', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Chrystian');
    expect(inputSurname.props.value).toEqual('Santos');
  });

  it('Should exist title correctly', () => {
    const { getByText } = render(<Profile />);
    const textTitle = getByText('Perfil');

    expect(textTitle.props.children).toContain('Perfil');
  });
});
