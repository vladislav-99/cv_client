import React from 'react';
import { useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import { TechnologyTypes } from '../../store/technologies/types';
import { styled } from '@mui/system';
import Chips from './Chips';
import { RootState } from '../../store';

const CardTitle = styled('div')({
  fontFamily: 'Nunito',
  fontWeight: '600',
  fontSize: '16px',
  marginBottom: 15
});

const Card = styled(Paper)({
  boxShadow: 'none',
  border: '1px solid #E3E3EA',
  borderRadius: '10px',
  padding: 25,
  paddingBottom: 15
});

interface TechnologyCardProps {
  type: keyof typeof TechnologyTypes;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ type }) => {
  const technologiesIds = useSelector(
    (state: RootState) =>
      state.technologiesState.technologiesByTypes[type as TechnologyTypes]
  );

  return (
    <Card>
      <CardTitle>{TechnologyTypes[type]}</CardTitle>
      <Chips technologies={technologiesIds} />
    </Card>
  );
};

export default TechnologyCard;
