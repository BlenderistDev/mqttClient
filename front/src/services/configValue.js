import { useStore } from 'vuex'
import { computed } from 'vue'
import _ from 'lodash'

export const getConfigValue = (config, field) => {
  const store = useStore();
  return computed({
    get: () => config.value[field.value.name],
    set: value => store.dispatch("modules/updateConfig", _.set(config.value, field.value.name, value)),
  })
}