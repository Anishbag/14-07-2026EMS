import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

export default generateToken;

console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("JWT_EXPIRE:", process.env.JWT_EXPIRE);