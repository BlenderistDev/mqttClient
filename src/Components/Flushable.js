export class Flushable {
  list = []
  push (data) {
    this.list.push(data)
  }
  flush() {
    const flushed = this.list
    this.list = []
    return flushed
  }
}
