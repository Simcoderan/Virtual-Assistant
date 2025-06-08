import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const genToken = async (useId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECERET, {
      expiresIn: "10d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
}

export default genToken
