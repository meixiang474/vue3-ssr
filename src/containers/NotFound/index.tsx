import { defineComponent } from "vue";

const NotFound = defineComponent({
  name: "NotFound",
  props: {},
  setup() {
    return () => {
      return <div>not found</div>;
    };
  },
});

export default NotFound;
