import { Button } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/table'

class OperadoraConfiguracoes extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Configurações - Operadora - CliniQ'
  }

  render() {
    const usuarios = [
      {
        id: 1,
        nome: 'Admin Principal',
        email: 'admin@cliniq.com',
        role: 'Administrador',
        status: 'Ativo',
      },
      {
        id: 2,
        nome: 'João Silva',
        email: 'joao@cliniq.com',
        role: 'Operador',
        status: 'Ativo',
      },
      {
        id: 3,
        nome: 'Maria Santos',
        email: 'maria@cliniq.com',
        role: 'Operador',
        status: 'Inativo',
      },
    ]

    return (
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <p class="text-gray-400">
            Gerencie usuários administrativos da operadora
          </p>
          <Button onclick={() => { }}>+ Adicionar Usuário</Button>
        </div>

        <Table
          columns={[
            { key: 'nome', label: 'Nome', content: (row) => <div class="font-medium text-gray-900">{row.nome}</div> },
            { key: 'email', label: 'E-mail', content: (row) => <div class="text-sm text-gray-600">{row.email}</div> },
            { key: 'role', label: 'Função', content: (row) => <div class="text-sm text-gray-900">{row.role}</div> },
            {
              key: 'status',
              label: 'Status',
              content: (row) => (
                <span
                  class={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    row.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
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
                    onclick={() => {}}
                  >
                    Editar
                  </button>
                  <span class="text-gray-300">|</span>
                  <button
                    class="text-xs text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    onclick={() => {}}
                  >
                    {row.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                  </button>
                </div>
              ),
            },
          ]}
          data={usuarios}
        />
      </div>
    )
  }
}

export default OperadoraConfiguracoes
