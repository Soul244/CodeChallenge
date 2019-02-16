<template>
  <b-alert
    :show="dismissCountDown"
    dismissible
    variant="dark"
    @dismissed="dismissCountDown=0"
    @dismiss-count-down="countDownChanged"
  >
    <p>{{ message }}</p>
    <div class="progress-container">
      <b-progress
        variant="danger"
        :max="4"
        :value="dismissCountDown"
        height="4px"
      />
    </div>
  </b-alert>
</template>


<script>
export default {
  name: "Alert",
  data: () => {
    return {
      dismissCountDown: 0,
      showDismissibleAlert: true,
      message: ""
    };
  },
  methods: {
    showMessage(message) {
      this.message = message;
      this.dismissCountDown = 4;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  }
};
</script>


<style scoped>
.progress-container {
  margin-top: 1rem;
}
</style>
