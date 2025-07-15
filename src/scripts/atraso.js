import { formatarParaMoeda } from "./formatarParaMoeda.js";

const valorParcela = document.getElementById("valor-parcela");
const dataVencimento = document.getElementById("data-vencimento");
const dataPagamento = document.getElementById("data-pagamento");
const btnCalcular = document.querySelector(".btn-calcular");
const resultado = document.getElementById("resultado");
const mensagemDiasAtraso = document.getElementById("mensagem-dias-atraso");

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

function atualizarMensagemDiasAtraso() {
  const vencimento = new Date(dataVencimento.value);
  const pagamento = new Date(dataPagamento.value);
  const diffTime = pagamento - vencimento;
  const dias = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (isNaN(dias) || dias <= 0) {
    mensagemDiasAtraso.textContent = '';
  } else {
    mensagemDiasAtraso.textContent = `Total de dias de atraso: ${dias} dia${dias > 1 ? 's' : ''}`;
  }
}
// Remover chamada de atualizarMensagemDiasAtraso nos eventos de mudança das datas

function calcularAtraso() {
  const valorOriginal = parseValorMoeda(valorParcela.value);
  const vencimento = new Date(dataVencimento.value);
  const pagamento = new Date(dataPagamento.value);
  const diffTime = pagamento - vencimento;
  const dias = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (isNaN(valorOriginal) || valorOriginal <= 0) {
    resultado.innerHTML = '<span class="erro">Digite um valor válido para a parcela.</span>';
    mensagemDiasAtraso.textContent = '';
    return;
  }
  if (isNaN(dias) || dias <= 0) {
    resultado.innerHTML = '<span class="erro">Selecione datas válidas para calcular o atraso.</span>';
    mensagemDiasAtraso.textContent = '';
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
  mensagemDiasAtraso.textContent = `Total de dias de atraso: ${dias} dia${dias > 1 ? 's' : ''}`;
}

btnCalcular.addEventListener("click", calcularAtraso); 