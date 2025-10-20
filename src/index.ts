import express from "express";
import cors from "cors"; // ✅ importa CORS

const app = express();
const port = process.env.PORT || 3333;

app.use(cors()); // ✅ habilita CORS
app.use(express.json());

// 🏠 rota principal
app.get("/", (req, res) => {
  res.json({ body: "Olá, mundo!" });
});

// 🧭 rota /api
app.get("/api", (req, res) => {
  res.json({ message: "Rota /api funcionando!" });
});

// 👤 rota com parâmetro
app.get("/api/usuario/:nome", (req, res) => {
  const nome = req.params.nome;
  res.json({ mensagem: `Bem-vindo, ${nome}!` });
});

// 📩 rota POST
app.post("/api/dados", (req, res) => {
  const dados = req.body;
  res.json({ recebido: dados });
});

// 🚀 iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor ouvindo em http://localhost:${port}`);
});
