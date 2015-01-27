'use strict';
var GetMaxTimeModule = (function(){

  return {
    getMaxTime            : getMaxTime,
    generateSampleArray   : generateSampleArray
  };

  function getMaxTime(array){
    var result = orderBy.apply(this, [array, 'time', true]);
    return result[0];
  }

  function generateSampleArray(length){
    var array = [];
    for(var i = 0; i < length; i++){
      array.push({
        time : (Math.random() * 1000).toFixed(2)
      })
    }
    return array;
  }

  function orderBy(from, where, reverse){
    var propertiesValue = from.map(function(currentVal){
      return currentVal[where] ? currentVal[where] : 0;
    });
    return !reverse ? propertiesValue.sort() : propertiesValue.sort().reverse();
  }
})();