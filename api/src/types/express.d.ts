import { SessionUser } from '../util/interfaces';

declare global {
  namespace Express {
    interface Request {
      user_id?: number;
      session?: SessionUser;
    }
  }
}

export {};
