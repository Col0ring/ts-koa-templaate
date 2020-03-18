import { Middleware } from 'koa'
import { HttpException } from '@/core/http-exception'
import { devConfig } from '@/config/config'

// 异常处理
const catchError: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isDev = devConfig.envirment === 'development'
    const isHttpException = error instanceof HttpException
    if (isDev && !isHttpException) {
      throw error
    }
    // HTTP 状态码错误
    // 自定义code码
    const url = `${ctx.method} ${ctx.path}`
    if (isHttpException) {
      ctx.body = {
        message: error.msg,
        code: error.code,
        url
      }
      if (error.status && typeof error.status === 'number') {
        ctx.status = error.status
      }
    } else {
      ctx.body = {
        message: '系统出现错误',
        code: 500,
        url
      }
      ctx.status = 500
    }
  }
}

export default catchError
