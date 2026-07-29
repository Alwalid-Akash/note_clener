export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
};