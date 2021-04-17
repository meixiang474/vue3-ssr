import { defineComponent, ref, watchEffect } from "vue";
import { RouterView, useRoute } from "vue-router";
import { Header } from "@/components";

const App = defineComponent({
  name: "App",
  props: {},
  setup() {
    const withHeaders = ["Home", "Login"];
    const showHeader = ref(true);
    const route = useRoute();
    watchEffect(() => {
      if (withHeaders.includes(route.name as string)) {
        showHeader.value = true;
      } else {
        showHeader.value = false;
      }
    });
    return () => {
      return (
        <div>
          {showHeader.value && <Header />}
          <RouterView />
        </div>
      );
    };
  },
});

export default App;
