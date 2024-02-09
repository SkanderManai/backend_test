const passwordValidator = (password) => {
  let strength = 0;

  if (password.length < 8) {
    return false;
  } else {
    strength += 1;
  }

  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    strength += 1;
  }

  if (password.match(/\d/)) {
    strength += 1;
  }

  if (password.match(/[^a-zA-A\d]/)) {
    strength += 1;
  }

  if (strength >= 2) {
    return true;
  }

  return false;
};

module.exports = passwordValidator;
