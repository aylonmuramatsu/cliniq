import { optional, required, schema } from '@insightcreativewebs/api'
import { makeFieldsOptional } from '@insightcreativewebs/api/dist/util/validation-helper'

const base_fields = {
  clinic_id: [required('informe a clinic')],
  name: [required('informe o nome')],
  email: [required('informe o e-mail')],
  password: [required('informe a senha')],
  status: [optional()],
  // ✨ Adicionar mais campos conforme necessário
}
export const Rules = {
  list_all: schema({}),

  create: schema(base_fields),
  update: schema({
    user_id: [required('informe o usuario')],
    ...makeFieldsOptional(base_fields),
  }),
  populate: schema({
    user_id: [required('informe o usuario')],
  }),
  delete: schema({
    user_id: [required('informe o usuario')],
  }),
}
