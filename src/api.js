const url = "http://localhost:3000"; //Express
//const url = "http://127.0.0.1:8000"; //Django Rest Framework

const manejarError = function (res) {
  if (!res.ok) {
    throw res.statusText;
  }
  return res;
};

const listarUsuario = function () {
  const url = "http://127.0.0.1:8000"; //Django Rest Framework
  return fetch(`${url}/usuario`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarUsuario = function (codigo) {
  const url = "http://127.0.0.1:8000"; //Django Rest Framework
  return fetch(`${url}/usuario/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarUsuario = function (usuario) {
  const url = "http://127.0.0.1:8000"; //Django Rest Framework
  return fetch(`${url}/usuario/`, {
    method: "POST",
    body: JSON.stringify(usuario),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

const actualizarUsuario = function (usuario) {
  const url = "http://127.0.0.1:8000"; //Django Rest Framework
  return fetch(`${url}/usuario/${usuario.codigo}/`, {
    method: "PUT",
    body: JSON.stringify(usuario),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

const eliminarUsuario = function (codigo) {
  const url = "http://127.0.0.1:8000"; //Django Rest Framework
  return fetch(`${url}/usuario/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarInstitucionEducativa = function () {
  const url = "http://127.0.0.1:8000"; //Django Rest Framework
  return fetch(`${url}/institucioneducativa`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarInstitucionEducativa = function (codigo) {
  const url = "http://127.0.0.1:8000"; //Django Rest Framework
  return fetch(`${url}/institucioneducativa/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarInstitucionEducativa = function (institucionEducativa) {
  const url = "http://127.0.0.1:8000"; //Django Rest Framework
  return fetch(`${url}/institucioneducativa/`, {
    method: "POST",
    body: JSON.stringify(institucionEducativa),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

const actualizarInstitucionEducativa = function (institucionEducativa) {
  const url = "http://127.0.0.1:8000"; //Django Rest Framework
  return fetch(`${url}/institucioneducativa/${institucionEducativa.codigo}/`, {
    method: "PUT",
    body: JSON.stringify(institucionEducativa),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

const eliminarInstitucionEducativa = function (codigo) {
  const url = "http://127.0.0.1:8000"; //Django Rest Framework
  return fetch(`${url}/institucioneducativa/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarTipoContrato = function () {
  return fetch(`${url}/tipocontrato`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarTipoContrato = function (codigo) {
  return fetch(`${url}/tipocontrato/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const consultarTipoContrato = function (codigo) {
  return fetch(`${url}/tipocontrato/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarTipoContrato = function (tipoContrato) {
  return fetch(`${url}/tipocontrato`, {
    method: "POST",
    body: JSON.stringify(tipoContrato),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

const listarTipoRecaudo = function () {
  return fetch(`${url}/tiporecaudo`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarTipoRecaudo = function (tipoRecaudo) {
  return fetch(`${url}/tiporecaudo`, {
    method: "POST",
    body: JSON.stringify(tipoRecaudo),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

const consultarTipoRecaudo = function (codigo) {
  return fetch(`${url}/tiporecaudo/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarTipoRecaudo = function (codigo) {
  return fetch(`${url}/tiporecaudo/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarPersonalPlanta = function () {
  return fetch(`${url}/personalplanta`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarPersonalPlanta = function (codigo) {
  return fetch(`${url}/personalplanta/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarPersonalPlanta = function (personalPlanta) {
  return fetch(`${url}/personalplanta`, {
    method: "POST",
    body: JSON.stringify(personalPlanta),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

const eliminarPersonalPlanta = function (codigo) {
  return fetch(`${url}/personalplanta/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarFuenteRecurso = function () {
  return fetch(`${url}/fuenterecurso`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarFuenteRecurso = function (codigo) {
  return fetch(`${url}/fuenterecurso/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarFuenteRecurso = function (fuenteRecurso) {
  return fetch(`${url}/fuenterecurso`, {
    method: "POST",
    body: JSON.stringify(fuenteRecurso),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

const eliminarFuenteRecurso = function (codigo) {
  return fetch(`${url}/fuenterecurso/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarRubroPresupuesto = function () {
  return fetch(`${url}/rubropresupuesto`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarRubroPresupuesto = function (codigo) {
  return fetch(`${url}/rubropresupuesto/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarRubroPresupuesto = function (rubroPresupuesto) {
  return fetch(`${url}/rubropresupuesto`, {
    method: "POST",
    body: JSON.stringify(rubroPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

const eliminarRubroPresupuesto = function (codigo) {
  return fetch(`${url}/rubropresupuesto/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarTipoIdentificacion = function () {
  return fetch(`${url}/tipoidentificacion`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarTipoIdentificacion = function (codigo) {
  return fetch(`${url}/tipoidentificacion/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarTipoIdentificacion = function (codigo) {
  return fetch(`${url}/tipoidentificacion/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const insertarTipoIdentificacion = function (rubroPresupuesto) {
  return fetch(`${url}/tipoidentificacion`, {
    method: "POST",
    body: JSON.stringify(rubroPresupuesto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

const listarTercero = function () {
  return fetch(`${url}/tercero`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarTercero = function (codigo, tipoIdentificacionCodigo) {
  return fetch(`${url}/tercero/${codigo}/${tipoIdentificacionCodigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const insertarTercero = function (tercero) {
  return fetch(`${url}/tercero`, {
    method: "POST",
    body: JSON.stringify(tercero),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

const eliminarTercero = function (codigo, tipoIdentificacionCodigo) {
  return fetch(`${url}/tercero/${codigo}/${tipoIdentificacionCodigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const listarPeriodo = function () {
  return fetch(`${url}/periodo`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const consultarPeriodo = function (codigo) {
  return fetch(`${url}/periodo/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarPeriodo = function (codigo) {
  return fetch(`${url}/periodo/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

const insertarPeriodo = function (periodo) {
  return fetch(`${url}/periodo`, {
    method: "POST",
    body: JSON.stringify(periodo),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

export default {
  listarUsuario,
  consultarUsuario,
  insertarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  listarInstitucionEducativa,
  insertarInstitucionEducativa,
  actualizarInstitucionEducativa,
  consultarInstitucionEducativa,
  eliminarInstitucionEducativa,
  listarTipoContrato,
  eliminarTipoContrato,
  consultarTipoContrato,
  insertarTipoContrato,
  listarTipoRecaudo,
  consultarTipoRecaudo,
  insertarTipoRecaudo,
  eliminarTipoRecaudo,
  listarPersonalPlanta,
  consultarPersonalPlanta,
  insertarPersonalPlanta,
  eliminarPersonalPlanta,
  listarFuenteRecurso,
  consultarFuenteRecurso,
  insertarFuenteRecurso,
  eliminarFuenteRecurso,
  listarRubroPresupuesto,
  consultarRubroPresupuesto,
  insertarRubroPresupuesto,
  eliminarRubroPresupuesto,
  listarTipoIdentificacion,
  consultarTipoIdentificacion,
  eliminarTipoIdentificacion,
  insertarTipoIdentificacion,
  listarTercero,
  consultarTercero,
  insertarTercero,
  eliminarTercero,
  listarPeriodo,
  consultarPeriodo,
  eliminarPeriodo,
  insertarPeriodo,
};
