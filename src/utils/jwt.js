import jwt from "jsonwebtoken";
import { SECRET_SENTENCE } from "../loadEnv.js";

export const generateToken = (user) => {
  const token = jwt.sign({ user }, SECRET_SENTENCE, {
    expiresIn: "30d",
  });
  return token;
};

export const decodeToken = (token) => {
  const decoded = jwt.verify(token, SECRET_SENTENCE);
  return decoded.user;
};
