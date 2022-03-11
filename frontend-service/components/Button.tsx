import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { ButtonTypes } from '../common/enum/ButtonTypes';
import { BUTTON_PRIMARY_COLOR, MEDIUM_FONT } from '../const/css';

interface Props {
  name?: string;
  icon?: React.ReactElement;
  color?: string;
  callback?: MouseEventHandler<HTMLButtonElement>;
  buttonType?: ButtonTypes;
  backgroundColor?: string;
  iconOrientation?: 'LEFT' | 'RIGHT';
  link?: string;
  buttonIsCentered?: boolean;
}

const Button = ({
  name,
  icon,
  color,
  callback,
  buttonType,
  backgroundColor,
  iconOrientation = 'RIGHT',
  link,
  buttonIsCentered,
}: Props) => {
  return link ? (
    <a href={link}>
      <ButtonWrapper
        type='button'
        color={color}
        hasIcon={Boolean(icon && name)}
        backgroundColor={backgroundColor}
        buttonType={buttonType ?? ButtonTypes.DEFAULT}
        buttonIsCentered
        onClick={callback}>
        {iconOrientation === 'LEFT' ? (
          <>
            {icon} {name}
          </>
        ) : (
          <>
            {name} {icon}
          </>
        )}
      </ButtonWrapper>
    </a>
  ) : (
    <ButtonWrapper
      type='button'
      color={color}
      buttonType={buttonType ?? ButtonTypes.DEFAULT}
      hasIcon={Boolean(icon && name)}
      backgroundColor={backgroundColor}
      buttonIsCentered
      onClick={callback}>
      {iconOrientation === 'LEFT' ? (
        <>
          {icon} {name}
        </>
      ) : (
        <>
          {name} {icon}
        </>
      )}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;

  margin: ${(props) => (props.buttonIsCentered ? 'auto' : 'inherit')};

  padding: ${(props) =>
    props.buttonType === ButtonTypes.DEFAULT ? '10px 50px' : 'unset'};

  padding: ${({ hasIcon }) => (hasIcon ? '10px 15px' : 'auto')};

  background-color: ${(props) =>
    props.buttonType === ButtonTypes.DEFAULT
      ? BUTTON_PRIMARY_COLOR
      : 'transparent'};

  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'auto'};

  font-family: ${MEDIUM_FONT};

  box-sizing: ${({ hasIcon }) => (hasIcon ? 'content-box' : 'border-box')};

  z-index: 1;
`;

export default Button;
