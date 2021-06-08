import { ref, computed } from "vue";

const windowWidth = ref(window.innerWidth);
window.addEventListener("resize", () => (windowWidth.value = window.innerWidth));

export const isMobile = computed(() => windowWidth.value < 992)