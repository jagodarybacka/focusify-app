import React from 'react';
import { render, screen } from '@testing-library/react';
import Playlist from './index';

it('Playlist renders correctly', () => {
  const playlist = {
    name: 'Test',
    images: [{ url: '' }]
  };
  render(<Playlist playlist={playlist}/>);
  expect(screen.getByTitle(playlist.name)).toBeInTheDocument();
});
