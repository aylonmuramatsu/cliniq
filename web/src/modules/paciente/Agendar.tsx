import Nullstack, { NullstackClientContext } from 'nullstack'
import { Button } from '@insightcreativewebs/ui'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'

class PacienteAgendar extends Nullstack {
  selectedClinica = null
  selectedDate = ''
  selectedTime = ''

  prepare({ page }: NullstackClientContext) {
    page.title = 'Agendar Consulta - Paciente - CliniQ'
  }

  async handleAgendar() {
    if (this.selectedClinica && this.selectedDate && this.selectedTime) {
      alert('Consulta agendada com sucesso!')
    }
  }

  render() {
    const clinicas = [
      {
        id: 1,
        nome: 'Clínica Odonto Saúde',
        cidade: 'São Paulo - SP',
        distancia: '2.5 km',
        horarios: ['09:00', '10:00', '14:00', '15:00'],
      },
      {
        id: 2,
        nome: 'Dental Care Center',
        cidade: 'São Paulo - SP',
        distancia: '5.0 km',
        horarios: ['08:00', '11:00', '13:00', '16:00'],
      },
      {
        id: 3,
        nome: 'Sorriso Perfeito',
        cidade: 'São Paulo - SP',
        distancia: '8.0 km',
        horarios: ['09:30', '10:30', '14:30', '15:30'],
      },
    ]

    return (
      <MainLayout
        module="paciente"
        title="Agendar Consulta"
        user={{ name: 'João Silva', role: 'Beneficiário' }}
      >
        <div class="space-y-6">
          {/* Seleção de Clínica */}
          <Card title="Selecione a Clínica">
            <div class="space-y-3">
              {clinicas.map((clinica) => (
                <div
                  onclick={() => {
                    this.selectedClinica = clinica
                  }}
                  class={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    this.selectedClinica?.id === clinica.id
                      ? 'border-blue-500 bg-blue-900 bg-opacity-20'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-semibold text-lg mb-1">{clinica.nome}</p>
                      <p class="text-sm text-gray-400">{clinica.cidade}</p>
                      <p class="text-sm text-gray-500 mt-1">📍 {clinica.distancia}</p>
                    </div>
                    {this.selectedClinica?.id === clinica.id && (
                      <span class="text-blue-400">✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Seleção de Data e Horário */}
          {this.selectedClinica && (
            <>
              <Card title="Selecione a Data">
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={this.selectedDate}
                  onchange={({ event }) => {
                    this.selectedDate = (event.target as HTMLInputElement).value
                  }}
                  class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </Card>

              {this.selectedDate && (
                <Card title="Selecione o Horário">
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {this.selectedClinica.horarios.map((horario) => (
                      <button
                        onclick={() => {
                          this.selectedTime = horario
                        }}
                        class={`p-3 rounded-lg border-2 transition-colors ${
                          this.selectedTime === horario
                            ? 'border-blue-500 bg-blue-900 bg-opacity-20 text-blue-300'
                            : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                        }`}
                      >
                        {horario}
                      </button>
                    ))}
                  </div>
                </Card>
              )}

              {/* Botão de Agendar */}
              {this.selectedDate && this.selectedTime && (
                <Card>
                  <div class="text-center space-y-4">
                    <div>
                      <p class="text-gray-400 mb-2">Resumo do Agendamento</p>
                      <p class="font-semibold">{this.selectedClinica.nome}</p>
                      <p class="text-sm text-gray-400">
                        {new Date(this.selectedDate).toLocaleDateString('pt-BR')} às {this.selectedTime}
                      </p>
                    </div>
                    <Button onclick={this.handleAgendar} class="w-full md:w-auto">
                      Confirmar Agendamento
                    </Button>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </MainLayout>
    )
  }
}

export default PacienteAgendar

