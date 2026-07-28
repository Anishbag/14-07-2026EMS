import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  console.log("JWT_EXPIRE:", process.env.JWT_EXPIRE);
  console.log("Type:", typeof process.env.JWT_EXPIRE);

  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d", // Hardcode
    }
  );
};

export default generateToken;