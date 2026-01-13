import 'dotenv/config';
import criaJWT from './jtw.js'
import enviaMsgN8n from './envia-msg.js';

export async function executaRotina() {

  // ===== INICIA PROCESSO DE REQUISÇÃO =====
  const jwt = criaJWT()

  // ===== REQUEST TOKEN =====

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt,
  });

  let resposta;
  try {
    resposta = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
  } catch (err) {
    console.error('❌ Erro de rede ao buscar token Google:', err);
    throw err;
  }

  if (!resposta.ok) {
    const erro = await resposta.text();
    throw new Error(`❌ Token Google falhou (${resposta.status}): ${erro}`);
  }

  const respostaToken = await resposta.json();
  const accessToken = respostaToken.access_token

  // ===== REQUEST REVIEWS =====

  let response;
  try {
    response = await fetch(
      'https://www.googleapis.com/androidpublisher/v3/applications/app.prit.business/reviews',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      }
    );
  } catch (err) {
    console.error('❌ Erro de rede ao buscar reviews:', err);
    throw err;
  }

  if (!response.ok) {
    const erro = await response.text();
    throw new Error(`❌ Reviews API falhou (${response.status}): ${erro}`);
  }

  const dataJson = await response.json();

  
  // ===== ENVIA PARA N8N VIA WEBHOOK =====
  enviaMsgN8n(dataJson)

  console.log('Código rodou até o final')
}


