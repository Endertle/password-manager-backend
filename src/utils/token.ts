import jwt from "jsonwebtoken";

import User from "../database/models/User";
import AuthToken from "../database/models/AuthToken";

import { SERVER } from "../config";
import { IncomingHttpHeaders } from "http";

export const createAccessToken = (user: User) => {
  const token = jwt.sign({ id: user.id }, SERVER.JWT_SECRET_KEY, {
    expiresIn: SERVER.JWT_ACCESS_EXPIRATION,
  });

  return token;
};

export const createRefreshToken = async (user: User) => {
  const expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + SERVER.JWT_REFRESH_EXPIRATION);

  const _token = jwt.sign(
    { username: user.username },
    SERVER.JWT_REFRESH_SECRET_KEY!,
  );

  const refreshToken = await AuthToken.create({
    token: _token,
    refreshExpiration: expiredAt,
    user: user.id,
  });

  return refreshToken.token;
};

export const verifyExpiration = (token: AuthToken) => {
  return token.refreshExpiration.getTime() < new Date().getTime();
};

export const getHeadersToken = (headers: IncomingHttpHeaders) => {
  return headers["authorization"]?.replace("Bearer ", "")!;
};

export const getTokenUserId = (token: string) => {
  const decoded = jwt.verify(token, SERVER.JWT_SECRET_KEY) as {
    id: string;
    iat: number;
    exp: number;
  };

  return decoded.id;
};
