export function secondsToMinutes(time){
  return `${ Math.floor(time / 60) }:${ (`0${ Math.floor(time % 60) }`).slice(-2) }`; // eslint-disable-line no-magic-numbers
}
