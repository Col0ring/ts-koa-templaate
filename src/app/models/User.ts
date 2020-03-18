import { Table, Column, Model, DataType } from 'sequelize-typescript'
import bycrpt from 'bcryptjs'

@Table({
  tableName: 'users'
})
class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number
  @Column(DataType.STRING)
  nickname!: string

  @Column({
    type: DataType.STRING(128),
    unique: true
  })
  email!: string

  @Column({
    type: DataType.STRING
  })
  get password(): string {
    return this.getDataValue('password')
  }
  set password(val: string) {
    const salt = bycrpt.genSaltSync(10)
    const psw = bycrpt.hashSync(val, salt)
    this.setDataValue('password', psw)
  }
}

export default User
