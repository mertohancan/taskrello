import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import userEvent from '@testing-library/user-event';
import AppProvider from '../../contexts/AppContext';

import Card from './Card';

const items = { id: '0', title: 'TITLE', cardItems: [{ id: '0', text: 'TODO' }] };

test('renders card title', () => {
  const { getByText } = render(
    <AppProvider>
      <Card item={items} />
    </AppProvider>
  );

  expect(getByText('TITLE')).toBeInTheDocument();
});

test('renders card items', () => {
  const { getByText } = render(
    <AppProvider>
      <Card item={items} />
    </AppProvider>
  );

  expect(getByText('TODO')).toBeInTheDocument();
});

test('opens modal when clicked card', () => {
  const { getByRole, getByText } = render(
    <AppProvider>
      <Card item={items} />
    </AppProvider>
  );
  const card = getByRole('button', { name: 'TODO' });
  userEvent.click(card);

  const modalMessage = getByText('Do you want to delete card?');

  expect(modalMessage).toBeInTheDocument();
});
