import React from 'react';
import { IconProps } from '../common/interfaces/IconProps';

const HeartIcon: React.FunctionComponent<IconProps> = ({
  height = 40,
  width = 40,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <rect width='40' height='40' rx='12' fill='#FFCECE' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20 27.2V27.2C19.7872 27.2 19.584 27.116 19.4336 26.9648L13.22 20.7408C11.5912 19.1088 11.5912 16.4536 13.22 14.8216C14.0064 14.0344 15.0568 13.6 16.176 13.6C17.2952 13.6 18.3456 14.0344 19.132 14.8216L20 15.6912L20.8672 14.8224C21.6544 14.0344 22.7048 13.6 23.824 13.6C24.9432 13.6 25.9936 14.0344 26.78 14.8216C28.4088 16.4536 28.4088 19.1088 26.7808 20.7408L20.5664 26.9656C20.416 27.116 20.2128 27.2 20 27.2'
        fill='#E24444'
      />
      <mask
        id='mask0_590_3842'
        maskUnits='userSpaceOnUse'
        x='11'
        y='13'
        width='18'
        height='15'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M20 27.2V27.2C19.7872 27.2 19.584 27.116 19.4336 26.9648L13.22 20.7408C11.5912 19.1088 11.5912 16.4536 13.22 14.8216C14.0064 14.0344 15.0568 13.6 16.176 13.6C17.2952 13.6 18.3456 14.0344 19.132 14.8216L20 15.6912L20.8672 14.8224C21.6544 14.0344 22.7048 13.6 23.824 13.6C24.9432 13.6 25.9936 14.0344 26.78 14.8216C28.4088 16.4536 28.4088 19.1088 26.7808 20.7408L20.5664 26.9656C20.416 27.116 20.2128 27.2 20 27.2'
          fill='white'
        />
      </mask>
      <g mask='url(#mask0_590_3842)'>
        <rect x='10.4' y='10.4' width='19.2' height='19.2' fill='#E24444' />
      </g>
    </svg>
  );
};

export default HeartIcon;
