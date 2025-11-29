// src/util/session.ts
import { AppException, Config, logger } from '@insightcreativewebs/api';
import jwt from 'jsonwebtoken';
import { UserModel } from '../database/models/user.model';
/**
 * Interface do usuário na sessão
 */
export interface SessionUser {
  user: {
    id: number;
    name: string;
    email: string;
    status: number;
    role: number;
  };
  token: string;
}

/**
 * Payload do JWT
 */
interface JwtPayload {
  id: number;
}

class Session {
  /**
   * Gera token JWT
   */
  generate_token(userId: number): string {
    return jwt.sign(
      { id: userId },
      Config.get('JWT_SECRET_KEY') as any,
      {
        expiresIn: Config.get('JWT_EXPIRES_IN') as any,
      },
    );
  }

  /**
   * Verifica e decodifica token JWT
   */
  verify_token(token: string): JwtPayload {
    try {
      return jwt.verify(token, Config.get('JWT_SECRET_KEY')) as JwtPayload;
    } catch (error) {
      throw new AppException('Token inválido ou expirado', 401);
    }
  }

  /**
   * Gera sessão completa do usuário (com subscription)
   */
  async generate(userId: number): Promise<SessionUser> {
    const user = await UserModel.findByPk(userId);

    if (!user) {
      logger.warn(
        `Tentativa de gerar sessão para usuário inexistente: ${userId}`,
      );
      throw new AppException('Usuário não encontrado', 404);
    }

    // Gera token JWT
    const token = this.generate_token(user.id);
    // Monta sessão
    const session: SessionUser = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      },
      token,
    };

    logger.debug(`Sessão gerada para usuário: ${user.email}`, {
      metadata: { userId: user.id },
    });

    return session;
  }

  /**
   * Renova token (gera novo token com mesmos dados)
   */
  async refresh(oldToken: string): Promise<string> {
    const decoded = this.verify_token(oldToken);
    return this.generate_token(decoded.id);
  }
}

// Exporta singleton
export const session = new Session();
