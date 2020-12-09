import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from './index';

it('Icon renders correctly', () => {
  const rendered = 'test';
  render(<Icon render={() => rendered}/>);
  expect(screen.getByText(rendered)).toBeInTheDocument();
});
