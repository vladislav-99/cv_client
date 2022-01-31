import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { useParams } from "react-router";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import Title from '../../components/Title';
import { RootState } from '../../store';
import { editProject, fetchEditProject, fetchProjectById } from '../../store/projects/actions';
import { CreateProjectType, ProjectTypes, UpdateProjectType } from '../../store/projects/types';
import ViewCard from '../../components/VeiwComponents/ViewCard';
import ViewProjectTechnologies from '../../components/VeiwComponents/ViewProjectTechnologies';
import ViewPhotos from '../../components/VeiwComponents/ViewPhotos';
import CustomModal from '../../components/CustomModal';
import AddProject from '../../components/Modals/Add/AddProject';
import useModal from '../../utils/useModal';
import Button from '../../components/Button';
import ProjectContent, { CreatingProjectType } from '../../components/Modals/ProjectContent';
import EditProjectContent from '../../components/Modals/Edit/EditProject/EditProjectContent';
import EditProjectModal from '../../components/Modals/Edit/EditProject';

const ProjectView: React.FC = () => {
  const dispatch = useDispatch()
  const params = useParams<{ id: string }>()

  const { id } = params;
  const project = useSelector(
    (state: RootState) => state.projectsState.projects[Number(id)]
  );

  useEffectOnce(() => {
    const numId = Number(id);
    if (!isNaN(numId)) {
      dispatch(fetchProjectById.started(numId))
    }
  })

  // const { modalOpen, toggle } = useModal();


  // const handleSaveUpdatedProject = (project: CreatingProjectType) => {
  //   const numId = Number(id);
  //
  //   const updatedProject: UpdateProjectType = {
  //     ...project,
  //     type: project.type as ProjectTypes,
  //     id: numId
  //   }
  //
  //   dispatch(fetchEditProject.started(updatedProject))
  //   toggle()
  // }


  if (isNaN(Number(id))) return <>404 Project Not Found</>

  if (!project) return null

  return (
    <Box
      bgcolor='#FBFBFB'
    >
      <Title color="#535E6C">Project</Title>


      <ViewCard title='Project name'>
        <Box
          fontWeight={600}
          fontSize={16}
          mb='20px'
        >
          {project.name}
        </Box>
        <Box
          component={'pre'}
          maxWidth='800px'
          fontWeight={400}
          fontSize={14}
          sx={{
            color: '#AFB5BF',
            whiteSpace: 'pre-wrap'
            // wordWrap: 'break-word'
          }}
        >
          {project.description}
        </Box>
      </ViewCard>

      <ViewCard title='Country'>
        {project.country}
      </ViewCard>

      <ViewCard title='Type'>
        {ProjectTypes[project.type as unknown as keyof typeof ProjectTypes]}
      </ViewCard>

      <ViewCard title='Link'>
        <Link
          href={project.link}
          underline='none'
          rel="noreferrer"
        >
          {project.link}
        </Link>
      </ViewCard>

      <ViewCard title='Technologies'
      >
        <ViewProjectTechnologies
          technologies={project.technologies}
        />
      </ViewCard>

      <ViewCard title='Photos'>
        <ViewPhotos
          photos={project.photos.map(({url}) => url) || []}
        />
      </ViewCard>

      <EditProjectModal />

      {/*<CustomModal*/}
      {/*  title="Edit Project"*/}
      {/*  isActive={modalOpen}*/}
      {/*  handleClose={toggle}*/}
      {/*>*/}
      {/*  <EditProjectContent onAdd={handleSaveUpdatedProject} project={project}/>*/}

      {/*</CustomModal>*/}

      <Button title="Edit" cb={() => {
        dispatch(editProject({ id: Number(id) }))
      }}
      />
    </Box>

  );
};

export default ProjectView;
