import { createRouter, createWebHashHistory } from "vue-router";
import VistaPrincipal from "@/views/VistaPrincipal.vue";
import VistaLogin from "@/views/VistaLogin.vue";
import MaestroGenericoGrid from "@/views/maestroGenerico/MaestroGenericoGrid.vue";
import MaestroGenericoFormulario from "@/views/maestroGenerico/MaestroGenericoFormulario.vue";
import UsuarioGrid from "@/views/usuario/UsuarioGrid.vue";
import UsuarioFormulario from "@/views/usuario/UsuarioFormulario.vue";
import InstitucionEducativaGrid from "@/views/institucionEducativa/InstitucionEducativaGrid.vue";
import InstitucionEducativaFormulario from "@/views/institucionEducativa/InstitucionEducativaFormulario.vue";

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
  {
    path: "/usuario",
    name: "usuario",
    component: UsuarioGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/usuarioformulario",
    name: "usuarioformulario",
    component: UsuarioFormulario,
  },
  {
    path: "/institucioneducativa",
    name: "institucioneducativa",
    component: InstitucionEducativaGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/institucioneducativaformulario",
    name: "institucioneducativaformulario",
    component: InstitucionEducativaFormulario,
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
