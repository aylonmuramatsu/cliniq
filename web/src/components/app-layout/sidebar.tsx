import Nullstack from "nullstack";
import { NavigationPath } from "../../util/enums";

export class Sidebar extends Nullstack {
  sidebarOpen = false
  getModuleConfig(module: 'operadora' | 'clinica' | 'paciente') {
    const configs = {
      operadora: {
        name: 'Operadora',
        routes: [
          { path: NavigationPath.Operator.Dashboard, label: 'Dashboard', icon: '📊' },
          { path: NavigationPath.Operator.Plan, label: 'Planos', icon: '📋' },
          {
            path: NavigationPath.Operator.Beneficiaries,
            label: 'Beneficiários',
            icon: '👥',
          },
          {
            path: NavigationPath.Operator.Clinics,
            label: 'Clínicas Credenciadas',
            icon: '🏥',
          },
          {
            path: NavigationPath.Operator.Authorizations,
            label: 'Autorizações',
            icon: '✅',
          },
          { path: NavigationPath.Operator.Transfers, label: 'Repasses', icon: '💰' },
          {
            path: NavigationPath.Operator.Ticket,
            label: 'Atendimentos',
            icon: '📝',
          },
          {
            path: NavigationPath.Operator.Configuration,
            label: 'Configurações',
            icon: '⚙️',
          },
        ],
      },
      clinica: {
        name: 'Clínica',
        routes: [
          { path: NavigationPath.Clinic.Dashboard, label: 'Dashboard', icon: '📊' },
          { path: NavigationPath.Clinic.Schedule, label: 'Agenda', icon: '📅' },
          { path: NavigationPath.Clinic.Patients, label: 'Pacientes', icon: '👥' },
          {
            path: NavigationPath.Clinic.RequestAuthorization,
            label: 'Solicitar Autorização',
            icon: '📋',
          },
          {
            path: NavigationPath.Clinic.Appointments,
            label: 'Atendimentos Realizados',
            icon: '📝',
          },
          { path: NavigationPath.Clinic.Transfers, label: 'Repasses', icon: '💰' },
          { path: NavigationPath.Clinic.Profile, label: 'Perfil da Clínica', icon: '🏥' },
        ],
      },
      paciente: {
        name: 'Paciente',
        routes: [
          { path: NavigationPath.Patient.Dashboard, label: 'Dashboard', icon: '📊' },
          { path: NavigationPath.Patient.Plan, label: 'Meu Plano', icon: '📋' },
          {
            path: NavigationPath.Patient.DigitalCard,
            label: 'Carteirinha Digital',
            icon: '🆔',
          },
          { path: NavigationPath.Patient.Schedule, label: 'Agendar Consulta', icon: '📅' },
          {
            path: NavigationPath.Patient.History,
            label: 'Histórico de Atendimentos',
            icon: '📝',
          },
          { path: NavigationPath.Patient.Profile, label: 'Perfil', icon: '👤' },
        ],
      },
    }
    return configs[module] || configs.operadora
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen
  }

  render({
    module,
    title,
    user,
    router,
    children,
  }: any) {
    const config = this.getModuleConfig(module)
    const currentPath = router.url
    return (
      <aside
        class={`${this.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out lg:transition-none`}
      >
        <nav class="p-4 space-y-1 mt-2">
          {config.routes.map((route) => {
            const isActive =
              currentPath === route.path ||
              currentPath.startsWith(route.path + '/')
            return (
              <a
                href={route.path}
                class={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                  ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <span class="text-lg">{route.icon}</span>
                <span class="text-sm">{route.label}</span>
                {isActive && (
                  <div class="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </a>
            )
          })}
        </nav>
      </aside>

    )
  }
}