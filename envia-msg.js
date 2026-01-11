// ===== ENVIA PARA N8N VIA WEBHOOK =====

export async function enviaMsgN8n(dadosEnvio){
  const productionURL = process.env.url_webhook_n8n

  let envioWH;
  try {
    envioWH = await fetch(productionURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosEnvio)
    });
  } catch (err) {
    console.error('❌ Erro de rede ao enviar webhook n8n:', err);
    throw err;
  }

  if (!envioWH.ok) {
    const erro = await envioWH.text();
    throw new Error(`❌ Webhook n8n falhou (${envioWH.status}): ${erro}`);
  }
}
