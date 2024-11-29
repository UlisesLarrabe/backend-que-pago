import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_SENTENCE, {
    expiresIn: "30d",
  });
  return token;
};

export const decodeToken = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET_SENTENCE);
  return decoded.user;
};