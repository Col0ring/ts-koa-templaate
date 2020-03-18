import path from 'path'

const devConfig = {
  envirment: 'development'
}

const pathConfig = {
  // 路由目录
  routerDirectory: path.resolve(__dirname, '../app/router'),
  modlesDirectory: path.resolve(__dirname, '../app/modles')
}

const dbConfig = {
  loadDatabase: false,
  dbName: 'demo',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456'
}

export { devConfig, pathConfig, dbConfig }
