import React from 'react';
import { render, screen } from '@testing-library/react';
import EditBox from './index';

it('EditBox renders correctly', () => {
  const label = 'test';
  render(<EditBox label={label}/>);
  expect(screen.getByText(label)).toBeInTheDocument();
});
