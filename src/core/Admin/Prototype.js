export class Prototype {
  constructor() {
    this.fields = [];
    this.buttons = [];
    this.value = [];
  }

  addField(name, type = 'string') {
    this.fields.push({
      name: name,
      type: type
    })
  }

  addButton(title, cmd) {
    this.buttons.push({
      title: title,
      cmd: cmd
    })
  }

  setValues(value) {
    this.value = value
  }

  getInterface() {
    return {
      type: this.getType(),
      fields: this.fields,
      buttons: this.buttons,
      value: this.value
    }
  }
}
