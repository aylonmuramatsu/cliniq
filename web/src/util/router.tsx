import Nullstack from 'nullstack'
import { AppLayout } from '../components/app-layout/app-layout'
import OperadoraAtendimentos from '../modules/operadora/Atendimentos'
import OperadoraAutorizacoes from '../modules/operadora/Autorizacoes'
import OperadoraBeneficiarios from '../modules/operadora/Beneficiarios'
import OperadoraClinicas from '../modules/operadora/Clinicas'
import OperadoraConfiguracoes from '../modules/operadora/Configuracoes'
import OperadoraDashboard from '../modules/operadora/Dashboard'
import OperadoraPlanos from '../modules/operadora/Planos'
import OperadoraRepasses from '../modules/operadora/Repasses'
import { NavigationPath } from './enums'
import session from './session'

export class Router extends Nullstack {
  show = false

  async hydrate() {
    const token = localStorage.getItem('token')
    if (token) {
      // const { data, error } = await requestApi('/authentication/validate-token', 'get')
      // if (error) {
      //   return session.logout()
      // }

      session.create_session({
        user: {
          name: 'Aylon Muramatsu',
          id: '1',
        },
        token: btoa(`${Date.now()}-${Math.random()}`),
      })
      this.show = true
    }
    this.show = true
  }

  render() {
    if (!this.show) return null
    return (
      <>
        <AppLayout>
          <OperadoraDashboard route={NavigationPath.Operator.Dashboard} />
          <OperadoraAtendimentos route={NavigationPath.Operator.Ticket} />
          <OperadoraAutorizacoes
            route={NavigationPath.Operator.Authorizations}
          />
          <OperadoraBeneficiarios
            route={NavigationPath.Operator.Beneficiaries}
          />
          <OperadoraClinicas route={NavigationPath.Operator.Clinics} />
          <OperadoraPlanos route={NavigationPath.Operator.Plan} />
          <OperadoraConfiguracoes
            route={NavigationPath.Operator.Configuration}
          />
          <OperadoraRepasses route={NavigationPath.Operator.Transfers} />
        </AppLayout>
      </>
    )
  }
}
