const Joi = require("joi");

const courseSchemaJoi = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  teacher: Joi.string().required(), // assuming teacher is represented by ObjectId as string
  assignments: Joi.array().items(Joi.string()).optional(), // assuming assignments are ObjectIds as strings
  students: Joi.array().items(Joi.string()).optional(), // assuming students are ObjectIds as strings
  schedule: Joi.array().items(
    Joi.object({
      day: Joi.string().required(),
      time: Joi.string().required()
    })
  ).optional()
});

module.exports = courseSchemaJoi;
