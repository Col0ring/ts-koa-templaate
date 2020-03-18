import fs from 'fs'
import path from 'path'

interface IResult {
  type: string
  data: any | IResult[]
}

type Results = IResult[]

interface IOptions {
  /**
   *
   * @description 读取到某个文件后的回调函数
   */
  visit?(obj: IResult): void
}

function readFiles(filePath: string, options?: IOptions): Results {
  const fileModules: any[] = []
  fs.readdir(filePath, (err, files) => {
    if (err) {
      throw new Error('路径读取错误')
    } else {
      files.forEach(filename => {
        const fileDir = path.join(filePath, filename)
        fs.stat(fileDir, (e, state) => {
          if (e) {
            throw new Error('获取文件失败')
          } else {
            if (state.isFile()) {
              import(fileDir).then(res => {
                const file = {
                  type: 'file',
                  data: res
                }
                fileModules.push(file)
                if (options) {
                  options.visit && options.visit(file)
                }
              })
            } else if (state.isDirectory()) {
              fileModules.push({
                type: 'directory',
                data: readFiles(fileDir, options)
              })
            }
          }
        })
      })
    }
  })
  return fileModules
}

export default readFiles
