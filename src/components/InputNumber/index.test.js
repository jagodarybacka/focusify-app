import React from 'react';
import { render, screen } from '@testing-library/react';
import InputNumber from './index';

it('InputNumber renders correctly', () => {
  const label = 'test';
  render(<InputNumber label={label}/>);
  expect(screen.getByText(label)).toBeInTheDocument();
});
