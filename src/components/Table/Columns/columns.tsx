import React from 'react';

import Box from '@mui/material/Box';
import {
  GridRenderCellParams,
  GridRowParams
} from '@mui/x-data-grid';
import DeleteExperience from './DeleteExprience';
import DeleteEducation from './DeleteEducation';

function renderId(params: GridRenderCellParams<number>) {
  return (
    <Box
      sx={{
        pl: '30px',
        color: '#AFB5BF'
      }}
    >
      {params.value}
    </Box>
  );
}

export const educationsColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    sortable: false,
    renderCell: renderId
  },
  { field: 'name', headerName: 'UNIVERSITY', flex: 1, sortable: false },
  {
    field: 'actions',
    type: 'actions',
    getActions: (params: GridRowParams) => [
      <DeleteEducation params={params} />
    ]
  }
];

export const experienceColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    sortable: false,
    renderCell: renderId
  },
  { field: 'name', headerName: 'COMPANY', flex: 1, sortable: false },
  {
    field: 'actions',
    type: 'actions',
    getActions: (params: GridRowParams) => [
      <DeleteExperience params={params} />
    ]
  }
];
