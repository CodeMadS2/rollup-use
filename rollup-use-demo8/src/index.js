import $ from 'zepto'
import Son from './untils/son';
import concat from 'lodash/concat';

var array = [1];
var other = concat(array, 2, [3], [[4]]);

setTimeout(function () {
  $('body').text('dfafa');
}, 1000)
console.log(other);
new Son('wang').show();