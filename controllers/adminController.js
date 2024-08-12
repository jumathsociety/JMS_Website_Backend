import prisma from "../../JMS_Website_Backend/lib/prisma.js";
import asyncHandler from "express-async-handler";

const fetchUsers = asyncHandler(async (req, res) => {
  const adminId = req.user.id;
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });
  if (!admin) {
    res.json({ message: "You are not a admin" });
    return;
  }
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      department: true,
      year: true,
      college: true,
    },
  });
  res.json(users);
});

export { fetchUsers };
