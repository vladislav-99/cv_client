import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const Title = styled((props) => (
  <Typography {...props} variant="h5" component="div" />
))<{ color: string }>(({ color }) => ({
  display: 'inline',
  fontFamily: 'Nunito',
  fontWeight: 800,
  color
}));

export default Title;
