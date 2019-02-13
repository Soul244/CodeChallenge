<template>
  <button
    :style="style"
    @click="click"
  >
    <div
      class="nav-item"
    >
      <i class="material-icons">
        {{ icon }}
      </i>
      <p class="nav-text">
        {{ text }}
      </p>
    </div>
  </button>
</template>

<script>
export default {
  name: "NavButton",
  props: {
    icon: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    bottom: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      if (this.bottom) {
        return "margin-top: auto";
      }
      return {};
    }
  },
  methods: {
    click: function(){
        this.$emit('click');
    }
  }
};
</script>

<style scoped lang="scss">
.nav-item {
  padding: 0.5rem 0 0.5rem 1rem;
  text-align: left;
}

.nav-text {
  padding-left: 1rem;
}

.material-icons {
  font-size: 24px;
  color: black;
  vertical-align: middle;
}

button,
p {
  vertical-align: middle;
  font-size: 1rem;
  color: black;
  font-weight: 400;
}

button {
  outline: none;
  background-color: transparent;
  border: none;
  padding: 0;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: lightgrey;
  }
}

@media (max-width: 992px) {
  .nav-item {
    padding: 16px;
    width: 100%;
    height: 64px;
  }
  .material-icons {
    font-size: 32px;
  }
  p {
    display: none;
  }
}
</style>
