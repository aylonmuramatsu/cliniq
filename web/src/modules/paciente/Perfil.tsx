import Nullstack, { NullstackClientContext } from 'nullstack'
import { Button } from '@insightcreativewebs/ui'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'

class PacientePerfil extends Nullstack {
  showCancelModal = false

  prepare({ page }: NullstackClientContext) {
    page.title = 'Perfil - Paciente - CliniQ'
  }

  toggleCancelModal() {
    this.showCancelModal = !this.showCancelModal
  }

  render() {
    return (
      <MainLayout
        module="paciente"
        title="Perfil"
        user={{ name: 'João Silva', role: 'Beneficiário' }}
      >
        <div class="space-y-6">
          <Card title="Dados Pessoais">
            <div class="space-y-4">
              <Input label="Nome Completo" value="João Silva" />
              <Input label="CPF" value="123.456.789-00" />
              <Input label="Data de Nascimento" type="date" value="1985-05-15" />
              <Input label="Telefone" value="(11) 98765-4321" />
              <Input label="E-mail" value="joao.silva@email.com" />
              <Button onclick={() => {}}>Salvar Alterações</Button>
            </div>
          </Card>

          <Card title="Alterar Senha">
            <div class="space-y-4">
              <Input label="Senha Atual" type="password" />
              <Input label="Nova Senha" type="password" />
              <Input label="Confirmar Nova Senha" type="password" />
              <Button onclick={() => {}}>Alterar Senha</Button>
            </div>
          </Card>

          <Card title="Cancelamento de Plano">
            <div class="space-y-4">
              <p class="text-gray-400">
                Se deseja cancelar seu plano, clique no botão abaixo. O cancelamento será processado
                ao final do ciclo atual.
              </p>
              <Button variant="secondary" onclick={this.toggleCancelModal}>
                Solicitar Cancelamento
              </Button>
            </div>
          </Card>

          {/* Modal de Cancelamento */}
          {this.showCancelModal && (
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Card class="w-full max-w-md">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="text-xl font-bold">Confirmar Cancelamento</h3>
                  <button
                    onclick={this.toggleCancelModal}
                    class="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div class="space-y-4">
                  <p class="text-gray-300">
                    Tem certeza que deseja cancelar seu plano? O cancelamento será efetivado ao final
                    do ciclo atual (31/12/2024).
                  </p>
                  <div class="flex gap-3">
                    <Button variant="secondary" onclick={this.toggleCancelModal} class="flex-1">
                      Cancelar
                    </Button>
                    <Button onclick={() => {}} class="flex-1">
                      Confirmar
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </MainLayout>
    )
  }
}

export default PacientePerfil

