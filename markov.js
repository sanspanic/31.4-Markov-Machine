/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};
    for (let word of this.words) {
      //code should only run first time for each word
      if (!this.chains[word]) {
        //add all indices at which word exists
        let indices = [];
        for (let i = 0; i < this.words.length; i++) {
          if (word === this.words[i]) {
            indices.push(i);
          }
        }
        //find all the following words
        let nextWords = [];
        for (let index of indices) {
          //make sure end of sentence is null
          if (index === this.words.length - 1) {
            nextWords.push(null);
          } else {
            nextWords.push(this.words[index + 1]);
          }
        }
        //add to chains
        this.chains[word] = nextWords;
      }
    }
    console.log(this.chains);
    this.makeText();
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let randomText = [];
    let allWords = Object.keys(this.chains);
    console.log(allWords);
    let randIndex = this.chooseIndex(allWords);
    console.log(randIndex);
    let nextWord = allWords[randIndex];
    while (randomText.length < numWords && nextWord !== null) {
      randomText.push(nextWord);
      randIndex = this.chooseIndex(this.chains[nextWord]);
      nextWord = this.chains[nextWord][randIndex];
    }
    console.log(randomText.join(" "));
  }

  chooseIndex(arr) {
    return Math.floor(Math.random() * arr.length);
  }
}

module.exports = {
  MarkovMachine,
};
