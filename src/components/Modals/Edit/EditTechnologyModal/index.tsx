import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomModal from '../../../CustomModal';
import useModal from '../../../../utils/useModal';
import { RootState } from '../../../../store';
import { editTechnologyCancel, fetchEditTechnology } from '../../../../store/technologies/actions';
import useModalTrigger from '../../../../utils/useModalTrigger';
import EditTechnologyContent from './EditTechnologyContent';
import { CreatedTehnologyType, ITechnology } from '../../../../store/technologies/types';

const EditTechnologyModal: React.FC = () => {
  const dispatch = useDispatch();
  const [technologyName, setTechnologyName] = useState('');
  const [technologyType, setTechnologyType] = useState('');

  const {
    modalOpen,
    toggle
  } = useModal();

  const { technologyEditing, technologies } = useSelector(
    (state: RootState) => state.technologiesState
  );

  useEffect(() => {
    if (technologyEditing !== -1) {
      setTechnologyName(technologies[technologyEditing].name)
      setTechnologyType(technologies[technologyEditing].type)
    }
  }, [technologies, technologyEditing])

  const handleAllowCb = useCallback((value?: CreatedTehnologyType) => {
    if (value) {
      const technology: ITechnology = {
        id: technologyEditing,
       ...value
      }
      dispatch(fetchEditTechnology.started(technology));
    }
  }, [technologyEditing])
  const handleCancelCb = useCallback(() => dispatch(editTechnologyCancel()), [dispatch])

  const {
    handleAllow,
    handleCancel
  } = useModalTrigger({
    trigger: technologyEditing !== -1,
    onAllow: handleAllowCb,
    onCancel: handleCancelCb,
    onToggleModal: toggle
  })

  return (
    <CustomModal
      title="Edit Technology"
      isActive={modalOpen}
      handleClose={handleCancel}
    >
      <EditTechnologyContent
        initialValue={{
          name: technologyName,
          type: technologyType
        }}
        onSave={handleAllow}
      />
    </CustomModal>
  );
};

export default EditTechnologyModal;

