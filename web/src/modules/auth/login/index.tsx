import { Button, Card, Form, Input, toaster } from '@insightcreativewebs/ui'
import Nullstack, { type NullstackClientContext } from 'nullstack'

import { ErrorField } from '@/components/error-field'
import { NavigationPath } from '@/util/enums'
import { generate_error, requestApi } from '@/util/request-api'
import session from '@/util/session'
import { Login_Model } from './login.model'

class Login extends Nullstack {
  login_model = new Login_Model()
  loading = false

  prepare({ page }: NullstackClientContext) {
    page.title = 'Login - CliniQ'
  }
  async onsubmit(context) {
    const validation = this.login_model.validate()
    if (!validation) {
      return
    }

    const { data, error } = await requestApi(
      '/authentication/sign-in',
      'post',
      this.login_model.toJSON(),
    )
    if (error) {
      toaster('error', context.project.name, generate_error(error))
      return
    }
    toaster('success', context.project.name, 'Conectado com sucesso.')

    session.create_session(data)
    context.router.url = NavigationPath.Admin.Clinic
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
            <Form onsubmit={this.onsubmit} class="space-y-5">
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  name="email"
                  id="email"
                  bind={this.login_model.email}
                  oninput={this.login_model.validateField}
                />
                <ErrorField field="email" model={this.login_model} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  id="password"
                  bind={this.login_model.password}
                  oninput={this.login_model.validateField}
                />
                <ErrorField field="password" model={this.login_model} />
              </Form.Group>
              <Form.Group class="space-y-2">
                <div class="flex items-center justify-between">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-gray-600">Lembrar-me</span>
                  </label>
                  <a
                    href="#"
                    class="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
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
              </Form.Group>
            </Form>

            <div class="mt-6 pt-6 border-t border-gray-200">
              <p class="text-center text-sm text-gray-600">
                Não tem uma conta?{' '}
                <a
                  href="#"
                  class="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
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
