// local imports
var WORDSAPI_SERVICE    = require(__dirname + '/../services/wordsApiService.js');
var DICTIONARY        = require(__dirname + '/../models/dictionary.js');
var MESSAGES          = require(__dirname + '/../utils/message.js');
var COLORS            = require('colors/safe');
var DEFERRED          = require('deferred');
var WATERFALL         = require('async-waterfall');

// public exposed features
var generalFeatures   = {

  /**
  * feature to display definitions of given word using getDefinition wordsApi service.
  * @param {String} word
  */

  displayDefinitions: function(word, callback){
    var deferred      = WORDSAPI_SERVICE.getDefinitions(word),
        processedData;

    deferred.then(function(response){
      processedData   = _processDefinitionData(response.body);
      _getDictionaryModel(word, processedData).showDictionary();
      // for full dictionary
      if(callback) callback(null,word);
    },function(err){
      console.log(COLORS.red(err.body));
    });
  },

  /**
  * feature to display synonyms of given word using getSynonyms wordsApi service.
  * @param {String} word
  */

  displaySynonyms: function(word, callback){
    var deferred      = WORDSAPI_SERVICE.getSynonyms(word),
        processedData;

    deferred.then(function(response){
      processedData   = _processRelatedWords('synonyms', JSON.parse(response.body));
      _getDictionaryModel(word, processedData).showDictionary();
      // for full dictionary
      if(callback) callback(null,word);
    },function(err){
      console.log(COLORS.red(err.body));
    });
  },

  /**
  * feature to display antonyms of given word using getAntonyms wordsApi service.
  * @param {String} word
  */

  displayAntonyms: function(word, callback){
    var deferred      = WORDSAPI_SERVICE.getAntonyms(word),
        processedData;

    deferred.then(function(response){
      processedData   = _processRelatedWords('antonyms', JSON.parse(response.body));
      _getDictionaryModel(word, processedData).showDictionary();
      // for full dictionary
      if(callback) callback(null,word);
    },function(err){
      console.log(COLORS.red(err.body));
    });
  },

  /**
  * feature to display examples of given word using  wordsApi service.
  * @param {String} word
  */

  displayExamples: function(word){
    var deferred      = WORDSAPI_SERVICE.getExamples(word),
        processedData;

    deferred.then(function(response){
      processedData   = _processExamples(JSON.parse(response.body));
      _getDictionaryModel(word, processedData).showDictionary();
      // for full dictionary
      if(callback) callback(null,word);
    },function(err){
      console.log(COLORS.red(err.body));
    });
  },

  /**
  * feature to display the complete dictionary of given word like definition,
  * synonyms, antonyms and examples
  * @param {String} word
  */

  displayFullDictionary: function(word){
    var deferredArray  = [],
        self           = this;

    // calling all the features in series to display full dictionary
    WATERFALL([
             function(callback){
               self.displayDefinitions(word,callback);
             },
             self.displaySynonyms,
             self.displayAntonyms,
             self.displayExamples,
           ], function(err,result){
              if(err) return console.log('Unable to display full dictionary');
    });
  },

  /**
  * feature to display the complete dictionary of the word of the day. Internally
  * calls the displayFullDictionary function
  */

  displayWordOfTheDay: function(){
    var deferred      = WORDSAPI_SERVICE.getWordOfTheDay(),
        self          = this,
        body;

    deferred.then(function(response){
      body = JSON.parse(response.body);
      if(!body.word){
        console.log(COLORS.red(MESSAGES.NO_DATA));
      } else{
        // reusing the full dictionary feature
        self.displayFullDictionary(body.word);
      }
    },function(err){
      console.log(COLORS.red(err.body));
    });
  },

  /**
  * displays all the commands and their usage
  */

  /*displayHelp: function(){
    console.log(COLORS.green(MESSAGES.HELP_MESSAGE));
  },*/

  /**
  * defines the default action for the general routes, it handles either
  * full dictionary of given word or of word of the day
  */

  defaultAction: function(word){
    if(word){
      // handling ./dict <word>
      this.displayFullDictionary(word);
    } else {
      // handling ./dict
      this.displayWordOfTheDay();
    }
  }

};

// Private functions
/**
 * Creates and returns a dictionary model object
 * @param {String} word
 * @private
 */

function _getDictionaryModel(word, data){
    return new DICTIONARY(word, data);
}

/**
 * Processes the elements of definition array
 * @param {Array} defArray
 * @private
 */

function _processDefinitionData(defArray){
  var definitions  = [],
      data         = {};

  JSON.parse(defArray).forEach(function(def){
    definitions.push(def.partOfSpeech + ' | ' + def.text);
  });

  if(definitions.length == 0)
    console.log(COLORS.red(MESSAGES.NO_DATA));
  data['definitions'] = definitions;
  return data;
}

/**
 * Processes the elements of related words array
 * @param {String} type
 * @private
 */

function _processRelatedWords(type, body){
  var relatedWords = [],
      data         = {};

  if(body.length == 0)
    console.log(COLORS.red(MESSAGES.NO_DATA));

  (body[0].words).forEach(function(word){
    relatedWords.push(word + ',');
  });
  data[type]    =  relatedWords;
  return data;
}

/**
 * Processes the elements of examples array
 * @param {Json} body
 * @private
 */

function _processExamples(body){
  var examples  = [],
      data      = {};

  if(!body.examples)
    console.log(COLORS.red(MESSAGES.NO_DATA));

  (body.examples).forEach(function(example){
    examples.push(example.text);
  });
  data['examples'] = examples;
  return data;
}

// exporting module
module.exports = generalFeatures;
