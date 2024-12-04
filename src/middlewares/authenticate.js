import createHttpError from 'http-errors';
import UserCollection from '../db/models/userModel.js';
import SessionCollection from '../db/models/sessionModel.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (typeof authorization !== 'string') {
    return next(createHttpError(401, 'Please, provide access token'));
  }

  const [bearer, accessToken] = authorization.split(' ', 2);
  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(createHttpError(401, 'Please, provide access token'));
  }

  const session = await SessionCollection.findOne({ accessToken });
  if (session === null) {
    return next(createHttpError(401, 'Session not found'));
  }
  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await UserCollection.findById({ _id: session.userId });
  if (user === null) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user;
  next();
};
