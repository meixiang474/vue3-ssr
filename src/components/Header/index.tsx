import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export const Header = defineComponent({
  name: "Header",
  props: {},
  setup() {
    return () => {
      return (
        <div>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/login">login</RouterLink>
        </div>
      );
    };
  },
});
