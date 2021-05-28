const validator = require('email-validator');
const axios = require('axios');

//handles bad validation and shows message
const notValid = (reason) => {
  return reason;
};

//check if passwords match
const passwordsMatch = (pw1, pw2, type = 'Passwords') => {
  if (pw1 === pw2.value) {
    pw2.setCustomValidity('');
    return;
  }
  pw2.setCustomValidity(`${type} must match.`);
  return false;
};

//check if password is valid password
const passwordValid = (pw) => {
  const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const length = pw.value.length > 4 && pw.value.length < 51;
  const hasNum = nums.some((num) => pw.value.includes(num));
  if (hasNum && length) {
    pw.setCustomValidity('');
    return;
  }
  pw.setCustomValidity(
    'Passwords must be at least 5 characters and include a number.'
  );
};

//check if family secret is valid secret
const secretValid = (secret) => {
  if (secret.value.length > 4 && secret.value.length < 71) {
    secret.setCustomValidity('');
    return;
  }
  secret.setCustomValidity('Family secret must be at least 4 characters.');
};

//check if email is valid
const validEmail = async (email) => {
  //   if (!validator.validate(email)) {
  //     notValid('Email must be a valid email.');
  //     return false;
  //   }
  const users = (await axios.get('/api/users')).data;
  if (users.some((user) => user.email === email.value)) {
    email.setCustomValidity('Email already exists.');
    return;
  }
  email.setCustomValidity('');
};

//check if username is valid
const validUsername = async (username, type = 'Username') => {
  const length = username.value.length > 4 && username.value.length < 41;
  if (!length) {
    username.setCustomValidity(`${type} must be 4 characters long.`);
    return;
  }
  const users = (await axios.get('/api/users')).data;
  const families = (await axios.get('/api/families')).data;
  if (type === 'Username') {
    if (users.some((user) => user.username === username.value)) {
      username.setCustomValidity('Username already exists.');
      return;
    }
  } else {
    if (families.some((family) => family.name === username.value)) {
      username.setCustomValidity('Family name already exists.');
      return;
    }
  }
  username.setCustomValidity('');
};

const systemsGo = (signUpInput) => {
  const { password, confirmPassword, email, username } = signUpInput;
  const pwMatch = passwordsMatch(password, confirmPassword);
  const pwValid = passwordValid(password);
  const emailValid = validEmail(email);
  const usernameValid = validUsername(username);
  return pwMatch && pwValid && emailValid && usernameValid ? true : false;
};

export {
  systemsGo,
  validUsername,
  passwordValid,
  passwordsMatch,
  secretValid,
  validEmail,
};
