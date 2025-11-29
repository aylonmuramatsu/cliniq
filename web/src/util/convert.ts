import { PlanStatus } from '../../../api/src/utils/enums'
import { ClinicStatus, UserRole, UserStatus } from './enums'

export const get_clinic_status = (status: number) => {
  const converted = {
    [ClinicStatus.Active]: {
      label: 'Ativo',
      color: 'success',
    },
    [ClinicStatus.Inactive]: {
      label: 'Inativo',
      color: 'danger',
    },
    ['unknown']: {
      label: 'Não informado',
      color: 'info',
    },
  }

  return converted[status] || converted['unknown']
}

export const get_user_status = (status: number) => {
  const converted = {
    [UserStatus.Active]: {
      label: 'Ativo',
      color: 'success',
    },
    [UserStatus.Inactive]: {
      label: 'Inativo',
      color: 'danger',
    },
    ['unknown']: {
      label: 'Não informado',
      color: 'info',
    },
  }

  return converted[status] || converted['unknown']
}

export const get_user_role = (status: number) => {
  const converted = {
    [UserRole.Admin]: {
      label: 'Administrador',
      color: 'success',
    },
    [UserRole.Operator]: {
      label: 'Operador',
      color: 'danger',
    },
    ['unknown']: {
      label: 'Não informado',
      color: 'info',
    },
  }

  return converted[status] || converted['unknown']
}

export const get_plan_status = (status: number) => {
  const converted = {
    [PlanStatus.Active]: {
      label: 'Ativo',
      color: 'success',
    },
    [PlanStatus.Inactive]: {
      label: 'Inativo',
      color: 'danger',
    },
    ['unknown']: {
      label: 'Não informado',
      color: 'info',
    },
  }

  return converted[status] || converted['unknown']
}
