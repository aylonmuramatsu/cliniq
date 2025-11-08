import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import Table from '../../components/UI/table'

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
        <Table
          columns={[
            { key: 'paciente', label: 'Paciente', content: (row) => <div class="font-medium text-gray-900">{row.paciente}</div> },
            { key: 'clinica', label: 'Clínica', content: (row) => <div class="text-sm text-gray-600">{row.clinica}</div> },
            { key: 'procedimento', label: 'Procedimento', content: (row) => <div class="text-sm text-gray-900">{row.procedimento}</div> },
            { key: 'data', label: 'Data', content: (row) => <div class="text-sm text-gray-600">{row.data}</div> },
            {
              key: 'status',
              label: 'Status',
              content: (row) => (
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {row.status}
                </span>
              ),
            },
            {
              key: 'acoes',
              label: 'Ações',
              content: () => (
                <button class="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Ver Detalhes
                </button>
              ),
            },
          ]}
          data={filteredAtendimentos}
        />
      </div>
    )
  }
}

export default OperadoraAtendimentos
