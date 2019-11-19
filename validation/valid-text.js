// valid-text.js to check if the input string is a valid input
const validText = str => {
    return typeof str === 'string' && str.trim().length > 0;
  }
  
  module.exports = validText;