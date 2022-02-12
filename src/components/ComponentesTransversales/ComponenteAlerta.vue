<template>
  <div v-show="mensajeAlerta?true:false" class="alert alert-warning" role="alert">
    {{mensajeAlerta}}
  </div>
</template>

<script>
export default {
  name: "ComponenteAlerta",
  components: {},
  props: {
    mensajeAlerta:String,
  },
  setup() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
