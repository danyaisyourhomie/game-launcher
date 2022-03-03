import React from 'react';
import { IconProps } from '../common/interfaces/IconProps';

const DownloadIcon: React.FunctionComponent<IconProps> = ({
  height = 20,
  width = 20,
  color = '#ffffff',
}: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill={color}
      viewBox='0 0 20 20'>
      <title>download</title>
      <path d='M17 12v5H3v-5H1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z' />
      <path d='M10 15l5-6h-4V1H9v8H5l5 6z' />
    </svg>
  );
};

export default DownloadIcon;
