const fs = require('fs');

fs.readFile('./bin/resources/poker.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const lines = data.split('\n');

  const dataArray = lines.map((line) => {
    const hand = line.trim().split(/\s+/);
    return {
      handOne: hand.slice(0, hand.length / 2),
      handTwo: hand.slice(hand.length / 2),
    };
  });

  const arrayAsString = `export const hands:  { handOne: string[]; handTwo: string[] }[] = ${JSON.stringify(
    dataArray,
    null,
    2
  )};\n`;

  fs.writeFile('./src/utils/hands.ts', arrayAsString, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the file:', err);
      return;
    }
    console.log('File written successfully.');
  });
});
