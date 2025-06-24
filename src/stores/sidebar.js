import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    collapsed: JSON.parse(localStorage.getItem('sidebar_collapsed')) || false
  }),
  actions: {
    toggle() {
      this.collapsed = !this.collapsed
      localStorage.setItem('sidebar_collapsed', JSON.stringify(this.collapsed))
    },
    setCollapse(value) {
      this.collapsed = value
      localStorage.setItem('sidebar_collapsed', JSON.stringify(value))
    }
  }
})
