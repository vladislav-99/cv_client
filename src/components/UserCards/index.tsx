import React from 'react';
import UserCardElement from './UserCardElement';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const UserCards: React.FC = () => {
  const {
    userIds,
  } = useSelector(
    (state: RootState) => state.usersState)

  return <Grid
    container
    spacing={2}
  >
    {
      userIds.map(userId => (
        <Grid item sm={12} md={6} lg={4} xl={3} >
          <UserCardElement userId={userId} />
        </Grid>
      ))
    }


  </Grid>;
};

export default UserCards;