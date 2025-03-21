import jwt from "jsonwebtoken";


const SECRET_KEY = process.env.JWT_SECRET_KEY || "";


const generateToken = (userId) => {
 
  const payload = {
    userId: userId, 
  };

 
  const options = {
    expiresIn: "1h", 
  };

  try {
    
    const token = jwt.sign(payload, SECRET_KEY, options);
    return token;  
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Could not generate token");
  }
};

export default generateToken;
