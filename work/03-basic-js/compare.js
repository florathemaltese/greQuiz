"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare;

function compare( word, guess ) {
  let res = 0;
  let wordLower = word.toLowerCase();
  let guessLower = guess.toLowerCase();
  for (let i = 0; i < wordLower.length; i++) {
    if (guessLower.indexOf(wordLower[i]) !== -1) {
      res ++;
      guessLower = guessLower.replace(wordLower[i], "");
    }
  }
  return res;
}
