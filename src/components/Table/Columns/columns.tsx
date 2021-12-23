import React from 'react';

import Box from "@mui/material/Box";
import { GridRenderCellParams, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import DeleteIcon from "../../../icons/DeleteIcon";

function renderId(params: GridRenderCellParams<number>) {
  return <Box sx={{
    pl: '30px',
    color: '#AFB5BF'
  }}>{params.value}</Box>;
}

export const educationsColumns = [
  { field: 'id', headerName: 'ID', width: 100, sortable: false, renderCell: renderId },
  { field: 'name', headerName: 'UNIVERSITY', flex: 1, sortable: false },
  {
    field: 'actions', type: 'actions', getActions: (params: GridRowParams) => [
      <GridActionsCellItem icon={<DeleteIcon />} sx={
        {
          borderRadius: 5,
          backgroundColor: '#F1F3F5'
        }
      } onClick={() => { }} label="Delete" />,
    ]
  }
];

export const experienceColumns = [
  { field: 'id', headerName: 'ID', width: 100, sortable: false, renderCell: renderId },
  { field: 'name', headerName: 'COMPANY', flex: 1, sortable: false },
  {
    field: 'actions', type: 'actions', getActions: (params: GridRowParams) => [
      <GridActionsCellItem icon={<DeleteIcon />} sx={
        {
          borderRadius: 5,
          backgroundColor: '#F1F3F5'
        }
      } onClick={() => { }} label="Delete" />,
    ]
  }
];