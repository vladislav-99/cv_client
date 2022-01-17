import React from "react"
import Typography from '@mui/material/Typography';
import ActionButton from '../../../AddButton';
import Box from "@mui/material/Box";

const DeleteContent: React.FC<{ label: string, onDelete: () => void }> = ({ label, onDelete }) => {
  return (
    <>
      <Typography
        variant='body1'
        sx={{
          fontFamily: 'Nunito',
          color: '#AFB5BF',
          mb: '30px',
          fontSize: '16px'
        }}
      >
        When you delete this {label.toLowerCase()}, you cannot be undone.
      </Typography>
      <ActionButton
        title="Delete"
        cb={onDelete}
      />
    </>
  )
}

export default DeleteContent