import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalContent from '../EditNameContent';
import CustomModal from '../../../CustomModal';
import useModal from '../../../../utils/useModal';
import { RootState } from '../../../../store';
import { editExperienceCancel, fetchEditExperience } from '../../../../store/experiences/actions';
import useModalTrigger from '../../../../utils/useModalTrigger';
import { IExperience } from '../../../../store/experiences/types';

const EditExperienceModal: React.FC = () => {
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState('');


  const {
    modalOpen,
    toggle
  } = useModal();

  const { experienceEditing, experiences } = useSelector(
    (state: RootState) => state.experiencesState
  );

  useEffect(() => {
    if (experienceEditing !== -1) {
      setCompanyName(experiences[experienceEditing].name)
    }
  }, [experiences, experienceEditing])

  const handleAllowCb = useCallback((value?: string) => {
    if (value) {
      const experience: IExperience = {
        id: experienceEditing,
        name: value
      }
      dispatch(fetchEditExperience.started(experience));
    }
  }, [experienceEditing])
  const handleCancelCb = useCallback(() => dispatch(editExperienceCancel()), [dispatch])

  const {
    handleAllow,
    handleCancel
  } = useModalTrigger({
    trigger: experienceEditing !== -1,
    onAllow: handleAllowCb,
    onCancel: handleCancelCb,
    onToggleModal: toggle
  })

  return (
    <CustomModal
      title="Edit Company"
      isActive={modalOpen}
      handleClose={handleCancel}
    >
      <ModalContent
        initialValue={companyName}
        onSave={handleAllow}
        fieldLabel='Company'
        buttonLabel='Save Company'
      />
    </CustomModal>
  );
};

export default EditExperienceModal;

