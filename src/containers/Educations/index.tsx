import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Title from '../../components/Title';
import Search from '../../components/Search';
import AddButton from '../../components/AddButton';
import Table from '../../components/Table';
import { getColumns, Tables } from '../../components/Table/Columns';
import { RootState } from '../../store';
import { deleteEducation, deleteEducationCancel, fetchEducations } from '../../store/educations/actions';
import CustomModal from '../../components/CustomModal';
import useModal from '../../utils/useModal';
import AddEducations from '../../components/Modals/AddEducations';
import useModalTrigger from '../../utils/useDeleteTrigger';
import DeleteContent from '../../components/Modals/DeleteContent';

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

  const handleDeleteAllowCb = useCallback(() => dispatch(deleteEducation.started(educationDeleting)), [dispatch, educationDeleting])
  const handleDeleteCancelCb = useCallback(() => dispatch(deleteEducationCancel()), [dispatch])

  const {
    handleDeleteAllow,
    handleDeleteCancel
  } = useModalTrigger({
    trigger: educationDeleting !== -1,
    onAllow: handleDeleteAllowCb,
    onCancel: handleDeleteCancelCb,
    onToggleModal: toggleDeleteModal
  })

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
      <Table columns={getColumns(Tables.educations)} rows={educationsRows} />

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
        handleClose={handleDeleteCancel}
        style={{
          maxWidth: '450px',
          padding: '30px'
        }}
      >
        <DeleteContent
          label='university'
          onDelete={handleDeleteAllow}
        />
      </CustomModal>
    </Box>
  );
};

export default Educations;
