import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from '../../store';
import { deleteTechnologyAllow } from '../../store/technologies/actions';

const Chips: React.FC<{ technologyId: number }> = ({
  technologyId
}) => {
  const dispatch = useDispatch()
  const { name } = useSelector(
    (state: RootState) => state.technologiesState.technologies[technologyId]
  );

  const handleDelete = useCallback(() => {
    dispatch(
      deleteTechnologyAllow({id: Number(technologyId)})
    )
  }, [dispatch, technologyId])

  return (

    <Chip
      sx={{
        backgroundColor: '#F0F2F5',
        color: '#9EA9BA',
        height: '30px',
        fontSize: '14px',
        px: '5px',
        mr: '10px',
        mb: '10px'
      }}
      label={name}
      deleteIcon={<CloseIcon />}
      onDelete={handleDelete}
    />
  );
};

export default Chips;
