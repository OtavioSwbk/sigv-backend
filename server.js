const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let transactions = []; // Banco de dados temporário (em memória)

// Rota para o Dashboard ler os dados
app.get('/updates', (req, res) => {
  res.json(transactions);
  transactions = []; // Limpa após ler para não duplicar no dashboard
});

// Rota para o seu App de POS ou Fiscal enviar dados
app.post('/transactions', (req, res) => {
  const data = req.body;
  console.log("Recebido:", data);
  transactions.push({
    ...data,
    timestamp: new Date().toISOString()
  });
  res.status(200).json({ status: "sucesso" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
