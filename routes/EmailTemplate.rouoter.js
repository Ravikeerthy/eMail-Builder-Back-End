import express from "express";
import multer from "multer";
import path from "path";
import Template from "../models/template.schema.js";
import fs from "fs";

const newrouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const destinationPath = path.resolve("../public"); 
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
      }
      cb(null, destinationPath); 
    },
    filename: (req, file, cb) => {
      const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueName); 
    },
  });


const maxSize = 2 * 1024 * 1024;

const upload = multer({
  storage,
  limits: {
    fileSize: maxSize
  },
});

const uploadHandler = upload.single("file");

newrouter.post("/uploadImage", (req, res) => {
    console.log("Request received at /uploadImage");
  
    uploadHandler(req, res, function (err) {
      if (err) {
        
        if (err instanceof multer.MulterError) {
          console.error("Multer Error:", err.message);
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "Maximum file size is 2MB" });
          }
        } else {
          
          console.error("Unexpected Error:", err);
          return res.status(500).json({ message: "File upload failed" });
        }
      }
  
      
      if (!req.file) {
        console.error("No file found in the request.");
        console.log("Request Body:", req.body);
        console.log("Request Headers:", req.headers);
        return res.status(400).json({ message: "No file selected" });
      }
  
      
      console.log("File Uploaded Successfully:", req.file);
      console.log("File Path:", req.file.path);
  
      return res.status(200).json({
        message: "File uploaded successfully",
        filePath: `/public/${req.file.filename}`,
      });
    });
  });

newrouter.get("/getEmailLayout", (req, res) => {
    const layoutHtml = `
     <html>
        <head>
          <style>
           
            .email-layout {
              font-family: Arial, sans-serif;
              color: #333;
              padding: 20px;
            }
            .email-layout .title {
              font-size: 24px;
              font-weight: bold;
            }
            .email-layout .content {
              font-size: 16px;
              margin-top: 10px;
            }
            .email-layout .image {
              margin-top: 20px;
              max-width: 100%;
            }
          </style>
        </head>
        <body>
          <div class="email-layout">
            <h1 class="title">Title</h1>
            <p class="content">Content</p>
            <img class="image" src="#" alt="Image" />
          </div>
        </body>
      </html>
    `;
    res.setHeader("Content-Type", "text/html");
    res.send(layoutHtml);
  });

newrouter.post("/uploadEmailConfig", async (req, res) => {
  try {
    const { title, content, footer, imageURL } = req.body;
    console.log("Req Body: ", req.body);
    
    const newTemplate = new Template({ title, content, footer, imageURL });
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (err) {
    res.status(500).json({ error: "Failed to save template" });
  }
});

newrouter.post("/renderAndDownloadTemplate", (req, res) => {
  try {
    const { title, content, footer, imageURL } = req.body;
    const layout = `
      <html>
        <head></head>
        <body>
          <h1>${title}</h1>
          <img src="${imageURL}" alt="Image" />
          <p>${content}</p>
          <footer>${footer}</footer>
        </body>
      </html>
    `;
    res.setHeader("Content-Type", "text/html");
    res.send(layout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

newrouter.get("/emailTemplates", async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch templates" });
  }
});

newrouter.get("/emailTemplates/:id", async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch template" });
  }
});

newrouter.put("/emailTemplates/:id", async (req, res) => {
  try {
    const { title, content, footer, imageURL } = req.body;
    const updatedTemplate = await Template.findByIdAndUpdate(
      req.params.id,
      { title, content, footer, imageURL },
      { new: true }
    );
    if (!updatedTemplate) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.json(updatedTemplate);
  } catch (err) {
    res.status(500).json({ error: "Failed to update template" });
  }
});

newrouter.delete("/emailTemplates/:id", async (req, res) => {
  try {
    const deletedTemplate = await Template.findByIdAndDelete(req.params.id);
    if (!deletedTemplate) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.json({ message: "Template deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete template" });
  }
});

export default newrouter;
