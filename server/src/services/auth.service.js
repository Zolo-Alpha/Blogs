import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const getCurrentUser = (req, res) => {
 console.log("Received request  for /user");
   
   // const token = req.headers.cookie?.split("token=")[1]?.split(";")[0];
   const token = req.cookies.token;
   console.log("token is "+ token);
   
 
   if (!token) {
     console.log("No token  found in cookies");
     console.log("Redirecting to:", `${process.env.CLIENT_URL || "http://localhost:5173"}/login`);

     return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173" }/login`);
   }
 
   try {
     const decoded = jwt.verify(token, "your_secret_key_here");
    //  const { id, name, email, role } = decoded;
     console.log("Token verified successfully", decoded);
     res.status(200).json({ 
       name: decoded.name,
       id: decoded.id,
       email: decoded.email,
       role: decoded.role,
       gAuth:decoded.gAuth,
   });
   } catch (error) {
     console.error("Invalid token", error);
     return res.status(401).json({ message: "Invalid token", error });
   }
  };


const handleGoogleAuth = (req, res, next) => {
        if (req.authError) {
          console.error("Authentication error", req.authError);
          return next(req.authError);
        }
        // Generate JWT token with user information
        const token = jwt.sign(
          {
            name: req.user.name || req.user.gAuth.displayName,
            id: req.user.id,
            email: req.user.email,
            role: req.user.role,
            gAuth: req.user.gAuth, // Include Google Auth profile
          },
          "your_secret_key_here",
        );
    
        console.log("JWT token generated", token);
    
        // Send the JWT token as a response
        res.cookie("token", token);
        res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/dashboard`);
};
  
  export { getCurrentUser,handleGoogleAuth };