/**
 * Fisher-Yates shuffle
 * Shuffles an array in place. ES6 version
 * @see https://stackoverflow.com/a/6274381
 * @see https://bost.ocks.org/mike/shuffle/
 * @param questions object to shuffle
 * @returns {any[]} shuffled object
 */
const Shuffle = (questions: any): any => {
  for (let i = Object.keys(questions).length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  // eslint-disable-next-line no-console
  console.log('questions: ', questions);
  return questions;
};

export default Shuffle;
