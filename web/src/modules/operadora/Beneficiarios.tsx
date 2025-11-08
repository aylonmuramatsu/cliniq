import { Button } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'
import Table from '../../components/UI/Table'

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
              <label class="block text-sm font-medium mb-2">Status</label>
              <select
                value={this.filterStatus}
                onchange={this.handleStatusChange}
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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
        <Card>
          <Table
            headers={['Nome', 'CPF', 'Plano', 'Validade', 'Status', 'Ações']}
          >
            {filteredBeneficiarios.map((beneficiario) => (
              <tr class="hover:bg-gray-700 transition-colors">
                <td class="px-4 py-3 font-medium">{beneficiario.nome}</td>
                <td class="px-4 py-3">{beneficiario.cpf}</td>
                <td class="px-4 py-3">{beneficiario.plano}</td>
                <td class="px-4 py-3">{beneficiario.validade}</td>
                <td class="px-4 py-3">
                  <span
                    class={`px-2 py-1 rounded text-xs ${beneficiario.status === 'Ativo'
                      ? 'bg-green-900 text-green-300'
                      : beneficiario.status === 'Inadimplente'
                        ? 'bg-red-900 text-red-300'
                        : 'bg-gray-700 text-gray-300'
                      }`}
                  >
                    {beneficiario.status}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div class="flex gap-2">
                    <Button size="sm" variant="secondary" onclick={() => { }}>
                      Ver
                    </Button>
                    <Button size="sm" variant="secondary" onclick={() => { }}>
                      {beneficiario.status === 'Ativo'
                        ? 'Suspender'
                        : 'Ativar'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>

    )
  }
}

export default OperadoraBeneficiarios
