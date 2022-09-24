import { clearLine, cursorTo } from 'node:readline'
import pc from 'picocolors'
import prompts from 'prompts'

export class Spinner {
  private stream: NodeJS.WriteStream & { fd: 1 } = process.stdout
  private text: string = ''
  chars = {
    loading: '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',
    success: '✔️',
    failed: '×',
    warning: '⚠️',
  }
  private charsType: 'loading' | 'success' | 'failed' | 'warning' = 'loading'
  private charIndex: number = 0
  private delay: number = 60
  private id?: NodeJS.Timer

  private resetLine() {
    clearLine(this.stream, 0)
    cursorTo(this.stream, 0)
  }

  private write() {
    this.resetLine()
    const chars = this.chars[this.charsType]
    let char = chars[this.charIndex]
    if (this.charsType === 'loading') {
      char = pc.gray(char)
    } else if (this.charsType === 'success') {
      char = pc.green(char)
    } else if (this.charsType === 'failed') {
      char = pc.red(char)
    } else if (this.charsType === 'warning') {
      char = pc.yellow(char)
    }
    this.stream.write(char + ' ' + pc.bold(pc.blue(this.text)))
    this.charIndex = (this.charIndex + 1) % chars.length
  }

  private start() {
    this.id = setInterval(this.write.bind(this), this.delay)
  }

  private stop() {
    this.resetLine()
    clearInterval(this.id)
  }

  loading(text: string = 'Loading') {
    this.stop()
    this.text = text
    this.charsType = 'loading'
    this.start()
  }

  success(text?: string | null, message?: any) {
    this.stop()
    if (text) this.text = text
    this.charsType = 'success'
    console.log(pc.green(this.chars.success) + ' ' + pc.bold(pc.blue(this.text)))
    if (message) console.log(message)
  }

  failed(text?: string | null, message?: any) {
    this.stop()
    if (text) this.text = text
    this.charsType = 'failed'
    console.log(pc.red(this.chars.failed) + ' ' + pc.bold(pc.blue(this.text)))
    if (message) console.error(message)
  }

  warning(text: string) {
    console.log(pc.yellow(this.chars.warning) + ' ' + pc.bold(pc.yellow(text)))
  }

  async confirm(text: string, skip: boolean = false) {
    const confirm = await prompts({
      type: skip ? null : 'confirm',
      name: 'value',
      message: pc.bold(pc.blue(text)),
    })
    if (!skip && !confirm.value) process.exit(0)
  }
}
