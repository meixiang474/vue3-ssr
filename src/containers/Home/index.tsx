import { RootState } from "@/typings";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import "./style.less";

const Home = defineComponent({
  name: "Home",
  props: {},
  setup() {
    const store = useStore<RootState>();
    const name = computed(() => {
      return store.state.home.name;
    });
    return () => {
      return (
        <>
          <div class="home-name">{name.value}</div>
          <button>click</button>
        </>
      );
    };
  },
});

export default Home;
