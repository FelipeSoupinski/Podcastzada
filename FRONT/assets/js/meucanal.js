const nomeCanal = document.querySelector("#nomeCanal");
const descricaoCanal = document.querySelector("#descricaoCanal");
const deleteCanal = document.querySelector("#deleteCanal");

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const currentUser = parseJwt(localStorage.getItem('jwt'));

if(currentUser) {
  fillFields();
}

if(deleteCanal) {
  deleteCanal.addEventListener("click", function() {
    deletarCanal()
  })
}

async function fillFields() {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);

  const rawResponse = await performPostHttpRequest('http://localhost:3004/canais/find', headers, { usuario_id: currentUser.id });
  const canal = await rawResponse.json();

  if(canal.canal) {
    nomeCanal.innerText = canal.canal.nome;
    descricaoCanal.innerText = canal.canal.descricao;
  } else {
    alert('Você ainda não possui um canal. Por favor, cadastre um');
    window.location.href = '../Canais/add.html';
  }
}

async function deletarCanal() {
  if (confirm("Voc\u00ea realmente deseja apagar este canal?")) { 
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);

    const rawResponse = await performDeleteHttpRequest(`http://localhost:3004/canais/${currentUser.id}`, headers);
    const response = await rawResponse.json();

    if(rawResponse.status === 200) {
      alert(response.message);
      window.location.href = '../Home/home.html';
    } else {
      alert('Erro inesperado');
    }
  }
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

async function performDeleteHttpRequest(url, headers) {
  if(!url || !headers) {
    throw new Error("One or more DELETE Request parameters are missing");
  }

  try {
    return rawResponse = await fetch(url, {
      method: 'DELETE',
      headers: headers
    });
    
  } catch(err) {
    console.error(`Error at fetch DELETE: ${err}`);
    throw err;
  }
}

