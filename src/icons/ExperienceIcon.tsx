import React from "react"
import { IconProps } from "./types"

const ExperienceIcon: React.FC<IconProps> = ({ active, hover }) => {
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


    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 5.25V3.75C9 2.925 8.325 2.25 7.5 2.25H3C2.175 2.25 1.5 2.925 1.5 3.75V14.25C1.5 15.075 2.175 15.75 3 15.75H15C15.825 15.75 16.5 15.075 16.5 14.25V6.75C16.5 5.925 15.825 5.25 15 5.25H9ZM4.5 14.25H3V12.75H4.5V14.25ZM4.5 11.25H3V9.75H4.5V11.25ZM4.5 8.25H3V6.75H4.5V8.25ZM4.5 5.25H3V3.75H4.5V5.25ZM7.5 14.25H6V12.75H7.5V14.25ZM7.5 11.25H6V9.75H7.5V11.25ZM7.5 8.25H6V6.75H7.5V8.25ZM7.5 5.25H6V3.75H7.5V5.25ZM14.25 14.25H9V12.75H10.5V11.25H9V9.75H10.5V8.25H9V6.75H14.25C14.6625 6.75 15 7.0875 15 7.5V13.5C15 13.9125 14.6625 14.25 14.25 14.25ZM13.5 8.25H12V9.75H13.5V8.25ZM13.5 11.25H12V12.75H13.5V11.25Z" fill={fill} fillOpacity={fillOpacity} />
    </svg>
}

export default ExperienceIcon