export const Authorization = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You are not authorized we are in verfiy token authorization",
        rolees: roles,
        role: req.user,
      });
    }
    next();
  };
};
