import { defineComponent } from "vue";

const Home = defineComponent({
  name: "Home",
  props: {},
  setup() {
    return () => {
      return <div>Home</div>;
    };
  },
});

export default Home;
