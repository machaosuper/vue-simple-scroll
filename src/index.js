import simpleScroll from './components/Scroll.vue'

function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('simple-scroll', simpleScroll)
}

var VueSimpleScroller = {
  install: install,
  simpleScroll
}

if (typeof window !== undefined && window.Vue) {
  window.Vue.use(VueSimpleScroller)
}

export default VueSimpleScroller
