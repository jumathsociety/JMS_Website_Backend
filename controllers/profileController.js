import prisma  from "../lib/prisma.js";
import asyncHandler from "express-async-handler";

export const editProfile = asyncHandler(async (req, res) => {
        const userId = req.user.id;
        try {
            await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    name: req.body.name,
                    college: req.body.college,
                    department: req.body.department,
                    phone: req.body.phone,
                    year: req.body.year,
                }
            });
            res.status(200).json({ message: "Profile updated successfully" });
        } catch (err) {
            res.status(400).json({ message: "Invalid token" });
        }
    
});

export const removeProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    try {
        await prisma.user.delete({
            where: {
                id: userId,
            },
        });
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
});