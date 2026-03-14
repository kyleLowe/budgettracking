import dns from "node:dns/promises";

dns.setServers(["1.1.1.1"]);
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI as string).then(() => console.log("MongoDB connected")).catch((err) => console.error(err));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello MERN TypeScript!");
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));