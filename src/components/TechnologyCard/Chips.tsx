import React from 'react';
import Box from '@mui/material/Box'
import Chip from "@mui/material/Chip";
import { ITechnology } from '../../store/technologies/reducer';


const Chips: React.FC<{ technologies?: ITechnology[] }> = ({ technologies }) => {
  if (!technologies) return null
  return (
    <Box>
      {technologies.map(({ id, name }) => {
        return (
          <Chip
            key={id + name}
            sx={{
              backgroundColor: '#F0F2F5',
              color: '#9EA9BA',
              height: '30px',
              fontSize: '14px',
              px: '5px',
              mr: '10px',
              mb: '10px'
            }} label={name} />
        )
      })}
    </Box>
  )

}

export default Chips