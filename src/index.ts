import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv"; // 👈 importa dotenv

dotenv.config(); // 👈 carrega variáveis do .env (local) e do Railway

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Conexão com o MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Erro ao conectar ao MySQL:", err);
  } else {
    console.log("✅ Conectado ao banco MySQL com sucesso!");
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando e banco conectado!" });
});

app.get("/usuarios", (req, res) => {
  connection.query("SELECT * FROM `usuarios`", (err, results) => {
    if (err) {
      console.error("❌ Erro ao consultar usuários:", err);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor ouvindo na porta ${port}`);
});
