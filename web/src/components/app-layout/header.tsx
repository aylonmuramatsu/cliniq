import { Button } from "@insightcreativewebs/ui";
import Nullstack, { type NullstackClientContext } from "nullstack";
import session from "../../util/session";

export class Header extends Nullstack {
  searchQuery = ''

  handleSearchInput({ event }: NullstackClientContext<{ event: Event }>) {
    this.searchQuery = (event.target as HTMLInputElement).value
  }

  render({ page, router }: NullstackClientContext) {
    const { user } = session || {}
    const pageTitle = page.title?.split(' - ')[0] || 'Dashboard'

    return (
      <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="px-6 py-3">
          <div class="flex items-center justify-between gap-4">
            {/* Título da Página */}
            <div class="flex-1 min-w-0">
              <h1 class="text-lg font-semibold text-gray-900 truncate">{pageTitle}</h1>
            </div>

            {/* Barra de Busca */}
            <div class="flex-1 max-w-xl">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    class="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={this.searchQuery}
                  oninput={this.handleSearchInput}
                  placeholder="Search for anything here..."
                  class="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Ações */}
            <div class="flex items-center gap-2">
              {/* Botão Adicionar */}
              <button
                class="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                title="Adicionar"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>

              {/* Ajuda */}
              <button
                class="w-8 h-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                title="Ajuda"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {/* Notificações */}
              <button
                class="w-8 h-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors relative"
                title="Notificações"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>

              {/* Configurações */}
              <button
                class="w-8 h-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                title="Configurações"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Avatar do Usuário */}
              {user && (
                <div class="relative ml-1">
                  <button class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-semibold text-white shadow-sm ring-1 ring-white hover:ring-blue-200 transition-all">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </button>
                  <div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    )
  }
}