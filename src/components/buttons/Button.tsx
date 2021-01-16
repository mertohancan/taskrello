import React, { FC, MouseEvent } from 'react';
import styled from 'styled-components';

import { ButtonSize, ButtonColor } from '../../constants/constant';

export interface ButtonProps {
  text: string;
  color?: ButtonColor;
  size?: ButtonSize;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  icon?: string;
}

const createButton = (color: string): string => {
  switch (color) {
    case ButtonColor.Primary:
      return `
        background-color: #005093;
      `;
    case ButtonColor.Secondary:
      return `
        border: solid 2px black;
        background-color: white;
        color: #005093;
          `;
    default:
      return '';
  }
};

const getButtonWidth = (size: string): string => {
  switch (size) {
    case ButtonSize.Small:
      return '76px';
    case ButtonSize.Medium:
      return '171px';
    case ButtonSize.Large:
      return '100%';
    default:
      return '';
  }
};

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

const StyledButton = styled.button<{ size: string; color: string }>`
  width: ${({ size }) => getButtonWidth(size)};
  height: 40px;
  border: none;
  outline: none;

  border-radius: 3px;

  font-size: 15px;
  font-weight: bold;
  justify-content: space-between;

  text-align: center;
  color: ${({ color }) => createButton(color)};
  cursor: pointer;
`;

const Button: FC<ButtonProps> = ({
  text,
  onClick,
  color = ButtonColor.Primary,
  size = ButtonSize.Medium,
  icon,
}) => (
  <StyledButton color={color} onClick={onClick} size={size} type="button">
    {icon ? <Icon alt="icon" src={icon} /> : null}
    {text}
  </StyledButton>
);

export default Button;
