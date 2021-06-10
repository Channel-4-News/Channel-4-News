const validator = require('email-validator');
const axios = require('axios');

//handles bad validation and shows message
const notValid = (reason) => {
  return reason;
};

//check if passwords match
const passwordsMatch = (pw1, pw2, type = 'Passwords') => {
  if (pw1 === pw2) {
    return true;
  }
  return { error: true, message: `${type} must match.` };
};

//check if password is valid password
const passwordValid = (pw) => {
  const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const length = pw.value.length > 4 && pw.value.length < 51;
  const hasNum = nums.some((num) => pw.value.includes(num));
  if (hasNum && length) {
    // pw.setCustomValidity('');
    return true;
  }
  // pw.setCustomValidity(
  //   'Passwords must be at least 5 characters and include a number.'
  // );
  return {
    error: true,
    message: 'Passwords must be at least 5 characters and include a number.',
  };
};

//check if family secret is valid secret
const secretValid = (secret) => {
  if (secret.value.length > 4 && secret.value.length < 71) {
    secret.setCustomValidity('');
    return true;
  }
  secret.setCustomValidity('Family secret must be at least 5 characters.');
  return {
    error: true,
    message: 'Secret must be at least 5 characters.',
  };
};

//check if email is valid
const validEmail = async (email) => {
  if (!validator.validate(email.value)) {
    return { error: true, message: 'Email must be a valid email.' };
  }
  const users = (await axios.get('/api/users')).data;
  if (users.some((user) => user.email === email.value)) {
    // email.setCustomValidity('Email already exists.');
    return { error: true, message: 'Email already exists.' };
  }
  return true;
};

//check first name and last name to not be empty
const validName = (name, type) => {
  const length = name.value.length > 0;
  if (!length) {
    return { error: true, message: 'Required Field' };
  }
  return true;
};

//check if username is valid
const validUsername = async (username, type) => {
  if (!type) type = 'Username';
  const length = username.value.length > 4 && username.value.length < 41;
  if (!length) {
    // username.setCustomValidity(`${type} must be 5 characters long.`);
    return { error: true, message: `${type} must be 5 characters long.` };
  }
  const users = (await axios.get('/api/users')).data;
  const families = (await axios.get('/api/families')).data;
  if (type === 'Username') {
    if (users.some((user) => user.username === username.value)) {
      // username.setCustomValidity('Username already exists.');
      return { error: true, message: 'Username already exists.' };
    }
  } else {
    if (families.some((family) => family.name === username.value)) {
      username.setCustomValidity('Family name already exists.');
      return { error: true, message: 'Family name already exists.' };
    }
  }
  username.setCustomValidity('');
  return true;
};

const systemsGoSignup = (signUpInput) => {
  const { password, confirmPassword, email, username } = signUpInput;
  const pwMatch = passwordsMatch(password, confirmPassword);
  const pwValid = passwordValid(password);
  const emailValid = validEmail(email);
  const usernameValid = validUsername(username);
  return pwMatch && pwValid && emailValid && usernameValid ? true : false;
};

export {
  systemsGoSignup,
  validUsername,
  passwordValid,
  passwordsMatch,
  secretValid,
  validEmail,
  validName,
};
