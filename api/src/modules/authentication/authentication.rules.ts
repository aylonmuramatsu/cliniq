import { required, schema } from '@insightcreativewebs/api'

export const Rules = {
  sign_up: schema({
    name: [required('informe o nome')],
    email: [required('informe o e-mail')],
    password: [required('informe a senha')],
  }),

  sign_in: schema({
    email: [required('informe o e-mail')],
    password: [required('informe a senha')],
  }),
}
