import React from "react";
import Button from "@mui/material/Button";

import { styled } from '@mui/system';

interface IButtonProps {
    title: string,
    cb: () => void
}

const ColorButton = styled(Button)({
    fontFamily: 'Nunito',
    height: '45px',
    textTransform: 'capitalize',
    backgroundColor: '#5893F9',
    '&:hover': {
        backgroundColor: '#74A7FF',
    },
});

const AddButton: React.FC<IButtonProps> = ({ title, cb }) => {
    return <ColorButton variant="contained" onClick={cb}>+ {title}</ColorButton>
}

export default AddButton