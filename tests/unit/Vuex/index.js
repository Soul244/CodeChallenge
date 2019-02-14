import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils'
import Vuex from 'vuex'
import Actions from '../../../src/vuex/Actions';

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Actions.vue", () => {
    return true;
    let actions;
    let store;
    /*
    beforeEach(() => {
        actions = {
            getTasks: jest.fn(),
            getTask: jest.fn(),
            postTask: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
            doneTask: jest.fn(),
            getDistance: jest.fn(),
            getUpdateTask: jest.fn(),
            clearTask: jest.fn(),
            setUserLocation: jest.fn(),
            login: jest.fn(),
            signup: jest.fn(),
            logout: jest.fn()
        }
        store = new Vuex.Store({
            actions
        })
        it("dispatch a message", ()=>{
            const wrapper = shallowMount(Actions, {store, localVue})
            const 
        })
    })*/
})