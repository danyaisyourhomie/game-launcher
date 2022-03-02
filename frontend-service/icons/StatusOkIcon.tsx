import React from 'react';
import { IconProps } from '../common/interfaces/IconProps';
import { GREEN_COLOR } from '../const/colors';

const StatusOkIcon: React.FunctionComponent<IconProps> = ({
  height = 24,
  width = 24,
  color = GREEN_COLOR,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <circle cx='10' cy='10' r='9.5' fill='#50D86A' stroke='#50D86A' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.74561 13.5C8.55685 13.5 8.3763 13.4335 8.24704 13.3163L4.9212 10.2952C4.66199 10.0607 4.67636 9.69143 4.95129 9.47093C5.2269 9.25043 5.65982 9.2621 5.91765 9.4966L8.73877 12.058L14.4891 6.69018C14.7449 6.4516 15.1771 6.43585 15.4561 6.65285C15.7345 6.86985 15.7536 7.2391 15.4992 7.47651L9.25033 13.3098C9.12244 13.43 8.94052 13.4988 8.7504 13.5H8.74561Z'
        fill='white'
      />
      <mask
        id='mask0_541_5458'
        maskUnits='userSpaceOnUse'
        x='4'
        y='6'
        width='12'
        height='8'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M8.74561 13.5C8.55685 13.5 8.3763 13.4335 8.24704 13.3163L4.9212 10.2952C4.66199 10.0607 4.67636 9.69143 4.95129 9.47093C5.2269 9.25043 5.65982 9.2621 5.91765 9.4966L8.73877 12.058L14.4891 6.69018C14.7449 6.4516 15.1771 6.43585 15.4561 6.65285C15.7345 6.86985 15.7536 7.2391 15.4992 7.47651L9.25033 13.3098C9.12244 13.43 8.94052 13.4988 8.7504 13.5H8.74561Z'
          fill='white'
        />
      </mask>
      <g mask='url(#mask0_541_5458)'>
        <rect x='2' y='3' width='16.4138' height='14' fill='white' />
      </g>
    </svg>
  );
};

export default StatusOkIcon;
