const jwt = require("jsonwebtoken");
const User = require('../models/authModels')

const authMiddleware = async (req, res, next) => {

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

    // console.log('auth bearer ----',req.headers.authorization)

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({message: "No Token"});
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      const user = await User.findById(decoded.id)

      // console.log(user)

      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }

      req.userId = user;

      next();

    } catch (error) {

      console.log(error);

      return res.status(401).json({

        message: "Not Authorized"

      });

    }

  }
  else {
    return res.status(401).json({
      message: "No authorization header"
    });
  }

};

module.exports = authMiddleware;