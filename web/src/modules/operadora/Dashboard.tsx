import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'

class OperadoraDashboard extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Dashboard - Operadora - CliniQ'
  }

  render() {
    return (

      <div class="space-y-6">
        {/* Cards de Resumo */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100 text-sm font-medium mb-2">
                  Planos Ativos
                </p>
                <p class="text-3xl font-bold">24</p>
                <p class="text-blue-100 text-xs mt-2">+2 este mês</p>
              </div>
              <div class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span class="text-2xl">📋</span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-100 text-sm font-medium mb-2">
                  Clínicas Credenciadas
                </p>
                <p class="text-3xl font-bold">18</p>
                <p class="text-green-100 text-xs mt-2">3 pendentes</p>
              </div>
              <div class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span class="text-2xl">🏥</span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-purple-100 text-sm font-medium mb-2">
                  Beneficiários
                </p>
                <p class="text-3xl font-bold">1,234</p>
                <p class="text-purple-100 text-xs mt-2">+45 este mês</p>
              </div>
              <div class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span class="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-orange-100 text-sm font-medium mb-2">
                  Atendimentos do Mês
                </p>
                <p class="text-3xl font-bold">456</p>
                <p class="text-orange-100 text-xs mt-2">
                  +12% vs mês anterior
                </p>
              </div>
              <div class="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span class="text-2xl">📝</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alertas */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Autorizações Pendentes">
            <div class="space-y-4">
              <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-xl">⚠️</span>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900 mb-1">
                      15 autorizações aguardando aprovação
                    </p>
                    <p class="text-sm text-gray-600">Última: há 2 horas</p>
                  </div>
                </div>
              </div>
              <a
                href="/operadora/autorizacoes"
                class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Ver todas
                <svg
                  class="w-4 h-4 ml-1"
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
            <div class="space-y-4">
              <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-xl">💰</span>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900 mb-1">
                      R$ 45.230,00 em repasses pendentes
                    </p>
                    <p class="text-sm text-gray-600">
                      3 clínicas aguardando pagamento
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="/operadora/repasses"
                class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Ver detalhes
                <svg
                  class="w-4 h-4 ml-1"
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
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

    )
  }
}

export default OperadoraDashboard
