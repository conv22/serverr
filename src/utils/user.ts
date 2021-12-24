import { userBodyLogin, userBodyRegister } from "./../types/auth";
import { validateEmail } from "./validators";
export const validateLogin = ({
  username,
  password,
}: userBodyLogin): Boolean => {
  return true;
};

export const validateRegister = ({
  username,
  password,
  email,
}: userBodyRegister): Boolean => {
  if (email) validateEmail(email);
  return true;
};
