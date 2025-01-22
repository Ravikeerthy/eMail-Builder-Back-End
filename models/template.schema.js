import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  title: String,
  content: String,
  footer: String,
  imageURL: String,
  createdAt: { type: Date, default: Date.now },
});

const Template = mongoose.model("Template", templateSchema);

export default Template;