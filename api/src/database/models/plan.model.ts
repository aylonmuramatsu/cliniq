import { DataTypes, Model } from "sequelize";

export class PlanModel extends Model {
  declare id: number;
  declare name: string;
  declare price: number;
  declare waiting_period: number;
  declare included_procedures: string | null
  declare status: number;


  static init(sequelize: any): any {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true, 
      },
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(15, 2),
      waiting_period: DataTypes.INTEGER,
      included_procedures: DataTypes.TEXT('long'),
      status: DataTypes.TINYINT
    }, {
      sequelize,
      tableName: 'plans', 
      timestamps: true, 
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    })

    return this;
  }

  static associate(models: any) {
  
  }

}