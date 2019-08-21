<template>
  <div>
    <Navigation />

    <b-container>
      <transition name="slide-fade">
        <router-view class="mt-3" v-if="show" />
      </transition>

      <!-- <ToastNotification
        :isTriggered="notif.isTriggered"
        :isError="notif.isError"
        :title="notif.title"
        :message="notif.message"
      /> -->
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navigation from './Navigation'
import ToastNotification from '../components/ToastNotification'

export default {
  name: 'Container',
  components: {
    Navigation, ToastNotification
  },
  data: () => ({
    show: false
  }),
  computed: {
    ...mapGetters('user', ['authenticationStatus', 'getNotificationStatus'])
  },
  mounted() {
    this.show = true
  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(5px);
  opacity: 0;
}
</style>