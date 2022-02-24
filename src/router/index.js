import { createRouter, createWebHashHistory } from "vue-router";
import VistaPrincipal from "@/views/VistaPrincipal.vue";
import VistaLogin from "@/views/VistaLogin.vue";
import MaestroGenericoGrid from "@/views/maestroGenerico/MaestroGenericoGrid.vue";
import MaestroGenericoFormulario from "@/views/maestroGenerico/MaestroGenericoFormulario.vue";
import UsuarioGrid from "@/views/usuario/UsuarioGrid.vue";
import UsuarioFormulario from "@/views/usuario/UsuarioFormulario.vue";
import InstitucionEducativaGrid from "@/views/institucionEducativa/InstitucionEducativaGrid.vue";
import InstitucionEducativaFormulario from "@/views/institucionEducativa/InstitucionEducativaFormulario.vue";
import TipoContratoGrid from "@/views/tipoContrato/TipoContratoGrid.vue";
import TipoContratoFormulario from "@/views/tipoContrato/TipoContratoFormulario.vue";
import TipoRecaudoGrid from "@/views/tipoRecaudo/TipoRecaudoGrid.vue";
import TipoRecaudoFormulario from "@/views/tipoRecaudo/TipoRecaudoFormulario.vue";
import PersonalPlantaGrid from "@/views/personalPlanta/PersonalPlantaGrid.vue";
import PersonalPlantaFormulario from "@/views/personalPlanta/PersonalPlantaFormulario.vue";
import FuenteRecursoGrid from "@/views/fuenteRecurso/FuenteRecursoGrid.vue";
import FuenteRecursoFormulario from "@/views/fuenteRecurso/FuenteRecursoFormulario.vue";
import RubroPresupuestoGrid from "@/views/rubroPresupuesto/RubroPresupuestoGrid.vue";
import RubroPresupuestoFormulario from "@/views/rubroPresupuesto/RubroPresupuestoFormulario.vue";

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
  {
    path: "/tipocontrato",
    name: "tipocontrato",
    component: TipoContratoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/tipocontratoformulario",
    name: "tipocontratoformulario",
    component: TipoContratoFormulario,
  },
  {
    path: "/tiporecaudo",
    name: "tiporecaudo",
    component: TipoRecaudoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/tiporecaudoformulario",
    name: "tiporecaudoformulario",
    component: TipoRecaudoFormulario,
  },
  {
    path: "/personalplanta",
    name: "personalplanta",
    component: PersonalPlantaGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/personalplantaformulario",
    name: "personalplantaformulario",
    component: PersonalPlantaFormulario,
  },
  {
    path: "/fuenterecurso",
    name: "fuenterecurso",
    component: FuenteRecursoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/fuenterecursoformulario",
    name: "fuenterecursoformulario",
    component: FuenteRecursoFormulario,
  },
  {
    path: "/rubropresupuesto",
    name: "rubropresupuesto",
    component: RubroPresupuestoGrid,
    props: {
      mostrarColumnaBotones: true,
    },
  },
  {
    path: "/rubropresupuestoformulario",
    name: "rubropresupuestoformulario",
    component: RubroPresupuestoFormulario,
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
