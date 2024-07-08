import Joi from "joi";

class AuthValidator {
  public registerSchema() {
    return Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      confirm_password: Joi.string()
        .min(8)
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "Password and confirm password should be same",
        }),
    });
  }

  public loginSchema() {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
  }
}

export default new AuthValidator();
