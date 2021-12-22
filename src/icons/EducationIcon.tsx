import React from "react"
import { IconProps } from "./types"

const EducationIcon: React.FC<IconProps> = ({ active, hover }) => {
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
    return <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.74999 7.88493V9.99243C2.74999 10.5399 3.04999 11.0499 3.52999 11.3124L7.27999 13.3599C7.72999 13.6074 8.26999 13.6074 8.71999 13.3599L12.47 11.3124C12.95 11.0499 13.25 10.5399 13.25 9.99243V7.88493L8.71999 10.3599C8.26999 10.6074 7.72999 10.6074 7.27999 10.3599L2.74999 7.88493ZM7.27999 0.63993L0.957493 4.08993C0.439993 4.37493 0.439993 5.12493 0.957493 5.40993L7.27999 8.85993C7.72999 9.10743 8.26999 9.10743 8.71999 8.85993L14.75 5.56743V9.99993C14.75 10.4124 15.0875 10.7499 15.5 10.7499C15.9125 10.7499 16.25 10.4124 16.25 9.99993V5.19243C16.25 4.91493 16.1 4.66743 15.86 4.53243L8.71999 0.63993C8.26999 0.39993 7.72999 0.39993 7.27999 0.63993Z" fill={fill} fillOpacity={fillOpacity} />
    </svg>
}

export default EducationIcon