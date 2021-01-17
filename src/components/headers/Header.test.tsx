import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppProvider from '../../contexts/AppContext';

import Header from './Header';

import headIcon from '../../images/icons/head.svg';

test('renders profile picture prop', async () => {
  const { getByAltText } = render(
    <AppProvider>
      <Header profilePicture={<img alt="thats me" src={headIcon} />} />
    </AppProvider>
  );
  const image = getByAltText('thats me');

  expect(image).toBeInTheDocument();
});
