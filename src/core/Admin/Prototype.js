export class Prototype {
  constructor() {
    this.fields = [];
    this.value = [];
  }

  addField(name, type = 'string') {
    this.fields.push({
      name: name,
      type: type
    })
  }

  setValues(value) {
    this.value = value
  }

  getInterface() {
    return {
      type: this.getType(),
      field: this.fields,
      value: this.value
    }
  }
}
