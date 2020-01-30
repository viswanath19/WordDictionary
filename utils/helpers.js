// imports
var COLORS            = require('colors/safe');
var __                = require('underscore');

// Defines all the helper functions

var Helpers = {

/**
* This prints heading and each element of the array
* @param {array} array
*/

  showArrayData : function(heading, array){
    if(array.length == 0)
      return;
    // printing heading
    console.log(COLORS.green('------------------------------------------------------------------'));
    console.log(COLORS.green(heading) + '\n');
    // printing data
    array.forEach((el) => {
      console.log(COLORS.blue(el + '\n'));
    });
  },

/**
* Creates a jumble word for the given word and returns it
* @param {String} word
*/

  getJumbleWord :  function(word){
    var wordsArray      = word.split('');
        jumbleArray     = __.shuffle(wordsArray);

    return jumbleArray.join('');
  }

};

// exporting helper module
module.exports = Helpers;
