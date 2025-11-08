import Nullstack, { NullstackClientContext } from 'nullstack'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/table'

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
              <h3 class="text-sm font-semibold mb-3 text-gray-900">Resumo</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p class="text-amber-700 text-xs font-medium mb-1">Total Pendente</p>
                  <p class="text-xl font-bold text-amber-900">R$ 15.230,00</p>
                </div>
                <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p class="text-green-700 text-xs font-medium mb-1">Total Recebido (Mês)</p>
                  <p class="text-xl font-bold text-green-900">R$ 12.450,00</p>
                </div>
                <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p class="text-gray-700 text-xs font-medium mb-1">Total Geral</p>
                  <p class="text-xl font-bold text-gray-900">R$ 41.480,00</p>
                </div>
              </div>
            </div>
          </Card>

          <Table
            columns={[
              { key: 'mes', label: 'Mês', content: (row) => <div class="font-medium text-gray-900">{row.mes}</div> },
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
              { key: 'dataPagamento', label: 'Data Pagamento', content: (row) => <div class="text-sm text-gray-600">{row.dataPagamento}</div> },
            ]}
            data={repasses}
          />
        </div>
      </MainLayout>
    )
  }
}

export default ClinicaRepasses

