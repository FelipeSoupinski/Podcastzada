if(localStorage.getItem('jwt')) {
  window.location.href = '../Home/home.html';
}

const loginForm = document.querySelector("#loginForm");

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
  const rawResponse = await performPostHttpRequest('http://localhost:3000/login', headers, jsonFormData);
  const jsonResponse = await rawResponse.json()
  if(rawResponse.status === 200) {
    localStorage.setItem('jwt',jsonResponse.token);
    window.location.href = '../Home/home.html';
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
