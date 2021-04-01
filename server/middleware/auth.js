const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "unauthenticated" });
    }

    const isCustomAuth = token.length < 500 && !token.includes("&");

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(
        token,
        "damn-so-cray-bashhvcvaca-vahhdvcvvugyuT67TQGD-DAOJDBCHA"
      );
      req.userId = decodedData.user.id;
    } else {
      decodedData = jwt.decode(token.split("&")[0]);
      if (decodedData?.sub) {
        req.userId = token.split("&")[1];
      }
    }

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Authorization is invalid!" }] });
    }
    console.log(error);
  }
};
module.exports = auth;
