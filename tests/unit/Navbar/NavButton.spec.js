import {
  shallowMount
} from "@vue/test-utils";
import NavButton from "@/components/Navbar/NavButton.vue";

describe("NavButton.vue", () => {
  it("Nav Button Rendering", () => {
    const props = {
      icon: "home",
      text: "Home Button",
      bottom: false
    }
    const wrapper = shallowMount(NavButton, {
      propsData: props
    });
    expect(wrapper.props().icon).toBe(props.icon);
    expect(wrapper.props().text).toBe(props.text);
    expect(wrapper.props().bottom).toBe(props.bottom);
  });
});