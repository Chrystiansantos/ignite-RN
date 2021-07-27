import React from 'react';

import { Container, Category, Icon } from './styles';

interface ICategorySelectProps {
  title: string;
}

export const CategorySelectButton = ({ title }: ICategorySelectProps) => {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
