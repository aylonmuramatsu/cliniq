import Nullstack, { NullstackClientContext } from 'nullstack'
import { Button } from '@insightcreativewebs/ui'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'

class PacienteCarteirinha extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Carteirinha Digital - Paciente - CliniQ'
  }

  render() {
    return (
      <MainLayout
        module="paciente"
        title="Carteirinha Digital"
        user={{ name: 'João Silva', role: 'Beneficiário' }}
      >
        <div class="space-y-6">
          <Card>
            <div class="flex flex-col items-center">
              <div class="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-8 w-full max-w-md text-white">
                <div class="text-center mb-6">
                  <h2 class="text-2xl font-bold mb-2">CliniQ</h2>
                  <p class="text-blue-100">Carteirinha Digital</p>
                </div>

                <div class="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <p class="text-sm text-blue-100 mb-1">Beneficiário</p>
                      <p class="text-lg font-bold">João Silva</p>
                    </div>
                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                      JS
                    </div>
                  </div>

                  <div class="space-y-2 mb-4">
                    <div>
                      <p class="text-sm text-blue-100">Número do Plano</p>
                      <p class="font-mono font-bold">123456789</p>
                    </div>
                    <div>
                      <p class="text-sm text-blue-100">Plano</p>
                      <p class="font-semibold">Plano Premium</p>
                    </div>
                    <div>
                      <p class="text-sm text-blue-100">Validade</p>
                      <p class="font-semibold">31/12/2024</p>
                    </div>
                  </div>

                  <div class="bg-white rounded-lg p-4 flex justify-center">
                    <div class="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                      <span class="text-gray-500 text-xs">QR Code</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex gap-3">
                <Button onclick={() => {}}>📥 Baixar PDF</Button>
                <Button variant="secondary" onclick={() => {}}>
                  📤 Compartilhar
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Informações Adicionais">
            <div class="space-y-3">
              <div class="p-3 bg-gray-700 rounded-lg">
                <p class="text-gray-400 text-sm mb-1">CPF</p>
                <p class="text-white font-medium">123.456.789-00</p>
              </div>
              <div class="p-3 bg-gray-700 rounded-lg">
                <p class="text-gray-400 text-sm mb-1">Data de Nascimento</p>
                <p class="text-white font-medium">15/05/1985</p>
              </div>
              <div class="p-3 bg-gray-700 rounded-lg">
                <p class="text-gray-400 text-sm mb-1">Telefone</p>
                <p class="text-white font-medium">(11) 98765-4321</p>
              </div>
            </div>
          </Card>
        </div>
      </MainLayout>
    )
  }
}

export default PacienteCarteirinha

