import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import { Optional } from "sequelize";

import User from "./User";

export interface PasswordAttributes {
  id: string;
  user: string;
  name: string;
  username: string;
  password: string;
  website: string;
  iv: string;
}

interface PasswordCreationAttributes
  extends Optional<PasswordAttributes, "id"> { }

@Table({
  timestamps: true,
  tableName: "password",
  modelName: "Password",
})
class Password extends Model<PasswordAttributes, PasswordCreationAttributes> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare user: string;

  @BelongsTo(() => User, { foreignKey: "user", as: "user_id" })
  declare userId: User;

  @Column({ type: DataType.STRING })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare username: string;

  @Column({ type: DataType.STRING })
  declare password: string;

  @Column({ type: DataType.STRING })
  declare website: string;

  @Column({ type: DataType.STRING })
  declare iv: string;
}

export default Password;
