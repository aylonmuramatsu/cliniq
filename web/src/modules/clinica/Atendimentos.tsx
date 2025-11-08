import Nullstack, { NullstackClientContext } from 'nullstack'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'
import Table from '../../components/UI/Table'

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
          <Card>
            <Table headers={['Paciente', 'Procedimento', 'Data', 'Status', 'Valor Repassado', 'Ações']}>
              {atendimentos.map((atendimento) => (
                <tr class="hover:bg-gray-700 transition-colors">
                  <td class="px-4 py-3 font-medium">{atendimento.paciente}</td>
                  <td class="px-4 py-3">{atendimento.procedimento}</td>
                  <td class="px-4 py-3">{atendimento.data}</td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded text-xs bg-green-900 text-green-300">
                      {atendimento.status}
                    </span>
                  </td>
                  <td class="px-4 py-3 font-semibold">{atendimento.valorRepassado}</td>
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

export default ClinicaAtendimentos

