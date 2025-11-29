import { NavigationPath } from '@/util/enums'
import { findMatchingRoute } from '@/util/helper'
import Nullstack, { type BaseNullstackClientContext } from 'nullstack'
import session from '../../util/session'
import { Header } from './header'
import { Sidebar } from './sidebar'

export class AppLayout extends Nullstack {
  initiate(context: BaseNullstackClientContext<unknown>) {
    const { user } = session || {}
    if (!user) context.router.url = NavigationPath.Authentication.Login

    const current_path = context.router.url
    const match = findMatchingRoute(current_path)
    if (!match) {
      //Mando para pagina raiz
      context.router.url = NavigationPath.Admin.Clinic
    }
  }
  render({ children, page }) {
    const { user } = session || {}
    if (!user) return false
    return (
      <div class="min-h-screen bg-gray-50">
        <div class="flex">
          <Sidebar />
          <div class="flex-1 flex flex-col min-h-screen">
            <Header />
            <main class="flex-1 bg-gray-50 p-4">{children}</main>
          </div>
        </div>
      </div>
    )
  }
}
