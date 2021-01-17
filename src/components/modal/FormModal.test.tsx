import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import FormModal from './FormModal';

test('render dialog when Modal is mounted', () => {
  const { getByRole } = render(<FormModal onClose={jest.fn()} onSubmit={jest.fn()} />);

  expect(getByRole('dialog')).toBeInTheDocument();
});

test('should be called when buttons clicked', () => {
  const mockSubmit = jest.fn();
  const mockCancel = jest.fn();

  const { getByRole } = render(<FormModal onClose={mockCancel} onSubmit={mockSubmit} />);

  const submitButton = getByRole('button', { name: 'Ok' });
  const cancelButton = getByRole('button', { name: 'Cancel' });

  userEvent.click(submitButton);
  userEvent.click(cancelButton);

  expect(mockSubmit).toHaveBeenCalledTimes(1);
  expect(mockCancel).toHaveBeenCalledTimes(1);
});
