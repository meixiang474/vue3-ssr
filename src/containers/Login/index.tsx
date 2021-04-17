import { defineComponent } from "vue";

const Login = defineComponent({
  name: "Login",
  props: {},
  setup() {
    return () => {
      return <div>login</div>;
    };
  },
});

export default Login;
