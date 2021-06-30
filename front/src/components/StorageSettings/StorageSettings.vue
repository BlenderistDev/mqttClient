<script>
import { useStore } from "vuex";

export default {
  name: "StorageSettings",
  setup() {
    const store = useStore();
    store.dispatch("modules/fetchModule", "Storage");
  },
};
</script>
