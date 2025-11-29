import { AdminClinics } from '@/modules/admin/clinics'
import { AdminPlan } from '@/modules/admin/plans'
import Login from '@/modules/auth/login'
import Nullstack from 'nullstack'
import { AppLayout } from '../components/app-layout/app-layout'
import { NavigationPath } from './enums'
import { requestApi } from './request-api'
import session from './session'

export class Router extends Nullstack {
  show = false

  async hydrate() {
    const token = localStorage.getItem('token')
    if (token) {
      const { data, error } = await requestApi(
        '/authentication/validate-token',
        'get',
      )
      if (error) {
        return session.logout()
      }

      session.create_session(data)
      this.show = true
    }
    this.show = true
  }

  render() {
    if (!this.show) return null
    return (
      <>
        <Login route={NavigationPath.Authentication.Login} />

        <AppLayout route={'*'}>
          <AdminClinics route={NavigationPath.Admin.Clinic} />
          <AdminPlan route={NavigationPath.Admin.Plan} />
        </AppLayout>
      </>
    )
  }
}
