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

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    box-sizing: border-box;
    margin: 1rem 0.25em;

    flex: 1;
    max-width: calc(25% -1em);
  }

  @media screen and (max-width: '1024px') and (min-width: '768px') {
    & > div {
      max-width: calc(50% -1em);
    }
  }

  @media screen and (max-width: '767px') {
    & > div {
      max-width: 100%;
    }
  }
`;

const AddList = styled.div`
  margin: 30px;
  width: 220px;
`;

const ProfilePicture = styled.img`
  width: 32px;
  height: 32px;
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
      <Header profilePicture={<ProfilePicture alt="profile" src={headIcon} />} />
      <AddList>
        <Button
          icon={plusIcon}
          onClick={toggleModal}
          size={ButtonSize.Large}
          text="Add a another list"
        />
      </AddList>
      <Container>
        <CardContainer>
          {appState.data.map((item) => (
            <Card item={item} />
          ))}
        </CardContainer>
      </Container>
    </>
  );
};

export default App;
