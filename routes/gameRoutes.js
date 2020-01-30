// local imports
var IROUTES             = require(__dirname + '/iRoutes.js');
var GAME_FEATURES       = require(__dirname + '/../controllers/gameFeatures.js');

/**
 * This defines the constructor for the general route class
 * @param {String} data
 * @param {object} config
 */

function GameRoutes(input, options){

  // data
  this._input           = input;
  this._config          = options['config'];
  this._gameState       = options['gameState'];

}

// inheriting the basic structure
GameRoutes.prototype    = Object.create(IROUTES);

/**
 * This defines the function to detect the command type route and call feature
 * accordingly
 */

GameRoutes.prototype.route = function(){

  if(this._input){
    switch(this._input[0]){
      case this._config.GAME_COMMANDS.TRY_AGAIN:
          GAME_FEATURES.nextChance();
          break;
      case this._config.GAME_COMMANDS.HINT:
          GAME_FEATURES.getHint(this._gameState);
          break;
      case this._config.GAME_COMMANDS.QUIT:
          GAME_FEATURES.quitGame(this._gameState);
          break;
      default:
          GAME_FEATURES.checkAnswer(this._input[0], this._gameState);
    }
  }
}

module.exports  = GameRoutes;
