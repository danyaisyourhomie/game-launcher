import React, { MouseEventHandler } from 'react';
import { BACKGROUND_SECONDARY_COLOR } from '../const/css';
import UsersIcon from '../icons/UsersIcon';
import VkIcon from '../icons/VkIcon';
import Button from './Button';

const AuthButton = ({
  callback,
}: {
  callback: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button
      name='Авторизоваться'
      callback={callback}
      icon={<UsersIcon />}
      backgroundColor={BACKGROUND_SECONDARY_COLOR}
    />
  );
};

export default AuthButton;
