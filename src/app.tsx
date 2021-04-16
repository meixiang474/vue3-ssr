import { defineComponent } from "vue";
import { RouterView } from "vue-router";

let a = 1;
if (a == 2) {
}

const App = defineComponent({
  name: "App",
  props: {},
  setup() {
    return () => {
      return (
        <div id="app">
          <RouterView />
        </div>
      );
    };
  },
});

export default App;
