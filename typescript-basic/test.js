// basic types
var isDone = false;
var age = 10;
var firstName = 'viking';
var message = "Hello, " + firstName;
var u = undefined;
var n = null;
var num = null;
var notSure = 4;
notSure = 'maybe a string';
notSure = true;
notSure.myName;
notSure.getName();
// array
var arrOfNumbers = [1, 2, 3, 4];
arrOfNumbers.push(3);
// tuple
var user = ['viking', 20];
user = ['viking', 30];
// function
function add(x, y, z) {
    return x + y;
}
var result = add(2, 3);
var add2 = function (x, y) {
    return x + y;
};
var add3 = add2;
// type inference
var str = 'str';
