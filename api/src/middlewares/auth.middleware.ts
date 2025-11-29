import { session } from '@/utils/session';
import { AppException } from '@insightcreativewebs/api';


export default async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization || `Bearer ${req.query.token}`;
  if (!authHeader) {
    throw new AppException('Token não fornecido', 401);
  }
  const [, token] = authHeader.split(' ');
  try {
    // ✨ Usa session helper
    const decoded = session.verify_token(token);

    // Gera sessão completa
    req.session = await session.generate(decoded.id);
    req.user_id = decoded.id;

    next();
  } catch (err) {
    throw new AppException('Token inválido', 401);
  }
};
