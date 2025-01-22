import Template from "../models/template.schema.js";
import multer from "multer";
import path from "path";

const upload = multer({ dest: "uploads/" });

export const getEmailLayout = async (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, "../public/layout.html"));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    res.status(200).json({ imageURL: `/uploads/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadEmailConfig = async (req, res) => {
    try {
        const template = new Template(req.body);
        await template.save();
        res.status(200).json({ message: "Template Saved!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const renderAndDownloadTemplate = async (req, res) => {
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
};


