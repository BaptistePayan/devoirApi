// récuperer le token, voire si il fonctionne

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = async (req, res, next) => {
  let token = req.cookies.auth_token;  

  if (!token) {
    return res.status(401).json({ message: "token_required" }); 
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.decoded = decoded; 
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "token_not_valid" });
  }
};