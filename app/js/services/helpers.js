var module = angular.module(PKG.name+'.services');


module.value('myHelpers', {

  /**
   * Parses milliseconds and converts to days, hours and minutes.
   * @param  {Number} milliseconds.
   * @return {Object} containing days, hours and minutes as keys.
   */
  parseMilliseconds: function parseMilliseconds (milliseconds) {
    var temp = milliseconds / 1000;
    return {
      days: Math.floor((temp %= 31536000) / 86400),
      hours: Math.floor((temp %= 86400) / 3600),
      minutes: Math.floor((temp %= 3600) / 60)
    };
  },

  /**
   * Get milliseconds from time object.
   * @param  {Object} timeObj with days, hours and mins as keys.
   * @return {Number} milliseconds. 
   */
  concatMilliseconds: function concatMilliseconds (timeObj) {
    var total = 0;
    if ('days' in timeObj) {
      total += timeObj.days * 86400;
    }
    if ('hours' in timeObj) {
      total += timeObj.hours * 3600;
    }
    if ('minutes' in timeObj) {
      total += timeObj.minutes * 60;
    }
    return total * 1000;
  }
});

