(function(name, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else this[name] = definition();
}('MockDate', function() {
  "use strict";

  var _Date = Date
    , _getTimezoneOffset = Date.prototype.getTimezoneOffset
    , _getHours = Date.prototype.getHours
    , _getMinutes = Date.prototype.getMinutes
    , now   = null
  ;

  function MockDate(y, m, d, h, M, s, ms) {
    var date;

    switch (arguments.length) {

      case 0:
        if (now !== null) {
          date = new _Date(now);
        } else {
          date = new _Date();
        }
        break;

      case 1:
        date = new _Date(y);
        break;

      default:
        d = typeof d === 'undefined' ? 1 : d;
        h = h || 0;
        M = M || 0;
        s = s || 0;
        ms = ms || 0;
        date = new _Date(y, m, d, h, M, s, ms);
        break;
    }

    return date;
  }

  MockDate.UTC = _Date.UTC;

  MockDate.now = function() {
    return new MockDate().valueOf();
  };

  MockDate.parse = function(dateString) {
    return _Date.parse(dateString);
  };

  MockDate.toString = function() {
    return _Date.toString();
  };

  MockDate.prototype = _Date.prototype;

  function set(date, { timezoneOffset, hours, minutes } = {}) {
    var dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new TypeError('mockdate: The time set is an invalid date: ' + date)
    }

    if (typeof timezoneOffset === 'number') {
      MockDate.prototype.getTimezoneOffset = function() {
        return timezoneOffset;
      }
    }

    if (typeof hours === 'number') {
      MockDate.prototype.getHours = function() {
        return hours;
      }
    }

    if (typeof minutes === 'number') {
      MockDate.prototype.getMinutes = function() {
        return minutes;
      }
    }

    Date = MockDate;
    if (date.valueOf) {
      date = date.valueOf();
    }

    now = dateObj.valueOf();
  }

  function reset() {
    Date = _Date;
    Date.prototype.getTimezoneOffset = _getTimezoneOffset;
    Date.prototype.getHours = _getHours;
    Date.prototype.getMinutes = _getMinutes;
  }

  return {
    set: set,
    reset: reset
  };

}));
