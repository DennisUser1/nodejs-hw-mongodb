import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import createHttpError from 'http-errors';
import UserCollection from '../db/models/userModel.js';
import SessionCollection from '../db/models/sessionModel.js';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/authConstants.js';

const createSession = () => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');
  const accessTokenValidUntil = Date.now() + accessTokenLifeTime;
  const refreshTokenValidUntil = Date.now() + refreshTokenLifeTime;

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const registerUserService = async (payload) => {
  const { email, password } = payload;
  const existingUser = await UserCollection.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email already exist');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({
    ...payload,
    password: hashedPassword,
  });

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
  };
};

export const loginUserService = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Invalid email or password');
  }

  await SessionCollection.deleteOne({ userId: user._id });
  const newSession = createSession();

  await SessionCollection.create({
    userId: user._id,
    ...newSession,
  });

  return {
    accessToken: newSession.accessToken,
    refreshToken: newSession.refreshToken,
    refreshTokenId: user._id,
  };
};

export const refreshSessionService = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session || session.refreshTokenValidUntil <= new Date()) {
    throw createHttpError(401, 'Invalid or Refresh token expired');
  }

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });
  const newSession = createSession();
  await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
  return {
    accessToken: newSession.accessToken,
    refreshToken: newSession.refreshToken,
    refreshTokenId: newSession._id,
  };
};

export const logoutUserService = async (sessionId, refreshToken) => {
  await SessionCollection.deleteOne({
    _id: sessionId,
    refreshToken,
  });
};
