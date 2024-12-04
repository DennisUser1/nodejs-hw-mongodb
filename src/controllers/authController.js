import httpErrors from 'http-errors';
import {
  registerUserService,
  loginUserService,
  refreshUsersSession,
  logoutUserService,
} from '../services/auth.js';

const isProduction = process.env.PRODUCTION;

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true, // Reduces the risk of XSS attacks.
    secure: isProduction === 'true', // Ensures that cookies are only sent via HTTPS in production.
    sameSite: 'Strict', // Blocks the sending of cookies in cross-site requests, reducing the risk of CSRF attacks.
    expires: session.refreshTokenValidUntil,
    // maxAge: refreshTokenLifeTime,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: isProduction === 'true',
    sameSite: 'Strict',
    expires: session.refreshTokenValidUntil,
  });
};

export const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw httpErrors(400, 'All fields are required');
    }
    const newUser = await registerUserService({ name, email, password });
    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw httpErrors(400, 'Email and password are required');
    }
    const session = await loginUserService({ email, password });

    setupSession(res, session);
    res.json({
      status: 200,
      message: 'Successfully logged in an user!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshSessionController = async (req, res) => {
    const session = await refreshUsersSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
};

export const logoutUserController = async (req, res) => {
    await logoutUserService(req.cookies.sessionId);

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
    res.status(204).send();
};
