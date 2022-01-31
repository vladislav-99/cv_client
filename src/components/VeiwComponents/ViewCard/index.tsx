import React from 'react';
import { createBreakpoint } from 'react-use';

import Grid from '@mui/material/Grid';

const useBreakpoint = createBreakpoint({ xl: 1536, lg: 1200, md: 900, sm: 600, xs: 350 });

interface VewCardProps {
  title: string,
}

const ViewCard: React.FC<VewCardProps> = ({
  title,
  children,
}) => {
  const breakpoint = useBreakpoint();


  const isLaptop = breakpoint === 'lg' || breakpoint === 'xl'
  return (
    <Grid
      my={2}
      container
      bgcolor='#FFFFFF'
      sx={{
        border: '1px solid #E3E3EA',
        borderRadius: '10px',
        minHeight: '80px',
      }}
    >
      <Grid
        sx={{
          p: '35px',
          py: !isLaptop ? '15px' : undefined,
          textTransform: 'uppercase',
          [isLaptop ? 'borderRight' : 'borderBottom']: '1px solid #E3E3EA',
          width: '270px',
          textAlign: isLaptop ? 'right' : 'left',
        }}
        item
        xs={12} sm={12} md={12} lg={3} xl={3}
      >
        {title}
      </Grid>
      <Grid
        sx={{
          p: '35px',
          py: !isLaptop ? '15px' : undefined,
        }}
        item
        xs={12} sm={12} md={12} lg={9} xl={9}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default ViewCard;
