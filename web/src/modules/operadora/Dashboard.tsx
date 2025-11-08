import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'

class OperadoraDashboard extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Dashboard - Operadora - CliniQ'
  }

  render() {
    return (
      <div class="p-4">
        <div class="space-y-4">
        {/* Cards de Resumo */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100 text-xs font-medium mb-1">
                  Planos Ativos
                </p>
                <p class="text-2xl font-bold">24</p>
                <p class="text-blue-100 text-xs mt-1">+2 este mês</p>
              </div>
              <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <span class="text-lg">📋</span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-100 text-xs font-medium mb-1">
                  Clínicas Credenciadas
                </p>
                <p class="text-2xl font-bold">18</p>
                <p class="text-green-100 text-xs mt-1">3 pendentes</p>
              </div>
              <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <span class="text-lg">🏥</span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-purple-100 text-xs font-medium mb-1">
                  Beneficiários
                </p>
                <p class="text-2xl font-bold">1,234</p>
                <p class="text-purple-100 text-xs mt-1">+45 este mês</p>
              </div>
              <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <span class="text-lg">👥</span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-orange-100 text-xs font-medium mb-1">
                  Atendimentos do Mês
                </p>
                <p class="text-2xl font-bold">456</p>
                <p class="text-orange-100 text-xs mt-1">
                  +12% vs mês anterior
                </p>
              </div>
              <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <span class="text-lg">📝</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alertas */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card title="Autorizações Pendentes">
            <div class="space-y-3">
              <div class="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                <div class="flex items-start gap-2.5">
                  <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-base">⚠️</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-900 mb-0.5">
                      15 autorizações aguardando aprovação
                    </p>
                    <p class="text-xs text-gray-600">Última: há 2 horas</p>
                  </div>
                </div>
              </div>
              <a
                href="/operadora/autorizacoes"
                class="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Ver todas
                <svg
                  class="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </Card>

          <Card title="Repasses Pendentes">
            <div class="space-y-3">
              <div class="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <div class="flex items-start gap-2.5">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-base">💰</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-900 mb-0.5">
                      R$ 45.230,00 em repasses pendentes
                    </p>
                    <p class="text-xs text-gray-600">
                      3 clínicas aguardando pagamento
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="/operadora/repasses"
                class="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Ver detalhes
                <svg
                  class="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </Card>
        </div>

        {/* Gráficos/Métricas */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card title="Atendimentos por Mês">
            <div class="h-64 flex items-center justify-center text-gray-500">
              [Gráfico de atendimentos]
            </div>
          </Card>

          <Card title="Receita do Mês">
            <div class="h-64 flex items-center justify-center text-gray-500">
              [Gráfico de receita]
            </div>
          </Card>
        </div>
      </div>
      </div>
    )
  }
}

export default OperadoraDashboard
