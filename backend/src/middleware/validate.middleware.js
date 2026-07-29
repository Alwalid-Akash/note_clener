const validate = (schema) => {

  return (req, res, next) => {
    // Check if request body matches the schema
    const validationResult = schema.safeParse(req.body);

    // If validation fails
    if (!validationResult.success) {

      return res.status(400).json({
        message: "Validation failed",
        errors: validationResult.error.issues
      });
    }
    // Replace request body with cleaned validated data
    req.body = validationResult.data;

    // Continue to next middleware/controller
    next();

  };

};


module.exports = validate;