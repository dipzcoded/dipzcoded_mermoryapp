import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel, { userObject } from "../models/User";

const tokenInit = (user: any, res: Response): any => {
  const payload = {
    user: {
      id: user.email,
    },
  };
  const token = jwt.sign(
    payload,
    "damn-so-cray-bashhvcvaca-vahhdvcvvugyuT67TQGD-DAOJDBCHA",
    {
      expiresIn: "1h",
    }
  );
  res.status(200).json({ result: user, token });
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exist!" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password dont match!" });
    }

    const newUser = new UserModel();
    newUser.name = `${firstName} ${lastName}`;
    newUser.email = email;
    const salt = await bcryptjs.genSalt(12);
    newUser.password = await bcryptjs.hash(password, salt);
    await newUser.save();
    tokenInit(newUser, res);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ msg: "Invalid credentials" });
    }
    const isMatch: boolean = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    tokenInit(existingUser, res);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong." });
  }
};
