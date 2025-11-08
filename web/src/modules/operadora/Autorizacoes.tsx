import { Button } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/Table'

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
        <Card>
          <Table
            headers={[
              'Paciente',
              'Clínica',
              'Procedimento',
              'Data',
              'Valor',
              'Status',
              'Ações',
            ]}
          >
            {filteredAutorizacoes.map((autorizacao) => (
              <tr class="hover:bg-gray-700 transition-colors">
                <td class="px-4 py-3 font-medium">{autorizacao.paciente}</td>
                <td class="px-4 py-3">{autorizacao.clinica}</td>
                <td class="px-4 py-3">{autorizacao.procedimento}</td>
                <td class="px-4 py-3">{autorizacao.data}</td>
                <td class="px-4 py-3">{autorizacao.valor}</td>
                <td class="px-4 py-3">
                  <span
                    class={`px-2 py-1 rounded text-xs ${autorizacao.status === 'Aprovada'
                        ? 'bg-green-900 text-green-300'
                        : autorizacao.status === 'Negada'
                          ? 'bg-red-900 text-red-300'
                          : 'bg-yellow-900 text-yellow-300'
                      }`}
                  >
                    {autorizacao.status}
                  </span>
                </td>
                <td class="px-4 py-3">
                  {autorizacao.status === 'Aguardando' && (
                    <div class="flex gap-2">
                      <Button size="sm" onclick={() => { }}>
                        Aprovar
                      </Button>
                      <Button size="sm" variant="secondary" onclick={() => { }}>
                        Recusar
                      </Button>
                    </div>
                  )}
                  {autorizacao.status !== 'Aguardando' && (
                    <Button size="sm" variant="secondary" onclick={() => { }}>
                      Ver Detalhes
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

export default OperadoraAutorizacoes
