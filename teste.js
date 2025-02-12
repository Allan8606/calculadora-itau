// Função para calcular o valor da parcela
function calcularParcela(valorEmprestimo, taxaJuros, numParcelas) {
  const i = taxaJuros / 100; // Converte a taxa de juros para decimal
  const parcela = (valorEmprestimo * i) / (1 - Math.pow(1 + i, -numParcelas));
  return parcela;
}

// Parâmetros fornecidos no exemplo
const valorEmprestimo = 1030.00; // R$ 1.000,00
const taxaJuros = 3.79; // 3.79% ao mês
const numParcelas = 6; // 6 parcelas

// Calculando o valor da parcela
const parcela = calcularParcela(valorEmprestimo, taxaJuros, numParcelas);
console.log("Valor da parcela: R$", parcela.toFixed(2));