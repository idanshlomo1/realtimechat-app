import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"; // Importing routes
import messageRoutes from "./routes/message.routes.js"; // Importing routes
import userRoutes from "./routes/user.routes.js"; // Importing routes
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import path from 'path'

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve()
dotenv.config(); // Load environment variables



app.use(express.json()) // to parse the incoming requests with JSON payloads (from req.body)

app.use(cookieParser())
// Use auth routes, fix missing forward slash
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})

server.listen(PORT, () => {

    connectToMongoDB()
    console.log(`Server is running on port ${PORT}`)
})
