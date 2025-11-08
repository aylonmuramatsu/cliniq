import { Button } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/Table'

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

        <Card>
          <Table headers={['Nome', 'E-mail', 'Função', 'Status', 'Ações']}>
            {usuarios.map((usuario) => (
              <tr class="hover:bg-gray-700 transition-colors">
                <td class="px-4 py-3 font-medium">{usuario.nome}</td>
                <td class="px-4 py-3">{usuario.email}</td>
                <td class="px-4 py-3">{usuario.role}</td>
                <td class="px-4 py-3">
                  <span
                    class={`px-2 py-1 rounded text-xs ${usuario.status === 'Ativo'
                      ? 'bg-green-900 text-green-300'
                      : 'bg-gray-700 text-gray-300'
                      }`}
                  >
                    {usuario.status}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div class="flex gap-2">
                    <Button size="sm" variant="secondary" onclick={() => { }}>
                      Editar
                    </Button>
                    <Button size="sm" variant="secondary" onclick={() => { }}>
                      {usuario.status === 'Ativo' ? 'Desativar' : 'Ativar'}
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

export default OperadoraConfiguracoes
