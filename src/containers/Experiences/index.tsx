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


const Experiences: React.FC = () => {
  const dispatch = useDispatch();

  const { experiences } = useSelector(
    (state: RootState) => state.experiencesState
  );

  useEffect(() => {
    if (!experiences.length) dispatch(fetchExperiences.started());
  }, []);



  return <Box>
    <Title color='#535E6C'>Work experience</Title>
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Search placeholder="Search company" />
      <AddButton title="Add Company" cb={() => { }} />
    </Box>
    <Table columns={getColumns(Tables.experioences)} rows={experiences} />
  </Box>
}

export default Experiences
