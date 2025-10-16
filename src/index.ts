import express from "express";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ body: "Olá, mundo!" });
});

app.get("/api", (req, res) => {
  res.json({ message: "Rota /api funcionando!" });
});

app.get("/api/usuario/:nome", (req, res) => {
  const nome = req.params.nome;
  res.json({ mensagem: `Bem-vindo, ${nome}!` });
});

app.post("/api/dados", (req, res) => {
  const dados = req.body;
  res.json({ recebido: dados });
});

app.listen(port, () => {
  console.log(`Ouvindo em http://localhost:${port}`);
});

