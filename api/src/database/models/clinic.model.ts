import { ClinicStatus } from "@/utils/enums";
import { DataTypes, Model } from "sequelize";

export class ClinicModel extends Model {
  declare id: number;
  declare name: string;
  declare cnpj: string;
  declare address: string;
  declare city: string;
  declare status: number;


  static init(sequelize: any): any {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true, 
      },
      name: {
        type: DataTypes.STRING,
      },
      cnpj: {
        type: DataTypes.STRING,
      },
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      status: {
        type: DataTypes.TINYINT,
        defaultValue: ClinicStatus.Active
      },
    }, {
      sequelize,
      tableName: 'clinics', 
      timestamps: true, 
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    })

    return this;
  }

  static associate(models: any) {
    ClinicModel.hasMany(models.UserModel, {
      foreignKey: 'clinic_id',
      as: 'users'
    });
  }

}