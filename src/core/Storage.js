export const getMessages = (limit, offset) => {
  return import('../Storage/Mongo/Storage.js').then(module => {
    return module.get(limit, offset)
  })
}