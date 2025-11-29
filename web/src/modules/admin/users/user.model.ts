import { Model } from '@/util/model'
import { email, minLength, optionalBut, required } from '@/util/rules-common'
import { schema } from '@/util/validation'

export class User_Model extends Model {
  name = null
  email = null
  password = null
  status = true
  _is_editing = false

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
      name: [required('informe o nome'), minLength(3)],
      email: [required('informe o e-mail'), email('deve ser um e-mail válido')],
      status: [required('informe o status')],
    }

    // Se estiver editando, password é opcional (mas se informado, valida)
    // Se não estiver editando, password é obrigatório
    const passwordRule = this._is_editing
      ? [optionalBut(required('informe a senha'))] // Opcional, mas se informado deve ser válido
      : [required('informe a senha')]

    return schema({
      ...base_rules,
      password: passwordRule,
    })
  }

  // Método para atualizar as rules quando o modo de edição mudar
  _updateRules() {
    this.rules = this._buildRules()
  }

  // Setter para _is_editing que atualiza as rules automaticamente
  set is_editing(value: boolean) {
    if (this._is_editing !== value) {
      this._is_editing = value
      this._updateRules()
    }
  }

  get is_editing() {
    return this._is_editing
  }
}
