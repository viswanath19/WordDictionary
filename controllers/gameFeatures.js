// local imports
var WORDSAPI_SERVICE    = require(__dirname + '/../services/wordsApiService.js');
var MESSAGES          = require(__dirname + '/../utils/message.js');
var UTILS             = require(__dirname + '/../utils/helpers');
var GENERAL_FEATURES  = require(__dirname + '/../controllers/generalFeatures.js');
// module imports
var COLORS            = require('colors/safe');
var DEFERRED          = require('deferred');



// public exposed game features
var GameFeatures  = {

  /**
  * initializes the game and sets the game state
  * @param {JSON} gameState
  */

  initializeGame : function(gameState){
    var self      = this;
    var deferredArray;

    // enable the game
    gameState.GAME_ENABLED = true;
    // get the word
    this.getGameWordData(gameState).then(function(word){

      deferredArray = self.getDataRelatedToWord(gameState.WORD, gameState);
      // when all the data fetched create and ask question
      DEFERRED.map(deferredArray, function(promise){return promise;}).then(function(result){
          self.askQuestion(gameState);
        },function(err){
            console.log(COLORS.red(MESSAGE.GAME_START_ERROR));
        });
    },function(err){
        console.log(COLORS.red(MESSAGE.GAME_START_ERROR));
    });
  },

  /**
  *  fetches a random word for game
  * @param {JSON} gameState
  */

  getGameWordData: function(gameState){
    var deferred  = WORDSAPI_SERVICE.getRandomWord(),
        wordDef   = DEFERRED();

    deferred.then(function(response){
      var body = JSON.parse(response.body);
      if(!body.word)
        console.log(COLORS.red(MESSAGE.NO_DATA));
      else {
        // saving word in game state
        gameState.WORD = body.word ;
        //resolving the promise as word set successfully
        wordDef.resolve(body.word);
      }

    },function(err){
      console.log(COLORS.red(err.body));
      wordDef.reject();
    });
    return wordDef.promise;
  },

  /**
  *  fetches a random word for game and its def, syn and ant
  * @param {JSON} gameState
  */

  getDataRelatedToWord: function(word, gameState){
        // service promises
    var definitionDef   = WORDSAPI_SERVICE.getDefinitions(word);
        synonymsDef     = WORDSAPI_SERVICE.getSynonyms(word),
        antonymsDef     = WORDSAPI_SERVICE.getAntonyms(word),
        processedDef    = DEFERRED(),
        processedSyn    = DEFERRED(),
        processedAnt    = DEFERRED(),
        defArray        = [];

    // extracting definitions
    definitionDef.then(function(response){
      JSON.parse(response.body).forEach(function(def){
        gameState.DEFINITIONS.push('DEFINITION' + ' | ' + def.text);
      });
      // resolve when data is processed
      processedDef.resolve();
    },function(er){
      console.log(COLORS.red(MESSAGE.NO_DATA + ' definition'));
    });

    // extracting synonyms

    synonymsDef.then(function(response){
      var body = JSON.parse(response.body);
      if(body.length > 0){
        (body[0].words).forEach(function(word){
          gameState.SYNONYMS.push('SYNONYM | ' + word);
        });
      }
      // resolve when data is processed
      processedSyn.resolve();
    },function(err){
      console.log(COLORS.red(MESSAGE.NO_DATA + ' synonyms'));
    });

    // extracting antonyms

    antonymsDef.then(function(response){
      var body = JSON.parse(response.body);
      if(body.length > 0){
        (body[0].words).forEach(function(word){
          gameState.ANTONYMS.push('ANTONYM | ' + word);
        });
      }
      // resolve when data is processed
      processedAnt.resolve();
    },function(err){
      console.log(COLORS.red(MESSAGE.NO_DATA + ' antonyms'));
    });

    // returning the array of promises
    defArray.push(processedDef.promise);
    defArray.push(processedSyn.promise);
    defArray.push(processedAnt.promise);

    return defArray;
  },

  /**
  *  asks the question for the just fetched random question
  * @param {JSON} gameState
  */

  askQuestion: function(gameState){
    var question  = [];
    // taking definition
    if(gameState.DEFINITIONS.length > 0){
      question.push(gameState.DEFINITIONS.pop());
    }
    // if synonym present take it otherwise take antonym
    if(gameState.SYNONYMS.length > 0){
      question.push(gameState.SYNONYMS.pop());
    }
    else if(gameState.ANTONYMS.length > 0){
      question.push(gameState.ANTONYMS.pop());
    }
    // Display the question
    UTILS.showArrayData(MESSAGES.QUESTION_HEADING, question);
    console.log(COLORS.green(MESSAGES.ENTER_ANSWER));
    // enable answer
    gameState.ENABLE_ANSWER  = true;
  },

  /**
  *  asks the question for the just fetched random question
  * @param {String} answer
  * @param {JSON} gameState
  */

  checkAnswer: function(answer, gameState){
    var answerStatus;

    // firstly checking against the word
    if(gameState.WORD.toLowerCase() == answer.toLowerCase())
      answerStatus = true;

    // checking against not till now asked synonyms of the asked word
    (gameState.SYNONYMS).forEach((syn) => {
      if(syn.toLowerCase() == answer.toLowerCase()){
        answerStatus  = true;
      }
    });

    // displa relevent message according to the answer status
    if(answerStatus){
        console.log(COLORS.green('\nCorrect answer'));
        this.quitGame(gameState);
    }
    else{
      console.log(COLORS.red('\nWrong answer'));
      console.log(COLORS.green(MESSAGES.GAME_OPTIONS));
    }
  },

  /**
  *  quite the game and reset the game state
  * @param {JSON} gameState
  */

  quitGame:  function(gameState){
    // display word and its full dictionary, resuing the general feature
    GENERAL_FEATURES.displayFullDictionary(gameState.WORD);

    console.log(COLORS.green(MESSAGES.GAME_QUIT));

    // reset the game state
    gameState.GAME_ENABLED  = false;
    gameState.WORD          = null;
    gameState.DEFINITIONS   = [];
    gameState.SYNONYMS      = [];
    gameState.ANTONYMS      = [];
    gameState.HINT_COUNTER  = 0;

  },

  /**
  *  displays message try agin to user, in response to user inout 1
  */

  nextChance: function(){
    console.log(COLORS.green(MESSAGES.TRY_AGAIN));
  },

  /**
  *  quite the game and reset the game state
  * @param {JSON} gameState
  */

  getHint: function(gameState){
    var hintCount   = gameState.HINT_COUNTER,
        hint        = [],
        message;

    switch(hintCount){
      case 0:
          hint.push(UTILS.getJumbleWord(gameState.WORD));
          message   = MESSAGES.HINTS.JUMBLE_WORD;
          break;
      case 1:
          hint.push(gameState.DEFINITIONS.pop());
          message   = MESSAGES.HINTS.DEFINITION;
          break;
      case 2:
          hint.push(gameState.SYNONYMS.pop());
          message   = MESSAGES.HINTS.SYNONYM;
          break;
      case 3:
          hint.push(gameState.ANTONYMS.pop());
          message   = MESSAGES.HINTS.ANTONYM;
          break;
    }

    // if no hint is available then provide the jumble word
    if(hintCount > 0 && typeof hint[0] == 'undefined'){
      hint[0]   = UTILS.getJumbleWord(gameState.WORD);
      message   = MESSAGES.HINTS.JUMBLE_WORD;
    }

    // printing the hint
    UTILS.showArrayData(message, hint);

    // updating the value of  hint counter
    if(hint == 3)
      gameState.HINT_COUNTER = 0;
    else
      gameState.HINT_COUNTER = gameState.HINT_COUNTER + 1;
  }

}

module.exports = GameFeatures;
