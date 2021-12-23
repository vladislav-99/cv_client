import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/material/Box'
import Title from "../../components/Title";
import Search from "../../components/Search";
import AddButton from "../../components/AddButton";
import Table from "../../components/Table";
import { getColumns, Tables } from "../../components/Table/Columns";
import { RootState } from '../../store'
import { fetchExperiences } from "../../store/experiences/actions";
import CustomModal from "../../components/CustomModal";
import AddExperiences from "../../components/AddExperiences";
import useModal from "../../utils/useModal";


const Experiences: React.FC = () => {
  const dispatch = useDispatch();

  const { experiences } = useSelector(
    (state: RootState) => state.experiencesState
  );

  useEffect(() => {
    if (!experiences.length) dispatch(fetchExperiences.started());
  }, []);

  const { modalOpen, setModalOpen, toggle } = useModal()

  return <Box>
    <Title color='#535E6C'>Work experience</Title>
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Search placeholder="Search company" />
      <AddButton title="+ Add Company" cb={toggle} />
    </Box>
    <Table columns={getColumns(Tables.experioences)} rows={experiences} />
    <CustomModal
      title="Add Companies"
      isActive={modalOpen}
      handleClose={() => setModalOpen(false)}
    >
      <AddExperiences />
    </CustomModal>
  </Box>
}

export default Experiences
