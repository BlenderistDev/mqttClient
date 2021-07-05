import { computed } from "vue";
import { useStore } from 'vuex'

export const MODULES_GROUP = 'Modules'
export const STORAGE_GROUP = 'Storage'

export const getConfigType = config => computed(() => config.value.type)

export const getCurrentModule = () => {
  const store = useStore();
  return computed(() => store.state.modules.module)
}

