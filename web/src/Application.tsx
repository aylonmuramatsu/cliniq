import Nullstack, {
  type NullstackClientContext,
  type NullstackNode,
} from 'nullstack'

import '../tailwind.css'
import { Router } from './util/router'
import session from './util/session'

// Auth
// Clínica
// Operadora
// Paciente

declare function Head(): NullstackNode

class Application extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.locale = 'pt-BR'
    session.create_session({
      user: {
        name: 'Aylon Muramatsu',
        id: '1',
      },
      token: btoa(`${Date.now()}-${Math.random()}`),
    })
  }

  renderHead() {
    return (
      <head>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </head>
    )
  }

  render() {
    return (
      <body class="">
        <Head />

        <Router />
        {/* Auth - Login único que identifica o tipo de usuário */}
        {/* <Login route="/login" />
        <Login route="/" />

        {/* Operadora */}
        {/* <OperadoraDashboard route="/operadora/dashboard" />
        <OperadoraPlanos route="/operadora/planos" />
        <OperadoraBeneficiarios route="/operadora/beneficiarios" />
        <OperadoraClinicas route="/operadora/clinicas" />
        <OperadoraAutorizacoes route="/operadora/autorizacoes" />
        <OperadoraRepasses route="/operadora/repasses" />
        <OperadoraAtendimentos route="/operadora/atendimentos" />
        <OperadoraConfiguracoes route="/operadora/configuracoes" /> */}

        {/* Clínica */}
        {/* <ClinicaDashboard route="/clinica/dashboard" />
        <ClinicaAgenda route="/clinica/agenda" />
        <ClinicaPacientes route="/clinica/pacientes" />
        <ClinicaSolicitarAutorizacao route="/clinica/solicitar-autorizacao" />
        <ClinicaAtendimentos route="/clinica/atendimentos" />
        <ClinicaRepasses route="/clinica/repasses" />
        <ClinicaPerfil route="/clinica/perfil" /> */}

        {/* Paciente */}
        {/* <PacienteDashboard route="/paciente/dashboard" />
        <PacientePlano route="/paciente/plano" />
        <PacienteCarteirinha route="/paciente/carteirinha" />
        <PacienteAgendar route="/paciente/agendar" />
        <PacienteHistorico route="/paciente/historico" />
        <PacientePerfil route="/paciente/perfil" /> */}
      </body>
    )
  }
}

export default Application
