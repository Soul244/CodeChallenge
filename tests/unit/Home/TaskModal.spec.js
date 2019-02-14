import {
    shallowMount
} from "@vue/test-utils";
import TaskModal from "@/components/Home/TaskModal.vue";

describe("TaskModal.vue", () => {
    it("Task Modal Rendering", () => {
        const props = {
            title: "Update Modal",
            task: {
                _id: "123456789",
                name: "Süleyman",
                surname: "Kalebayır",
                email: "hasancangedik@hotmail.com",
                address: {},
                phone: "05380867969",
                user: "142536475869",
                time: "14:25",
                date: "19/02/2019",
                isTaskDone: false,
                isTaskMissed: false
            },
            type: "update"
        }
        const wrapper = shallowMount(TaskModal, {
            propsData: props,
            computed: {
                resultMessage() {
                    return "message"
                }
            },
            stubs: ['b-form', "b-modal", "b-button", "b-form-group", "b-form-input", "FlashMessage", "gmap-autocomplete", "Gmap-Map"]
        });
        expect(wrapper.props().title).toBe(props.title);
        expect(wrapper.props().task).toBe(props.task);
        expect(wrapper.props().type).toBe(props.type);
    });
});