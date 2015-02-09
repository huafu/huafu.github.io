import Ember from 'ember';


var arrayProto = Ember.A([]);

var map = Ember.EnumerableUtils.map;
var filter = Ember.EnumerableUtils.filter;
var comp = Ember.computed;
var isArray = Ember.isArray;
var findBy = arrayProto.findBy;
var filterBy = arrayProto.filterBy;
var slice = Array.prototype.slice;
var $get = Ember.get;
var fmt = Ember.String.fmt;


function extend(object, source) {
  for (var key in source) {
    object[key] = source[key];
  }
}

function computed() {
  return comp.apply(null, arguments);
}

extend(computed, comp);
extend(computed, {

  /**
   * Create a computed property which will resolve to the call of Array#findBy
   *
   * @method findBy
   * @param {string} arrayPath
   * @param {string} findByKey
   * @param {*} [findByValue]
   * @return {Ember.ComputedProperty}
   */
  findBy: function (arrayPath, findByKey/*, findByValue*/) {
    var args = slice.call(arguments, 1);
    return comp(arrayPath + '.@each.' + findByKey, function () {
      var array = this.get(arrayPath);
      if (array && isArray(array)) {
        return findBy.apply(array, args);
      }
    });
  },


  /**
   * Create a computed property that returns true if the array contains the given property
   *
   * @method contains
   * @param {string} arrayPath
   * @param {*} value
   * @return {Ember.ComputedProperty}
   */
  contains: function (arrayPath, value) {
    return comp(arrayPath + '.@each', function () {
      var array = this.get(arrayPath);
      if (array && isArray(array)) {
        return array.indexOf(value) !== -1;
      }
      else {
        return false;
      }
    });
  },

  /**
   * Creates a computed property that filters the given array on the given key
   *
   * @method filterBy
   * @param {string} arrayPath
   * @param {string} filterByKey
   * @param {*} [filterByValue]
   * @return {Ember.ComputedProperty}
   */
  filterBy: function (arrayPath, filterByKey/*, filterByValue*/) {
    var args = slice.call(arguments, 1);
    return comp(arrayPath + '.@each.' + filterByKey, function () {
      var array = this.get(arrayPath);
      if (array && isArray(array)) {
        return filterBy.apply(array, args);
      }
    });
  },

  /**
   * Creates a computed property that filters the given array using the given function
   *
   * @method filter
   * @param {string} arrayPath
   * @param {string} [depKey...]
   * @param {Function} method
   * @return {Ember.ComputedProperty}
   */
  filter: function (arrayPath/*, depKey..., method*/) {
    var method, depKeys;
    depKeys = slice.call(arguments, 1);
    method = depKeys.pop();
    depKeys = map(depKeys, function (key) {
      return arrayPath + '.@each.' + key;
    });
    return comp.apply(null, depKeys.concat([function () {
      var array = this.get(arrayPath);
      if (array && isArray(array)) {
        return filter(array, method);
      }
    }]));
  },

  /**
   * Created a computed property that would sort the given array
   *
   * @method sortBy
   * @param {string} arrayPath
   * @return {Ember.ComputedProperty}
   */
  sortBy: function (arrayPath/*, keys...,*/) {
    var deps = [], keys = map(slice.call(arguments, 1), function (key) {
      var desc = key.split(':');
      deps.push(arrayPath + '.@each.' + desc[0]);
      return {key: desc[0], desc: desc[1] === 'desc'};
    }), compare, count = keys.length;
    compare = function (one, two) {
      var i;
      for (i = 0; i < count; i++) {
        if ($get(one, keys[i].key) > $get(two, keys[i].key)) {
          return keys[i].desc ? -1 : 1;
        }
      }
    };
    return comp.apply(null, deps.concat([
      function () {
        var array = this.get(arrayPath);
        if (array && isArray(array)) {
          if (typeof array.toArray === 'function') {
            array = array.toArray();
          }
          return Ember.A(array.sort(compare));
        }
        else {
          return Ember.A([]);
        }
      }
    ]));
  },

  /**
   * Returns a computed property that formats the given string with given dependency keys
   *
   * @method fmt
   * @param {string} template
   * @param {string} [paramKey...]
   * @return {Ember.ComputedProperty}
   */
  fmt: function (template/*, paramKey...*/) {
    var keys = slice.call(arguments, 1);
    return comp.apply(null, keys.concat([
      function () {
        var args = map(keys, function (key) {
          return this.get(key);
        }, this);
        args.unshift(template);
        return fmt.apply(null, args);
      }
    ]));
  }

});


export default computed;
