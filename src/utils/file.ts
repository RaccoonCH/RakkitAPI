import * as fs from 'fs'
import * as path from 'path'

export const scanDirSync = (root, cb) => {
  const files = fs.readdirSync(root)
  files.forEach(file => {
    const stats = fs.lstatSync(path.join(root, file))
    if (stats.isDirectory()) {
      cb(file)
    }
  })
}

export const fileExistsSync = (root, file) => {
  return fs.existsSync(path.join(root, file))
}
