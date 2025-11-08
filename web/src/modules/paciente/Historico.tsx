import Nullstack, { NullstackClientContext } from 'nullstack'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/Table'

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
          <Card>
            <Table headers={['Clínica', 'Procedimento', 'Data', 'Status', 'Ações']}>
              {atendimentos.map((atendimento) => (
                <tr class="hover:bg-gray-700 transition-colors">
                  <td class="px-4 py-3 font-medium">{atendimento.clinica}</td>
                  <td class="px-4 py-3">{atendimento.procedimento}</td>
                  <td class="px-4 py-3">{atendimento.data}</td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded text-xs bg-green-900 text-green-300">
                      {atendimento.status}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <button class="text-blue-400 hover:text-blue-300 text-sm">Ver Detalhes</button>
                  </td>
                </tr>
              ))}
            </Table>
          </Card>
        </div>
      </MainLayout>
    )
  }
}

export default PacienteHistorico

