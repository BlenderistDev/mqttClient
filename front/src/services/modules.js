import { computed, watch } from "vue";
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export const MODULES_GROUP = 'Modules'
export const STORAGE_GROUP = 'Storage'

export const getConfigType = config => computed(() => config.value.type)

export const lookForRouter = () => {
  const store = useStore();
  const router = useRoute();
  watch(
    () => router.params,
    (params) => {
      store.dispatch('modules/fetchModule', params.name);
    }
  );
}

export const getCurrentModule = () => {
  const store = useStore();
  return computed(() => store.state.modules.module)
}

