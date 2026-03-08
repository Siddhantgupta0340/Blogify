import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/signin");
  }

  try {
    const decoded = jwt.verify(token, "SECRET123");

    req.user = decoded;

    next();
  } catch (error) {
    return res.redirect("/signin");
  }
};
