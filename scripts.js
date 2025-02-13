const valor = document.getElementById("valor");
const meses = document.getElementById("meses");
const btn = document.getElementsByClassName("btn-calcular")[0];
const resultado = document.getElementById("resultado");

// Função limpa formulario
function limparFormulario() {
    valor.value = "";
    meses.value = "";
}

// Verifica se os valores inseridos são válidos
function verificaValoresValidos() {
    const erroExistente = document.querySelector(".erro");
    if (
        isNaN(valor.value) ||
        valor.value <= 0 ||
        isNaN(meses.value) ||
        meses.value <= 0 ||
        meses.value > 15
    ) {
        if (!erroExistente) {
            const erro = document.createElement("p");
            erro.classList.add("erro");
            erro.textContent = "Por favor, insira um número valido.";
            resultado.appendChild(erro);
        }

        return false;
    }

    return true;
}

// Função com a fórmula para calcular a parcela
function formulaCalcularParcela() {
    const tac = 0.03;
    const taxaJuros = 0.0399;
    const numParcelas = meses.value;
    const valorBruto = parseFloat(valor.value);
    const valorFinanciado = valorBruto * tac + valorBruto;
    const valorParcela =
        (valorFinanciado * taxaJuros) /
        (1 - Math.pow(1 + taxaJuros, -numParcelas));

    resultado.innerHTML = `O valor da sua parcela sera de R$ ${valorParcela.toFixed(
        2
    )}`;

    const atencao = document.createElement("p");
    atencao.classList.add("erro");
    atencao.textContent = `ATENÇÃO!!!
    Valores aproximados, e calculo com base na maior taxa possível.`;
    resultado.appendChild(atencao);

    const atencao2 = document.createElement("p");
    atencao2.classList.add("erro");
    atencao2.textContent = `Valores com vencimento de 30 dias.`;
    resultado.appendChild(atencao2);
}

function calcularParcela() {
    if (!verificaValoresValidos()) {
        return;
    }

    formulaCalcularParcela();
    
}

btn.addEventListener("click", calcularParcela);
