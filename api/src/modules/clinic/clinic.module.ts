import authMiddleware from '@/middlewares/auth.middleware';
import { createModule } from '@insightcreativewebs/api';
import { ClinicController } from './clinic.controller';

export const ClinicModule = createModule(
  '/clinics',
  ClinicController,
  [authMiddleware],
  {
    name: 'Clinic',
    description: 'Módulo de clinic',
    tags: ['clinic'],
  },
).routes((route) => [
  route.get('/', 'list_all'),
  route.post('/', 'create'),
  route.get('/:id', 'populate'),
  route.put('/:id', 'update'),
  route.delete('/:id', 'delete'),

]);
