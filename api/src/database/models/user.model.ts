import { UserRole, UserStatus } from '@/utils/enums'
import { DataTypes, Model } from 'sequelize'

export class UserModel extends Model {
  declare id: number
  declare name: string
  declare email: string
  declare password: string
  declare role: number
  declare status: number
  declare clinic_id: number | null
  declare password_reset: number

  static init(sequelize: any): any {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: DataTypes.TEXT,
        role: {
          type: DataTypes.TINYINT,
          defaultValue: UserRole.Operator,
        },
        status: {
          type: DataTypes.TINYINT,
          defaultValue: UserStatus.Active,
        },
        clinic_id: {
          type: DataTypes.INTEGER,
        },
        password_reset: {
          type: DataTypes.TINYINT,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
      },
    )

    return UserModel
  }

  static associate(models: any) {
    UserModel.belongsTo(models.ClinicModel, {
      foreignKey: 'clinic_id',
      as: 'clinic',
    })
  }
}
