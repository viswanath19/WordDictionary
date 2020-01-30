// app config variable

var CONF = {
  // app name to be uniformally used in whole app
  APP_NAME          : 'Command Line Dictionary Tool',

  // wordsApi API_KEY
  
	API_KEY			  : 'b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164',
  // diasbled the game routes
  ENABLE_GAME_ROUTES: false,

  // API url
  API_URL           : {
    BASE_URL              : 'https://fourtytwowords.herokuapp.com/word/',
    DEFINITIONS           : '/definitions?limit=100&includeRelated=true&useCanonical=false&includeTags=false&api_key=',
    SYNONYMS              : '/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=',
    ANTONYMS              : '/relatedWords?useCanonical=false&relationshipTypes=antonym&limitPerRelationshipType=10&api_key=',
    EXAMPLES              : '/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=5&api_key=',
    WORD_OF_THE_DAY_PRE   : 'http://api.wordnik.com:80/v4/words.json/wordOfTheDay?date=',
    WORD_OF_THE_DAY_POST  : '&api_key=',
    RANDOM_WORD           : 'https://fourtytwowords.herokuapp.com/words/randomWord?api_key='
  },
  

  APP               : './dict',

  // general commands
  COMMANDS          : {
    DEFINITIONS  : 'defn',
    SYNONYMS     : 'syn',
    ANTONYMS     : 'ant',
    EXAMPLES     : 'ex',
    DICTIONARY   : 'dict',
    //HELP         : '--help',
    PLAY         : 'play'
  },

  // possible game inputs
  GAME_COMMANDS     :{
    TRY_AGAIN    : '1',
    HINT         : '2',
    QUIT         : '3'
  },

};

module.exports = CONF;
