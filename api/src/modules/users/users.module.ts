import authMiddleware from '@/middlewares/auth.middleware'
import { createModule } from '@insightcreativewebs/api'
import { UsersController } from './users.controller'

export const UsersModule = createModule(
  '/users',
  UsersController,
  [authMiddleware],
  {
    name: 'Users',
    description: 'Módulo de users',
    tags: ['users'],
  },
).routes((route) => [
  route.get('/', 'list_all'),
  route.post('/', 'create'),
  route.get('/:id', 'populate'),
  route.put('/:id', 'update'),
  route.delete('/:id', 'delete'),
])
