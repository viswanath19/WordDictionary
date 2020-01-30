/**
 * Contains all the messages to be used in app
 */

 var Message = {

   //STARTUP_MESSAGE    : 'Dictionary Tool, help command: ./dict --help\n ',
	STARTUP_MESSAGE    : 'Welcome to Dictonary Tool. Here are the set of Commands\n ./dict defn \n ./dict syn \n ./dict ant \n ./dict ex \n ./dict play',
   // no data error
   NO_DATA            : 'Sorry, no data for the given word',

   // help message for user
   /*HELP_MESSAGE       : 'Available commands:\n\nFor definition:      ./dict def <word>'
                        + '\nFor synonyms:        ./dict syn <word>\nFor antonyms:        ./dic ant <word>'
                        + '\nFor examples:        ./dict ex <word>\nFor full dictionary: ./dict <word> or ./dict dict <word>'
                        + '\nFor word of the day dictionary:  ./dict\nFor word game:       ./dict play',*/

   // error while fetching data for word game
   GAME_START_ERROR   : 'Unable to fecth question for game please try again',

   // heading to be displayed at start of game
   QUESTION_HEADING   : 'GUESS THE WORD BASED ON FOLLOWING INFO',

   // Answer prompt
   ENTER_ANSWER       : 'Enter your answer:',

   // game options for user
   GAME_OPTIONS       : '\n1. Try again\n2. Hint\n3. quit',

   //game over Message
   GAME_QUIT          : '\nGame is over, you may need ./dict --help',

   //try again, enter new guess
   TRY_AGAIN          : '\nEnter answer again',

   HINTS              : {
     JUMBLE_WORD    : 'HINT - JUMBLED WORD',
     DEFINITION     : 'HINT - ANOTHER DEFINITION',
     SYNONYM        : 'HINT - ANOTHER SYNONYM',
     ANTONYM        : 'HINT - ANOTHER ANTONYM'
   }

 };

 module.exports = Message;
