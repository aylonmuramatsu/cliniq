import { makeFieldsOptional } from '@/util/helper'
import { Model } from '@/util/model'
import { min, minLength, optional, required } from '@/util/rules-common'
import { schema } from '@/util/validation'

export class Plan_Model extends Model {
  name = null
  price = 0
  waiting_period = 0
  included_procedures = ''
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
      price: [required('informe o preço'), min(1)],
      waiting_period: [required('informe periodo de carencia'), min(1)],
      included_procedures: [optional()],
    }

    const rules = this._is_editing ? makeFieldsOptional(base_rules) : base_rules

    return schema(rules)
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
