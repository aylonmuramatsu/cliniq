import { Button } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/table'

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

        <Table
          columns={[
            { key: 'nome', label: 'Nome', content: (row) => <div class="font-medium text-gray-900">{row.nome}</div> },
            { key: 'cnpj', label: 'CNPJ', content: (row) => <div class="text-sm text-gray-600 font-mono">{row.cnpj}</div> },
            { key: 'cidade', label: 'Cidade', content: (row) => <div class="text-sm text-gray-600">{row.cidade}</div> },
            {
              key: 'status',
              label: 'Status',
              content: (row) => (
                <span
                  class={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    row.status === 'Ativo'
                      ? 'bg-green-100 text-green-800'
                      : row.status === 'Pendente'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {row.status}
                </span>
              ),
            },
            { key: 'atendimentos', label: 'Atendimentos', content: (row) => <div class="text-sm text-gray-900">{row.atendimentos}</div> },
            {
              key: 'acoes',
              label: 'Ações',
              content: (row) => (
                <div class="flex items-center gap-2">
                  <button
                    class="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    onclick={() => {}}
                  >
                    Ver
                  </button>
                  <span class="text-gray-300">|</span>
                  <button
                    class="text-xs text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    onclick={() => {}}
                  >
                    Histórico
                  </button>
                </div>
              ),
            },
          ]}
          data={clinicas}
        />
      </div>
    )
  }
}

export default OperadoraClinicas
