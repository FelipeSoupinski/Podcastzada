if(localStorage.getItem('jwt')) {
  window.location.href = '../Home/home.html';
}

const loginForm = document.querySelector("#registerForm");

if(loginForm) {
  loginForm.addEventListener("submit", function(e) {
    submitForm(e, this);
  });
}

async function submitForm(e, form) {
  e.preventDefault();
  
  const jsonFormData = buildJsonFormData(form);
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  const response = await performPostHttpRequest('http://localhost:3000/usuarios', headers, jsonFormData);
  
  if(response) {
    const { email, senha } = jsonFormData;
    const loginResponse = await performPostHttpRequest('http://localhost:3000/login', headers, {email: email, senha: senha});
    localStorage.setItem('jwt', loginResponse.token);
    window.location.href = '../Home/home.html';
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
