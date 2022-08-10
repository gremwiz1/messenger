const validate = {
  login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
  email: /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/,
  firstName: /^[A-ZА-Я][a-zа-я]+$/,
  secondName: /^[A-ZА-Я][a-zа-я]+$/,
  phone: /^[+]?[0-9]{10,15}$/,
  password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{8,40}$/,
  message: /[^\s]/,
};
export const loginValidate = function (value: string) {
  return validate.login.test(value);
};
export const emailValidate = function (value: string) {
  return validate.email.test(value);
};
export const firstNameValidate = function (value: string) {
  return validate.firstName.test(value);
};
export const secondNameValidate = function (value: string) {
  return validate.secondName.test(value);
};
export const phoneValidate = function (value: string) {
  return validate.phone.test(value);
};
export const passwordValidate = function (value: string) {
  return validate.password.test(value);
};
export const checkRepeatPassword = function (
  password: string,
  passwordRepeat: string
) {
  return password === passwordRepeat;
};
export const checkMessage = function (value: string) {
  return validate.message.test(value);
};