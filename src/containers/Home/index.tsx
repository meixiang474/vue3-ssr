import { RootState } from "@/typings";
import { computed, defineComponent } from "vue";
import { useStore, Store } from "vuex";
import { RouteLocationNormalizedLoaded } from "vue-router";
import * as Types from "@/store/constants";
import "./style.less";

const Home = defineComponent({
  name: "Home",
  props: {},
  setup() {
    const store = useStore<RootState>();
    const name = computed(() => {
      return store.state.home.name;
    });
    const test = computed(() => {
      return store.state.home.test;
    });
    return () => {
      return (
        <>
          <div class="home-name">{name.value}</div>
          <div>{test.value}</div>
          <button>click</button>
        </>
      );
    };
  },
  asyncData(store: Store<RootState>, route: RouteLocationNormalizedLoaded) {
    console.log(route);
    return store.dispatch(`home/${Types.CHANGE_TEST}`);
  },
});

export default Home;
