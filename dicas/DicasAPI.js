const URL_BASE = 'https://api-caminho-certo.tarleylana.repl.co/api/dicas'

const getDica = (id) => 
  fetch(`${URL_BASE}/${id}?base64=true`)
    .then(res => res.json())

const getAllDicas = () =>
  fetch(URL_BASE)
    .then(res => res.json())

export {
  getDica,
  getAllDicas
}


  