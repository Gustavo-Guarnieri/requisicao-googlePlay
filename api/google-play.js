import { executaRotina } from '../requisicao.js';

export default async function handler(req, res) {
  try {
    await executaRotina();
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao executar rotina' });
  }
}
