import express from "express";
import path from "path";
import connectDB from "./database/dbConfig.js";
import router from "./routes/templates.router.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cors from "cors";
import crudRouter from "./routes/crud.router.js";
import newrouter from "./routes/EmailTemplate.rouoter.js";
import bodyParser from "body-parser";
import fs from "fs";

dotenv.config();

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());

app.use(
  cors({
    origin: "https://e-mail-builder.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type, Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/getEmailLayout", (req, res) => {
    const filePath = path.join(__dirname, "public","layout.html");

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          console.error("Error reading layout.html:", err);
          return res.status(500).send('Error reading the layout file.');
        }
       
        res.send(data);
    });
})    
app.get("/", (req, res) => {
    res.status(200).send(`<h1>Welcome to Email Builder</h1>`);
  });


app.use("/api/templates", router);
app.use("/api/newtemplates", crudRouter);
app.use("/api/newtemplates", newrouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
