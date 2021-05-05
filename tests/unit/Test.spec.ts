import { shallowMount, VueWrapper } from "@vue/test-utils";
import Test from "@/components/Test.vue";

let wrapper: VueWrapper<any>;

describe("test Test Component", () => {
  beforeAll(() => {
    wrapper = shallowMount(Test);
  });
  it("should render correct", () => {
    expect(wrapper.text()).toBe("111");
  });
});
