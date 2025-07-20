let transactions = [];

document.getElementById("transaction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const desc = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!desc || isNaN(amount)) return;

  transactions.push({
    description: desc,
    amount: amount,
    date: new Date()
  });

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";

  updateUI();
});

function updateUI() {
  const list = document.getElementById("transaction-list");
  list.innerHTML = "";

  let balance = 0;
  let totalIn = 0;
  let totalOut = 0;

  transactions.forEach((tx) => {
    const li = document.createElement("li");
    li.textContent = \`\${tx.description}: R$ \${tx.amount.toFixed(2)} (\${new Date(tx.date).toLocaleDateString()})\`;
    list.appendChild(li);
    balance += tx.amount;
    if (tx.amount >= 0) totalIn += tx.amount;
    else totalOut += Math.abs(tx.amount);
  });

  document.getElementById("balance").textContent = balance.toFixed(2);
  document.getElementById("income").textContent = totalIn.toFixed(2);
  document.getElementById("expenses").textContent = totalOut.toFixed(2);
}

function generateReport() {
  const now = new Date();
  const last7days = new Date();
  last7days.setDate(now.getDate() - 7);

  const filtered = transactions.filter(tx => new Date(tx.date) >= last7days);

  let totalIn = 0;
  let totalOut = 0;

  filtered.forEach(tx => {
    if (tx.amount >= 0) totalIn += tx.amount;
    else totalOut += Math.abs(tx.amount);
  });

  const report = \`
    <h3>📊 Relatório (últimos 7 dias)</h3>
    <p>Entradas: R$ \${totalIn.toFixed(2)}</p>
    <p>Saídas: R$ \${totalOut.toFixed(2)}</p>
    <p>Saldo: R$ \${(totalIn - totalOut).toFixed(2)}</p>
  \`;

  document.getElementById("report-output").innerHTML = report;
}