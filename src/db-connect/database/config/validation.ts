import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(5000),

  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .required(),

  DATABASE_URL: Joi.string().required(),
});