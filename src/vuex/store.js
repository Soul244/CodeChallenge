import Vue from 'vue';
import Vuex from 'vuex';
import actions from './Actions';
import mutations from './Mutations';
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    doneTasks:[],
    activeTasks:[],
    isFetching:false,
    isFetched:false,
    userLocation: {
      lat: '',
      lng: ''
    },
    task: {},
    errors: [],
    message: [],
    user: {
      _id:'',
      email:'',
      name:'',
      token:''
    }
  },
  mutations,
  actions,
  getters: {
    message: state => state.message
  },
  plugins: [createLogger()]
});