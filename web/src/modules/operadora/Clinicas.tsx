import { Button } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/Table'

class OperadoraClinicas extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Clínicas Credenciadas - Operadora - CliniQ'
  }

  render() {
    const clinicas = [
      {
        id: 1,
        nome: 'Clínica Odonto Saúde',
        cnpj: '12.345.678/0001-90',
        cidade: 'São Paulo - SP',
        status: 'Ativo',
        atendimentos: 45,
      },
      {
        id: 2,
        nome: 'Dental Care Center',
        cnpj: '98.765.432/0001-10',
        cidade: 'Rio de Janeiro - RJ',
        status: 'Pendente',
        atendimentos: 0,
      },
      {
        id: 3,
        nome: 'Sorriso Perfeito',
        cnpj: '11.222.333/0001-44',
        cidade: 'Belo Horizonte - MG',
        status: 'Suspenso',
        atendimentos: 12,
      },
    ]

    return (
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <p class="text-gray-400">Gerencie as clínicas credenciadas</p>
          <Button onclick={() => { }}>+ Cadastrar Clínica</Button>
        </div>

        <Card>
          <Table
            headers={[
              'Nome',
              'CNPJ',
              'Cidade',
              'Status',
              'Atendimentos',
              'Ações',
            ]}
          >
            {clinicas.map((clinica) => (
              <tr class="hover:bg-gray-700 transition-colors">
                <td class="px-4 py-3 font-medium">{clinica.nome}</td>
                <td class="px-4 py-3">{clinica.cnpj}</td>
                <td class="px-4 py-3">{clinica.cidade}</td>
                <td class="px-4 py-3">
                  <span
                    class={`px-2 py-1 rounded text-xs ${clinica.status === 'Ativo'
                        ? 'bg-green-900 text-green-300'
                        : clinica.status === 'Pendente'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-red-900 text-red-300'
                      }`}
                  >
                    {clinica.status}
                  </span>
                </td>
                <td class="px-4 py-3">{clinica.atendimentos}</td>
                <td class="px-4 py-3">
                  <div class="flex gap-2">
                    <Button size="sm" variant="secondary" onclick={() => { }}>
                      Ver
                    </Button>
                    <Button size="sm" variant="secondary" onclick={() => { }}>
                      Histórico
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

export default OperadoraClinicas
