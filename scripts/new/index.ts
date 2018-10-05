import * as fs from 'fs'
import * as path from 'path'

const ext = '.ts'
const templateFolder = path.join(__dirname, 'template/')
const filesToCopy = ['controller', 'router', 'model']
const rootDir = process.cwd()
const allArgs = process.argv.splice(2, process.argv.length).map(a => a.toLowerCase())
const flags = allArgs.filter(a => a[0] === '-')
const args = allArgs.filter(a => a[0] !== '-')
const injected: Map<string, string> = new Map()
const injectVariable: Map<string, Array<string>> = new Map([
  ['model', ['model', args[0].replace(/./, args[0].toUpperCase()[0])]]
])

for (let key of injectVariable.keys()) {
  const v = injectVariable.get(key)
  injected.set(key, fs.readFileSync(getFilePath(templateFolder, 'model')).toString('utf-8').replace(`_${v[0].toUpperCase()}_`, v[1]))
}

if (flags.includes('-m')) {
  filesToCopy.push('middleware')
}

const creationDir = path.join(rootDir, 'src/api', args[0] + '/')

fs.mkdir(creationDir, err => {
  if (!err) {
    filesToCopy.forEach(f => {
      if (injectVariable.get(f)) {
        fs.writeFile(getFilePath(creationDir, f), injected.get(f), err => {
          if (err) {
            console.error(err)
          }
        })
      } else {
        fs.copyFile(getFilePath(templateFolder, f), getFilePath(creationDir, f), err => {
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

function getFilePath(root, file) {
  return root + file + ext
}