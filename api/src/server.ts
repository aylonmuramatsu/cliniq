import { Application } from '@insightcreativewebs/api'
import dotenv from 'dotenv'
import { envSchema } from './config/env.config'
import sequelize from './database/database'

dotenv.config()

// ✨ Cria aplicação
const app = new Application({
  envSchema,
  timezone: 'America/Sao_Paulo',
})

app.setDatabase({
  connect: async () => {
    await sequelize.authenticate()
    console.log('Database connected')
  },
  close: async () => {
    await sequelize.close()
  },

  sequelize,
})

app.start().catch((error) => {
  console.error('Failed to start application:', error)
  process.exit(1)
})

process.on('SIGTERM', () => app.stop())
process.on('SIGINT', () => app.stop())
