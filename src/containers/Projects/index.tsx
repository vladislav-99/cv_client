import React, { useEffect, useMemo, useCallback, useState } from 'react';
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
  fetchCreateProject,
  fetchDeleteProject, fetchEditProject,
  fetchProjects
} from '../../store/projects/actions';
import CustomModal from '../../components/CustomModal';
import AddProject from '../../components/Modals/Add/AddProject';
import useModal from '../../utils/useModal';
import DeleteModal from '../../components/Modals/Delete/DeleteModal';
import { CreateProjectType, ProjectTypes, UpdateProjectType } from '../../store/projects/types';
import ProjectContent, { CreatingProjectType } from '../../components/Modals/ProjectContent';
import EditProjectContent from '../../components/Modals/Edit/EditProject/EditProjectContent';
import EditProjectModal from '../../components/Modals/Edit/EditProject';

const Projects: React.FC = () => {
  const dispatch = useDispatch();

  const {
    projectIds,
    projects,
    projectDeleting,
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
    return projectIds.map((id) => {
      const project = projects[id];
      return {
        ...project,
        technologies: project.technologies.map(({ name }) => name)
      }
    });
  }, [projectIds, projects]);

  const handleAddProject = (project: CreatingProjectType) => {
    dispatch(fetchCreateProject.started(project as CreateProjectType))
    toggle()
  }

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
      />
      <CustomModal
        title="Add Project"
        isActive={modalOpen}
        handleClose={toggle}
      >
        <ProjectContent onAdd={handleAddProject} />
      </CustomModal>
      <DeleteModal
        title='Delete Project?'
        contentLabel='project'
        trigger={projectDeleting !== -1}
        handleAllowCb={handleAllowCb}
        handleCancelCb={handleCancelCb}
      />
      <EditProjectModal />
    </Box>

  );
};

export default Projects;
