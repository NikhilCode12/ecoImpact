export const authorizationMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ msg: "Unauthorized access, admin access requred!" });
  }
};
