import {
    shallowMount
} from "@vue/test-utils";
import NavLink from "@/components/Navbar/NavLink.vue";

describe("NavLink.vue", () => {
    it("Nav Link Rendering", () => {
        const props = {
            to: "Home",
            icon: "home",
            text: "Home Link",
            page: "home",
            bottom: false
        }
        const wrapper = shallowMount(NavLink, {
            propsData: props,
            stubs: ['router-link']
        });
        expect(wrapper.props().to).toBe(props.to);
        expect(wrapper.props().icon).toBe(props.icon);
        expect(wrapper.props().text).toBe(props.text);
        expect(wrapper.props().page).toBe(props.page);
        expect(wrapper.props().bottom).toBe(props.bottom);
    });
});