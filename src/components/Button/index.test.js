import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './index';

it('Button renders correctly', () => {
  render(<Button>Test</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

it('Button renders its content correctly', () => {
  render(<Button>Test</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Test');
});

it('Button can be disabled', () => {
  render(<Button isDisabled>Test</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
});
