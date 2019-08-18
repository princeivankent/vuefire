<template>
  <div>
    <Navigation />

    <router-view />
  </div>
</template>

<script>
import Navigation from './Navigation'

export default {
  name: 'container',
  components: {
    Navigation
  }
}
</script>