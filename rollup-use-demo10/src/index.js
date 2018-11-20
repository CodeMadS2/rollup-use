import concat from 'lodash/concat';

var array = [1];
var other = concat(array, 2, [3], [[4]]);
var version = '<@VERSION@>';

console.log(`current version is: ${version}`);

console.log(other);
