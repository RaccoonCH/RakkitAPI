import * as fs from 'fs'
import * as path from 'path'

/**
 * Scan directorys in a directory
 * @param root The dir path to scan
 * @param cb The callback to call when the operation finished
 */
export const scanDirSync = (root, cb) => {
  const files = fs.readdirSync(root)
  files.forEach(file => {
    const stats = fs.lstatSync(path.join(root, file))
    if (stats.isDirectory()) {
      cb(file)
    }
  })
}

/**
 * Know if a file exists
 * @param root The root dir
 * @param file The file name to check
 */
export const fileExistsSync = (root, file) => {
  return fs.existsSync(path.join(root, file))
}

/**
 * Get a file path into the API folder
 * @param file The RakkitPackage name
 * @param a The file (Router, Model, ...)
 * @param ext The extension, by default = 'ts'
 */
export const getFilePath = (RP, a, ext = 'ts'): string => {
  return `../api/${RP}/${a}.${ext.toLowerCase()}`
}

