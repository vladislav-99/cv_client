import React from 'react';
import Box from '@mui/material/Box';
import Chip from './Chip';

const Chips: React.FC<{ technologies?: number[] }> = ({
  technologies
}) => {
  if (!technologies) return null;
  return (
    <Box>
      {technologies.map((id) => {
        return (
          <Chip
            key={id + '_technology'}
            technologyId={id}
          />
        );
      })}
    </Box>
  );
};

export default Chips;
