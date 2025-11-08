import Nullstack, { NullstackClientContext } from 'nullstack'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/Table'

class ClinicaRepasses extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Repasses - Clínica - CliniQ'
  }

  render() {
    const repasses = [
      {
        id: 1,
        mes: 'Novembro/2024',
        procedimentos: 45,
        valorTotal: 'R$ 15.230,00',
        status: 'Pendente',
        dataPagamento: '-',
      },
      {
        id: 2,
        mes: 'Outubro/2024',
        procedimentos: 38,
        valorTotal: 'R$ 12.450,00',
        status: 'Pago',
        dataPagamento: '05/11/2024',
      },
      {
        id: 3,
        mes: 'Setembro/2024',
        procedimentos: 42,
        valorTotal: 'R$ 13.800,00',
        status: 'Pago',
        dataPagamento: '05/10/2024',
      },
    ]

    return (
      <MainLayout
        module="clinica"
        title="Repasses"
        user={{ name: 'Dr. João Silva', role: 'Clínica Odonto Saúde' }}
      >
        <div class="space-y-6">
          <Card>
            <div class="mb-4">
              <h3 class="text-lg font-semibold mb-2">Resumo</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="p-4 bg-gray-700 rounded-lg">
                  <p class="text-gray-400 text-sm mb-1">Total Pendente</p>
                  <p class="text-2xl font-bold text-yellow-400">R$ 15.230,00</p>
                </div>
                <div class="p-4 bg-gray-700 rounded-lg">
                  <p class="text-gray-400 text-sm mb-1">Total Recebido (Mês)</p>
                  <p class="text-2xl font-bold text-green-400">R$ 12.450,00</p>
                </div>
                <div class="p-4 bg-gray-700 rounded-lg">
                  <p class="text-gray-400 text-sm mb-1">Total Geral</p>
                  <p class="text-2xl font-bold">R$ 41.480,00</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <Table headers={['Mês', 'Procedimentos', 'Valor Total', 'Status', 'Data Pagamento']}>
              {repasses.map((repasse) => (
                <tr class="hover:bg-gray-700 transition-colors">
                  <td class="px-4 py-3 font-medium">{repasse.mes}</td>
                  <td class="px-4 py-3">{repasse.procedimentos}</td>
                  <td class="px-4 py-3 font-semibold">{repasse.valorTotal}</td>
                  <td class="px-4 py-3">
                    <span
                      class={`px-2 py-1 rounded text-xs ${
                        repasse.status === 'Pago'
                          ? 'bg-green-900 text-green-300'
                          : 'bg-yellow-900 text-yellow-300'
                      }`}
                    >
                      {repasse.status}
                    </span>
                  </td>
                  <td class="px-4 py-3">{repasse.dataPagamento}</td>
                </tr>
              ))}
            </Table>
          </Card>
        </div>
      </MainLayout>
    )
  }
}

export default ClinicaRepasses

