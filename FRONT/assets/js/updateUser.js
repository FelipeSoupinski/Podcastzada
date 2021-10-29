function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const currentUser = parseJwt(localStorage.getItem('jwt'));

const alterEmail = document.querySelector('#alterEmail');
const alterSenha = document.querySelector('#alterSenha');
const inputEmailNovo = document.querySelector('#newemail')
const inputSenhaNova = document.querySelector('#NewPassword');
const inputSenhaVelha1 = document.querySelector('#password');
const inputSenhaVelha2 = document.querySelector('#OldPassword')

if(alterEmail) {
  alterEmail.addEventListener('click', async () => {
   await alterarEmail();
  })
}

if(alterSenha) {
  alterSenha.addEventListener('click', async () => {
   await alterarSenha();
  })
}

async function alterarEmail() {
  if(inputSenhaVelha1.value == "") {
    alert('Forneça sua senha atual');
    return;
  } 

  if(inputEmailNovo.value == "") {
    alert('Forneça um novo email');
    return;
  }

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);

  const response = await performPutHttpRequest(`http://localhost:3000/usuarios/${currentUser.id}`, headers, {email: inputEmailNovo.value});

  if(response) {
    alert(response.message);
    const loginResponse = await performPostHttpRequest('http://localhost:3000/login', headers, {email: inputEmailNovo.value, senha: inputSenhaVelha1.value});
    console.log(loginResponse)
    localStorage.setItem('jwt', loginResponse.token);
  } else{
    alert("Erro inesperado");
  }
}

async function alterarSenha() {
  if(inputSenhaVelha2.value == "") {
    alert('Forneça sua senha atual');
    return;
  } 

  if(inputSenhaNova.value == "") {
    alert('Forneça uma nova senha');
    return;
  }

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);

  const response = await performPutHttpRequest(`http://localhost:3000/usuarios/${currentUser.id}`, headers, {senha: inputSenhaNova.value});

  if(response) {
    alert(response.message);
    const loginResponse = await performPostHttpRequest('http://localhost:3000/login', headers, {email: currentUser.email, senha: inputSenhaNova.value});
    localStorage.setItem('jwt', loginResponse.token);
  } else{
    alert("Erro inesperado");
  }
}
async function performPutHttpRequest(url, headers, body) {
  if(!url || !headers || !body) {
    throw new Error("One or more PUT Request parameters are missing");
  }

  try {
    const rawResponse = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body)
    });

    const content = await rawResponse.json();
    return content;
  } catch(err) {
    console.error(`Error at fetch PUT: ${err}`);
    throw err;
  }
}

async function performPostHttpRequest(url, headers, body) {
  if(!url || !headers || !body) {
    throw new Error("One or more POST Request parameters are missing");
  }

  try {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    const content = await rawResponse.json();
    return content;
  } catch(err) {
    console.error(`Error at fetch POST: ${err}`);
    throw err;
  }
}
