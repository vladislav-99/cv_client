import React, { useMemo } from 'react';
import { useHistory } from 'react-router';

import Box from '@mui/material/Box';
import {
  GridRenderCellParams,
  GridRowParams
} from '@mui/x-data-grid';
import DeleteExperience from './Actions/DeleteExprience';
import DeleteEducation from './Actions/DeleteEducation';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { ProjectTypes } from '../../../store/projects/types';
import DeleteProject from './Actions/DeleteProject';
import EditProject from './Actions/EditProject';

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

function renderClickableName(params: GridRenderCellParams<number>) {
  return (
    <Box
      sx={{
        cursor: 'pointer'
      }}
    >
      {params.value}
    </Box>
  );
}

const ClickableProjectName: React.FC<{ name: string, id: number }> = ({ name, id }) => {
  const history = useHistory();
  const handleProjectNameClick = () => {
    history.push('/projects/' + id)
  }
  return (
    <Box
      sx={{
        cursor: 'pointer',
        color: '#5893F9'
      }}
      onClick={handleProjectNameClick}
    >
      {name}
    </Box>
  );
}

const renderClickableProjectName = (params: GridRenderCellParams<string>) => {
  return <ClickableProjectName name={String(params.value)} id={Number(params.id)} />
}

function RenderTechnologies({ value }: GridRenderCellParams<string[]>) {
  const technologies = useMemo(() => {
    if (Array.isArray(value)) {
      if (value.length > 4) return [...value].splice(0, 4)
      return value
    }
    return []
  }, [value])

  if (!Array.isArray(value)) return null


  return (
    <Stack
      direction='row'
      spacing={1}
    >
      {technologies.map((technology, index) => (
        <Chip
          key={index + technology}
          sx={{
            backgroundColor: '#F0F2F5',
            color: '#9EA9BA',
            height: '30px',
            fontSize: '14px',
            px: '5px',
          }}
          label={technology}
        />
      ))}
      {
        value.length > 4 && <Chip
          sx={{
            backgroundColor: '#F0F2F5',
            color: '#9EA9BA',
            height: '30px',
            fontSize: '14px',
            px: '5px',
          }}
          label={`+ ${value.length - 4}`}
        />
      }
    </Stack>
  );
}

function renderProjectType({ value }: GridRenderCellParams<keyof typeof ProjectTypes>) {
  return ProjectTypes[value]
}

export const educationsColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    sortable: false,
    renderCell: renderId
  },
  {
    field: 'name',
    headerName: 'UNIVERSITY',
    flex: 1,
    sortable: false,
    renderCell: renderClickableName
  },
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
  {
    field: 'name',
    headerName: 'COMPANY',
    flex: 1,
    sortable: false,
    renderCell: renderClickableName
  },
  {
    field: 'actions',
    type: 'actions',
    getActions: (params: GridRowParams) => [
      <DeleteExperience params={params} />
    ]
  }
];

export const projectColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    sortable: false,
    renderCell: renderId
  },
  {
    field: 'name',
    headerName: 'PROJECT NAME',
    width: 380,
    sortable: false,
    renderCell: renderClickableProjectName
  },
  {
    field: 'type',
    headerName: 'TYPE',
    width: 280,
    sortable: false,
    renderCell: renderProjectType
  },
  {
    field: 'technologies',
    headerName: 'TECHNOLOGIES',
    width: 480,
    sortable: false,
    renderCell: RenderTechnologies
  },
  {
    field: 'country',
    headerName: 'COUNTRY',
    minWidth: 100,
    flex: 1,
    sortable: false,
  },
  {
    field: 'actions',
    type: 'actions',
    getActions: (params: GridRowParams) => [
      <EditProject params={params} />,
      <DeleteProject params={params} />
    ]
  },
];
