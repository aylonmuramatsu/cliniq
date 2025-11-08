import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import Table from '../../components/UI/Table'

class OperadoraAtendimentos extends Nullstack {
  searchTerm = ''

  prepare({ page }: NullstackClientContext) {
    page.title = 'Atendimentos - Operadora - CliniQ'
  }

  render() {
    const atendimentos = [
      {
        id: 1,
        paciente: 'João Silva',
        clinica: 'Clínica Odonto Saúde',
        procedimento: 'Limpeza Completa',
        data: '15/12/2024',
        status: 'Concluído',
      },
      {
        id: 2,
        paciente: 'Maria Santos',
        clinica: 'Dental Care Center',
        procedimento: 'Canal',
        data: '14/12/2024',
        status: 'Concluído',
      },
      {
        id: 3,
        paciente: 'Pedro Costa',
        clinica: 'Sorriso Perfeito',
        procedimento: 'Extração',
        data: '13/12/2024',
        status: 'Concluído',
      },
    ]

    const filteredAtendimentos =
      this.searchTerm === ''
        ? atendimentos
        : atendimentos.filter(
          (a) =>
            a.paciente
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            a.clinica.toLowerCase().includes(this.searchTerm.toLowerCase()),
        )

    return (
      <div class="space-y-6">
        {/* Filtros */}
        <Card>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Buscar"
              placeholder="Paciente ou Clínica"
              value={this.searchTerm}
              oninput={({ event }) => {
                this.searchTerm = (event.target as HTMLInputElement).value
              }}
            />
            <div>
              <label class="block text-sm font-medium mb-2">Data Inicial</label>
              <input
                type="date"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Data Final</label>
              <input
                type="date"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>
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
              'Status',
              'Ações',
            ]}
          >
            {filteredAtendimentos.map((atendimento) => (
              <tr class="hover:bg-gray-700 transition-colors">
                <td class="px-4 py-3 font-medium">{atendimento.paciente}</td>
                <td class="px-4 py-3">{atendimento.clinica}</td>
                <td class="px-4 py-3">{atendimento.procedimento}</td>
                <td class="px-4 py-3">{atendimento.data}</td>
                <td class="px-4 py-3">
                  <span class="px-2 py-1 rounded text-xs bg-green-900 text-green-300">
                    {atendimento.status}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <button class="text-blue-400 hover:text-blue-300 text-sm">
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>
    )
  }
}

export default OperadoraAtendimentos
