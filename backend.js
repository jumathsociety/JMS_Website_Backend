import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiroute from './routers/query.route.js'
import "dotenv/config";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import userrouter from "./routers/users.routes.js"

const app = express();

app.use(express.json());

const corsOptions = {
    origin: [
      "http://localhost:3001",
      "http://localhost:5173",
    ],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("JMS Backend is running");
});

app.use("/api", apiroute)

app.use("/users", userrouter);
  
app.listen((process.env.PORT || 3000), () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

// Routes name:
// /api/user/signup -> Register user (POST) data: (email, password, name, department, college, phone, year)
// /api/user/login -> Register user (POST) data: (email, password)
// /api/user/editprofile -> Edit user profile (PUT) data: (name, department, college, phone, year)
// /api/user/removeprofile -> Remove user profile (POST)
// /api/admin/users -> Get all users (GET)
