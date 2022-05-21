module.exports = {
  getRandomInt,
  getRandomArrayElement,
};

//generate random integer number [min, max]
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//get random element from array
function getRandomArrayElement(arr) {
  const index = getRandomInt(0, arr.length - 1);
  return arr[index];
}
