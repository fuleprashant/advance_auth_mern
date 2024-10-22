import jwt from "jsonwebtoken";

export const genarateToken = (user) => {
return jwt.sign(
{
userId: user._id,
email: user.email,
},
process.env.JWT_SECRET_KEY,
{ expiresIn: `1h` }
);
};