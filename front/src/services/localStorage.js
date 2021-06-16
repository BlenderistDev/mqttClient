import { useStore } from 'vuex';

export const startLocalStorageSync = () => {
  const store = useStore();
  store.commit('messages/initialiseStore');
  window.addEventListener("storage", () => store.commit('messages/initialiseStore'), false);
}