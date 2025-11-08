import Nullstack, { type NullstackClientContext } from "nullstack";
import { NavigationPath } from "../../util/enums";
import session from "../../util/session";

interface MenuSection {
  title: string
  items: Array<{
    path: string
    label: string
    icon: string
  }>
}

export class Sidebar extends Nullstack {
  getMenuConfig(): MenuSection[] {
    return [
      {
        title: 'OPERADORA',
        items: [
          { path: NavigationPath.Operator.Dashboard, label: 'Dashboard', icon: '📊' },
          { path: NavigationPath.Operator.Plan, label: 'Planos', icon: '📋' },
          { path: NavigationPath.Operator.Beneficiaries, label: 'Beneficiários', icon: '👥' },
          { path: NavigationPath.Operator.Clinics, label: 'Clínicas Credenciadas', icon: '🏥' },
          { path: NavigationPath.Operator.Authorizations, label: 'Autorizações', icon: '✅' },
          { path: NavigationPath.Operator.Transfers, label: 'Repasses', icon: '💰' },
          { path: NavigationPath.Operator.Ticket, label: 'Atendimentos', icon: '📝' },
        ],
      },
      {
        title: 'FINANCEIRO',
        items: [
          { path: NavigationPath.Operator.Transfers, label: 'Repasses', icon: '💰' },
          { path: '/operadora/financeiro/contas', label: 'Contas', icon: '💳' },
          { path: '/operadora/financeiro/vendas', label: 'Vendas', icon: '📈' },
        ],
      },
      {
        title: 'CONFIGURAÇÕES',
        items: [
          { path: NavigationPath.Operator.Configuration, label: 'Configurações', icon: '⚙️' },
          { path: '/operadora/relatorios', label: 'Relatórios', icon: '📄' },
          { path: '/operadora/suporte', label: 'Suporte', icon: '🎧' },
        ],
      },
    ]
  }

  render({ router }: NullstackClientContext) {
    const { user } = session || {}
    const currentPath = router.url
    const menuConfig = this.getMenuConfig()

    return (
      <aside class="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
        {/* Logo e Branding */}
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center gap-2.5 mb-3">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="min-w-0">
              <h1 class="text-base font-bold text-gray-900 truncate">CliniQ</h1>
              <p class="text-xs text-gray-500 truncate">Sistema de Gestão</p>
            </div>
          </div>

          {/* Card de Informações */}
          {user && (
            <div class="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
              <p class="text-xs font-semibold text-gray-900 truncate mb-0.5">{user.name || 'Operadora'}</p>
              <p class="text-xs text-gray-600 truncate">{user.role || 'Administrador'}</p>
            </div>
          )}
        </div>

        {/* Menu de Navegação */}
        <nav class="p-3">
          {menuConfig.map((section) => (
            <div key={section.title} class="mb-4">
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                {section.title}
              </h3>
              <div class="space-y-0.5">
                {section.items.map((item) => {
                  const isActive =
                    currentPath === item.path ||
                    currentPath.startsWith(item.path + '/')
                  return (
                    <a
                      href={item.path}
                      class={`flex items-center gap-2.5 px-2 py-2 rounded-lg transition-all duration-200 text-sm ${isActive
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                      <span class="text-base w-4 text-center flex-shrink-0">{item.icon}</span>
                      <span class="text-sm flex-1 truncate">{item.label}</span>
                      {isActive && (
                        <div class="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                      )}
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    )
  }
}