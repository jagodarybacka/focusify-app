import { isInRange } from 'utils';
import { MIN_TIME, MAX_TIME } from './consts';

export function validate({ work, rest }) {
  return !!(
    work.playlist &&
    rest.playlist &&
    isInRange(work.time, MIN_TIME, MAX_TIME) &&
    isInRange(rest.time, MIN_TIME, MAX_TIME));
}
