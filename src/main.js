import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";
import * as VueGoogleMaps from 'vue2-google-maps'
import FlashMessage from '@smartweb/vue-flash-message';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-flash-message/dist/vue-flash-message.min.css';
import moment from 'moment'
import VueFlashMessage from 'vue-flash-message';
Vue.prototype.moment = moment

Vue.use(BootstrapVue);
Vue.use(FlashMessage, {
  time: 3000,
});
Vue.use(VueFlashMessage);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDt0UBms1C1UbTGFQeFgX4Wj8Yo3aJVPQ8',
    libraries: 'places',
  },
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
