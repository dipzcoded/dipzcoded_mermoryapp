import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const auth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "unauthenticated" });
    }

    const isCustomAuth = token!.length < 500 && !token.includes("&");

    let decodedData: any;
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

export default auth;
