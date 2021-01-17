import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Card from './Card';

const items = [{ text: 'TODO 1' }];

test('renders card title', () => {
  const { getByText } = render(<Card title="CARD 1" />);

  expect(getByText('CARD 1')).toBeInTheDocument();
});

test('renders card items', () => {
  const { getByText } = render(<Card items={items} title="CARD 1" />);

  expect(getByText('TODO 1')).toBeInTheDocument();
});
