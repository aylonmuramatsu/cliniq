import { Config } from '@insightcreativewebs/api';
import { Options, Sequelize } from 'sequelize';
import { UserModel } from './models/user.model';
import { PlanModel } from './models/plan.model';
import { ClinicModel } from './models/clinic.model';

const sequelizeConfig: Options = {
  host: Config.get('DB_HOST'),
  port: Config.get('DB_PORT'),
  database: Config.get('DB_NAME'),
  username: Config.get('DB_USER'),
  password: Config.get('DB_PASSWORD'),
  dialect: 'mysql',
  logging: false,
  timezone: '+03:00', // São Paulo (UTC-3)
  dialectOptions: {
    timezone: '+03:00',
    dateStrings: true,
    typeCast: true,
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
}

const sequelize = new Sequelize(sequelizeConfig);

const models:any = [UserModel, PlanModel, ClinicModel]


models
  .map((model:any) => model.init(sequelize))
  .map((model: any) => {
    if (model.associate) model.associate(sequelize.models);
    return model;
  });

export const defaultModelConfigs = {
  paranoid: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
};

export default sequelize;
