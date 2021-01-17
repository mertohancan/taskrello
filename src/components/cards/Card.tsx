import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { useCardItemDispatch, useRemoveCardItemDispatch } from '../../contexts/AppContext';
import { ButtonColor, ButtonSize } from '../../constants/constant';

import FormModal from '../modal/FormModal';
import TextInput from '../text-inputs/TextInput';
import Button from '../buttons/Button';

import plusIcon from '../../images/icons/plus.svg';

interface CardItem {
  id: string;
  text: string;
  listId?: string;
}

interface CardItems {
  id: string;
  title: string;
  cardItems: Array<CardItem>;
}

interface CardProps {
  item: CardItems;
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

const ButtonWrapper = styled.div`
  margin: 10px;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 40px;
  opacity: 0.7;
  border: none;
  outline: none;
  background: none;
  margin-top: 10px;

  border-radius: 3px;

  color: #151a30;

  font-size: 15px;
  font-weight: bold;
  justify-content: space-between;

  cursor: pointer;
`;

const ModalMessage = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
`;

const Icon = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 10px;
`;

const Card: FC<CardProps> = ({ item }) => {
  const dispatch = useCardItemDispatch();
  const removeDispatch = useRemoveCardItemDispatch();

  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [selectedCard, setSelectedCard] = useState<CardItem>();

  const toggleModal = (): void => setShowModal((state) => !state);
  const toggleDeleteModal = (): void => setShowDeleteModal((state) => !state);

  const handleSubmit = (): void => {
    if (!name.length) {
      setErrorMessage('It can not be empty');
    } else {
      dispatch({ id: item.id, text: name });
      toggleModal();
    }
  };

  const handleCardClick = (card: CardItem, listId: string) => (): void => {
    setShowDeleteModal((state) => !state);
    setSelectedCard({ ...card, listId });
  };
  const handleDelete = (): void => {
    selectedCard && removeDispatch({ cardId: selectedCard.id, listId: selectedCard.listId });
    toggleDeleteModal();
  };

  return (
    <Container>
      {showModal ? (
        <FormModal onClose={toggleModal} onSubmit={handleSubmit}>
          <TextInput
            errorMessage={errorMessage}
            label="Card Name"
            onChange={setName}
            value={name}
          />
        </FormModal>
      ) : null}
      {showDeleteModal ? (
        <FormModal onClose={toggleDeleteModal} onSubmit={handleDelete}>
          <ModalMessage>Do you want to delete card?</ModalMessage>
        </FormModal>
      ) : null}
      <Title>{item.title}</Title>
      {item.cardItems.map((card) => (
        <ButtonWrapper key={card.id}>
          <Button
            color={ButtonColor.Secondary}
            onClick={handleCardClick(card, item.id)}
            size={ButtonSize.Large}
            text={card.text}
          />
        </ButtonWrapper>
      ))}
      <StyledButton onClick={toggleModal}>
        <Icon alt="plusIcon" src={plusIcon} />
        Add a new card
      </StyledButton>
    </Container>
  );
};

export default Card;
