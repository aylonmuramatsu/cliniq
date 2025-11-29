import { required, schema } from '@insightcreativewebs/api';
import { makeFieldsOptional } from '@insightcreativewebs/api/dist/util/validation-helper';


const base_fields = { 
  name: [required('informe o nome')],
  cnpj: [required('informe o cnpj')],
  address: [ required('informe o endereço')],
  city: [required('informe a cidade')],
  status: [required('informe o status')],
}
export const Rules = {
  list_all: schema({
  }),

  create: schema(base_fields),
  update: schema({
    clinic_id: [required('informe a clinica')], 
    ...makeFieldsOptional(base_fields)
  }),
  populate: schema({
    clinic_id: [required('informe a clinica')]
  }),
  delete: schema({
    clinic_id: [required('informe a clinica')]
  })
};
