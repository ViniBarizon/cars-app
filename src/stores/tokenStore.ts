import { defineStore } from "pinia";

export const tokenStore = defineStore("token", {
  state() {
    return {
      token: {},
    };
  },

  actions: {
    store(token: any) {
      this.token = token;
    },
    destroy() {
      this.token = {};
    },
  },

  getters: {
    getToken(): any {
      return this.token;
    },
  },
  persist: true,
});
