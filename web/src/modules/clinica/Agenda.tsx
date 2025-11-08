import { Button } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'

class ClinicaAgenda extends Nullstack {
  selectedDate = new Date().toISOString().split('T')[0]

  prepare({ page }: NullstackClientContext) {
    page.title = 'Agenda - Clínica - CliniQ'
  }

  render() {
    const consultas = [
      {
        id: 1,
        paciente: 'João Silva',
        procedimento: 'Limpeza Completa',
        horario: '09:00',
        status: 'Aguardando',
      },
      {
        id: 2,
        paciente: 'Maria Santos',
        procedimento: 'Canal',
        horario: '14:00',
        status: 'Confirmado',
      },
      {
        id: 3,
        paciente: 'Pedro Costa',
        procedimento: 'Extração',
        horario: '16:00',
        status: 'Cancelado',
      },
    ]

    return (
      <MainLayout
        module="clinica"
        title="Agenda"
        user={{ name: 'Dr. João Silva', role: 'Clínica Odonto Saúde' }}
      >
        <div class="space-y-6">
          <Card>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">Data</label>
              <input
                type="date"
                value={this.selectedDate}
                onchange={({ event }) => {
                  this.selectedDate = (event.target as HTMLInputElement).value
                }}
                class="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>
          </Card>

          <Card
            title={`Consultas do dia ${new Date(this.selectedDate).toLocaleDateString('pt-BR')}`}
          >
            <div class="space-y-3">
              {consultas.map((consulta) => (
                <div class="p-4 bg-gray-700 rounded-lg">
                  <div class="flex justify-between items-start mb-3">
                    <div>
                      <p class="font-semibold text-lg mb-1">
                        {consulta.paciente}
                      </p>
                      <p class="text-sm text-gray-400">
                        {consulta.procedimento}
                      </p>
                      <p class="text-sm text-gray-300 mt-1">
                        🕐 {consulta.horario}
                      </p>
                    </div>
                    <span
                      class={`px-2 py-1 rounded text-xs ${consulta.status === 'Confirmado'
                          ? 'bg-green-900 text-green-300'
                          : consulta.status === 'Cancelado'
                            ? 'bg-red-900 text-red-300'
                            : 'bg-yellow-900 text-yellow-300'
                        }`}
                    >
                      {consulta.status}
                    </span>
                  </div>
                  <div class="flex gap-2">
                    {consulta.status === 'Aguardando' && (
                      <>
                        <Button size="sm" onclick={() => { }}>
                          Confirmar Presença
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onclick={() => { }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onclick={() => { }}
                        >
                          Remarcar
                        </Button>
                      </>
                    )}
                    {consulta.status === 'Confirmado' && (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          onclick={() => { }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onclick={() => { }}
                        >
                          Remarcar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </MainLayout>
    )
  }
}

export default ClinicaAgenda
