import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

import SidebarList from './SidebarList';
import Title from '../Title';
import { routesList, RoutesTypes } from '../../routes/routes';
import { INavItem } from './types';

const drawerWidth = '215px';

const SectionTitle = styled(Typography)((props) => ({
  fontFamily: 'Nunito',
  fontWeight: '600',
  textTransform: 'uppercase',
  color: 'rgba(255, 255, 255, 0.2)',
  paddingLeft: '30px'
}));

const ColorizedDivider = styled(Divider)({
  borderColor: 'rgba(255, 255, 255, 0.1)',
  width: '145px',
  marginBottom: '30px',
  marginLeft: '30px'
});

const Sidebar: React.FC = () => {
  const [activePath, setActivePath] = useState('');
  const history = useHistory();
  const { pathname } = useLocation();

  const mainRoutes: INavItem[] = routesList
    .filter((route) => route.type === RoutesTypes.main)
    .map((route) => ({
      name: route.name,
      RouteIcon: route.RouteIcon,
      path: route.path
    }));

  const otherRoutes: INavItem[] = routesList
    .filter((route) => route.type === RoutesTypes.other)
    .map((route) => ({
      name: route.name,
      RouteIcon: route.RouteIcon,
      path: route.path
    }));

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const handleChangePath = (path: string) => {
    history.push(path);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          paddingTop: '30px',
          background: '#303439'
        }
      }}
      variant="permanent"
    >
      <Title
        sx={{
          m: '0 30px 30px'
        }}
        color="white"
      >
        Levi<Title color="#5893F9">CV</Title>
      </Title>
      <ColorizedDivider />
      <SectionTitle variant="h6">Main</SectionTitle>
      <SidebarList
        list={mainRoutes}
        activePath={activePath}
        onChangePath={handleChangePath}
      />
      <ColorizedDivider />
      <SectionTitle variant="h6">Other</SectionTitle>
      <SidebarList
        list={otherRoutes}
        activePath={activePath}
        onChangePath={handleChangePath}
      />
    </Drawer>
  );
};

export default Sidebar;
