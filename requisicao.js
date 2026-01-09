import criaJWT from './jtw.js'


export async function executaRotina() {

  // ===== INICIA PROCESSO DE REQUISÇÃO =====
  const jwt = criaJWT()

  // ===== REQUEST TOKEN =====

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt,
  });

  const resposta = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  const respostaToken = await resposta.json();
  const accessToken = respostaToken.access_token

  // ===== REQUEST REVIEWS =====

  const response = await fetch('https://www.googleapis.com/androidpublisher/v3/applications/app.prit.business/reviews', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  const dataJson = await response.json();
  
  // ===== ENVIA PARA N8N VIA WEBHOOK =====
  
  const productionURL = process.env.url_webhook_n8n

  const envioWH = await fetch(productionURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataJson)
  });

  // ===== FINALIZA PROCESSO =====
}
