import { computed, watch } from "vue";
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export const getConfigType = config => computed(() => config.value.type)

export const lookForRouter = (action) => {
  const store = useStore();
  const router = useRoute();
  watch(
    () => router.params,
    (params) => {
      store.dispatch(action, params.name);
    }
  );
}

export const getCurrentModule = () => {
  const store = useStore();
  return computed(() => store.state.modules.module)
}

