import { create, get, update } from 'lodash';
import config from 'config';
import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../models/session.model';
import { verifyJWT, signJWT } from '../utils/jwt.utils';
import { findUser } from './user.service';
import { Session } from 'inspector';

export async function createSession(userId: string, userAgent: string) {
  /*   const session = await SessionModel.create({ userId, userAgent }); */
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).populate('user').lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}
