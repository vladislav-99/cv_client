import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';

import Title from "../../components/Title";
import Search from "../../components/Search";
import AddButton from "../../components/AddButton";
import Divider from "@mui/material/Divider";
import { fetchTechnologies } from "../../store/technologies/actions";
import { TechnologyTypes } from "../../store/technologies/reducer";
import TechnologyCard from "../../components/TechnologyCard";
import { RootState } from "../../store";

const Technologies: React.FC = () => {
  const dispatch = useDispatch();

  const { technologyCounts } = useSelector(
    (state: RootState) => state.technologiesState
  );

  useEffect(() => {
    if (!technologyCounts) dispatch(fetchTechnologies.started());
  }, []);

  const [soft, ...technologyNames] = Object.keys(TechnologyTypes) as (keyof typeof TechnologyTypes)[]

  return <Box>
    <Title color='#535E6C'>Technologies</Title>
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Search placeholder="Search technology" />
      <AddButton title="+ Technology" cb={() => { }} />
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {technologyNames.map((type) =>
          <Grid key={type} item sm={12} md={6} lg={3}>
            <TechnologyCard type={type} />
          </Grid>
        )}
      </Grid>
    </Box>
    <Divider sx={{
      my: '35px'
    }} />
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} xl={8} lg={5}>
          <TechnologyCard type={soft} />
        </Grid>

      </Grid>
    </Box>
  </Box>
}

export default Technologies
