import { Model } from '@/util/model'
import { minLength, required } from '@/util/rules-common'
import { schema } from '@/util/validation'

export class Clinic_Model extends Model {
  name = null
  cnpj = null
  address = null
  city = null
  status= true

  constructor(args = null) {
    super()

    if (!args) return this

    Object.keys(args).forEach((k) => {
      if (k in args) {
        this[k] = args[k]
      }
    })
    return this
  }

  rules = schema({
    name: [required('informe o nome'), minLength(3)],
    cnpj: [required('informe o cnpj')],
    address: [required('informe o endereço')],
    city: [required('informe a cidade')],
    status: [required('informe o status')]
  })
}
