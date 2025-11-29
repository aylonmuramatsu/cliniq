import { optional, required, schema } from '@insightcreativewebs/api'
import { makeFieldsOptional } from '@insightcreativewebs/api/dist/util/validation-helper'
const base_fields = {
  name: [required('informe o nome do plano')],
  price: [required('informe o preço')],
  waiting_period: [required('informe o periodo de carência')],
  included_procedures: [optional()],
}
export const Rules = {
  list_all: schema({
    user_id: [required('informe o usuario')],
  }),

  create: schema(base_fields),

  update: schema({
    plan_id: [required('informe o plano')],
    ...makeFieldsOptional(base_fields),
  }),
  populate: schema({
    plan_id: [required('informe a plano')],
  }),
  delete: schema({
    plan_id: [required('informe a plano')],
  }),
  change_status: schema({
    plan_id: [required('inform o plano')],
  }),
}
