import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalContent from '../EditNameContent';
import CustomModal from '../../../CustomModal';
import useModal from '../../../../utils/useModal';
import { RootState } from '../../../../store';
import { editTechnologyCancel } from '../../../../store/technologies/actions';
import useModalTrigger from '../../../../utils/useModalTrigger';
import EditTechnologyContent from './EditTechnologyContent';
import { CreatedTehnologyType } from '../../../../store/technologies/types';

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
      console.log(technologies[technologyEditing])
      setTechnologyName(technologies[technologyEditing].name)
      setTechnologyType(technologies[technologyEditing].type)
    }
  }, [technologies, technologyEditing])

  const handleAllowCb = useCallback((value?: CreatedTehnologyType) => {
    if (value)
      console.log({
        id: technologyEditing,
        ...value
      });
    dispatch(editTechnologyCancel());
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
      style={{
        maxWidth: '450px',
        padding: '30px'
      }}
    >
      {/* <ModalContent
        initialValue={technologyName}
        onSave={handleAllow}
        fieldLabel='Technology'
        buttonLabel='Save Technology'
      /> */}
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

