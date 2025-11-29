import { get_user_role } from '@/util/convert'
import { NavigationPath, UserRole } from '@/util/enums'
import { matchesRoute, to_string } from '@/util/helper'
import { Badge } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import session from '../../util/session'

interface MenuSection {
  title: string
  items: Array<{
    onclick?: Function
    path?: string
    label: string
    icon: string
  }>
}

export class Sidebar extends Nullstack {
  getMenuConfig(): MenuSection[] {
    const type = UserRole.Admin

    if (type === UserRole.Admin) {
      return [
        {
          title: 'Administrativo',
          items: [
            {
              path: NavigationPath.Admin.Clinic,
              label: 'Clinicas',
              icon: '🏥',
            },
            {
              path: NavigationPath.Admin.Plan,
              label: 'Planos',
              icon: '📋',
            },
            {
              onclick: () => {
                session.logout()
              },
              label: 'Sair',
              icon: '🚪',
            },
          ],
        },
      ]
    } else {
      return []
    }
  }

  render({ router }: NullstackClientContext) {
    const { user } = session || {}
    const currentPath = router.url
    const menuConfig = this.getMenuConfig()
    const user_role = get_user_role(user.role)

    return (
      <aside class="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
        {/* Logo e Branding */}
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center gap-2.5 mb-3">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
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
              <p class="text-xs font-semibold text-gray-900 truncate mb-0.5">
                {user.name}
              </p>
              <Badge color={user_role.color} size="xs" variant="soft" dot>
                {user_role.label}
              </Badge>
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
                  const isActive = matchesRoute(currentPath, item.path)
                  return (
                    <a
                      onclick={item?.onclick || undefined}
                      href={to_string(item.path, undefined)}
                      class={`flex items-center gap-2.5 px-2 py-2 rounded-lg transition-all duration-200 text-sm ${item?.onclick ? 'cursor-pointer' : ''}${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span class="text-base w-4 text-center shrink-0">
                        {item.icon}
                      </span>
                      <span class="text-sm flex-1 truncate">{item.label}</span>
                      {isActive && (
                        <div class="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0"></div>
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
