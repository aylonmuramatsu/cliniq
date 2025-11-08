
import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import Table from '../../components/UI/table'

class OperadoraBeneficiarios extends Nullstack {
  filterStatus = 'todos'
  searchTerm = ''

  prepare({ page }: NullstackClientContext) {
    page.title = 'Beneficiários - Operadora - CliniQ'
  }

  handleSearchInput({ event }: NullstackClientContext<{ event: Event }>) {
    this.searchTerm = (event.target as HTMLInputElement).value
  }

  handleStatusChange({ event }: NullstackClientContext<{ event: Event }>) {
    this.filterStatus = (event.target as HTMLSelectElement).value
  }

  render() {
    const beneficiarios = [
      {
        id: 1,
        nome: 'João Silva',
        cpf: '123.456.789-00',
        plano: 'Plano Premium',
        validade: '31/12/2024',
        status: 'Ativo',
      },
      {
        id: 2,
        nome: 'Maria Santos',
        cpf: '987.654.321-00',
        plano: 'Plano Básico',
        validade: '15/11/2024',
        status: 'Inadimplente',
      },
      {
        id: 3,
        nome: 'Pedro Costa',
        cpf: '111.222.333-44',
        plano: 'Plano Familiar',
        validade: '20/12/2024',
        status: 'Cancelado',
      },
    ]

    const filteredBeneficiarios = beneficiarios.filter((b) => {
      const matchesStatus =
        this.filterStatus === 'todos' ||
        b.status.toLowerCase() === this.filterStatus
      const matchesSearch =
        this.searchTerm === '' ||
        b.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        b.cpf.includes(this.searchTerm)
      return matchesStatus && matchesSearch
    })

    return (
      <div class="space-y-6">
        {/* Filtros */}
        <Card>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Buscar"
              placeholder="Nome ou CPF"
              value={this.searchTerm}
              oninput={this.handleSearchInput}
            />
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={this.filterStatus}
                onchange={this.handleStatusChange}
                class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="todos">Todos</option>
                <option value="ativo">Ativo</option>
                <option value="cancelado">Cancelado</option>
                <option value="inadimplente">Inadimplente</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Tabela */}
        <Table
          columns={columns}
          data={filteredBeneficiarios}
        />
      </div>
    )
  }
}

const columns = [
  { key: 'nome', label: 'Nome', content: (row) => <div class="font-medium text-gray-900">{row.nome}</div> },
  { key: 'cpf', label: 'CPF', content: (row) => <div class="text-sm text-gray-600 font-mono">{row.cpf}</div> },
  { key: 'plano', label: 'Plano', content: (row) => <div class="text-sm text-gray-900">{row.plano}</div> },
  { key: 'validade', label: 'Validade', content: (row) => <div class="text-sm text-gray-600">{row.validade}</div> },
  {
    key: 'status',
    label: 'Status',
    content: (row) => (
      <span
        class={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${row.status === 'Ativo'
          ? 'bg-green-100 text-green-800'
          : row.status === 'Inadimplente'
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-800'
          }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: 'acoes',
    label: 'Ações',
    content: (row) => (
      <div class="flex items-center gap-2">
        <button
          class="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
          onclick={() => { }}
        >
          Ver
        </button>
        <span class="text-gray-300">|</span>
        <button
          class="text-xs text-gray-600 hover:text-gray-900 font-medium transition-colors"
          onclick={() => { }}
        >
          {row.status === 'Ativo' ? 'Suspender' : 'Ativar'}
        </button>
      </div>
    ),
  },
]
export default OperadoraBeneficiarios
