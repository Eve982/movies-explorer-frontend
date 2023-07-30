function validatePassword(password) {
  // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:";'<>,.?/\\|]).{8,}$/;
  // return regex.test(password);
  return password.length > 8;
}

export default validatePassword;
