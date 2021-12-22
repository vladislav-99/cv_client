import React from "react";
import List from '@mui/material/List';
import { SidebarListProps } from "./types";
import NavItem from "./NavItem";

const SidebarList: React.FC<SidebarListProps> = ({ list, activePath, onChangePath }) => {
  return <List>
    {list.map((route, index) => (
      <NavItem
        key={route.path + index}
        {...route}
        activePath={activePath}
        onChangePath={onChangePath}
      />
    ))}
  </List>
}


export default SidebarList