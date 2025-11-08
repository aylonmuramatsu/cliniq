export const NavigationPath = {
  Operator: {
    Dashboard: '/operadora/dashboard',
    Plan: '/operadora/planos',
    Beneficiaries: '/operadora/beneficiarios',
    Authorizations: '/operadora/autorizacoes',
    Clinics: '/operadora/clinicas',
    Transfers: '/operadora/repasses',
    Ticket: '/operadora/atendimentos',
    Configuration: '/operadora/configuracoes',
  },
  Clinic: {
    Dashboard: '/clinica/dashboard',
    Schedule: '/clinica/agenda',
    Patients: '/clinica/pacientes',
    RequestAuthorization: '/clinica/solicitar-autorizacao',
    Appointments: '/clinica/atendimentos',
    Transfers: '/clinica/repasses',
    Profile: '/clinica/perfil',
  },
  Patient: {
    Dashboard: '/paciente/dashboard',
    Plan: '/paciente/plano',
    DigitalCard: '/paciente/carteirinha',
    Schedule: '/paciente/agendar',
    History: '/paciente/historico',
    Profile: '/paciente/perfil',
  },
} as const
