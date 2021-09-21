import React, { useState, useEffect } from 'react';
import { ICarDTO } from '../../dtos/ICarDTO';
import { api } from '../../service/api';

import { Container } from './styles';

export const MyCars = () => {
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get('/schedules_byuser?user_id=1');
        console.log(data);
        setCars(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return <Container />;
};
