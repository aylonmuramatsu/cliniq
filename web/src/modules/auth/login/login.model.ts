import { Model } from '@/util/model'
import { email, required } from '@/util/rules-common'
import { schema } from '@/util/validation'

export class Login_Model extends Model {
  email = null
  password = null

  constructor(args = null) {
    super()

    if (!args) {
      this._updateRules()
      return this
    }

    Object.keys(args).forEach((k) => {
      if (k in args) {
        this[k] = args[k]
      }
    })
    this._updateRules()
    return this
  }

  // Método privado para construir as rules dinamicamente
  _buildRules() {
    const base_rules = {
      email: [required('informe o e-mail'), email('deve ser um e-mail válido')],
      password: [required('informe a senha')],
    }
    return schema(base_rules)
  }

  // Método para atualizar as rules quando o modo de edição mudar
  _updateRules() {
    this.rules = this._buildRules()
  }
}
