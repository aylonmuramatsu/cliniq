import Nullstack, { NullstackClientContext } from 'nullstack'
import MainLayout from '../../components/Layout/MainLayout'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'

class ClinicaPacientes extends Nullstack {
  searchTerm = ''

  prepare({ page }: NullstackClientContext) {
    page.title = 'Pacientes - Clínica - CliniQ'
  }

  render() {
    const pacientes = [
      {
        id: 1,
        nome: 'João Silva',
        cpf: '123.456.789-00',
        plano: 'Plano Premium',
        validade: '31/12/2024',
        status: 'Válido',
      },
      {
        id: 2,
        nome: 'Maria Santos',
        cpf: '987.654.321-00',
        plano: 'Plano Básico',
        validade: '15/11/2024',
        status: 'Vencido',
      },
    ]

    const filteredPacientes =
      this.searchTerm === ''
        ? pacientes
        : pacientes.filter(
            (p) =>
              p.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              p.cpf.includes(this.searchTerm)
          )

    return (
      <MainLayout
        module="clinica"
        title="Pacientes"
        user={{ name: 'Dr. João Silva', role: 'Clínica Odonto Saúde' }}
      >
        <div class="space-y-6">
          <Card>
            <Input
              label="Buscar Paciente"
              placeholder="CPF ou Nome"
              value={this.searchTerm}
              oninput={({ event }) => {
                this.searchTerm = (event.target as HTMLInputElement).value
              }}
            />
          </Card>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPacientes.map((paciente) => (
              <Card>
                <div class="space-y-3">
                  <div>
                    <p class="text-lg font-semibold mb-1">{paciente.nome}</p>
                    <p class="text-sm text-gray-400">CPF: {paciente.cpf}</p>
                  </div>
                  <div class="p-3 bg-gray-700 rounded-lg">
                    <p class="text-sm text-gray-400 mb-1">Plano</p>
                    <p class="font-medium">{paciente.plano}</p>
                  </div>
                  <div class="p-3 bg-gray-700 rounded-lg">
                    <p class="text-sm text-gray-400 mb-1">Validade</p>
                    <p class="font-medium">{paciente.validade}</p>
                  </div>
                  <div>
                    <span
                      class={`px-2 py-1 rounded text-xs ${
                        paciente.status === 'Válido'
                          ? 'bg-green-900 text-green-300'
                          : 'bg-red-900 text-red-300'
                      }`}
                    >
                      {paciente.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </MainLayout>
    )
  }
}

export default ClinicaPacientes

