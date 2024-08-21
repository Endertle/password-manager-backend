import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
} from "sequelize-typescript";

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

@Table({
  timestamps: true,
  tableName: "user",
  modelName: "User",
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ type: DataType.STRING })
  declare username: string;

  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare password: string;

  @CreatedAt
  declare created_at: Date;
}

export default User;
