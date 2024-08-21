import { Request, Response } from "express";

import Password from "../database/models/Password";

import { encrypt } from "../utils/encryption";
import { getHeadersToken, getTokenUserId } from "../utils/token";
import { decrypt } from "../utils/encryption";

// POST password
const addPassword = async (req: Request, res: Response) => {
  const { name, username, password, website } = req.body;
  const token = getHeadersToken(req.headers);

  try {
    const userId = getTokenUserId(token);

    const { iv, encryptedPassword } = encrypt(password);

    await Password.create({
      user: userId,
      name,
      username,
      password: encryptedPassword,
      website,
      iv,
    });

    return res.status(201).json({ message: "Password added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Adding new password failed" });
  }
};

// GET all passwords
const getPasswords = async (req: Request, res: Response) => {
  const token = getHeadersToken(req.headers);

  try {
    const userId = getTokenUserId(token);

    const passwords = await Password.findAll({
      where: { user: userId },
      attributes: {
        exclude: ["user"],
      },
    });

    // just return empty array because later the fields should
    // be filled if something is fetched for the decryptedPasswords
    // if (passwords.length === 0) {
    //   return res.status(200).json([]);
    // }

    const decryptedPasswords = passwords.map((pass) => ({
      id: pass.id,
      website: pass.website,
      username: pass.username,
      name: pass.name,
      password: decrypt({
        encryptedPassword: pass.password,
        iv: pass.iv,
      }),
      createdAt: pass.createdAt,
    }));

    return res.status(200).json(decryptedPasswords);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Fetching passwords failed." });
  }
};

// GET password
const getPassword = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const userPassword = await Password.findOne({ where: { id } });

    if (!userPassword) {
      return res.status(404).json({ message: "No password found." });
    }

    const decryptedPassword = decrypt({
      iv: userPassword.iv,
      encryptedPassword: userPassword.password,
    });

    return res.status(200).json({
      id: userPassword.id,
      website: userPassword.website,
      username: userPassword.username,
      name: userPassword.name,
      password: decryptedPassword,
      createdAt: userPassword.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Fetching password failed." });
  }
};

// DELETE passwowrd
const deletePassword = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const password = await Password.destroy({ where: { id } });

    if (!password) {
      return res.status(404).json({ message: "No password found." });
    }

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: "Deleting password failed." });
  }
};

// PUT password
const updatePassword = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, username, password, website } = req.body;

  try {
    const userPassword = await Password.findOne({ where: { id } });

    if (!userPassword) {
      return res.status(404).json({ message: "No password found." });
    }

    const decryptedUserPassword = decrypt({
      encryptedPassword: userPassword.password,
      iv: userPassword.iv,
    });

    const isPasswordSame = password === decryptedUserPassword;

    const encryptedPassword = encrypt(password);

    await Password.update(
      {
        name,
        username,
        website,
        ...(isPasswordSame
          ? {}
          : {
            password: encryptedPassword.encryptedPassword,
            iv: encryptedPassword.iv,
          }),
      },
      { where: { id } },
    );

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Updating password failed." });
  }
};

export {
  addPassword,
  getPasswords,
  getPassword,
  deletePassword,
  updatePassword,
};
