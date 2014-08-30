var module = angular.module(PKG.name+'.services');


module.value('myHelpers', {

  /**
   * Parses milliseconds and converts to days, hours and minutes.
   * @param  {Number} milliseconds.
   * @return {Object} containing days, hours and minutes as keys.
   */
  parseMilliseconds: function parseMilliseconds (milliseconds) {
    var timeObj = {
      days: 0,
      hours: 0,
      minutes: 0
    };
    var temp = milliseconds / 1000;
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      timeObj['days'] = days.toFixed(0);
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      timeObj['hours'] = hours.toFixed(0);
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      timeObj['minutes'] = minutes.toFixed(0);
    }
    return timeObj;
  },

  /**
   * Get milliseconds from time object.
   * @param  {Object} timeObj with days, hours and mins as keys.
   * @return {Number} milliseconds. 
   */
  concatMilliseconds: function concatMilliseconds (timeObj) {
    var total = 0;
    if ('days' in timeObj) {
      total += timeObj['days'] * 86400000;
    }
    if ('hours' in timeObj) {
      total += timeObj['hours'] * 3600000;
    }
    if ('minutes' in timeObj) {
      total += timeObj['minutes'] * 60000;
    }
    return total;
  }
});

