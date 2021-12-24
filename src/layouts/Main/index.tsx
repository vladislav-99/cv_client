import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Sidebar from '../../components/Sidebar';

const MainLayout: React.FC = (props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#FBFBFB',
          p: '35px',
          height: '100%',
          minHeight: '100vh'
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default MainLayout;
