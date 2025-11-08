import { Button } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/table'

class OperadoraPlanos extends Nullstack {
  showCreateModal = false

  prepare({ page }: NullstackClientContext) {
    page.title = 'Planos - Operadora - CliniQ'
  }

  toggleCreateModal() {
    this.showCreateModal = !this.showCreateModal
  }

  render() {
    const planos = [
      {
        id: 1,
        nome: 'Plano Premium',
        mensalidade: 'R$ 299,90',
        status: 'Ativo',
        beneficiarios: 450,
      },
      {
        id: 2,
        nome: 'Plano Básico',
        mensalidade: 'R$ 149,90',
        status: 'Ativo',
        beneficiarios: 320,
      },
      {
        id: 3,
        nome: 'Plano Familiar',
        mensalidade: 'R$ 399,90',
        status: 'Ativo',
        beneficiarios: 180,
      },
      {
        id: 4,
        nome: 'Plano Executivo',
        mensalidade: 'R$ 199,90',
        status: 'Inativo',
        beneficiarios: 0,
      },
    ]

    return (
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <p class="text-gray-400">Gerencie os planos de saúde disponíveis</p>
          <Button onclick={this.toggleCreateModal}>+ Criar Plano</Button>
        </div>

        <Table
          columns={[
            { key: 'nome', label: 'Nome', content: (row) => <div class="font-medium text-gray-900">{row.nome}</div> },
            { key: 'mensalidade', label: 'Mensalidade', content: (row) => <div class="text-sm text-gray-900 font-semibold">{row.mensalidade}</div> },
            {
              key: 'status',
              label: 'Status',
              content: (row) => (
                <span
                  class={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${row.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {row.status}
                </span>
              ),
            },
            { key: 'beneficiarios', label: 'Beneficiários', content: (row) => <div class="text-sm text-gray-600">{row.beneficiarios}</div> },
            {
              key: 'acoes',
              label: 'Ações',
              align: "right",
              content: (row) => (
                <div class="flex items-center gap-2 justify-end">
                  <Button
                    color="info"
                    variant="ghost"
                    onclick={() => { }}
                  >
                    Editar
                  </Button>
                  <Button
                    color="danger"
                    variant="ghost"
                    onclick={() => { }}
                  >
                    {row.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                  </Button>
                </div>
              ),
            },
          ]}
          data={planos}
        />

        {/* Modal de Criar Plano */}
        {this.showCreateModal && (
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card class="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold">Criar Novo Plano</h3>
                <button
                  onclick={this.toggleCreateModal}
                  class="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form
                onsubmit={(e) => {
                  e.preventDefault()
                  this.toggleCreateModal()
                }}
              >
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">
                      Nome do Plano *
                    </label>
                    <input
                      type="text"
                      required
                      class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Ex: Plano Premium"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2">
                      Mensalidade (R$) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="299.90"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2">
                      Carência (dias) *
                    </label>
                    <input
                      type="number"
                      required
                      class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2">
                      Procedimentos Incluídos *
                    </label>
                    <textarea
                      required
                      rows={6}
                      class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Liste os procedimentos cobertos pelo plano..."
                    />
                  </div>

                  <div class="flex gap-3 justify-end">
                    <Button
                      type="button"
                      variant="secondary"
                      onclick={this.toggleCreateModal}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit">Criar Plano</Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    )
  }
}

export default OperadoraPlanos
