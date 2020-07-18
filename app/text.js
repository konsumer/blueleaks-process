const { promisify } = require('util')
const { writeFile, copyFile } = require('fs').promises
const { dirname } = require('path')
const mkdirp = require('mkdirp')
const glob = promisify(require('glob'))
const tesseract = require('node-tesseract-ocr')
const pdfToText = promisify(require('pdf-to-text').pdfToText)
const xlsx2csv = require('xlsx2csv-node')

const INPUT = '/usr/app/input'
const OUTPUT = '/usr/app/output'

const run = async () => {
  // OCR images
  for (const file of await glob(`${INPUT}/**/*.+(jpg|jpeg|png|gif)`, { nodir: true, nocase: true })) {
    const newFile = file.replace(INPUT, OUTPUT) + '.txt'
    try {
      const text = (await tesseract.recognize(file, { lang: 'eng' })).trim()
      if (text && text !== '') {
        console.log(newFile.replace(OUTPUT, ''))
        await mkdirp(dirname(newFile))
        await writeFile(newFile, text)
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  // extract text from PDFs
  for (const file of await glob(`${INPUT}/**/*.pdf`, { nodir: true, nocase: true })) {
    const newFile = file.replace(INPUT, OUTPUT) + '.txt'
    try {
      const text = (await pdfToText(file))
      if (text && text !== '') {
        console.log(newFile.replace(OUTPUT, ''))
        await mkdirp(dirname(newFile))
        await writeFile(newFile, text)
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  // convert excel to CSV
  // TODO: this needs more testing
  for (const file of await glob(`${INPUT}/**/*.+(xlsx|xls)`, { nodir: true, nocase: true })) {
    const newFile = file.replace(INPUT, OUTPUT) + '.csv'
    try {
      const text = await xlsx2csv({ xlsxfile: file, all: true })
      if (text && text !== '') {
        console.log(newFile.replace(OUTPUT, ''))
        await mkdirp(dirname(newFile))
        await writeFile(newFile, text)
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  // copy csvs, server-side code, data-files, and text files
  for (const file of await glob(`${INPUT}/**/*.+(txt|csv|vb|asp|aspx|json|xml|)`, { nodir: true, nocase: true })) {
    const newFile = file.replace(INPUT, OUTPUT)
    try {
      console.log(newFile.replace(OUTPUT, ''))
      await copyFile(file, newFile)
    } catch (e) {
      console.error(e.message)
    }
  }
}
run()
