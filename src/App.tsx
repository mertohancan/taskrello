import React, { FC, useState } from 'react';
import styled from 'styled-components';

import Header from './components/headers/Header';
import Card from './components/cards/Card';
import Button from './components/buttons/Button';
import FormModal from './components/modal/FormModal';
import TextInput from './components/text-inputs/TextInput';

import { useAppState, useCardDispatch } from './contexts/AppContext';
import { ButtonSize } from './constants/constant';

import headIcon from './images/icons/head.svg';
import plusIcon from './images/icons/plus.svg';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Wrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
`;

const Cards = styled.div`
  width: 250px;
  height: auto;
  margin: 50px 20px;
`;

const AddList = styled.div`
  margin-top: 70px;
  width: 220px;
`;

const App: FC = () => {
  const appState = useAppState();
  const dispatch = useCardDispatch();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [listName, setListName] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');

  const toggleModal = (): void => setShowModal((state) => !state);

  const handleSubmit = (): void => {
    if (!listName.length) {
      setErrorMessage('It can not be empty');
    } else {
      dispatch(listName);
      toggleModal();
    }
  };

  return (
    <>
      {showModal ? (
        <FormModal onClose={toggleModal} onSubmit={handleSubmit}>
          <TextInput
            errorMessage={errorMessage}
            label="List name"
            onChange={setListName}
            value={listName}
          />
        </FormModal>
      ) : null}
      <Header
        profilePicture={<img alt="profile" src={headIcon} style={{ width: 32, height: 32 }} />}
      />
      <Container>
        <Wrapper>
          {appState.data.map((item) => (
            <Cards key={item.id}>
              <Card item={item} />
            </Cards>
          ))}
        </Wrapper>
        <AddList>
          <Button
            icon={plusIcon}
            onClick={toggleModal}
            size={ButtonSize.Large}
            text="Add a another list"
          />
        </AddList>
      </Container>
    </>
  );
};

export default App;
