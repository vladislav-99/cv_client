import React, { useEffect, useMemo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Title from '../../components/Title';
import Button from '../../components/Button';
import ProjectsFilters from '../../components/ProjectsFilters';
import Table from '../../components/Table';
import { getColumns, Tables } from '../../components/Table/Columns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  deleteProjectCancel,
  fetchDeleteProject,
  fetchProjects
} from '../../store/projects/actions';
import CustomModal from '../../components/CustomModal';
import AddProject from '../../components/Modals/Add/AddProject';
import useModal from '../../utils/useModal';
import DeleteModal from '../../components/Modals/Delete/DeleteModal';

const Projects: React.FC = () => {
  const dispatch = useDispatch();
  const {
    projectIds,
    projects,
    projectDeleting
  } = useSelector(
    (state: RootState) => state.projectsState
  );
  const { modalOpen, toggle } = useModal();

  useEffect(() => {
    if (!projectIds.length) dispatch(fetchProjects.started());
  }, []);

  const handleAllowCb = useCallback(() => dispatch(fetchDeleteProject.started(projectDeleting)), [dispatch, projectDeleting])
  const handleCancelCb = useCallback(() => dispatch(deleteProjectCancel()), [dispatch])

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
      <CustomModal
        title="Add Project"
        isActive={modalOpen}
        handleClose={toggle}
      >
        <AddProject onAdd={toggle} />
      </CustomModal>
      <DeleteModal
        title='Delete Project?'
        contentLabel='project'
        trigger={projectDeleting !== -1}
        handleAllowCb={handleAllowCb}
        handleCancelCb={handleCancelCb}
      />
    </Box>

  );
};

export default Projects;
