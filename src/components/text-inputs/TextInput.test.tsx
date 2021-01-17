import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import TextInput from './TextInput';

test('types text on input', async () => {
  const { getByRole } = render(<TextInput label="Title" />);
  const input = getByRole('textbox');

  userEvent.type(input, 'test');
  expect(input).toHaveValue('test');
});

test('calls onChange function', async () => {
  const inputValue = 'test';
  const mockOnChange = jest.fn((val) => val);
  const { getByRole } = render(<TextInput label="name" onChange={mockOnChange} />);
  const input = getByRole('textbox');

  userEvent.type(input, inputValue);

  expect(mockOnChange).toHaveBeenCalledTimes(inputValue.length);
  expect(mockOnChange).toHaveLastReturnedWith(inputValue);
});

test('renders error message and changes border color', async () => {
  const mockOnChange = jest.fn((val) => val);
  const { getByRole, getByText } = render(
    <TextInput errorMessage="Please enter a valid name" label="name" onChange={mockOnChange} />
  );
  const textbox = getByRole('textbox');
  const errorMessage = getByText('Please enter a valid name');

  expect(errorMessage).toBeInTheDocument();
  expect(textbox).toHaveStyle('border-color: orange');
});
