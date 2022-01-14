import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalContent from '../EditNameContent';
import CustomModal from '../../../CustomModal';
import useModal from '../../../../utils/useModal';
import { RootState } from '../../../../store';
import { editEducationCancel } from '../../../../store/educations/actions';
import useModalTrigger from '../../../../utils/useModalTrigger';

const EditEducationModal: React.FC = () => {
  const dispatch = useDispatch();
  const [univarsityName, setUnivarsityName] = useState('');


  const {
    modalOpen,
    toggle
  } = useModal();

  const { educationEditing, educations } = useSelector(
    (state: RootState) => state.educationsState
  );

  useEffect(() => {
    if (educationEditing !== -1) {
      setUnivarsityName(educations[educationEditing].name)
    }
  }, [educations, educationEditing])

  const handleAllowCb = useCallback((value?: string) => {

    console.log(value);
    dispatch(editEducationCancel());
  }, [])
  const handleCancelCb = useCallback(() => dispatch(editEducationCancel()), [dispatch])

  const {
    handleAllow,
    handleCancel
  } = useModalTrigger({
    trigger: educationEditing !== -1,
    onAllow: handleAllowCb,
    onCancel: handleCancelCb,
    onToggleModal: toggle
  })

  return (
    <CustomModal
      title="Edit University"
      isActive={modalOpen}
      handleClose={handleCancel}
      style={{
        maxWidth: '450px',
        padding: '30px'
      }}
    >
      <ModalContent
        initialValue={univarsityName}
        onSave={handleAllow}
        fieldLabel='University'
        buttonLabel='Save University'
      />
    </CustomModal>
  );
};

export default EditEducationModal;

