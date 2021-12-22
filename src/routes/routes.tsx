import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MainLayout from '../layouts/Main'
import UserIcon from '../icons/UserIcon'
import CVIcon from '../icons/CVIcon'
import ProjectIcon from '../icons/ProjectIcon'
import EducationIcon from '../icons/EducationIcon'
import TechnologyIcon from '../icons/TechnologyIcon'
import ExperienceIcon from '../icons/ExperienceIcon'
import { IconProps } from '../icons/types'
import Projects from '../containers/Projects'
import Experiences from '../containers/Experiences'
import Technologies from '../containers/Technologies'
import Educations from '../containers/Educations'
import Users from '../containers/Users'
import CVs from '../containers/CVs'

export enum RoutesTypes {
  main,
  other
}
export interface IRoute {
  RouteIcon: React.FC<IconProps>;
  Component: React.FC;
  name: string;
  type: RoutesTypes;
  path: string;
}

export const routesList: IRoute[] = [
  {
    RouteIcon: CVIcon,
    Component: CVs,
    name: 'CVs',
    type: RoutesTypes.main,
    path: '/cvs',
  },
  {
    RouteIcon: UserIcon,
    Component: Users,
    name: 'Users',
    type: RoutesTypes.main,
    path: '/users'
  },
  {
    RouteIcon: ProjectIcon,
    Component: Projects,
    name: 'Projects',
    type: RoutesTypes.main,
    path: '/projects'
  },
  {
    RouteIcon: EducationIcon,
    Component: Educations,
    name: 'Education',
    type: RoutesTypes.other,
    path: '/educations'
  },
  {
    RouteIcon: TechnologyIcon,
    Component: Technologies,
    name: 'Technologies',
    type: RoutesTypes.other,
    path: '/technologies'
  },
  {
    RouteIcon: ExperienceIcon,
    Component: Experiences,
    name: 'Work experience',
    type: RoutesTypes.other,
    path: '/experiences'
  }
]


export const routes = (
  <>
    <Switch>
      {routesList.map(({ Component, path }) => <Route exact path={path} key={path} >
        <MainLayout>
          <Component />
        </MainLayout>
      </Route>)}
      <Redirect to="/cvs" />
    </Switch>
  </>
)
