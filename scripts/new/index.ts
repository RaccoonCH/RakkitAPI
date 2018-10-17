import * as fs from 'fs'
import * as path from 'path'

//#region Functions consts
const getUppercaseFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
const getRPObjectName = (element: string) => RPNameUpperFirstLetter + getUppercaseFirstLetter(element)
const getFilePath = (root: string, file: string) => root + file + ext
//#endregion

//#region Consts
const ext = '.ts'
const templateFolder = path.join(__dirname, 'template/')
const filesToCopy = ['controller', 'router', 'model']
const rootDir = process.cwd()
const allArgs = process.argv.splice(2, process.argv.length).map(a => a.toLowerCase())
const flags = allArgs.filter(a => a[0] === '-')
const args = allArgs.filter(a => a[0] !== '-')
const injected: Map<string, string> = new Map()
const RPNameUpperFirstLetter = getUppercaseFirstLetter(args[0])
const injectVariable: Map<string, Array<Array<string>>> = new Map([
  // [FILE, [VARIABLE, REPLACE_WITH]]
  ['model', [
    ['model', RPNameUpperFirstLetter]
  ]],
  ['controller', [
    ['model_file', getRPObjectName('model')],
    ['controller', getRPObjectName('controller')],
    ['rp_name', RPNameUpperFirstLetter]
  ]],
  ['router', [
    ['controller_file', getRPObjectName('controller')]
  ]]
])
//#endregion

// Inject variable into the into the file
for (let key of injectVariable.keys()) {
  let newValue: string = fs.readFileSync(getFilePath(templateFolder, key), 'utf-8')
  injectVariable.get(key).forEach(iv => {
    // Replace all value that match with the variable name
    newValue = newValue.replace(new RegExp(`_${iv[0].toUpperCase()}_`, 'g'), iv[1])
  })
  injected.set(key, newValue)
}

// If the flag -m exists, add the middleware file
if (flags.includes('-m')) {
  filesToCopy.push('middleware')
}

// The RakkitPackage dir
const creationDir = path.join(rootDir, 'src/api', RPNameUpperFirstLetter + '/')

fs.mkdir(creationDir, (err: Error) => {
  if (!err) {
    filesToCopy.forEach((file: string) => {
      // If the files has an injected variable
      if (injectVariable.get(file)) {
        fs.writeFile(getFilePath(creationDir, getRPObjectName(file)), injected.get(file), err => {
          if (err) {
            console.error(err)
          }
        })
      // If the file can be simply paste
      } else {
        fs.copyFile(getFilePath(templateFolder, file), getFilePath(creationDir,  getRPObjectName(file)), err => {
          if (err) {
            console.error(err)
          }
        })
      }
    })
  } else {
    console.error(err)
  }
})
