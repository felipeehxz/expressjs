import express from "express";
import mysql from "mysql2";

const app = express();
const port = process.env.PORT || 8080;

// Criar conexão com o banco
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
});

// Testar conexão
connection.connect((err) => {
  if (err) {
    console.error("❌ Erro ao conectar ao MySQL:", err);
  } else {
    console.log("✅ Conectado ao banco MySQL com sucesso!");
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando e banco conectado. tudo certin!" });
});

app.listen(port, () => {
  console.log(`🚀 Servidor ouvindo na porta ${port}`);
});
