app.get("/usuarios", (req, res) => {
  connection.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      console.error("❌ Erro ao consultar usuários:", err);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    } else {
      res.json(results);
    }
  });
});
