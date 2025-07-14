import { formatarParaMoeda } from "./formatarParaMoeda.js";

const valorParcela = document.getElementById("valor-parcela");
const diasAtraso = document.getElementById("dias-atraso");
const btnCalcular = document.querySelector(".btn-calcular");
const resultado = document.getElementById("resultado");

valorParcela.addEventListener("input", formatarParaMoeda);

function parseValorMoeda(valor) {
  // Remove tudo que não for número
  const limpo = valor.replace(/\D/g, "");
  return parseFloat(limpo) / 100;
}

function arredondar2(valor) {
  return Math.round(valor * 100) / 100;
}

// Arredonda para cima para o próximo múltiplo de 0,05
function arredondarParaCincoCentavos(valor) {
  return Math.ceil(valor * 20) / 20;
}

function calcularAtraso() {
  const valorOriginal = parseValorMoeda(valorParcela.value);
  const dias = parseInt(diasAtraso.value, 10);
  if (isNaN(valorOriginal) || valorOriginal <= 0) {
    resultado.innerHTML = '<span class="erro">Digite um valor válido para a parcela.</span>';
    return;
  }
  if (isNaN(dias) || dias <= 0) {
    resultado.innerHTML = '<span class="erro">Digite a quantidade de dias de atraso.</span>';
    return;
  }

  const taxaJuros = 0.00153; // 0,153% ao dia
  const multa = 0.02; // 2% multa única

  // Aplica multa sobre o valor original e ARREDONDA para 2 casas decimais
  const valorComMulta = arredondar2(valorOriginal * (1 + multa));
  // Aplica juros compostos sobre o valor com multa
  let valorFinal = arredondar2(valorComMulta * Math.pow(1 + taxaJuros, dias));
  // Arredonda para o próximo múltiplo de 0,05
  valorFinal = arredondarParaCincoCentavos(valorFinal);

  resultado.innerHTML = `Valor Atual da Parcela: <br><strong>${valorFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>`;
}

btnCalcular.addEventListener("click", calcularAtraso); 