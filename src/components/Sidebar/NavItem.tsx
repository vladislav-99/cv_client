import React from "react";

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/system';
import { INavItem, ItemCustomProps } from './types';

import useHover from "../../utils/useHover";
const Item = styled((props) => <ListItem button {...props} />, {
    shouldForwardProp: (prop) => prop !== 'active'
})<ItemCustomProps>(
    (props) => ({
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: '30px',
        paddingRight: 0,
        height: '45px',
        marginBottom: '15px',
        color: props.active ? '#5893F9' : 'rgba(255, 255, 255, 0.4)',
        '&:hover': {
            color: props.active ? '#5893F9' : '#FFFFFF'
        }
    })
)

const VerticalDivider = () => <Divider orientation="vertical" variant="middle" flexItem sx={{
    borderColor: '#5893F9',
    borderWidth: '3px',
    borderRadius: 5,
    height: '40px',
    margin: 0,
    padding: 0,

}} />

const NavItem: React.FC<INavItem & {
    activePath?: string
    onChangePath: (path: string) => void
}> = ({ name, RouteIcon, path, activePath, onChangePath }) => {
    const [hoverRef, isHovered] = useHover<HTMLDivElement>()
    return <div
        ref={hoverRef}
        onClick={() => onChangePath(path)}
    >
        <Item
            active={path === activePath}
        >
            <ListItemIcon sx={{
                minWidth: 30
            }}>
                <RouteIcon
                    active={path === activePath}
                    hover={isHovered}
                />
            </ListItemIcon>
            <ListItemText sx={{
                fontSize: '16px',
                pt: '5px'
            }} primary={name} />
            {path === activePath && <VerticalDivider />}
        </Item>

    </div>
}
export default NavItem