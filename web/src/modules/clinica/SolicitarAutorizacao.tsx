import Nullstack, { NullstackClientContext } from 'nullstack'
import { Button } from '@insightcreativewebs/ui'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'

class ClinicaSolicitarAutorizacao extends Nullstack {
  paciente = ''
  procedimento = ''
  data = ''
  observacoes = ''

  prepare({ page }: NullstackClientContext) {
    page.title = 'Solicitar Autorização - Clínica - CliniQ'
  }

  async handleSubmit() {
    // TODO: Implementar envio de autorização
    alert('Autorização enviada com sucesso!')
  }

  render() {
    return (
      <MainLayout
        module="clinica"
        title="Solicitar Autorização"
        user={{ name: 'Dr. João Silva', role: 'Clínica Odonto Saúde' }}
      >
        <div class="space-y-6">
          <Card>
            <form onsubmit={this.handleSubmit}>
              <div class="space-y-4">
                <Input
                  label="Paciente"
                  placeholder="Nome ou CPF do paciente"
                  value={this.paciente}
                  required
                  oninput={({ event }) => {
                    this.paciente = (event.target as HTMLInputElement).value
                  }}
                />

                <Input
                  label="Procedimento"
                  placeholder="Ex: Limpeza Completa, Canal, etc."
                  value={this.procedimento}
                  required
                  oninput={({ event }) => {
                    this.procedimento = (event.target as HTMLInputElement).value
                  }}
                />

                <Input
                  label="Data do Procedimento"
                  type="date"
                  value={this.data}
                  required
                  oninput={({ event }) => {
                    this.data = (event.target as HTMLInputElement).value
                  }}
                />

                <div>
                  <label class="block text-sm font-medium mb-2">Observações</label>
                  <textarea
                    rows={4}
                    value={this.observacoes}
                    oninput={({ event }) => {
                      this.observacoes = (event.target as HTMLTextAreaElement).value
                    }}
                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                    placeholder="Informações adicionais sobre o procedimento..."
                  />
                </div>

                <div class="flex gap-3">
                  <Button type="submit">Enviar Autorização</Button>
                  <Button type="button" variant="secondary" onclick={() => {}}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          <Card title="Histórico de Solicitações">
            <div class="space-y-3">
              <div class="p-4 bg-gray-700 rounded-lg">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-semibold mb-1">João Silva - Limpeza Completa</p>
                    <p class="text-sm text-gray-400">Enviado em 15/12/2024</p>
                  </div>
                  <span class="px-2 py-1 bg-yellow-900 text-yellow-300 rounded text-xs">Aguardando</span>
                </div>
              </div>
              <div class="p-4 bg-gray-700 rounded-lg">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-semibold mb-1">Maria Santos - Canal</p>
                    <p class="text-sm text-gray-400">Enviado em 14/12/2024</p>
                  </div>
                  <span class="px-2 py-1 bg-green-900 text-green-300 rounded text-xs">Aprovada</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </MainLayout>
    )
  }
}

export default ClinicaSolicitarAutorizacao

