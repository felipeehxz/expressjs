import express from "express";
import mysql from "mysql2";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // permite receber JSON no corpo das requisições

// 🔧 Configuração da conexão com o banco
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
});

// 🧩 Teste de conexão com o banco
connection.connect((err: any) => {
  if (err) {
    console.error("❌ Erro ao conectar ao MySQL:", err);
  } else {
    console.log("✅ Conectado ao banco MySQL com sucesso!");
  }
});

// 🌐 Rota principal
app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando e banco conectado!" });
});

// 📋 Rota para listar usuários
app.get("/usuarios", (req, res) => {
  // ⚠️ Use crases se o nome da tabela tiver acento: `usuários`
  connection.query("SELECT * FROM `usuários`", (err, results) => {
    if (err) {
      console.error("❌ Erro ao consultar usuários:", err);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    } else {
      res.json(results);
    }
  });
});

// 🚀 Inicializa o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor ouvindo na porta ${port}`);
});
