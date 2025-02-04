const Joi = require("joi");

const userSchemaJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("teacher", "student").required(),
  profileImage: Joi.string().optional(),
  courses: Joi.array().items(
    Joi.object({
      _id: Joi.string().required(), // assuming _id is a string, otherwise use ObjectId validation
      points: Joi.number().optional()
    })
  ).optional(),
  assignments: Joi.array().items(
    Joi.object({
      assignment: Joi.string().required(), // assuming assignment is a string (ObjectId as string)
      submitted: Joi.boolean().default(false),
      submissionDate: Joi.date().optional(),
      solution: Joi.string().optional()
    })
  ).optional(),
  schedule: Joi.array().items(
    Joi.object({
      day: Joi.string().required(),
      time: Joi.string().required()
    })
  ).optional()
});

module.exports = userSchemaJoi;
