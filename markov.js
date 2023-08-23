/** Textual markov chain generator */
class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    const chains = {};

    for (let i = 0; i < this.words.length - 1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];

      if (!chains[word]) {
        chains[word] = [];
      }
      chains[word].push(nextWord);
    }

    this.chains = chains;
  }

  makeText(numWords = 100) {
    const words = Object.keys(this.chains);
    const startingIndex = Math.floor(Math.random() * words.length);
    let currentWord = words[startingIndex];
    let text = currentWord;

    for (let i = 0; i < numWords - 1; i++) {
      const possibleNextWords = this.chains[currentWord];
      if (!possibleNextWords || possibleNextWords.length === 0) {
        break;
      }

      const nextIndex = Math.floor(Math.random() * possibleNextWords.length);
      const nextWord = possibleNextWords[nextIndex];
      text += ` ${nextWord}`;
      currentWord = nextWord;
    }

    return text;
  }
}

module.exports = MarkovMachine;  // Export the MarkovMachine class
