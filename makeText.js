/** Command-line tool to generate Markov text. */


const MarkovMachine = require('./markov');  
const fs = require('fs');
const axios = require('axios');  //  install `npm install axios`

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: node makeText.js <file|url> <source>');
  process.exit(1);
}

const command = args[0];
const source = args[1];

async function generateText() {
  try {
    let inputText;

    if (command === 'file') {
      inputText = fs.readFileSync(source, 'utf-8');
    } else if (command === 'url') {
      const response = await axios.get(source);
      inputText = response.data;
    } else {
      console.error('Invalid command. Use "file" or "url".');
      process.exit(1);
    }

    const mm = new MarkovMachine(inputText);
    const generatedText = mm.makeText();
    console.log(generatedText);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

generateText();
