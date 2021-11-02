const nomeCanal = document.querySelector("#nomeCanal");
const descricaoCanal = document.querySelector("#descricaoCanal");
const deleteCanal = document.querySelector("#deleteCanal");
const epDiv = document.querySelector("#envio");

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

function dataAtualFormatada(){
  var data = new Date(),
      dia  = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0'+dia : dia,
      mes  = (data.getMonth()+1).toString(),
      mesF = (mes.length == 1) ? '0'+mes : mes,
      anoF = data.getFullYear();
  return diaF+"/"+mesF+"/"+anoF;
}

const currentUser = parseJwt(localStorage.getItem('jwt'));

if(currentUser) {
  fillFields();
  duplicarCampos();
}

if(deleteCanal) {
  deleteCanal.addEventListener("click", function() {
    deletarCanal()
  })
}

async function duplicarCampos() {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);

  const rawResponse = await performPostHttpRequest('http://localhost:3004/canais/find', headers, { usuario_id: currentUser.id });
  const canal = await rawResponse.json();

  if(canal.canal) {
    const rawEps = await performGetHttpRequest(`http://localhost:3003/episodios/list/${canal.canal.id}`, headers);
    const eps = await rawEps.json();

    for(ep of eps) {
      var clone = epDiv.cloneNode(true);
      clone.setAttribute("id", ep.id);
      clone.setAttribute("style", "display: block");
      clone.querySelector("#data").innerText = "Postado em " + dataAtualFormatada(ep.updatedAt);
      clone.querySelector("#titulo").innerText = ep.titulo;
      clone.querySelector("#descricao").innerText = ep.descricao;

      const deleteEp = clone.querySelector("#deleteEp");
      deleteEp.addEventListener("click", async function() {
        if (confirm("Voc\u00ea realmente deseja apagar este episodio?")) { 
          const response = await performDeleteHttpRequest(`http://localhost:3003/episodios/${ep.id}`, headers);
      
          if(response) {
            alert(response.message);
            window.location.href = '../Canais/meucanal.html';
          } else {
            alert('Erro inesperado');
          }
        }
      })

      document.getElementById("receiver").appendChild(clone);
    }
  }
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

    const response = await performDeleteHttpRequest(`http://localhost:3004/canais/${currentUser.id}`, headers);

    if(response) {
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
    const rawResponse = await fetch(url, {
      method: 'DELETE',
      headers: headers
    });
    
    return await rawResponse.json();
  } catch(err) {
    console.error(`Error at fetch DELETE: ${err}`);
    throw err;
  }
}

async function performGetHttpRequest(url, headers) {
  if(!url || !headers) {
    throw new Error("One or more GET Request parameters are missing");
  }

  try {
    return rawResponse = await fetch(url, {
      method: 'GET',
      headers: headers
    });
    
  } catch(err) {
    console.error(`Error at fetch GET: ${err}`);
    throw err;
  }
}

