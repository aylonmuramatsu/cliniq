import Nullstack, { type BaseNullstackClientContext } from 'nullstack'
import session from '../../util/session'
import { Header } from './header'
import { Sidebar } from './sidebar'

export class AppLayout extends Nullstack {
  initiate(context: BaseNullstackClientContext<unknown>) {
    const { user } = session || {}
    // console.log(user)
  }
  render({ children, page }) {
    return (
      <div class="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <div class="flex">
          <Sidebar />
          <main class="flex-1 min-h-screen bg-gray-50">
            <div class="p-8">
              <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">{page.title}</h2>
                <div class="h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    )
  }
}
