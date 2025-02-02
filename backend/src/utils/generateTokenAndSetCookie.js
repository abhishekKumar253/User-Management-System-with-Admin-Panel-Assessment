import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development", 
    sameSite: "None", // required for cross-origin requests
    maxAge: 10 * 24 * 60 * 60 * 1000, // Token expiration: 10 days
  });

  return token;
};
