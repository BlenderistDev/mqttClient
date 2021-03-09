/**
 * Прототип контроллеров Api
 */
export class ApiPrototype {
  /**
   * Конструктор контроллера.
   * Устанавливает объекты request и response
   * для последущего использования в контроллерах
   * @param {object} request
   */
  constructor(request) {
    this.request = request;
    this.fields = []
  }

  /**
   * геттер поля data
   * возвращает поле data post запроса
   */
  get data() {
    return this.request.body.data;
  }

  addField(name, type='string') {
    this.fields.push({
      name: name,
      type: type
    })
  }
}

