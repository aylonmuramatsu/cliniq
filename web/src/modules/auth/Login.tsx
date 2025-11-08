import { Button } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'

class Login extends Nullstack {
  email = ''
  password = ''
  loading = false
  error = ''

  prepare({ page }: NullstackClientContext) {
    page.title = 'Login - CliniQ'
  }

  handleEmailInput({ event }: NullstackClientContext<{ event: Event }>) {
    this.email = (event.target as HTMLInputElement).value
    this.error = ''
  }

  handlePasswordInput({ event }: NullstackClientContext<{ event: Event }>) {
    this.password = (event.target as HTMLInputElement).value
    this.error = ''
  }

  async handleLogin({ router }: NullstackClientContext) {
    this.loading = true
    this.error = ''

    try {
      // TODO: Implementar chamada à API de autenticação
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: this.email, password: this.password }),
      // })
      // const data = await response.json()
      // if (!response.ok) throw new Error(data.message || 'Erro ao fazer login')

      // Simulação - remover quando integrar com API
      // A API deve retornar: { user: { id, name, email, type: 'operadora' | 'clinica' | 'paciente' }, token }
      const mockUserType = 'operadora' // Isso virá da API
      const redirectPaths = {
        operadora: '/operadora/dashboard',
        clinica: '/clinica/dashboard',
        paciente: '/paciente/dashboard',
      }

      // Salvar token e dados do usuário (localStorage/sessionStorage)
      // localStorage.setItem('token', data.token)
      // localStorage.setItem('user', JSON.stringify(data.user))

      // Redirecionar baseado no tipo de usuário
      router.url = redirectPaths[mockUserType]
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Erro ao fazer login'
    } finally {
      this.loading = false
    }
  }

  render() {
    return (
      <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6">
        <div class="w-full max-w-md">
          {/* Logo e Header */}
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-4">
              <span class="text-white font-bold text-2xl">CQ</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">CliniQ</h1>
            <p class="text-gray-600 text-sm">
              Sistema de Gestão de Planos Odontológicos
            </p>
          </div>

          {/* Card de Login */}
          <Card class="shadow-xl">
            {this.error && (
              <div class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <div class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p class="text-sm text-red-700">{this.error}</p>
                </div>
              </div>
            )}

            <form onsubmit={this.handleLogin} class="space-y-5">
              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                value={this.email}
                required
                oninput={this.handleEmailInput}
              />
              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={this.password}
                required
                oninput={this.handlePasswordInput}
              />

              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span class="ml-2 text-sm text-gray-600">Lembrar-me</span>
                </label>
                <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>

              <Button type="submit" class="w-full" disabled={this.loading}>
                {this.loading ? (
                  <span class="flex items-center justify-center gap-2">
                    <svg
                      class="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            <div class="mt-6 pt-6 border-t border-gray-200">
              <p class="text-center text-sm text-gray-600">
                Não tem uma conta?{' '}
                <a href="#" class="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Entre em contato
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default Login
