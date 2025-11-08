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
      <div class="min-h-screen bg-gray-50">
        <div class="flex">
          <Sidebar />
          <div class="flex-1 flex flex-col min-h-screen">
            <Header />
            <main class="flex-1 bg-gray-50 p-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    )
  }
}
