const cadastrarCanal = document.querySelector("#canal");

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const currentUser = parseJwt(localStorage.getItem('jwt'));

if(cadastrarCanal) {
  cadastrarCanal.addEventListener("submit",  function(e) {
   submitForm(e, this);
  });
}

async function submitForm(e, form) {
  e.preventDefault();
  
  const jsonFormData = buildJsonFormData(form);
  const jsonPayload = {...jsonFormData, usuario_id: currentUser.id};
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', localStorage.getItem('jwt'));

  const rawResponse = await performPostHttpRequest('http://localhost:3004/canais', headers, jsonPayload);
  const jsonResponse = await rawResponse.json();

  if(rawResponse.status === 200) {
    alert()
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
