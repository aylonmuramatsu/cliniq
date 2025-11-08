import { Application, defineEnv } from '@insightcreativewebs/api'
import dotenv from 'dotenv'

dotenv.config()

// ✨ Define schema de variáveis de ambiente
export const envSchema = defineEnv({
  // ========== Servidor ==========
  PORT: {
    type: 'number',
    default: 3000,
    description: 'Porta do servidor HTTP',
    group: 'Servidor',
  },
  NODE_ENV: {
    type: 'enum',
    values: ['development', 'production', 'test'],
    default: 'development',
    description: 'Ambiente de execução da aplicação',
    group: 'Servidor',
  },
  TIMEZONE: {
    type: 'string',
    default: 'America/Sao_Paulo',
    description: 'Timezone da aplicação (ex: America/Sao_Paulo, UTC)',
    group: 'Servidor',
  },

  // ========== Logger ==========
  LOGGING: {
    type: 'boolean',
    default: true,
    description: 'Habilita/desabilita logging global',
    group: 'Logger',
  },
  DEBUG_MODE: {
    type: 'boolean',
    default: false,
    description: 'Habilita modo debug (mostra logs de debug)',
    group: 'Logger',
  },
  LOG_PERSIST_MODE: {
    type: 'enum',
    values: ['none', 'memory', 'file', 'both'],
    default: 'none',
    description: 'Modo de persistência de logs: none, memory, file ou both',
    group: 'Logger',
  },
  LOG_DIRECTORY: {
    type: 'string',
    default: 'logs',
    description:
      'Diretório onde os logs serão salvos (quando persist mode incluir file)',
    group: 'Logger',
  },
  MAX_MEMORY_LOGS: {
    type: 'number',
    default: 100,
    description: 'Número máximo de logs mantidos em memória',
    group: 'Logger',
  },

  // ========== Request Logging ==========
  LOG_REQUEST_LEVEL: {
    type: 'enum',
    values: ['none', 'all', 'errors'],
    default: 'all',
    description:
      'Nível de log de requisições: none (desliga), all (todas), errors (apenas erros)',
    group: 'Request Logging',
  },

  // ========== Database (exemplo - ajuste conforme seu ORM) ==========
  // DB_NAME: {
  //   type: 'string',
  //   required: true,
  //   description: 'Nome do banco de dados',
  //   group: 'Database',
  // },
  // DB_HOST: {
  //   type: 'string',
  //   default: 'localhost',
  //   description: 'Host do banco de dados',
  //   group: 'Database',
  // },
  // DB_PORT: {
  //   type: 'number',
  //   default: 5432,
  //   description: 'Porta do banco de dados',
  //   group: 'Database',
  // },
  // DB_USER: {
  //   type: 'string',
  //   required: true,
  //   description: 'Usuário do banco de dados',
  //   group: 'Database',
  // },
  // DB_PASSWORD: {
  //   type: 'string',
  //   required: true,
  //   secure: true,
  //   description: 'Senha do banco de dados',
  //   group: 'Database',
  // },
})

// ✨ Cria aplicação
const app = new Application({
  envSchema,
  timezone: 'America/Sao_Paulo',
})

app.start().catch((error) => {
  console.error('Failed to start application:', error)
  process.exit(1)
})

process.on('SIGTERM', () => app.stop())
process.on('SIGINT', () => app.stop())
