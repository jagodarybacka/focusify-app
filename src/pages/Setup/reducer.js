import { DEFAULT_WORK_TIME, DEFAULT_REST_TIME, STAGE } from './consts';
import { validate } from './utils';

export const initialState = {
  isValid: false,
  currentSetup: STAGE.WORK,
  [STAGE.WORK]: {
    label: 'Work',
    playlist: null,
    time: DEFAULT_WORK_TIME
  },
  [STAGE.REST]: {
    label: 'Rest',
    playlist: null,
    time: DEFAULT_REST_TIME
  }
};

export function reducer(state, action) {
  const { currentSetup } = state;

  switch (action.type) {
  case 'validate':
    return {
      ...state,
      isValid: validate(state)
    };

  case 'back':
    return {
      ...state,
      currentSetup: STAGE.WORK
    };

  case 'next':
    return {
      ...state,
      currentSetup: STAGE.REST
    };

  case 'setPlaylist':
    return {
      ...state,
      [currentSetup]: {
        ...state[currentSetup],
        playlist: action.playlist
      }
    };

  case 'setTime':
    return {
      ...state,
      [currentSetup]: {
        ...state[currentSetup],
        time: action.time
      }
    };

  case 'reset':
    return {
      ...initialState
    };

  default:
    throw new Error(`Unknown action: ${ action.type }`);
  }
}
