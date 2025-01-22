import express from "express";
import { createNewTemplate, deleteTemplate, getAllTemplates, getTemplateById, updateTemplate } from "../controller/crurd.controller.js";

const crudRouter = express.Router();

crudRouter.post('/templates', createNewTemplate);
crudRouter.get('/getalltemplates',getAllTemplates);
crudRouter.get('/templatesid/:id',getTemplateById);
crudRouter.put('/updatetemplates/:id',updateTemplate);
crudRouter.delete('/deletetemplates/:id', deleteTemplate);

export default crudRouter;