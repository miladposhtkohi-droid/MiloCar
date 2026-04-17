import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //skapa ny användare
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //skicka tillbaka användare (utan password)
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})


export const login = ( async (req, res) => {
  try {
    const { email, password } = req.body;
    // hitta användare i databasen
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // jämför lösenord
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // skapa token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // skicka tillbaka token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})
    

