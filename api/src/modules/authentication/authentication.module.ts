import authMiddleware from '@/middlewares/auth.middleware'
import { createModule } from '@insightcreativewebs/api'
import { AuthenticationController } from './authentication.controller'

export const AuthenticationModule = createModule(
  '/authentication',
  AuthenticationController,
  [],
  {
    name: 'Authentication',
    description: 'Módulo de authentication',
    tags: ['authentication'],
  },
).routes((route) => [
  route.post('/sign-up', 'sign_up'),
  route.post('/sign-in', 'sign_in'),
  route.get('/validate-token', 'validate_token', [authMiddleware]),
  // ✨ Adicionar mais rotas conforme necessário
])
