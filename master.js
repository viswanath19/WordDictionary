var USERACTION       = require('readline');

// local imports to messages to Show up the initial message
var MESSAGE_ROUTING= require(__dirname + '/utils/message.js')


// creating a command line interface for interaction with user
var inputInterface = USERACTION.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Prompt> '
});

// startup message for user
console.log(MESSAGE_ROUTING.STARTUP_MESSAGE);

// attaching the listeners to our input interface's line event
inputInterface.on('line', (line) => {
  // Routes to Messages to be displayed
  ROUTES(line.trim(), CONFIG, GAME_STATE);
  // To Reset the pointer to new Line
  inputInterface.prompt();
});

// Check for Exit from App
inputInterface.on('SIGINT', () => {
  inputInterface.question('Do you want to Exit? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) inputInterface.pause();
  });

});
