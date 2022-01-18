import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Title from '../../components/Title';
import Search from '../../components/Search';
import Button from '../../components/Button';
import Divider from '@mui/material/Divider';
import { deleteTechnology, deleteTechnologyCancel, fetchTechnologies, searchTechnologyFilter } from '../../store/technologies/actions';
import { TechnologyTypes } from '../../store/technologies/types';
import TechnologyCard from '../../components/TechnologyCard';
import { RootState } from '../../store';
import CustomModal from '../../components/CustomModal';
import useModal from '../../utils/useModal';
import AddTechnologies from '../../components/Modals/Add/AddTechnologies';
import EditTechnologyModal from '../../components/Modals/Edit/EditTechnologyModal';
import DeleteModal from '../../components/Modals/Delete/DeleteModal';

const Technologies: React.FC = () => {
  const dispatch = useDispatch();

  const { technologiesIds, technologyDeleting } = useSelector(
    (state: RootState) => state.technologiesState
  );
  const { modalOpen, toggle } = useModal();

  const handleAllowCb = useCallback(() => dispatch(deleteTechnology.started(technologyDeleting)), [dispatch, technologyDeleting])
  const handleCancelCb = useCallback(() => dispatch(deleteTechnologyCancel()), [dispatch])

  useEffect(() => {
    if (!technologiesIds.length) dispatch(fetchTechnologies.started());
  }, []);

  const [soft, ...technologyNames] = Object.keys(
    TechnologyTypes
  ) as (keyof typeof TechnologyTypes)[];

  const handleSearch = (searchValue: string) => {
    dispatch(searchTechnologyFilter(searchValue))
  }

  return (
    <Box>
      <Title color="#535E6C">Technologies</Title>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Search
          placeholder="Search technology"
          onSearch={handleSearch}
        />
        <Button title="+ Technology" cb={toggle} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {technologyNames.map((type) => (
            <Grid key={type} item sm={12} md={6} lg={3}>
              <TechnologyCard type={type} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider
        sx={{
          my: '35px'
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xl={8} lg={5}>
            <TechnologyCard type={soft} />
          </Grid>
        </Grid>
      </Box>
      <CustomModal
        title="Add Tecnologies"
        isActive={modalOpen}
        handleClose={toggle}
      >
        <AddTechnologies />
      </CustomModal>
      <DeleteModal
        title='Delete Technology?'
        contentLabel='technology'
        trigger={technologyDeleting !== -1}
        handleAllowCb={handleAllowCb}
        handleCancelCb={handleCancelCb}
      />
      <EditTechnologyModal />
    </Box>
  );
};

export default Technologies;
