export default async function handler(req, res) {
  const token = process.env.MILVUS_TOKEN;
  const body = req.body || { filtro_body: { pagina: 1, quantidade: 50 } };

  try {
    const response = await fetch('https://apiintegracao.milvus.com.br/api/chamado/listagem', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
