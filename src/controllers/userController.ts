import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

// model
import User from "../database/models/User";
import AuthToken from "../database/models/AuthToken";

import {
  createAccessToken,
  createRefreshToken,
  verifyExpiration,
} from "../utils/token";

const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user associated to this email" });
    }

    const validPassword = bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Incorrect email or password combination" });
    }

    const token = createAccessToken(user);
    const refreshToken = await createRefreshToken(user);

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ message: "Sign in failed" });
  }
};

// add user
const signUpUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const usernameExist = await User.findOne({ where: { username } });

    if (usernameExist) {
      return res.status(400).json({ message: "Username already exist" });
    }
    const emailExist = await User.findOne({ where: { email } });

    if (emailExist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    await User.create({
      username,
      email,
      password: await bcryptjs.hash(password, 12),
    });

    return res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed" });
  }
};

// get new access token
const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken: requestToken } = req.body;

  if (!requestToken) {
    return res.status(403).json({ message: "Refresh token is required" });
  }

  try {
    const refreshToken = await AuthToken.findOne({
      where: { token: requestToken },
    });

    if (!refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    if (verifyExpiration(refreshToken)) {
      await AuthToken.destroy({ where: { token: refreshToken.token } });

      return res.status(403).json({
        message: "Refresh token is expired. Please make a new sign in request",
      });
    }

    const user = await User.findOne({
      where: { id: refreshToken.user },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = createAccessToken(user);

    return res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: refreshToken.token });
  } catch (error) {
    return res.status(500).json({ message: "Token refresh failed" });
  }
};
export { signUpUser, signInUser, refreshToken };
