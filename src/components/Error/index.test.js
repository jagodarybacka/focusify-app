import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from './index';

const error = {
  message: 'Some error occured'
};

it('Error renders correctly', () => {
  render(<Error error={error}/>);
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});
