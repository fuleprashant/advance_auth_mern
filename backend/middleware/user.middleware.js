import jwt from "jsonwebtoken";
import { responde } from "../utils/responde";

export const useMiddleware = (req, res, next) => {
  const token = req.cookies.token; // get token from the cookie
  console.log(JWT_SECRET_KEY);
  if (!token) {
    return responde(res, 400, "Access denied , no token provided");
  }

  try {
    // verify token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // req object ma apde user ni information attach karishu
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    // If token verification fails, return a forbidden response
    return responde(res, 500, "user is required");
  }
};

// this is the middleware code
