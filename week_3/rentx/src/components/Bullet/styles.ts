import styled from 'styled-components/native';

interface IBulletContainerProps {
  active: boolean;
}

export const Container = styled.View<IBulletContainerProps>`
  width: 6px;
  height: 6px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};
  margin-left: 8px;
  border-radius: 3px;
`;
