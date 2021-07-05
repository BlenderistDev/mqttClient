import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from 'vuex'

export const MODULES_GROUP = 'Modules'
export const STORAGE_GROUP = 'Storage'

export const getConfigType = config => computed(() => config.value.type)

export const getCurrentModule = () => {
  const store = useStore();
  return computed(() => store.state.modules.module)
}

export const initModuleForm = group => {
  const router = useRoute();
  const store = useStore();
  store.commit("modules/setGroup", group);
  if (store.state.modules.module === null) {
    store.dispatch("modules/fetchModule", router.params.name);
  }
}
