import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Title from '../../components/Title';
import Search from '../../components/Search';
import AddButton from '../../components/AddButton';
import Table from '../../components/Table';
import { getColumns, Tables } from '../../components/Table/Columns';
import { RootState } from '../../store';
import { fetchEducations } from '../../store/educations/actions';
import CustomModal from '../../components/CustomModal';
import useModal from '../../utils/useModal';
import AddEducations from '../../components/AddEducations';

const Educations: React.FC = () => {
  const dispatch = useDispatch();

  const { educations } = useSelector(
    (state: RootState) => state.educationsState
  );

  useEffect(() => {
    if (!educations.length) dispatch(fetchEducations.started());
  }, []);

  const { modalOpen, setModalOpen, toggle } = useModal();

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
      <Table columns={getColumns(Tables.educations)} rows={educations} />

      <CustomModal
        title="Add University"
        isActive={modalOpen}
        handleClose={() => setModalOpen(false)}
      >
        <AddEducations />
      </CustomModal>
    </Box>
  );
};

export default Educations;
