// web/src/util/validation.ts

import { optionalBut } from './rules-common'

export enum VALIDATION_ERROR {
  ERR_FIELD = 'ERR_FIELD',
  ERR_UNKNOWN = 'ERR_UNKNOWN',
}

export class Validation {
  public messages = []

  add(...args) {
    let validation_message = null

    // Caso 1: add(message) - para backend
    if (args.length === 1) {
      validation_message = args[0]
    }

    // Caso 2: add(code, message) - para backend
    if (args.length === 2) {
      const code = (args[0] as VALIDATION_ERROR) || VALIDATION_ERROR.ERR_UNKNOWN
      const message = args[1]
      if (!!code && !!message) {
        validation_message = new ValidationMessage(code, message)
      }
    }

    // Caso 3: add(field, code, message) - para frontend com campo específico
    if (args.length === 3) {
      const field = args[0]
      const code = (args[1] as VALIDATION_ERROR) || VALIDATION_ERROR.ERR_UNKNOWN
      const message = args[2]
      if (!!field && !!code && !!message) {
        validation_message = new ValidationMessage(code, message, field)
      }
    }

    if (validation_message) {
      this.messages.push(validation_message)
    }
  }

  isValid() {
    return this.messages.length === 0
  }

  getJSON() {
    return JSON.stringify(this.messages)
  }
}

class ValidationMessage {
  public code
  public message
  public field

  constructor(code, message, field = null) {
    this.code = code
    this.message = message
    this.field = field
    return this
  }
}

/**
 * ✨ Valida input com regras
 */
export function validate(
  input: any,
  rules: Record<string, any | any[]>,
): Validation {
  const validation = new Validation()

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = input[field]
    const ruleArray = Array.isArray(fieldRules) ? fieldRules : [fieldRules]

    ruleArray.forEach((rule) => {
      if (typeof rule !== 'function') {
        return
      }

      const error = rule.needsContext ? rule(value, input) : rule(value)

      if (error) {
        validation.add(field, VALIDATION_ERROR.ERR_FIELD, error)
      }
    })
  })

  return validation
}

/**
 * ✨ Sanitiza input (remove campos não permitidos e aplica defaults)
 */
export function sanitize<T = any>(
  input: any,
  rules: Record<string, any | any[]>,
): T {
  if (!input || typeof input !== 'object') {
    input = {}
  }

  const result: any = {}
  const allowedFields = Object.keys(rules)

  allowedFields.forEach((field) => {
    const fieldRules = rules[field]
    const ruleArray = Array.isArray(fieldRules) ? fieldRules : [fieldRules]

    // Procura regra com default
    const defaultRule = ruleArray.find((r: any) => r && r.isDefault)

    // Se campo foi enviado, usa o valor
    if (
      field in input &&
      input[field] !== undefined &&
      input[field] !== null &&
      input[field] !== ''
    ) {
      result[field] = input[field]
    }
    // Se não foi enviado mas tem default, aplica default
    else if (defaultRule) {
      result[field] = defaultRule.defaultValue
    }
  })

  return result
}

/**
 * ✨ Tipo base - todos os campos do schema como any
 */
export type InferInput<T extends Record<string, any>> = {
  [K in keyof T]: any
}

/**
 * ✨ Interface do schema com tipo genérico
 */
export interface Schema<T extends Record<string, any>> {
  rules: T
  check(input: any): void
  pick<R = any>(input: any): R
  extend<E extends Record<string, any>>(extraRules: E): Schema<T & E>
}

/**
 * ✨ Cria validador minimalista
 */
export function schema<T extends Record<string, any>>(rules: T): Schema<T> {
  return {
    rules,

    check(input: any) {
      const validation = validate(input, rules)
      if (!validation.isValid()) throw validation
    },

    pick<R = any>(input: any): R {
      return sanitize<R>(input, rules)
    },

    extend<E extends Record<string, any>>(extraRules: E): Schema<T & E> {
      return schema({ ...rules, ...extraRules })
    },
  }
}

/**
 * ✨ Helper para extrair o tipo de input de um schema
 * Retorna Partial automaticamente (todos campos opcionais)
 */
export type InputOf<T> = T extends Schema<infer R>
  ? Partial<InferInput<R>>
  : never

/**
 * ✨ Se quiser todos campos obrigatórios, use este:
 */
export type StrictInputOf<T> = T extends Schema<infer R> ? InferInput<R> : never

/**
 * ✨ Helper para transformar todas as regras de um schema, tornando os campos opcionais
 */
export const makeFieldsOptional = <T extends Record<string, any>>(
  rules: T,
  extras?: { [K in keyof T]?: any[] },
): { [K in keyof T]: any[] } => {
  return Object.fromEntries(
    Object.entries(rules).map(([key, value]) => [
      key,
      extras && extras[key as keyof T]
        ? [optionalBut(...(value as any[])), ...extras[key as keyof T]!]
        : [optionalBut(...(value as any[]))],
    ]),
  ) as any
}
