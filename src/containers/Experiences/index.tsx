import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Title from '../../components/Title';
import Search from '../../components/Search';
import Button from '../../components/Button';
import Table from '../../components/Table';
import { getColumns, Tables } from '../../components/Table/Columns';
import { RootState } from '../../store';
import {
  fetchDeleteExperience,
  deleteExperienceCancel,
  editExperience,
  fetchExperiences
} from '../../store/experiences/actions';
import CustomModal from '../../components/CustomModal';
import AddExperiences from '../../components/Modals/Add/AddExperiences';
import useModal from '../../utils/useModal';
import EditExperienceModal from '../../components/Modals/Edit/EditExperience';
import DeleteModal from '../../components/Modals/Delete/DeleteModal';

const Experiences: React.FC = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('')
  const { experiences, experiencesIds, experienceDeleting } = useSelector(
    (state: RootState) => state.experiencesState
  );

  useEffect(() => {
    if (!experiencesIds.length) dispatch(fetchExperiences.started());
  }, []);

  const experiencesRows = useMemo(() => {
    return experiencesIds
      .map((id) => experiences[id])
      .filter((experience) => {
        if (search)
          return experience.name.toLowerCase().includes(search.toLowerCase())
        return true
      });
  }, [experiencesIds, experiences, search]);

  const { modalOpen, setModalOpen, toggle } = useModal();

  const handleAllowCb = useCallback(
    () => dispatch(fetchDeleteExperience.started(experienceDeleting)),
    [dispatch, experienceDeleting]
  )
  const handleCancelCb = useCallback(() => dispatch(deleteExperienceCancel()), [dispatch])

  const handleClickOnName = (id: number) => {
    dispatch(editExperience({ id }))
  }

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue)
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
        <Search
          placeholder="Search company"
          onSearch={handleSearch}
        />
        <Button title="+ Add Company" cb={toggle} />
      </Box>
      <Table
        columns={getColumns(Tables.experiences)}
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
      <DeleteModal
        title='Delete Company?'
        contentLabel='company'
        trigger={experienceDeleting !== -1}
        handleAllowCb={handleAllowCb}
        handleCancelCb={handleCancelCb}
      />
      <EditExperienceModal />
    </Box>
  );
};

export default Experiences;
