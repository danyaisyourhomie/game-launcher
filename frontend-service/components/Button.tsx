import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { ButtonTypes } from '../common/enum/ButtonTypes';
import {
  BLUE_COLOR,
  BUTTON_PRIMARY_COLOR,
  TEXT_PRIMARY_COLOR,
} from '../const/colors';

interface Props {
  name?: string;
  icon?: React.ReactElement;
  color?: string;
  callback?: MouseEventHandler<HTMLButtonElement>;
  buttonType?: ButtonTypes;
}

const Button = ({ name, icon, color, callback, buttonType }: Props) => {
  return (
    <ButtonWrapper
      type='button'
      color={color}
      buttonType={buttonType ?? ButtonTypes.DEFAULT}
      onClick={callback}>
      {name} {icon}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  padding: ${(props) =>
    props.buttonType === ButtonTypes.DEFAULT ? '10px 50px' : 'unset'};
  background-color: ${(props) =>
    props.buttonType === ButtonTypes.DEFAULT
      ? BUTTON_PRIMARY_COLOR
      : 'transparent'};
`;

export default Button;
