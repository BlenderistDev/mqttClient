export const getMessages = (filter, limit) => {
  return import('../Storage/Mongo/Storage.js').then(module => {
    return module.get(filter, limit)
  })
}