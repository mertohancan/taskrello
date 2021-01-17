import React, { FC, ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';

export interface InputProps {
  errorMessage?: string;
  label: string;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
}

const InputWrapper = styled.div`
  position: relative;

  width: auto;
  height: auto;
`;

const InputLabel = styled.label<{ labelOnTop: boolean; error: boolean }>`
  position: absolute;
  z-index: 1;
  top: 14px;
  font-size: 17px;
  left: 20px;
  font-family: Arial, Helvetica, sans-serif;
  user-select: none;
  pointer-events: none;

  color: ${({ error }) => (error ? 'orange' : 'black')};
`;

const StyledInput = styled.input<{ error: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  padding: 33px 20px 15px;
  border: ${({ error }) => (error ? '1px solid orange' : '1px solid black')};
  border-radius: 3px;

  color: black;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: bold;
  outline: none;

  &:focus {
    + ${InputLabel} {
      top: 14px;
      font-size: 12px;
      font-weight: 400;
      height: 11px;
    }
  }
`;

const InputError = styled.p`
  height: 19px;
  margin-left: 5px;
  margin-top: 8px;

  color: orange;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
`;

export const TextInput: FC<InputProps> = ({ errorMessage, label, onChange, value }) => {
  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(target.value);
    },
    [onChange]
  );

  return (
    <>
      <InputWrapper>
        <StyledInput error={Boolean(errorMessage)} onChange={handleChange} value={value} />
        <InputLabel error={Boolean(errorMessage)} labelOnTop={Boolean(value)}>
          {label}
        </InputLabel>
      </InputWrapper>
      {errorMessage ? <InputError>{errorMessage}</InputError> : null}
    </>
  );
};
export default TextInput;
