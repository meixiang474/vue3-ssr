import { defineComponent } from "vue";
import { RouterView } from "vue-router";

const App = defineComponent({
  name: "App",
  props: {},
  setup() {
    return () => {
      return (
        <div>
          <RouterView />
        </div>
      );
    };
  },
});

export default App;
