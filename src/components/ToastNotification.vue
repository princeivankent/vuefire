<template>
  <div></div>
</template>

<script>
export default {
  name: 'ToastNotification',
  props: {
    isTriggered: Boolean,
    isError: Boolean,
    title: String,
    message: String
  },
  watch: {
    isTriggered(val) {
      if (val) {
        this.$bvToast.toast(this.message, {
          title: this.title,
          variant: this.isError ? 'danger' : 'success',
          solid: true,
          autoHideDelay: 5000,
          appendToast: false
        })
      }
    }
  }
}
</script>