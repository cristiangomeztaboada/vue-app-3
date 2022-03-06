<template>
<div v-show="informacion?true:false" class="alert alert-primary" role="alert">
    {{informacion}}
  </div>
  <div v-show="error?true:false" class="alert alert-danger" role="alert">
    {{error}}
  </div>
</template>

<script>
export default {
  name: "ComponenteAlerta",
  components: {},
  props: {
    informacion: String,
    error: String,
  },
  setup() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
