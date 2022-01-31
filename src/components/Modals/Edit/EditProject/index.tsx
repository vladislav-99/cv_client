import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomModal from '../../../CustomModal';
import useModal from '../../../../utils/useModal';
import { RootState } from '../../../../store';
import useModalTrigger from '../../../../utils/useModalTrigger';
import { CreatingProjectType } from '../../ProjectContent';
import { ProjectTypes, UpdateProjectType } from '../../../../store/projects/types';
import { editProjectCancel, fetchEditProject } from '../../../../store/projects/actions';
import EditProjectContent from './EditProjectContent';

const EditProjectModal: React.FC = () => {
  const dispatch = useDispatch();

  const {
    modalOpen,
    toggle
  } = useModal();

  const { projectEditing, projects } = useSelector(
    (state: RootState) => state.projectsState
  );

  const project = useMemo(
    () => projects[projectEditing],
    [projectEditing, projects]
  )

  const handleAllowCb = useCallback((project?: CreatingProjectType) => {
    if (project && projectEditing !== -1) {
        const updatedProject: UpdateProjectType = {
        ...project,
        type: project.type as ProjectTypes,
        id: projectEditing
      }

      dispatch(fetchEditProject.started(updatedProject))
    }
  }, [projectEditing])

  const handleCancelCb = useCallback(() => dispatch(editProjectCancel()), [dispatch])

  const {
    handleAllow,
    handleCancel
  } = useModalTrigger({
    trigger: projectEditing !== -1,
    onAllow: handleAllowCb,
    onCancel: handleCancelCb,
    onToggleModal: toggle
  })

  return (
    <CustomModal
      title="Edit Project"
      isActive={modalOpen}
      handleClose={handleCancel}
    >
      <EditProjectContent project={project} onAdd={handleAllow} />
    </CustomModal>
  );
};

export default EditProjectModal;