import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Title from '../../components/Title';
import Search from '../../components/Search';
import AddButton from '../../components/AddButton';
import Table from '../../components/Table';
import { getColumns, Tables } from '../../components/Table/Columns';
import { RootState } from '../../store';
import { fetchDeleteEducation, deleteEducationCancel, editEducation, fetchEducations } from '../../store/educations/actions';
import CustomModal from '../../components/CustomModal';
import useModal from '../../utils/useModal';
import AddEducations from '../../components/Modals/AddEducations';
import useModalTrigger from '../../utils/useModalTrigger';
import DeleteContent from '../../components/Modals/DeleteContent';
import EditEducationModal from '../../components/Modals/Edit/EditEducation';

const Educations: React.FC = () => {
  const dispatch = useDispatch();

  const { educations, educationIds, educationDeleting } = useSelector(
    (state: RootState) => state.educationsState
  );

  useEffect(() => {
    if (!educationIds.length) dispatch(fetchEducations.started());
  }, []);

  const educationsRows = useMemo(() => educationIds.map(id => educations[id]), [educationIds, educations])

  const { modalOpen, setModalOpen, toggle } = useModal();
  const { modalOpen: deleteModalOpen, toggle: toggleDeleteModal } = useModal();

  const handleAllowCb = useCallback(() => dispatch(fetchDeleteEducation.started(educationDeleting)), [dispatch, educationDeleting])
  const handleCancelCb = useCallback(() => dispatch(deleteEducationCancel()), [dispatch])

  const {
    handleAllow,
    handleCancel
  } = useModalTrigger({
    trigger: educationDeleting !== -1,
    onAllow: handleAllowCb,
    onCancel: handleCancelCb,
    onToggleModal: toggleDeleteModal
  })

  const handleClickOnName = (id: number) => {
    dispatch(editEducation({ id }))
  }

  return (
    <Box>
      <Title color="#535E6C">Education</Title>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Search placeholder="Search university" />

        <AddButton title="+ Add University" cb={toggle} />
      </Box>
      <Table
        columns={getColumns(Tables.educations)}
        rows={educationsRows}
        onClickName={handleClickOnName}
      />

      <CustomModal
        title="Add University"
        isActive={modalOpen}
        handleClose={() => setModalOpen(false)}
      >
        <AddEducations />
      </CustomModal>
      <CustomModal
        title="Delete University?"
        isActive={deleteModalOpen}
        handleClose={handleCancel}
        style={{
          maxWidth: '450px',
          padding: '30px'
        }}
      >
        <DeleteContent
          label='university'
          onDelete={handleAllow}
        />
      </CustomModal>
      <EditEducationModal />
    </Box>
  );
};

export default Educations;
