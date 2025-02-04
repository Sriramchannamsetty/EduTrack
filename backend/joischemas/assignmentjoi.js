const Joi = require("joi");

const assignmentSchemaJoi = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  course: Joi.string().required(), // assuming course is represented by ObjectId as string
  points: Joi.number().required(),
  dueDate: Joi.date().required(),
  question: Joi.string().optional()
});

module.exports = assignmentSchemaJoi;
