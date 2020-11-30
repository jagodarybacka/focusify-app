import { DEFAULT_WORK_TIME, DEFAULT_REST_TIME, STAGE } from './consts';
import { validate } from './utils';

export const initialState = {
  token: '',
  isValid: false,
  currentSetup: STAGE.WORK,
  showPlayer: false,
  [STAGE.WORK]: {
    label: 'Work',
    playlist: null,
    nextButtonLabel: 'Next: rest time',
    time: DEFAULT_WORK_TIME
  },
  [STAGE.REST]: {
    label: 'Rest',
    playlist: null,
    nextButtonLabel: 'Start session',
    time: DEFAULT_REST_TIME
  }
};

export function reducer(state, action) {
  const { currentSetup } = state;

  switch (action.type) {
  case 'setToken':
    return {
      ...state,
      token: action.token
    };

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
    if (currentSetup === STAGE.WORK) {
      return {
        ...state,
        currentSetup: STAGE.REST
      };
    }

    return {
      ...state,
      showPlayer: true
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
      ...initialState,
      token: state.token
    };

  default:
    throw new Error(`Unknown action: ${ action.type }`);
  }
}
