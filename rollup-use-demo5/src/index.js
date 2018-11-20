import Son from './untils/son';
import concat from 'lodash/concat';

var array = [1];
var other = concat(array, 2, [3], [[4]]);

console.log(other);
new Son('wang').show();