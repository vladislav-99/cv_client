import React from "react"
import { IconProps } from "./types"

const CVIcon: React.FC<IconProps> = ({ active, hover }) => {
    let fill = "white"
    let fillOpacity = "0.4"

    if (hover) {
        fill = "white"
        fillOpacity = "1"
    }

    if (active) {
        fill = "#5893F9"
        fillOpacity = "1"
    }
    return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.6275 0.25H1.75C0.925 0.25 0.25 0.925 0.25 1.75V12.25C0.25 13.075 0.925 13.75 1.75 13.75H12.25C13.075 13.75 13.75 13.075 13.75 12.25V5.3725C13.75 4.975 13.5925 4.5925 13.3075 4.315L9.685 0.6925C9.4075 0.4075 9.025 0.25 8.6275 0.25ZM4 9.25H10C10.4125 9.25 10.75 9.5875 10.75 10C10.75 10.4125 10.4125 10.75 10 10.75H4C3.5875 10.75 3.25 10.4125 3.25 10C3.25 9.5875 3.5875 9.25 4 9.25ZM4 6.25H10C10.4125 6.25 10.75 6.5875 10.75 7C10.75 7.4125 10.4125 7.75 10 7.75H4C3.5875 7.75 3.25 7.4125 3.25 7C3.25 6.5875 3.5875 6.25 4 6.25ZM4 3.25H7.75C8.1625 3.25 8.5 3.5875 8.5 4C8.5 4.4125 8.1625 4.75 7.75 4.75H4C3.5875 4.75 3.25 4.4125 3.25 4C3.25 3.5875 3.5875 3.25 4 3.25Z" fill={fill} fillOpacity={fillOpacity} />
    </svg>
}

export default CVIcon