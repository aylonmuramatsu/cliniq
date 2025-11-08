import { Button } from "@insightcreativewebs/ui";
import Nullstack from "nullstack";
import session from "../../util/session";

export class Header extends Nullstack {
  sidebarOpen = false

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen
  }

  render() {
    const { user } = session

    return (
      <header class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div class="flex items-center justify-between px-6 py-4">
          <div class="flex items-center gap-4">
            <button
              onclick={this.toggleSidebar}
              class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-white font-bold text-lg">CQ</span>
              </div>
              <div>
                <h1 class="text-lg font-semibold text-gray-900">CliniQ</h1>
                <p class="text-xs text-gray-500">Operadora</p>
              </div>
            </div>
          </div>
          {user && (
            <div class="flex items-center gap-4">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-medium text-gray-900">{user.name}</p>
                <p class="text-xs text-gray-500">{user.role}</p>
              </div>
              <div class="relative">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-semibold text-white shadow-md ring-2 ring-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <Button onclick={() => { }} variant="secondary" size="sm">
                Sair
              </Button>
            </div>
          )}
        </div>
      </header>
    )
  }
}