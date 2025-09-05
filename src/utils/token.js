import jwt from "jsonwebtoken";

export const createTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_EXPIRES });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRES });
  return { accessToken, refreshToken };
};
