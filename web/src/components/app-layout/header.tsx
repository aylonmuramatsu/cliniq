import Nullstack, { type NullstackClientContext } from 'nullstack'
import session from '../../util/session'

export class Header extends Nullstack {
  searchQuery = ''

  handleSearchInput({ event }: NullstackClientContext<{ event: Event }>) {
    this.searchQuery = (event.target as HTMLInputElement).value
  }

  render({ page, router }: NullstackClientContext) {
    const { user } = session || {}
    const pageTitle = page.title?.split(' - ')[0] || 'Dashboard'

    return (
      <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div class="px-6 py-3">
          <div class="flex items-center justify-between gap-4">
            {/* Título da Página */}
            <div class="flex-1 min-w-0">
              <h1 class="text-lg font-semibold text-gray-900 truncate">
                {pageTitle}
              </h1>
            </div>

            {/* Avatar do Usuário */}
            {user && (
              <div class="relative ml-1">
                <button class="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-semibold text-white shadow-sm ring-1 ring-white hover:ring-blue-200 transition-all">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </button>
                <div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
              </div>
            )}
          </div>
        </div>
      </header>
    )
  }
}
