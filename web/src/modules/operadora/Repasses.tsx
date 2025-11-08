import { Button } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/Table'

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

        <Card>
          <Table
            headers={[
              'Clínica',
              'Mês',
              'Procedimentos',
              'Valor Total',
              'Status',
              'Ações',
            ]}
          >
            {repasses.map((repasse) => (
              <tr class="hover:bg-gray-700 transition-colors">
                <td class="px-4 py-3 font-medium">{repasse.clinica}</td>
                <td class="px-4 py-3">{repasse.mes}</td>
                <td class="px-4 py-3">{repasse.procedimentos}</td>
                <td class="px-4 py-3 font-semibold">{repasse.valorTotal}</td>
                <td class="px-4 py-3">
                  <span
                    class={`px-2 py-1 rounded text-xs ${repasse.status === 'Pago'
                      ? 'bg-green-900 text-green-300'
                      : 'bg-yellow-900 text-yellow-300'
                      }`}
                  >
                    {repasse.status}
                  </span>
                </td>
                <td class="px-4 py-3">
                  {repasse.status === 'Pendente' && (
                    <Button size="sm" onclick={() => { }}>
                      Marcar como Pago
                    </Button>
                  )}
                  {repasse.status === 'Pago' && (
                    <Button size="sm" variant="secondary" onclick={() => { }}>
                      Ver Extrato
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>
    )
  }
}

export default OperadoraRepasses
