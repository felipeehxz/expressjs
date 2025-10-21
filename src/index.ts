import express from "express";
import mysql from "mysql2";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// 🔧 Configuração do banco
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
});

// 🧩 Testar conexão
connection.connect((err: any) => {
  if (err) {
    console.error("❌ Erro ao conectar ao MySQL:", err);
  } else {
    console.log("✅ Conectado ao banco MySQL com sucesso!");
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando e banco conectado!" });
});

// 📋 Buscar usuários
app.get("/usuarios", (req, res) => {
  // ⬇️ usa o nome correto da tabela com acento e crases
  connection.query("SELECT * FROM `usuários`", (err, results) => {
    if (err) {
      console.error("❌ Erro ao consultar usuários:", err);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor ouvindo na por
