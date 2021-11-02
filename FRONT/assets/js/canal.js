const canalForm = document.querySelector("#canal");
const nomeCanal = document.getElementsByName("nome")[0];
const categoriaCanal = document.getElementsByName("categoria")[0];
const descricaoCanal = document.getElementsByName("descricao")[0];

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const currentUser = parseJwt(localStorage.getItem('jwt'));

if(canalForm) {
  fillFields();
  canalForm.addEventListener("submit",  function(e) {
   submitForm(e, this);
  });
}

async function submitForm(e, form) {
  e.preventDefault();
  
  const jsonFormData = buildJsonFormData(form);
  var jsonPayload = {...jsonFormData, usuario_id: currentUser.id};
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);

  const editOrCreate = await performPostHttpRequest('http://localhost:3004/canais/find', headers, jsonPayload);
  const canal = await editOrCreate.json();

  if(canal.canal) {
    jsonPayload = {id: canal.canal.id, ...jsonPayload};
  }

  const rawResponse = await performPostHttpRequest('http://localhost:3004/canais', headers, jsonPayload);
  const jsonResponse = await rawResponse.json();

  if(rawResponse.status === 200) {
    alert(jsonResponse.message);
    window.location.href = '../Canais/meucanal.html';
  } else if(rawResponse.status === 401) {
    alert(jsonResponse.message);
  } else {
    alert('Erro inesperado');
  }
}

async function fillFields() {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);

  const editOrCreate = await performPostHttpRequest('http://localhost:3004/canais/find', headers, {usuario_id: currentUser.id});
  const canal = await editOrCreate.json();
  if(canal.canal) {
    nomeCanal.value = canal.canal.nome;
    categoriaCanal.value = canal.canal.categoria;
    descricaoCanal.value = canal.canal.descricao;
  }
}

function buildJsonFormData(form) {
  const jsonFormData = { };
  for(const pair of new FormData(form)) {
    jsonFormData[pair[0]] = pair[1];
  }

  return jsonFormData;
}

async function performPostHttpRequest(url, headers,body) {
  if(!url || !headers || !body) {
    throw new Error("One or more POST Request parameters are missing");
  }

  try {
    return rawResponse = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });
    
  } catch(err) {
    console.error(`Error at fetch POST: ${err}`);
    throw err;
  }
}
