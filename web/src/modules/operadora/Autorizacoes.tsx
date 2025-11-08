import { Button } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/table'

class OperadoraAutorizacoes extends Nullstack {
  filterStatus = 'aguardando'

  prepare({ page }: NullstackClientContext) {
    page.title = 'Autorizações - Operadora - CliniQ'
  }

  render() {
    const autorizacoes = [
      {
        id: 1,
        paciente: 'João Silva',
        clinica: 'Clínica Odonto Saúde',
        procedimento: 'Limpeza Completa',
        data: '15/12/2024',
        valor: 'R$ 150,00',
        status: 'Aguardando',
      },
      {
        id: 2,
        paciente: 'Maria Santos',
        clinica: 'Dental Care Center',
        procedimento: 'Canal',
        data: '14/12/2024',
        valor: 'R$ 800,00',
        status: 'Aprovada',
      },
      {
        id: 3,
        paciente: 'Pedro Costa',
        clinica: 'Sorriso Perfeito',
        procedimento: 'Extração',
        data: '13/12/2024',
        valor: 'R$ 200,00',
        status: 'Negada',
      },
    ]

    const filteredAutorizacoes =
      this.filterStatus === 'todos'
        ? autorizacoes
        : autorizacoes.filter(
          (a) => a.status.toLowerCase() === this.filterStatus,
        )

    return (
      <div class="space-y-6">
        {/* Filtros */}
        <Card>
          <div>
            <label class="block text-sm font-medium mb-2">Status</label>
            <select
              value={this.filterStatus}
              onchange={({ event }) => {
                this.filterStatus = (event.target as HTMLSelectElement).value
              }}
              class="w-full md:w-64 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="todos">Todos</option>
              <option value="aguardando">Aguardando</option>
              <option value="aprovada">Aprovadas</option>
              <option value="negada">Negadas</option>
            </select>
          </div>
        </Card>

        {/* Tabela */}
        <Table
          columns={[
            { key: 'paciente', label: 'Paciente', content: (row) => <div class="font-medium text-gray-900">{row.paciente}</div> },
            { key: 'clinica', label: 'Clínica', content: (row) => <div class="text-sm text-gray-600">{row.clinica}</div> },
            { key: 'procedimento', label: 'Procedimento', content: (row) => <div class="text-sm text-gray-900">{row.procedimento}</div> },
            { key: 'data', label: 'Data', content: (row) => <div class="text-sm text-gray-600">{row.data}</div> },
            { key: 'valor', label: 'Valor', content: (row) => <div class="text-sm text-gray-900 font-semibold">{row.valor}</div> },
            {
              key: 'status',
              label: 'Status',
              content: (row) => (
                <span
                  class={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    row.status === 'Aprovada'
                      ? 'bg-green-100 text-green-800'
                      : row.status === 'Negada'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {row.status}
                </span>
              ),
            },
            {
              key: 'acoes',
              label: 'Ações',
              content: (row) =>
                row.status === 'Aguardando' ? (
                  <div class="flex items-center gap-2">
                    <button
                      class="text-xs text-green-600 hover:text-green-700 font-medium transition-colors"
                      onclick={() => {}}
                    >
                      Aprovar
                    </button>
                    <span class="text-gray-300">|</span>
                    <button
                      class="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
                      onclick={() => {}}
                    >
                      Recusar
                    </button>
                  </div>
                ) : (
                  <button
                    class="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    onclick={() => {}}
                  >
                    Ver Detalhes
                  </button>
                ),
            },
          ]}
          data={filteredAutorizacoes}
        />
      </div>
    )
  }
}

export default OperadoraAutorizacoes
