import React from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { ITechnology } from '../../../store/technologies/types';

interface ViewProjectTechnologiesProps {
  technologies: ITechnology[]
}

const ViewProjectTechnologies: React.FC<ViewProjectTechnologiesProps> = ({ technologies }) => {

  return (
    <Box
      maxWidth='700px'
    >
      {technologies.map((technology, index) => (
        <Chip
          sx={{
            backgroundColor: '#F0F2F5',
            color: '#9EA9BA',
            height: '30px',
            fontSize: '14px',
            px: '5px',
            mr: '10px',
            mb: '10px'
          }}
          key={technology.name + index}
          label={technology.name}
        />
      ))}
    </Box>
  );
};

export default ViewProjectTechnologies;
