import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Title from '../../components/Title';
import Search from '../../components/Search';
import Button from '../../components/Button';
import CustomModal from '../../components/CustomModal';
import useModal from '../../utils/useModal';
import UserCards from '../../components/UserCards';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchUsers } from '../../store/users/actions';

const Users: React.FC = () => {
  const dispatch = useDispatch()
  const { modalOpen, toggle } = useModal();
  const {
    userIds,
  } = useSelector(
    (state: RootState) => state.usersState)

  useEffect(() => {
    if (!userIds.length) dispatch(fetchUsers.started());
  }, []);

  const handleSearch = (value: string) => {

  }

  return (
    <Box>
      <Title color="#535E6C">Users</Title>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Search
          placeholder="Search user"
          onSearch={handleSearch}
        />
        <Button title="+ Add User" cb={toggle} />
      </Box>

      <UserCards />

      <CustomModal
        title="Add User"
        isActive={modalOpen}
        handleClose={toggle}
      >
        <em>Content</em>
      </CustomModal>
    </Box>
  );
};

export default Users;
