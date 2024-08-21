import crypto from "crypto";
import { SERVER } from "../config";

type Encryption = {
  iv: string;
  encryptedPassword: string;
};

export const encrypt = (password: string): Encryption => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv(
    "aes-256-ctr",
    Buffer.from(SERVER.ENCRYPTION_SECRET_KEY),
    iv,
  );
  const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    encryptedPassword: encrypted.toString("hex"),
  };
};

export const decrypt = (encryption: Encryption) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(SERVER.ENCRYPTION_SECRET_KEY),
    Buffer.from(encryption.iv, "hex"),
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.encryptedPassword, "hex")),
    decipher.final(),
  ]);

  return decryptedPassword.toString();
};
