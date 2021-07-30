import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../Components/Form/Button';
import { categories } from '../../util/categories';

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';

interface ICategory {
  key: string;
  name: string;
}

interface ICategorySelectProps {
  category: ICategory;
  setCategory: (category: ICategory) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect = ({
  category,
  setCategory,
  closeSelectCategory,
}: ICategorySelectProps) => {
  const handleCategorySelect = (item: ICategory) => {
    setCategory(item);
    // remover isso daqui e apenas uma solucao temporaria enquanto o botao nao funciona
    closeSelectCategory();
  };
  return (
    <Container>
      <Header>
        <Title>Categorias</Title>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
};
