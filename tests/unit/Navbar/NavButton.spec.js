import {
  shallowMount
} from "@vue/test-utils";
import NavButton from "@/components/Navbar/NavButton.vue";

describe("NavButton.vue", () => {
  const props = {
    icon: "home",
    text: "Home Button",
    bottom: true
  }

  it("Nav Button Rendering", () => {
    const wrapper = shallowMount(NavButton, {
      propsData: props
    });
    expect(wrapper.props().icon).toBe(props.icon);
    expect(wrapper.props().text).toBe(props.text);
    expect(wrapper.props().bottom).toBe(props.bottom);
  });

  it("Nav Button Click", ()=>{
    const wrapper = shallowMount(NavButton, {
      propsData: props
    })
    const button = wrapper.find('.nav-button');
    button.trigger('click')
  })

  it("Nav Button Style", ()=>{
    const wrapper = shallowMount(NavButton, {
      propsData: props
    })
    const button = wrapper.find('.nav-button');
    button.trigger('click')
  })
});