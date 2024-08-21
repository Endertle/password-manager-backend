import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from "sequelize-typescript";

import User from "./User";

interface AuthTokenAttributes {
  user: string;
  token: string;
  refreshExpiration: Date;
}

@Table({
  timestamps: true,
  tableName: "authToken",
  modelName: "AuthToken",
})
class AuthToken extends Model<AuthTokenAttributes> {
  @Column({ type: DataType.UUID, allowNull: false })
  declare user: string;

  @BelongsTo(() => User, { foreignKey: "user", as: "user_id" })
  declare userId: User;

  @Column({ type: DataType.STRING })
  declare token: string;

  @Column({ type: DataType.DATE })
  declare refreshExpiration: Date;
}

export default AuthToken;
