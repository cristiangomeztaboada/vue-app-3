import { createRouter, createWebHashHistory } from "vue-router";
import VistaPrincipal from "@/views/VistaPrincipal.vue";
import VistaLogin from "@/views/VistaLogin.vue";
import MaestroGenericoGrid from "@/views/maestroGenerico/MaestroGenericoGrid.vue";
import MaestroGenericoFormulario from "@/views/maestroGenerico/MaestroGenericoFormulario.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: VistaLogin,
  },
  {
    path: "/principal",
    name: "principal",
    component: VistaPrincipal,
  },
  {
    path: "/maestrogenerico",
    name: "maestrogenerico",
    component: MaestroGenericoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/maestrogenericoformulario",
    name: "maestrogenericoformulario",
    component: MaestroGenericoFormulario,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to,from) => {  
  if(from.name=="login" && !sessionStorage.getItem("usuario")){
    return false;
  }
  else{
    return true;
  }
})

export default router;
