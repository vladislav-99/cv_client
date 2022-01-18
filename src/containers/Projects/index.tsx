import React, { useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Title from '../../components/Title';
import Button from '../../components/Button';
import ProjectsFilters from '../../components/ProjectsFilters';
import Table from '../../components/Table';
import { getColumns, Tables } from '../../components/Table/Columns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchProjects } from '../../store/projects/actions';

const Projects: React.FC = () => {
  const dispatch = useDispatch();
  const { projectIds, projects } = useSelector(
    (state: RootState) => state.projectsState
  );
  const toggle = () => { }

  useEffect(() => {
    if (!projectIds.length) dispatch(fetchProjects.started());
  }, []);


  const projectsRows = useMemo(() => {
    return projectIds.map((id) => projects[id]);
  }, [projectIds, projects]);

  return (
    <Box>
      <Title color="#535E6C">Projects</Title>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <ProjectsFilters />
        <Button title="+ Add Project" cb={toggle} />
      </Box>
      <Table
        columns={getColumns(Tables.projects)}
        rows={projectsRows}
        onClickName={() => { }}
      />

    </Box>

  );
};

export default Projects;
