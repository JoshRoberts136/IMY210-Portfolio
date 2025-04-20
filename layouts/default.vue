<template>
  <div>
    <NavBar />
    <slot />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
export default {
  components: { NavBar },
  // Josh Roberts, u23536765
}
</script>