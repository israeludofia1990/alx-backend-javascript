console.log('Welcome to Holberton School, what is your name?');

process.stdin.on('readable', () => {
  const myName = process.stdin.read();
  if (myName) {
    process.stdout.write(`Your name is : ${myName}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
