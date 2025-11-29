export const NavigationPath = {
  Admin: {
    Clinic: '/administrador/clinicas',
    Users: '/administrador/usuarios',
    Plan: '/administrador/planos',
  },
  Authentication: {
    Login: '/login',
  },
} as const

export const UserRole = {
  Operator: 0,
  Admin: 1,
} as const

export const ClinicStatus = {
  Inactive: 0,
  Active: 1,
} as const

export const UserStatus = {
  Inactive: 0,
  Active: 1,
} as const
