<template>
  <div></div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from "vue-router";

export default {
  name: "ComponentePrincipal",
  components: {},
 setup() {
   const store = useStore();
   const router = useRouter();
   if (!store.state.usuario){
     router.push({ name: "login" });
   }
 },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
