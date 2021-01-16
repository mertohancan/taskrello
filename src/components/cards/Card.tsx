import React, { FC, useState } from 'react';
import styled from 'styled-components';

import FormModal from '../modal/FormModal';
import TextInput from '../text-inputs/TextInput';

import plusIcon from '../../images/icons/plus.svg';

interface CardProps {
  title: string;
  items?: Array<{ text: string }>;
}

const Container = styled.div`
  box-sizing: border-box;
  width: auto;
  height: auto;
  padding: 20px 18px;
  border: 2px solid;
  border-radius: 6px;
  border-color: white;
  background-color: #c9e7e5;

  &:hover {
    border-color: blue;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
`;

const Item = styled.div`
  background-color: white;
  color: black;
  border-radius: 10px;
  margin: 10px;
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const Text = styled.span`
  font-family: Arial, Helvetica, sans-serif;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  opacity: 0.7;
  border: none;
  outline: none;
  background: none;

  border-radius: 3px;

  color: #151a30;

  font-size: 15px;
  font-weight: bold;
  justify-content: space-between;

  cursor: pointer;
`;

const Icon = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 10px;
`;

const Card: FC<CardProps> = ({ title, items }) => {
  const [cardName, setCardName] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = (): void => setShowModal((state) => !state);

  const handleSubmit = (): void => {
    toggleModal();
  };

  return (
    <Container>
      {showModal ? (
        <FormModal onClose={toggleModal} onSubmit={handleSubmit}>
          <TextInput label="Card Name" onChange={setCardName} value={cardName} />
        </FormModal>
      ) : null}
      <Title>{title}</Title>
      {items?.map((card) => (
        <Item>
          <Text>{card.text}</Text>
        </Item>
      ))}
      <Button onClick={toggleModal}>
        <Icon alt="plusIcon" src={plusIcon} />
        Add a new card
      </Button>
    </Container>
  );
};

export default Card;
