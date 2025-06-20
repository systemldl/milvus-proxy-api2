export default async function handler(req, res) {
  const token = process.env.MILVUS_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "Token não configurado na Vercel." });
  }

  const url = "https://apiintegracao.milvus.com.br/api/chamado/listagem";

  const payload = {
    filtro_body: {
      pagina: 1,
      quantidade: 50,
      status: [],
      tecnico_id: null,
      categoria_id: null,
      subcategoria_id: null
    }
  };

  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const texto = await resposta.text();

    res.status(resposta.status).send(texto);
  } catch (erro) {
    res.status(500).json({ erro: "Erro na requisição à API Milvus", detalhes: erro.message });
  }
}
