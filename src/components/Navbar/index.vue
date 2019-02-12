<template>
  <div class="container">
    <div class="user-item">
      <img
        class="user-image"
        src="@/assets/user.svg"
        alt=""
        srcset=""
      >
      <p class="user-text">
        {{ name }}
      </p>
    </div>
    <NavLink
      text="Home"
      to="/"
      icon="home"
      :page="page"
    />
    <NavButton
      text="Logout"
      icon="power_settings_new"
      bottom
      @click="logout()"
    />
  </div>
</template>
<script>
import NavLink from "./NavLink";
import NavButton from "./NavButton";
import {mapActions} from "vuex";
export default {
  name: "Navbar",
  components:{
    NavLink,
    NavButton
  },
  data: function() {
    return {
      page: this.$route.path,
      name: localStorage.getItem('name')
    };
  },
  watch: {
    $route(to, from) {
      this.page = this.$route.path;
    }
  },
  methods:{
    ...mapActions(['logout']),
  },
};
</script>

<style scoped lang="scss">
.user-item{
  padding: 1rem;
}
.user-image{
  width: 48px;
  height: 48px;
  border: 1px solid darkgrey;
  border-radius: 100%;
}
.user-text{
  padding-left: 1rem;
  color: black;
  vertical-align: middle;
}
@media (max-width: 992px) {
  .user-item {
    padding: 16px;
    width: 100%;
    height: 64px;
  }
  .user-image{
    width: 32px;
    height: 32px;
}
  .user-text {
    display: none;
  }
}
.container {
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.12);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  width: 240px;
  background-color: white;
  text-align: left;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  left: 0;
  height: 100%;
}
@media (max-width: 992px) {
  .container {
    width: 64px;
  }
}
</style>