import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Authorization is required",
    });
  }

  try {
    const jwtToken = await authorization.split(" ")[1];
    const decodedToken = await jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log(decodedToken);
    
    req.user = decodedToken;
    next();
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: null,
      message: e?.message,
    });
  }
};