import express from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
// import { handleRegisterUser,handleLoginUser} from "../controllers/auth.controllers.js";
const router = express.Router();

router.get("/user", (req, res) => {
  console.log("Received request for /user");
  
  // const token = req.headers.cookie?.split("token=")[1]?.split(";")[0];
  const token = req.cookies.token;
  console.log("token is "+ token);
  

  if (!token) {
    console.log("No token found in cookies");
    return res
      .status(401)
      .json({ message: "Unauthorized" })
      .redirect("/auth/login");
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key_here");
    const { id, name, email, role } = decoded;
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
  // res.send("Not authenticated");
});

router.get(
  "/google",
  (req, res, next) => {
    console.log("Received request for /google");
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get("/error", (req, res) => {
  console.log("Received request for /error");
  res.send("Something went wrong. Please try again.");
});

router.get(
  "/google/callback",
  (req, res, next) => {
    console.log("Received request for /google/callback");
    next();
  },
  passport.authenticate("google", { 
    failureRedirect: "/auth/error" }),
  (req, res, next) => {
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
    res.redirect("http://localhost:5173/dashboard");
  },
);

// Route to logout
router.get("/logout", (req, res) => {
  console.log("Received request for /logout");
  res.clearCookie("token");
  res.clearCookie("connect.sid");
  res.redirect("/");
});

export default router;
