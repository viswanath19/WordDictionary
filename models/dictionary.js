// imports
var HELPERS   =  require(__dirname + '/../utils/helpers.js');
var COLORS    =  require('colors/safe');

/**
 * This defines the constructor for the word dictionary model class
 * @param {String} word
 * @param {Object} data
 */

 function Dictionary(word, data){

  // private members
  this._word          =   word;
  this._definitions   =   data['definitions']? data['definitions']:[];
  this._antonyms      =   data['antonyms']? data['antonyms']:[];
  this._synonyms      =   data['synonyms']? data['synonyms']:[];
  this._examples      =   data['examples']? data['examples']:[];

}

/**
* This defines the function to display the dictionary data
* @param {object} config
*/

Dictionary.prototype.showDictionary = function(){
  // printing the word
  console.log(COLORS.green('Word: ' + this._word + '\n'));
  // printing definitions
  HELPERS.showArrayData('Definitions', this._definitions);
  // printing synonyms
  HELPERS.showArrayData('Synonyms ', this._synonyms);
  // printing antonyms
  HELPERS.showArrayData('Antonyms', this._antonyms);
  // printing examples
  HELPERS.showArrayData('Examples', this._examples);
};

module.exports = Dictionary;
