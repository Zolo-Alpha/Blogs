import express from "express";
import passport from "../config/passport.js";
const router = express.Router();
import { getCurrentUser, handleGoogleAuth } from "../services/auth.service.js";
router.get("/user", getCurrentUser);

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
    handleGoogleAuth
);

// Route to logout
router.get("/logout", (req, res) => {
  console.log("Received request for /logout");
  res.clearCookie("token");
  res.clearCookie("connect.sid");
  res.redirect("/");
});

export default router;
