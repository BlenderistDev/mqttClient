export default {
  type: 'Form',
  name: 'Storage',
  hide: true,
  hideReload: true,
  fields: {
    storage: {
      type: 'StorageSelect',
      name: 'storage',
      title: 'Primary storage',
      tooltip: 'Storage to fetch data'
    }
  }
}
