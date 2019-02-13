<template>
  <div class="bg-1">
    <b-container fluid>
      <b-row align-v="center">
        <b-col
          lg="4"
          offset-lg="4"
          md="8"
          offset-md="2"
        >
          <b-card
            class="min"
            no-body
          >
            <b-tabs card>
              <b-tab
                title="Login"
                active
              >
                <Login
                  :form="loginForm"
                  :on-submit="onLoginSubmit"
                />
              </b-tab>
              <b-tab title="Sign Up">
                <SignUp
                  :form="signForm"
                  :on-submit="onSignUpSubmit"
                />
              </b-tab>
              <b-tab title="Reset Password">
                <ResetPassword
                  :form="resetForm"
                  :on-submit="onResetPasswordSubmit"
                />
              </b-tab>
            </b-tabs>
            <template>
              <div v-if="message">
                <b-alert show>
                  {{ message }}
                </b-alert>
              </div>
            </template>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ResetPassword from "@/components/Auth/ResetPassword";
import Login from "@/components/Auth/Login";
import SignUp from "@/components/Auth/SignUp";
import { mapActions, mapState } from "vuex";

export default {
  name: "Auth",
  components: {
    ResetPassword,
    Login,
    SignUp
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      resetForm:{
        email: ""
      },
      signForm:{
        name:"",
        email:"",
        password:""
      }
    };
  },
  computed:{
    ...mapState(['user', "message"]),
  },
  methods: {
    ...mapActions(["login", "signup"]),
    onLoginSubmit(e) {
      e.preventDefault();
      this.login(this.loginForm)
    },
    onResetPasswordSubmit(e) {
      e.preventDefault();
    },
    onSignUpSubmit(e) {
      e.preventDefault();
      this.signup(this.signForm)
    }
  }
};
</script>

<style lang="scss" scoped>
.min {
  min-height: 450px;
}
@media(min-width: 768px){
  .min{
    min-width: 450px;
  }
}
.bg-1 {
  height: 100%;
  background-image: url("https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?cs=srgb&dl=architecture-bridge-fog-1141853.jpg&fm=jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
