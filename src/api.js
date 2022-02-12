const url = "http://localhost:3000";

const manejarError = function (res) {
  if (!res.ok) {
    throw res.statusText;
  }
  return res;
};

const insertarMaestroGenerico = function (maestroGenerico) {
  return fetch(`${url}/maestrogenerico`, {
    method: "POST",
    body: JSON.stringify(maestroGenerico),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(manejarError)    
    .catch(function (e) {
      throw e;
    });
};

const consultarMaestroGenerico = function (codigo) {
  return fetch(`${url}/maestrogenerico/${codigo}`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const listarMaestroGenerico = function () {
  return fetch(`${url}/maestrogenerico`, { method: "GET" })
    .then(manejarError)
    .then((res) => res.json())
    .catch(function (e) {
      throw e;
    });
};

const eliminarMaestroGenerico = function (codigo) {
  return fetch(`${url}/maestrogenerico/${codigo}`, {
    method: "DELETE",
  })
    .then(manejarError)
    .catch(function (e) {
      throw e;
    });
};

export default {
  listarMaestroGenerico,
  eliminarMaestroGenerico,
  consultarMaestroGenerico,
  insertarMaestroGenerico,
};
