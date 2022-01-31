import React from 'react';

import Box from '@mui/material/Box';

interface ViewPhotosProps {
  photos: string[]
}

const ViewPhotos: React.FC<ViewPhotosProps> = ({ photos }) => {

  return (
    <Box
      maxWidth='700px'
    >
      {photos.map((url, index) => (
        <img
          style={{
            color: '#9EA9BA',
            maxHeight: '180px',
            maxWidth: '330px',
            objectFit: 'contain',
            marginRight: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            boxShadow: '0px 0px 7px 0px rgba(0, 0, 0, 0.1)'
          }}
          key={url + index}
          src={url}
          alt=''
        />
      ))}
    </Box>
  );
};

export default ViewPhotos;
