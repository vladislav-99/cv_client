import { IconProps } from "../../icons/types";

export interface ItemCustomProps {
    active?: boolean,
}

export interface INavItem {
    name: string,
    RouteIcon: React.FC<IconProps>,
    path: string
}


export interface SidebarListProps {
    list: INavItem[],
    activePath: string,
    onChangePath: (path: string) => void
}

