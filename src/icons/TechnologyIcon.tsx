import React from 'react';
import { IconProps } from './types';

const TechnologyIcon: React.FC<IconProps> = ({ active, hover }) => {
  let fill = 'white';
  let fillOpacity = '0.4';

  if (hover) {
    fill = 'white';
    fillOpacity = '1';
  }

  if (active) {
    fill = '#5893F9';
    fillOpacity = '1';
  }
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.885 1.98499L13.274 0.373991C12.986 0.0859909 12.5 0.283991 12.5 0.688991V1.62499H2.375C2.006 1.62499 1.7 1.93099 1.7 2.29999C1.7 2.66899 2.006 2.97499 2.375 2.97499H12.5V3.91099C12.5 4.31599 12.986 4.51399 13.265 4.22599L14.876 2.61499C15.056 2.44399 15.056 2.15599 14.885 1.98499Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
      <path
        d="M13.625 7.02498H3.5V6.08898C3.5 5.68398 3.014 5.48598 2.735 5.77398L1.124 7.38498C0.944 7.56498 0.944 7.84398 1.124 8.02398L2.735 9.63498C3.014 9.91398 3.5 9.71598 3.5 9.31098V8.37498H13.625C13.994 8.37498 14.3 8.06898 14.3 7.69998C14.3 7.33098 13.994 7.02498 13.625 7.02498Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
};

export default TechnologyIcon;
