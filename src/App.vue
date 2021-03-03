<template>
  <transition name="router">
    <router-view />
  </transition>
</template>

<script>
export default {
  watch: {
    $route(to) {
      //监听路由
    }
  }
}
</script>

<style lang="scss" scoped>
.router-enter {
  opacity: 0;
}
.router-enter-active {
  transition: opacity 0.5s ease;
}
.router-enter-to {
  opacity: 1;
}
.router-leave {
  opacity: 1;
}
.router-leave-active {
  transition: opacity 0.5s ease;
}
.router-leave-to {
  opacity: 0;
}
</style>
