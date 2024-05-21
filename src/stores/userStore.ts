import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state() {
    return {
      user: {},
    };
  },

  actions: {
    store(user: any) {
      this.user = user;
    },
    destroy() {
      this.user = {};
    },
  },

  getters: {
    getUser(): any {
      return this.user;
    },
  },
  persist: true,
});
