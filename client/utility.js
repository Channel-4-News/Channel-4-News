const validator = require('email-validator');
const axios = require('axios');

//handles bad validation and shows message
const notValid = (reason) => {
  return reason;
};

//check if passwords match
const passwordsMatch = (pw1, pw2) => {
  if (pw1 === pw2) return true;
  notValid('Passwords must match.');
  return false;
};

//check if password is valid password
const passwordValid = (pw) => {
  const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const length = pw.length > 4 && pw.length < 51;
  const hasNum = nums.some((num) => pw.includes(num));
  if (hasNum && length) return true;
  notValid('Passwords must be at least 5 characters and include a number.');
  return false;
};

//check if family secret is valid secret
const secretValid = (secret) => {
  if (secret.length > 4 && secret.length < 71) return true;
  notValid('Family secret must be at least 4 characters.');
  return false;
};

//check if email is valid
const validEmail = async (email) => {
  if (!validator.validate(email)) {
    notValid('Email must be a valid email.');
    return false;
  }
  const users = await axios.get('/api/users');
  if (users.some((user) => user.email === email)) {
    notValid('Email already exists.');
    return false;
  }
  return true;
};

//check if username is valid
const validUsername = async (username) => {
  const length = username.length > 4 && username.length < 41;
  if (!length) {
    notValid('Username must be 4 characters long.');
    return false;
  }
  const users = await axios.get('/api/users');
  if (users.some((user) => user.username === username)) {
    notValid('Username already exists.');
    return false;
  }
  return true;
};

const systemsGo = (signUpInput) => {
  const { password, confirmPassword, email, username } = signUpInput;
  const pwMatch = passwordsMatch(password, confirmPassword);
  const pwValid = passwordValid(password);
  const emailValid = validEmail(email);
  const usernameValid = validUsername(username);
  return pwMatch && pwValid && emailValid && usernameValid ? true : false;
};

export default systemsGo;
