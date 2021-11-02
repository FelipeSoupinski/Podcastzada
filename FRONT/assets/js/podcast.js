const podcastForm = document.querySelector("#podcastForm");
const tituloPod = document.getElementsByName("titulo")[0];
const descricaoPod = document.getElementsByName("descricao")[0];

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const currentUser = parseJwt(localStorage.getItem('jwt'));

if(podcastForm) {
  podcastForm.addEventListener("submit",  function(e) {
   submitForm(e, this);
  });
}

async function submitForm(e, form) {
  e.preventDefault();
  
  const jsonFormData = buildJsonFormData(form);
  var jsonPayload;
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);

  const rawCanal = await performPostHttpRequest('http://localhost:3004/canais/find', headers, {...jsonFormData, usuario_id: currentUser.id});
  const canal = await rawCanal.json();

  if(canal.canal) {
    jsonPayload = {canal_id: canal.canal.id, ...jsonFormData};
  }

  const rawResponse = await performPostHttpRequest('http://localhost:3003/episodios', headers, jsonPayload);
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
