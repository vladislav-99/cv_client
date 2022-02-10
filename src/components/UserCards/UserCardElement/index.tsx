import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '../../Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const UserBox = styled(Box)({
  maxWidth: '395px',
  height: '432px',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E3E3EA',
  borderRadius: '10px',
  padding: '30px'
});


const UserCardTitle = styled(Typography)({
  fontFamily: 'Nunito',
  color: '#535E6C',
  fontWeight: '600',
  fontSize: '18px'
});

const UserCardDescription = styled('pre')({
  maxWidth: '335px',
  whiteSpace: 'pre-wrap',
  fontFamily: 'Nunito',
  color: '#AFB5BF',
  fontWeight: '400',
  fontSize: '14px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  display: '-webkit-box',
  '-webkit-line-clamp': '5',
  '-webkit-box-orient': 'vertical'
});

interface UserCardElementProps {
  userId: number
}

const UserCardElement: React.FC<UserCardElementProps> = ({
                                                           userId
                                                         }) => {
  const {
    photo,
    name,
    description
  } = useSelector(
    (state: RootState) => state.usersState.users[userId]);

  return <UserBox>
    <Stack
      justifyContent='center'
      alignItems='center'
      direction='column'
      spacing='25px'
    >
      <Avatar
        sx={{
          width: 115,
          height: 115
        }}
        src={photo}
        alt={name}
      />
      <UserCardTitle>{name}</UserCardTitle>
      <UserCardDescription>{description}</UserCardDescription>
      <Box
        alignSelf='flex-start'
      >
        <Button
          title='more'
          type='secondary'
          cb={() => {
          }}
        />
      </Box>
    </Stack>
  </UserBox>;
};

export default UserCardElement;