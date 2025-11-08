import Nullstack, { NullstackClientContext } from 'nullstack'
import { Button } from '@insightcreativewebs/ui'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'

class PacientePlano extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Meu Plano - Paciente - CliniQ'
  }

  render() {
    return (
      <MainLayout
        module="paciente"
        title="Meu Plano"
        user={{ name: 'João Silva', role: 'Beneficiário' }}
      >
        <div class="space-y-6">
          <Card>
            <div class="space-y-4">
              <div>
                <p class="text-gray-400 text-sm mb-1">Nome do Plano</p>
                <p class="text-2xl font-bold">Plano Premium</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-gray-700 rounded-lg">
                  <p class="text-gray-400 text-sm mb-1">Valor Mensal</p>
                  <p class="text-xl font-semibold">R$ 299,90</p>
                </div>
                <div class="p-4 bg-gray-700 rounded-lg">
                  <p class="text-gray-400 text-sm mb-1">Data de Validade</p>
                  <p class="text-xl font-semibold">31/12/2024</p>
                </div>
              </div>

              <div class="p-4 bg-gray-700 rounded-lg">
                <p class="text-gray-400 text-sm mb-2">Cobertura</p>
                <ul class="list-disc list-inside space-y-1 text-gray-300">
                  <li>Limpeza Completa</li>
                  <li>Tratamento de Canal</li>
                  <li>Extrações</li>
                  <li>Radiografias</li>
                  <li>Consultas de Emergência</li>
                </ul>
              </div>

              <div class="flex gap-3">
                <Button onclick={() => {}}>Segunda Via do Boleto</Button>
                <Button variant="secondary" onclick={() => {}}>
                  Ver Pagamentos
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </MainLayout>
    )
  }
}

export default PacientePlano

