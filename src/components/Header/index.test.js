import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';

it('Header renders correctly', () => {
  const label = 'test';
  render(<Header label={label}/>);
  expect(screen.getByText(label)).toBeInTheDocument();
});
