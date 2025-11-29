import Nullstack from 'nullstack'

import {
  type Schema,
  Validation,
  validate as validateInput,
} from './validation'

export const systemProperties = [
  'prerendered',
  'toJSON',
  'initiated',
  'hydrated',
  'terminated',
  'key',
  'errors',
  'isValid',
  'reset',
  'validation',
  'validate',
  '_scope',
  'rules',
]

export class Model extends Nullstack {
  _scope: any = {}
  validation = new Validation()
  rules: Schema<any> | Record<string, any> | null = null

  constructor() {
    super({})
    // // @ts-expect-error
    this._scope.generateContext = () => {}
  }

  reset() {
    // Pega todas as propriedades da instância
    const instanceProperties = Object.getOwnPropertyNames(this)

    instanceProperties
      .filter(
        (prop) =>
          typeof this[prop] === 'string' && !systemProperties.includes(prop),
      )
      .forEach((field) => {
        this[field] = ''
      })
  }

  /**
   * Gera um objeto JSON apenas com as propriedades de instância,
   * removendo propriedades "sistema". Tipado automaticamente
   * para retornar um objeto parcial do tipo da instância.
   */
  toJSON<T extends this>() {
    const instanceProperties = Object.getOwnPropertyNames(this) as (keyof T)[]
    const fields = instanceProperties
      .filter((prop) => !systemProperties.includes(prop as string))
      .reduce((obj, prop: any) => {
        obj[prop] = this[prop]
        return obj
      }, {} as any)

    return fields
  }

  validate() {
    if (!this.rules) return this.validation
    const values = this.toJSON()
    try {
      this.rules.check(values)
      this.validation = new Validation()
      return true
    } catch (err) {
      this.validation = err
      return false
    }
  }

  validateField({ name }: any) {
    if (!this.rules) return this.validation
    // Verifica se rules é um Schema
    if (this.rules && typeof this.rules === 'object' && 'rules' in this.rules) {
      const schema = this.rules as Schema<any>
      const fieldRules = schema.rules[name]

      // Se não houver regras para este campo, apenas remove erros antigos
      if (!fieldRules) {
        this.validation.messages = this.validation.messages.filter(
          (msg) => msg.field !== name,
        )
        return this.validation
      }

      // Pega o input completo (importante para regras que precisam de contexto)
      const input = this.toJSON()

      // Valida apenas este campo usando a função validate do validation.ts
      const fieldValidation = validateInput(input, { [name]: fieldRules })

      // Remove erros antigos do campo e adiciona os novos
      const otherMessages = this.validation.messages.filter(
        (msg) => msg.field !== name,
      )
      const newMessages = fieldValidation.isValid()
        ? []
        : fieldValidation.messages

      // Cria nova instância do array para garantir que o Nullstack detecte a mudança
      this.validation.messages = [...otherMessages, ...newMessages]

      return this.validation
    }

    // Se não for Schema, retorna validation atual
    return this.validation
  }

  /**
   * ✨ Retorna todas as mensagens de erro de um campo específico
   * @param fieldName - Nome do campo
   * @returns Array de strings com as mensagens de erro do campo
   */
  getErrors({ field }): string[] {
    return this.validation.messages
      .filter((msg) => msg.field === field)
      .map((msg) => msg.message)
  }
}
