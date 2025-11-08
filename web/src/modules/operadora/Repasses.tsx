import { Button } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/table'

class OperadoraRepasses extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Repasses - Operadora - CliniQ'
  }

  render() {
    const repasses = [
      {
        id: 1,
        clinica: 'Clínica Odonto Saúde',
        mes: 'Novembro/2024',
        procedimentos: 45,
        valorTotal: 'R$ 15.230,00',
        status: 'Pendente',
      },
      {
        id: 2,
        clinica: 'Dental Care Center',
        mes: 'Novembro/2024',
        procedimentos: 32,
        valorTotal: 'R$ 12.450,00',
        status: 'Pago',
      },
      {
        id: 3,
        clinica: 'Sorriso Perfeito',
        mes: 'Novembro/2024',
        procedimentos: 18,
        valorTotal: 'R$ 8.750,00',
        status: 'Pendente',
      },
    ]

    return (
      <div class="space-y-6">
        <Card>
          <div class="mb-4">
            <h3 class="text-lg font-semibold mb-2">Resumo do Mês</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-4 bg-gray-700 rounded-lg">
                <p class="text-gray-400 text-sm mb-1">Total de Repasses</p>
                <p class="text-2xl font-bold">R$ 36.430,00</p>
              </div>
              <div class="p-4 bg-gray-700 rounded-lg">
                <p class="text-gray-400 text-sm mb-1">Pendentes</p>
                <p class="text-2xl font-bold text-yellow-400">R$ 23.980,00</p>
              </div>
              <div class="p-4 bg-gray-700 rounded-lg">
                <p class="text-gray-400 text-sm mb-1">Pagos</p>
                <p class="text-2xl font-bold text-green-400">R$ 12.450,00</p>
              </div>
            </div>
          </div>
        </Card>

        <Table
          columns={[
            { key: 'clinica', label: 'Clínica', content: (row) => <div class="font-medium text-gray-900">{row.clinica}</div> },
            { key: 'mes', label: 'Mês', content: (row) => <div class="text-sm text-gray-600">{row.mes}</div> },
            { key: 'procedimentos', label: 'Procedimentos', content: (row) => <div class="text-sm text-gray-900">{row.procedimentos}</div> },
            { key: 'valorTotal', label: 'Valor Total', content: (row) => <div class="text-sm text-gray-900 font-semibold">{row.valorTotal}</div> },
            {
              key: 'status',
              label: 'Status',
              content: (row) => (
                <span
                  class={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    row.status === 'Pago' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
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
                row.status === 'Pendente' ? (
                  <button
                    class="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    onclick={() => {}}
                  >
                    Marcar como Pago
                  </button>
                ) : (
                  <button
                    class="text-xs text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    onclick={() => {}}
                  >
                    Ver Extrato
                  </button>
                ),
            },
          ]}
          data={repasses}
        />
      </div>
    )
  }
}

export default OperadoraRepasses
