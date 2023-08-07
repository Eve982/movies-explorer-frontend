function validateEmail(email) {
  let regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
  return regex.test(email);
}

function validatePassword(password) {
  // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:";'<>,.?/\\|]).{8,}$/;
  // return regex.test(password);
  return password.length > 8;
}

export { validateEmail, validatePassword };
