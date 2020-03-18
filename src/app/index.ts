// 增加别名
import './alias'
import Koa from 'koa'
import InitManager from '@/core/init'
import bodyParser from 'koa-bodyparser'
import catchError from '@/app/middlewares/exception'

const app = new Koa()

app.use(catchError)
app.use(bodyParser())
new InitManager(app).initCore()

app.listen(3000, () => {
  console.log('listening on 3000...')
})
