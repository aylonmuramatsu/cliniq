export class Session {
  user: any
  token: string

  async validate_token() {
    // const { data, error } = await requestApi(
    //   '/authentication/validate-token',
    //   'get',
    // )
    // if (error) {
    //   return this.logout()
    // }

    this.create_session({
      user: {
        name: 'Aylon Muramatsu',
        id: '1',
      },
      token: btoa(`${Date.now()}-${Math.random()}`),
    })
  }

  create_session(session: any) {
    this.user = session.user
    this.token = session.token
    window.localStorage.setItem('token', session.token)
  }

  logout() {
    this.user = null
    this.token = null
    window.localStorage.removeItem('token')
    // setTimeout(() => {
    // app.router.url = NavigationPath.Login
    // }, 200)
  }
}

export default new Session()
