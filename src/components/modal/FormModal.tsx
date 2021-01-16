import React, { FC, ReactElement, RefObject } from 'react';
import styled from 'styled-components';

import { ButtonColor } from '../../constants/constant';
import { useClickOutside } from '../../utils/hooks';

import Button from '../buttons/Button';

const Overlay = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgba(35, 43, 56, 0.5);
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  box-sizing: border-box;
  min-width: 400px;
  max-width: 600px;

  padding: 24px;
  border: 1px solid rgba(35, 43, 56, 0.15);
  border-radius: 6px;
  box-shadow: 0 12px 24px 0px rgba(35, 43, 56, 0.15);
  transform: translate(-50%, -50%);

  background-color: white;

  overflow-wrap: break-word;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  margin-top: 30px;
`;

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  children: ReactElement;
}

const FormModal: FC<Props> = ({ onClose, onSubmit, children }) => {
  const { refElement } = useClickOutside(onClose);
  return (
    <Overlay>
      <Container ref={refElement as RefObject<HTMLDivElement>}>
        {children}
        <Actions>
          <Button color={ButtonColor.Primary} onClick={onSubmit} text="Ok" />
          <Button color={ButtonColor.Secondary} onClick={onClose} text="Cancel" />
        </Actions>
      </Container>
    </Overlay>
  );
};

export default FormModal;
