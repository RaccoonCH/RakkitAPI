import * as fs from 'fs'
import * as path from 'path'

const ext = '.ts'
const templateFolder = path.join(__dirname, 'template/')
const filesToCopy = ['controller', 'router']

const rootDir = process.cwd()
const allArgs = process.argv.splice(2, process.argv.length).map(a => a.toLowerCase())
const flags = allArgs.filter(a => a[0] === '-')
const args = allArgs.filter(a => a[0] !== '-')

console.log(flags)

if (flags.includes('-m')) {
  filesToCopy.push('middleware')
}

const creationDir = path.join(rootDir, 'src/api', args[0] + '/')

fs.mkdir(creationDir, err => {
  if (!err) {
    filesToCopy.forEach(f => {
      fs.copyFile(getFilePath(templateFolder, f), getFilePath(creationDir, f), err => {
        if (err) {
          console.error(err)
        }
      })
    })
  } else {
    console.error(err)
  }
})

function getFilePath(root, file) {
  return root + file + ext
}

