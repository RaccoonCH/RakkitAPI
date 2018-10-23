import * as Fs from 'fs'
import * as Path from 'path'

export class FileUtils {
  private rootPath: string

  public get RootPath(): string {
    return this.rootPath
  }
  public set RootPath(val: string) {
    this.rootPath = val
  }

  constructor(rootPath: string) {
    this.RootPath = rootPath
  }

  /**
   * Scan directorys in a directory
   * @param root The dir path to scan
   * @param cb The callback to call when the operation finished
   */
  ScanDir(callback: Function): void {
    const files = Fs.readdirSync(this.RootPath)
    files.forEach(file => {
      const stats = Fs.lstatSync(Path.join(this.RootPath, file))
      if (stats.isDirectory()) {
        callback(file)
      }
    })
  }

  /**
   * Know if a file exists
   * @param root The root dir
   * @param file The file name to check
   */
  FileExists(path: string, fromRoot: boolean = false): boolean {
    return Fs.existsSync(fromRoot ? this.GetFilePath(path) : path)
  }

  /**
   * Get a file path into the API folder
   * @param file The RakkitPackage name
   * @param a The file (Router, Model, ...)
   * @param ext The extension, by default = 'ts'
   */
  GetFilePath(path: string): string {
    return Path.join(this.RootPath, path)
  }
}
