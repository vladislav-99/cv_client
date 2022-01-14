import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Title from '../../components/Title';
import Search from '../../components/Search';
import AddButton from '../../components/AddButton';
import Table from '../../components/Table';
import { getColumns, Tables } from '../../components/Table/Columns';
import { RootState } from '../../store';
import {
  deleteExperience,
  deleteExperienceCancel,
  editExperience,
  fetchExperiences
} from '../../store/experiences/actions';
import CustomModal from '../../components/CustomModal';
import AddExperiences from '../../components/Modals/AddExperiences';
import useModal from '../../utils/useModal';
import DeleteContent from '../../components/Modals/DeleteContent';
import useModalTrigger from '../../utils/useModalTrigger';
import EditExperienceModal from '../../components/Modals/Edit/EditExperience';

const Experiences: React.FC = () => {
  const dispatch = useDispatch();

  const { experiences, experiencesIds, experienceDeleting } = useSelector(
    (state: RootState) => state.experiencesState
  );

  useEffect(() => {
    if (!experiencesIds.length) dispatch(fetchExperiences.started());
  }, []);

  const experiencesRows = useMemo(() => {
    return experiencesIds.map((id) => experiences[id]);
  }, [experiencesIds, experiences]);

  const { modalOpen, setModalOpen, toggle } = useModal();
  const { modalOpen: deleteModalOpen, toggle: toggleDeleteModal } = useModal();

  const handleAllowCb = useCallback(
    () => dispatch(deleteExperience.started(experienceDeleting)),
    [dispatch, experienceDeleting]
  )
  const handleCancelCb = useCallback(() => dispatch(deleteExperienceCancel()), [dispatch])

  const {
    handleAllow,
    handleCancel
  } = useModalTrigger({
    trigger: experienceDeleting !== -1,
    onAllow: handleAllowCb,
    onCancel: handleCancelCb,
    onToggleModal: toggleDeleteModal
  })


  const handleClickOnName = (id: number) => {
    dispatch(editExperience({ id }))
  }
  return (
    <Box>
      <Title color="#535E6C">Work experience</Title>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Search placeholder="Search company" />
        <AddButton title="+ Add Company" cb={toggle} />
      </Box>
      <Table
        columns={getColumns(Tables.experioences)}
        rows={experiencesRows}
        onClickName={handleClickOnName}

      />
      <CustomModal
        title="Add Companies"
        isActive={modalOpen}
        handleClose={() => setModalOpen(false)}
      >
        <AddExperiences />
      </CustomModal>
      <CustomModal
        title="Delete Company?"
        isActive={deleteModalOpen}
        handleClose={handleCancel}
        style={{
          maxWidth: '450px',
          padding: '30px'
        }}
      >
        <DeleteContent
          label='company'
          onDelete={handleAllow}
        />
      </CustomModal>
      <EditExperienceModal />
    </Box>
  );
};

export default Experiences;
