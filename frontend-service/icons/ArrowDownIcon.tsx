import React from 'react';
import { IconProps } from '../common/interfaces/IconProps';
import { TEXT_PRIMARY_COLOR } from '../const/colors';

const ArrowDownIcon: React.FunctionComponent<IconProps> = ({
  height = 24,
  width = 24,
  color = TEXT_PRIMARY_COLOR,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 8C11.772 8 11.545 8.077 11.36 8.232L5.36003 13.232C4.93603 13.585 4.87803 14.216 5.23203 14.64C5.58503 15.064 6.21503 15.121 6.64003 14.768L12.011 10.292L17.373 14.607C17.803 14.953 18.433 14.885 18.779 14.455C19.125 14.025 19.057 13.396 18.627 13.049L12.627 8.221C12.444 8.074 12.222 8 12 8'
        fill={color}
      />
      <mask
        id='mask0_563_4147'
        maskUnits='userSpaceOnUse'
        x='5'
        y='8'
        width='14'
        height='7'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12 8C11.772 8 11.545 8.077 11.36 8.232L5.36003 13.232C4.93603 13.585 4.87803 14.216 5.23203 14.64C5.58503 15.064 6.21503 15.121 6.64003 14.768L12.011 10.292L17.373 14.607C17.803 14.953 18.433 14.885 18.779 14.455C19.125 14.025 19.057 13.396 18.627 13.049L12.627 8.221C12.444 8.074 12.222 8 12 8'
          fill={color}
        />
      </mask>
      <g mask='url(#mask0_563_4147)'>
        <rect
          width='24'
          height='24'
          transform='matrix(1 0 0 -1 0 24)'
          fill={color}
        />
      </g>
    </svg>
  );
};

export default ArrowDownIcon;
