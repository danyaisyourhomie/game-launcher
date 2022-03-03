import React from 'react';
import { BACKGROUND_SECONDARY_COLOR } from '../const/css';
import VkIcon from '../icons/VkIcon';
import Button from './Button';

const AuthButton = () => {
  return (
    <Button
      name='Авторизация через ВК'
      icon={<VkIcon />}
      iconOrientation='LEFT'
      backgroundColor={BACKGROUND_SECONDARY_COLOR}
    />
  );
};

export default AuthButton;
