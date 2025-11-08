import Nullstack, { type NullstackClientContext } from 'nullstack'
import MainLayout from '../../components/Layout/MainLayout'
import Table from '../../components/UI/table'

class ClinicaAtendimentos extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Atendimentos Realizados - Clínica - CliniQ'
  }

  render() {
    const atendimentos = [
      {
        id: 1,
        paciente: 'João Silva',
        procedimento: 'Limpeza Completa',
        data: '15/12/2024',
        status: 'Concluído',
        valorRepassado: 'R$ 150,00',
      },
      {
        id: 2,
        paciente: 'Maria Santos',
        procedimento: 'Canal',
        data: '14/12/2024',
        status: 'Concluído',
        valorRepassado: 'R$ 800,00',
      },
      {
        id: 3,
        paciente: 'Pedro Costa',
        procedimento: 'Extração',
        data: '13/12/2024',
        status: 'Concluído',
        valorRepassado: 'R$ 200,00',
      },
    ]

    return (
      <MainLayout
        module="clinica"
        title="Atendimentos Realizados"
        user={{ name: 'Dr. João Silva', role: 'Clínica Odonto Saúde' }}
      >
        <div class="space-y-6">
          <Table
            columns={[
              {
                key: 'paciente',
                label: 'Paciente',
                content: (row) => (
                  <div class="font-medium text-gray-900">{row.paciente}</div>
                ),
              },
              {
                key: 'procedimento',
                label: 'Procedimento',
                content: (row) => (
                  <div class="text-sm text-gray-900">{row.procedimento}</div>
                ),
              },
              {
                key: 'data',
                label: 'Data',
                content: (row) => (
                  <div class="text-sm text-gray-600">{row.data}</div>
                ),
              },
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
                key: 'valorRepassado',
                label: 'Valor Repassado',
                content: (row) => (
                  <div class="text-sm text-gray-900 font-semibold">
                    {row.valorRepassado}
                  </div>
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

export default ClinicaAtendimentos
