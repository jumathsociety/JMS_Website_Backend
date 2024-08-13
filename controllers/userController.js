import prisma from "../lib/prisma.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = asyncHandler(async (req, res) => {
    const { 
        email,
        password,
        name,
        department, 
        college,
        phone,
        year 
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    if (!email || !name || !password) {
      res.status(400).json({ message: "Please provide all fields" });
      return;
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      res.status(409).json({ message: "User already exists" });
      return;
    }
    const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          department,
          college,
          phone,
          year,
        },
    });
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user.id, exp }, process.env.SECRET);
    res.cookie("Authorization", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.status(200).json({ message: "User Registered" });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.status(400).json({ message: "Wrong password" });
        return;
    }
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user.id, exp }, process.env.SECRET);
    res.cookie("Authorization", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.status(200).json({ message: "User logged in" });
});
