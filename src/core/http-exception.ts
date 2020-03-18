interface IExceptionConfig {
  msg: string | string[]
  code?: number
  status?: number
}

class HttpException extends Error implements IExceptionConfig {
  public msg!: string | string[]
  public status: number | undefined
  public code: number | undefined
  constructor(config: IExceptionConfig | string = '请求出现异常') {
    if (typeof config === 'string') {
      super(config)
      this.msg = config
      this.code = 500
    } else if (typeof config === 'object') {
      if (typeof config.msg === 'string') {
        super(config.msg)
      } else {
        super(config.msg.join(','))
      }
      this.msg = config.msg
      this.code = config.code
      this.status = config.status
    }
    // ts
    Object.setPrototypeOf(this, HttpException.prototype)
  }
}

class ParameterException extends HttpException {
  constructor(msg: string | string[] = '参数异常', code: number = 10000) {
    super({
      msg: msg,
      code,
      status: 400
    })
  }
}

class Success extends HttpException {
  constructor(msg: string | string[] = 'ok', code: number = 0) {
    super({
      msg: msg,
      code,
      status: 201
    })
  }
}

export { HttpException, ParameterException, Success }
