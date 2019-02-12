<template>
  <router-link
    :to="to"
    :style="style"
  >
    <div
      class="nav-item"
      :class="{active: page===to}"
    >
      <i class="material-icons">
        {{ icon }}
      </i>
      <p class="nav-text">
        {{ text }}
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "NavLink",
  props: {
    to: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    page: {
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
};
</script>

<style scoped lang="scss">
.nav-item {
  padding: 0.5rem 0 0.5rem 1rem;
  &:hover {
    background-color: lightgrey;
  }
}

.nav-text {
  padding-left: 1rem;
}

.material-icons {
  font-size: 24px;
  color: black;
  vertical-align: middle;
}

a,
p {
  vertical-align: middle;
  font-size: 1rem;
  color: black;
  font-weight: 400;
}

a {
  outline: none;
  text-decoration: none !important;
}

.active {
  background-color: lightgrey;
  p {
    font-weight: 500;
  }
  .material-icons {
    color: red;
    font-weight: 500;
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
