const Joi = require("joi");


exports.noteSchema = Joi.object({

  title: Joi.string()
    .required(),

  description: Joi.string()
    .required()

});