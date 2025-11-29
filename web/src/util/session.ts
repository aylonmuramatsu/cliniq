import { app } from '@/Application'
import { NavigationPath } from './enums'
import { requestApi } from './request-api'

export class Session {
  user: any
  token: string

  async validate_token() {
    const { data, error } = await requestApi(
      '/authentication/validate-token',
      'get',
    )
    if (error) {
      return this.logout()
    }
    this.create_session(data)
  }

  create_session(session: any) {
    this.user = session.user
    this.token = session.token
    window.localStorage.setItem('token', session.token)
  }

  logout() {
    setTimeout(() => {
      this.user = null
      this.token = null
      window.localStorage.removeItem('token')
      app.router.url = NavigationPath.Authentication.Login
    }, 150)
  }
}

export default new Session()
