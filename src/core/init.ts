import Koa from 'koa'
import Router from 'koa-router'
import readFiles from './libs/readFiles'
import { pathConfig, dbConfig } from '@/config/config'
import { db } from './db'

class InitManager {
  constructor(private app: Koa) {}
  initCore() {
    this.initLoadRouters(this.app)
    dbConfig.loadDatabase && this.initDatabase()
  }
  private initLoadRouters(app: Koa) {
    // 自动加载所有的router
    readFiles(pathConfig.routerDirectory, {
      visit(obj) {
        const router: Router = obj.data.default
        if (router instanceof Router) {
          app.use(router.routes())
        }
      }
    })
  }
  private initDatabase() {
    db.sync({
      force: false
    })
  }
}

export default InitManager
