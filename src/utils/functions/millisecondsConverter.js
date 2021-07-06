export const millisecondsConverter = (milliseconds) => {
  let minutes = Math.floor(milliseconds / 60000);
  let seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  //ES6 interpolated literals/template literals
  //If seconds is less than 10 put a zero in front.
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
