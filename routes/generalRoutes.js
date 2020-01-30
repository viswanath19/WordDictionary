// local imports
var GENERAL_FEATURES  = require(__dirname + '/../controllers/generalFeatures.js');
var GAME_FEATURES     = require(__dirname + '/../controllers/gameFeatures.js');
var IROUTES           = require(__dirname + '/iRoutes.js');

/**
 * This defines the constructor for the general route class
 * @param {String} data
 * @param {object} config
 */

function GeneralRoutes(data, options){

  // data
  this._app       = data[0];
  this._command   = data[1];
  this._word      = data[2];
  this._config    = options['config'];
  this._gameState = options['gameState'];

}

// inheriting the basic structure
GeneralRoutes.prototype   =   Object.create(IROUTES);

/**
 * This defines the function to detect the command type route and call feature
 * accordingly
 */

GeneralRoutes.prototype.route = function(){

  if(this._app && this._app == this._config.APP){

    // action according the coming command
    switch(this._command){
      case this._config.COMMANDS.DEFINITIONS:
          GENERAL_FEATURES.displayDefinitions(this._word);
          break;
      case this._config.COMMANDS.SYNONYMS:
          GENERAL_FEATURES.displaySynonyms(this._word);
          break;
      case this._config.COMMANDS.ANTONYMS:
          GENERAL_FEATURES.displayAntonyms(this._word);
          break;
      case this._config.COMMANDS.EXAMPLES:
          GENERAL_FEATURES.displayExamples(this._word);
          break;
      case this._config.COMMANDS.DICTIONARY:
          GENERAL_FEATURES.displayFullDictionary(this._word);
          break;
      case this._config.COMMANDS.PLAY:
          GAME_FEATURES.initializeGame(this._gameState);
          break;
      case this._config.COMMANDS.HELP:
          GENERAL_FEATURES.displayHelp();
          break;
      default:
          GENERAL_FEATURES.defaultAction(this._command);
    }
  }

};

// exporting the class
module.exports = GeneralRoutes;
