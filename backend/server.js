import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import productroute from "./routes/rproduct.js";
import cors from "cors";

const app = express();
dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("Cloud DB connected"))
	.catch((err) => console.log(`${err}  Error in cloud DB connection`));

// Middleware
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "authorization"],
		credentials: true,
	})
);

// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/product", productroute);

app.get("/", (req, resp) => {
	resp.send("Hello");
});

app.listen(process.env.PORT, () => {
	console.log(`server started at port ${process.env.PORT}`);
});
