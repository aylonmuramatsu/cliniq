import Nullstack, { NullstackClientContext } from 'nullstack'
import { Button } from '@insightcreativewebs/ui'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'

class PacienteDashboard extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Dashboard - Paciente - CliniQ'
  }

  render() {
    return (
      <MainLayout
        module="paciente"
        title="Dashboard"
        user={{ name: 'João Silva', role: 'Beneficiário' }}
      >
        <div class="space-y-6">
          {/* Boas-vindas */}
          <Card>
            <div class="text-center py-6">
              <h2 class="text-2xl font-bold mb-2">Bem-vindo, João Silva!</h2>
              <p class="text-gray-400">Aqui está o resumo do seu plano</p>
            </div>
          </Card>

          {/* Resumo do Plano */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm mb-1">Plano</p>
                  <p class="text-xl font-bold">Plano Premium</p>
                </div>
                <div class="text-3xl">📋</div>
              </div>
            </Card>

            <Card>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm mb-1">Validade</p>
                  <p class="text-xl font-bold">31/12/2024</p>
                </div>
                <div class="text-3xl">📅</div>
              </div>
            </Card>

            <Card>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm mb-1">Status de Pagamento</p>
                  <p class="text-xl font-bold text-green-400">Em Dia</p>
                </div>
                <div class="text-3xl">✅</div>
              </div>
            </Card>
          </div>

          {/* Acesso Rápido */}
          <Card title="Acesso Rápido">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/paciente/carteirinha">
                <div class="p-4 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg hover:bg-opacity-50 transition-colors cursor-pointer">
                  <div class="flex items-center gap-3">
                    <span class="text-3xl">🆔</span>
                    <div>
                      <p class="font-semibold">Carteirinha Digital</p>
                      <p class="text-sm text-gray-400">Acesse sua carteirinha</p>
                    </div>
                  </div>
                </div>
              </a>
              <a href="/paciente/agendar">
                <div class="p-4 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg hover:bg-opacity-50 transition-colors cursor-pointer">
                  <div class="flex items-center gap-3">
                    <span class="text-3xl">📅</span>
                    <div>
                      <p class="font-semibold">Agendar Consulta</p>
                      <p class="text-sm text-gray-400">Agende sua próxima consulta</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </Card>

          {/* Próximas Consultas */}
          <Card title="Próximas Consultas">
            <div class="space-y-3">
              <div class="p-4 bg-gray-700 rounded-lg">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-semibold mb-1">Clínica Odonto Saúde</p>
                    <p class="text-sm text-gray-400">Limpeza Completa - 20/12/2024 às 09:00</p>
                  </div>
                  <span class="px-2 py-1 bg-yellow-900 text-yellow-300 rounded text-xs">Agendada</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </MainLayout>
    )
  }
}

export default PacienteDashboard

