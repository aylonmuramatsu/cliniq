import Nullstack, { NullstackClientContext } from 'nullstack'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/table'

class PacienteHistorico extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Histórico de Atendimentos - Paciente - CliniQ'
  }

  render() {
    const atendimentos = [
      {
        id: 1,
        clinica: 'Clínica Odonto Saúde',
        procedimento: 'Limpeza Completa',
        data: '15/12/2024',
        status: 'Concluído',
      },
      {
        id: 2,
        clinica: 'Dental Care Center',
        procedimento: 'Consulta de Rotina',
        data: '01/12/2024',
        status: 'Concluído',
      },
      {
        id: 3,
        clinica: 'Sorriso Perfeito',
        procedimento: 'Extração',
        data: '15/11/2024',
        status: 'Concluído',
      },
    ]

    return (
      <MainLayout
        module="paciente"
        title="Histórico de Atendimentos"
        user={{ name: 'João Silva', role: 'Beneficiário' }}
      >
        <div class="space-y-6">
          <Table
            columns={[
              { key: 'clinica', label: 'Clínica', content: (row) => <div class="font-medium text-gray-900">{row.clinica}</div> },
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
            data={atendimentos}
          />
        </div>
      </MainLayout>
    )
  }
}

export default PacienteHistorico

