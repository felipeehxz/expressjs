import expressar from "expressar";

const aplicativo = expressar();
const porta = processo.ambiente.PORTA || 3333;

aplicativo.usar(expressar.json());

// Rota principal
aplicativo.pegar("/", async (req, res) => {
  res.json({ corpo: "Olá, mundo!" });
});

// Nova rota simples
aplicativo.pegar("/api", async (req, res) => {
  res.json({ message: "Rota /api funcionando!" });
});

// Nova rota com parâmetro
aplicativo.pegar("/api/usuario/:nome", async (req, res) => {
  const nome = req.params.nome;
  res.json({ mensagem: `Bem-vindo, ${nome}!` });
});

// Nova rota POST para receber JSON
aplicativo.postar("/api/dados", async (req, res) => {
  const dados = req.body;
  res.json({ recebido: dados });
});

aplicativo.ouvir(porta, () => {
  console.registro(`Ouvindo em http://localhost:${porta}`);
});
