import { Sequelize } from 'sequelize-typescript'
import { dbConfig, pathConfig } from '@/config/config'
const { dbName, host, port, user, password } = dbConfig

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  // 打印日志
  // logging: true,

  // 时区，默认和北京时间差8小时
  timezone: '+08:00',
  define: {
    // create_time/update_time/delete_time
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true
  }
})

sequelize.addModels([pathConfig.modlesDirectory])

export { sequelize as db }
