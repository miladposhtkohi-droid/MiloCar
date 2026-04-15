import express from "express";

const router = express.Router();

//register
router.post("/register", (req, res) => {
    res.send("Register");
});

//login
router.post("/login", (req, res) => {
    res.send("Login");
});


export default router;


