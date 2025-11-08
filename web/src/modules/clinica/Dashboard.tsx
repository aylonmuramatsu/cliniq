import Nullstack, { NullstackClientContext } from 'nullstack'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'

class ClinicaDashboard extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Dashboard - Clínica - CliniQ'
  }

  render() {
    return (
      <MainLayout
        module="clinica"
        title="Dashboard"
        user={{ name: 'Dr. João Silva', role: 'Clínica Odonto Saúde' }}
      >
        <div class="space-y-6">
          {/* Cards de Resumo */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm mb-1">Atendimentos Hoje</p>
                  <p class="text-3xl font-bold">12</p>
                </div>
                <div class="text-4xl">📅</div>
              </div>
            </Card>

            <Card>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm mb-1">Repasses Pendentes</p>
                  <p class="text-3xl font-bold">R$ 15.230,00</p>
                </div>
                <div class="text-4xl">💰</div>
              </div>
            </Card>

            <Card>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm mb-1">Autorizações em Análise</p>
                  <p class="text-3xl font-bold">5</p>
                </div>
                <div class="text-4xl">✅</div>
              </div>
            </Card>
          </div>

          {/* Próximos Atendimentos */}
          <Card title="Próximos Atendimentos de Hoje">
            <div class="space-y-3">
              <div class="p-4 bg-gray-700 rounded-lg">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-semibold mb-1">João Silva</p>
                    <p class="text-sm text-gray-400">Limpeza Completa - 09:00</p>
                  </div>
                  <span class="px-2 py-1 bg-yellow-900 text-yellow-300 rounded text-xs">Aguardando</span>
                </div>
              </div>
              <div class="p-4 bg-gray-700 rounded-lg">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-semibold mb-1">Maria Santos</p>
                    <p class="text-sm text-gray-400">Canal - 14:00</p>
                  </div>
                  <span class="px-2 py-1 bg-green-900 text-green-300 rounded text-xs">Confirmado</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </MainLayout>
    )
  }
}

export default ClinicaDashboard

