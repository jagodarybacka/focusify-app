import { SECOND } from 'mixins/consts';

export const initialState = {
  duration: null,
  currentIndex: 0,
  playlist: null,
  isPlaying: null,
  timeRemaining: null,
  error: null
};

export function reducer(state, action) {
  const { type, playlist, isPlaying, error } = action;

  switch (type) {
  case 'setPlaylist':
    return {
      ...state,
      playlist,
      duration: playlist.time * SECOND,
      timeRemaining: playlist.time
    };
  case 'toggleSession':
    return {
      ...state,
      currentIndex: state.currentIndex ? 0 : 1
    };
  case 'decreaseTime':
    return {
      ...state,
      timeRemaining: state.timeRemaining - 1
    };
  case 'togglePlay':
    return {
      ...state,
      error: null,
      isPlaying
    };
  case 'error':
    return {
      ...state,
      isPlaying: null,
      error
    };
  default:
    throw new Error(`Unknown action: ${ type }`);
  }
}
