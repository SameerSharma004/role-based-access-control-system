// middleware/role.middleware.js

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.user; 

      if (!user) {
        return res.status(401).json({
          success: "failed",
          message: "Unauthorized",
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: "failed",
          message: "Access denied",
        });
      }

      next();
    } catch (err) {
      res.status(500).json({
        success: "failed",
        message: err.message,
      });
    }
  };
};

export default authorizeRoles;
