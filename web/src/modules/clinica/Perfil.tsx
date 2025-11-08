import Nullstack, { NullstackClientContext } from 'nullstack'
import { Button } from '@insightcreativewebs/ui'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'

class ClinicaPerfil extends Nullstack {
  prepare({ page }: NullstackClientContext) {
    page.title = 'Perfil da Clínica - Clínica - CliniQ'
  }

  render() {
    return (
      <MainLayout
        module="clinica"
        title="Perfil da Clínica"
        user={{ name: 'Dr. João Silva', role: 'Clínica Odonto Saúde' }}
      >
        <div class="space-y-6">
          <Card title="Dados Cadastrais">
            <div class="space-y-4">
              <Input label="Nome da Clínica" value="Clínica Odonto Saúde" />
              <Input label="CNPJ" value="12.345.678/0001-90" />
              <Input label="Telefone" value="(11) 3456-7890" />
              <Input label="E-mail" value="contato@odontosaude.com" />
              <div>
                <label class="block text-sm font-medium mb-2">Endereço</label>
                <textarea
                  rows={3}
                  class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  value="Rua das Flores, 123 - Centro - São Paulo - SP - CEP: 01234-567"
                />
              </div>
              <Button onclick={() => {}}>Salvar Alterações</Button>
            </div>
          </Card>

          <Card title="Dados Bancários para Repasse">
            <div class="space-y-4">
              <Input label="Banco" value="Banco do Brasil" />
              <Input label="Agência" value="1234-5" />
              <Input label="Conta" value="12345-6" />
              <Input label="Tipo de Conta" value="Corrente" />
              <Input label="CPF/CNPJ Titular" value="12.345.678/0001-90" />
              <Input label="Nome do Titular" value="Clínica Odonto Saúde LTDA" />
              <Button onclick={() => {}}>Salvar Alterações</Button>
            </div>
          </Card>
        </div>
      </MainLayout>
    )
  }
}

export default ClinicaPerfil

