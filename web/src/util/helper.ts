import { dayjs } from '@/util/date-helper'
import { NavigationPath } from './enums'
import { optionalBut } from './rules-common'

/**
 * Converte valor para string, ou retorna default se vazio/nulo/undefined
 */
export function to_string(
  value: any,
  defaultValue: string | null = null,
): string | null {
  if (value === undefined || value === null || value === '')
    return defaultValue ?? null
  return String(value)
}

/**
 * Converte valor para number, ou retorna default se vazio/nulo/undefined
 */
export function to_number(
  value: any,
  defaultValue: number | null = null,
): number | null {
  if (value === undefined || value === null || value === '')
    return defaultValue ?? null
  const num = Number(value)
  return isNaN(num) ? (defaultValue ?? null) : num
}

/**
 * Converte valor para boolean, ou retorna default se vazio/nulo/undefined
 */
export function to_boolean(
  value: any,
  defaultValue: boolean | null = null,
): boolean | null {
  if (value === undefined || value === null || value === '')
    return defaultValue ?? null
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true
    if (value.toLowerCase() === 'false') return false
  }
  return Boolean(value)
}

/**
 * Converte valor para string no formato YYYY-MM-DD, ou retorna default se inválido
 */
export function to_date(
  value: any,
  defaultValue: string | null = null,
): string | null {
  if (!value) return defaultValue ?? null
  const date = dayjs(value)
  if (!date.isValid()) return defaultValue ?? null
  return date.format('YYYY-MM-DD')
}

/**
 * Converte valor para string no formato YYYY-MM-DD HH:mm:ss, ou retorna default se inválido
 */
export function to_datetime(
  value: any,
  defaultValue: string | null = null,
): string | null {
  if (!value) return defaultValue ?? null
  const date = dayjs(value)
  if (!date.isValid()) return defaultValue ?? null
  return date.format('YYYY-MM-DD HH:mm:ss')
}

export function to_money(
  value: number,
  {
    currency = 'BRL',
    locale = 'pt-BR',
    showSymbol = true,
  }: { currency?: string; locale?: string; showSymbol?: boolean } = {},
): string {
  if (typeof value !== 'number' || isNaN(value)) return ''
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  let formatted = value.toLocaleString(locale, options)
  if (!showSymbol) {
    // Remove símbolo da moeda, mantendo apenas o valor numérico formatado
    // Ex: R$ 10,00 => 10,00 (pt-BR), $10.00 => 10.00 (en-US)
    // Regex cobre diferentes posições do símbolo
    formatted = formatted.replace(/^\s*[^\d\s]+\s*|\s*[^\d\s]+\s*$/g, '').trim()
  }
  return formatted
}

/**
 * Valida se o horário é válido (HH:mm)
 */
export const timeValid =
  (msg = 'Horário inválido (use HH:mm)'): any =>
  (v: any) => {
    if (!v) return null
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timeRegex.test(v)) return msg
    return null
  }

/**
 * 🧩 Helper para transformar todas as regras de um schema, tornando os campos opcionais
 * Caso "extras" seja fornecido, essas regras serão adicionadas ao final das regras para cada campo.
 * Por padrão, usa optionalBut. Nome sugerido: makeFieldsOptional
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

/**
 * Extrai recursivamente todos os valores de string de um objeto aninhado
 */
function extractPaths(obj: any, paths: string[] = []): string[] {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      paths.push(obj[key])
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      extractPaths(obj[key], paths)
    }
  }
  return paths
}

/**
 * Obtém todos os paths do NavigationPath em um array
 */
export function getAllNavigationPaths(): string[] {
  return extractPaths(NavigationPath)
}

/**
 * Verifica se a URL atual corresponde a uma rota base
 * Ex: /administrador/clinicas/1 corresponde a /administrador/clinicas/:id
 * @param currentUrl - A URL atual (ex: /administrador/clinicas/1)
 * @param baseRoute - A rota base (ex: /administrador/clinicas)
 * @returns true se a URL corresponde à rota base
 */
export function matchesRoute(currentUrl: string, baseRoute: string): boolean {
  // Remove query strings e hash
  const cleanUrl = currentUrl.split('?')[0].split('#')[0]

  // Cria um matcher para a rota base com parâmetros dinâmicos
  // Adiciona :id* para capturar qualquer parâmetro adicional
  const routePattern = `${baseRoute}/:id*`

  try {
    const matcher = match(routePattern, { end: false })
    const result = matcher(cleanUrl)
    return result !== false
  } catch {
    // Se houver erro, faz comparação exata
    return cleanUrl === baseRoute
  }
}

/**
 * Verifica se a URL atual corresponde a alguma das rotas do NavigationPath
 * @param currentUrl - A URL atual (ex: /administrador/clinicas/1)
 * @returns true se a URL corresponde a alguma rota, false caso contrário
 */
export function isCurrentRouteActive(currentUrl: string): boolean {
  const allPaths = getAllNavigationPaths()

  return allPaths.some((path) => {
    // Verifica correspondência exata primeiro
    if (currentUrl === path) return true

    // Verifica se corresponde com parâmetros
    return matchesRoute(currentUrl, path)
  })
}

/**
 * Encontra a rota base que corresponde à URL atual
 * @param currentUrl - A URL atual (ex: /administrador/clinicas/1)
 * @returns A rota base correspondente ou null
 */
export function findMatchingRoute(currentUrl: string): string | null {
  const allPaths = getAllNavigationPaths()

  // Ordena por tamanho (mais específicas primeiro)
  const sortedPaths = allPaths.sort((a, b) => b.length - a.length)

  for (const path of sortedPaths) {
    // Verifica correspondência exata primeiro
    if (currentUrl === path) return path

    // Verifica se corresponde com parâmetros
    if (matchesRoute(currentUrl, path)) {
      return path
    }
  }

  return null
}
