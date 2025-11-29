import authMiddleware from '@/middlewares/auth.middleware'
import { createModule } from '@insightcreativewebs/api'
import { PlanController } from './plan.controller'

export const PlanModule = createModule(
  '/plans',
  PlanController,
  [authMiddleware],
  {
    name: 'Plan',
    description: 'Módulo de plan',
    tags: ['plan'],
  },
).routes((route) => [
  route.get('/', 'list_all'),
  route.post('/', 'create'),
  route.get('/:id', 'populate'),
  route.put('/:id', 'update'),
  route.delete('/:id', 'delete'),
  route.put('/:id/status', 'change_status'),
])
