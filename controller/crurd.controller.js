import Template from "../models/template.schema.js";


export const createNewTemplate = async (req, res) => {
  try {
    console.log(req.body); 
    const { title, content, imageURL } = req.body;
    const template = new Template({ title, content, imageURL });
    await template.save();
    res.status(201).json({ message: 'Template saved successfully!', template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found!' });
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateTemplate = async (req, res) => {
  try {
    const { title, content, imageURL } = req.body;
    const updatedTemplate = await Template.findByIdAndUpdate(
      req.params.id,
      { title, content, imageURL },
      { new: true }
    );
    if (!updatedTemplate) return res.status(404).json({ message: 'Template not found!' });
    res.status(200).json({ message: 'Template updated successfully!', updatedTemplate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteTemplate = async (req, res) => {
  try {
    const deletedTemplate = await Template.findByIdAndDelete(req.params.id);
    if (!deletedTemplate) return res.status(404).json({ message: 'Template not found!' });
    res.status(200).json({ message: 'Template deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


