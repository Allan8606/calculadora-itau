const valor = document.getElementById("valor");
const meses = document.getElementById("meses");
const btn = document.getElementsByClassName("btn-calcular")[0];
const resultado = document.getElementById("resultado");

// Limpa os campos do formulário
function limparFormulario() {
    valor.value = "";
    meses.value = "";
}

// Função para exibir uma mensagem de erro
function mostrarErro(msg) {
    const erro = document.createElement("p");
    erro.classList.add("erro");
    erro.textContent = msg;
    resultado.appendChild(erro);
}

// Verifica se os valores inseridos são válidos
function verificaValoresValidos() {
    resultado.innerHTML = ""; // Limpa resultado anterior

    if (
        isNaN(valor.value) ||
        valor.value <= 0 ||
        isNaN(meses.value)
    ) {
        mostrarErro("Por favor, insira valores válidos.");
        limparFormulario();
        valor.focus();
        return false;
    }

    if (meses.value < 4 || meses.value > 15) {
        mostrarErro("Por favor, escolha um prazo entre 04 e 15 meses.");
        meses.value = "";
        meses.focus();
        return false;
    }

    if (valor.value < 400 || valor.value > 21000) {
        mostrarErro("Por favor, escolha um valor entre R$ 400,00 e R$ 21.000,00.");
        valor.value = "";
        valor.focus();
        return false;
    }

    return true;
}

// Função para calcular a parcela
function formulaCalcularParcela() {
    resultado.innerHTML = ""; // Limpa qualquer resultado anterior

    const tac = 0.03;
    const taxaJuros = 0.0410;
    const numParcelas = parseInt(meses.value);
    const valorBruto = parseFloat(valor.value);
    const valorFinanciado = valorBruto * (1 + tac);

    const valorParcela = (valorFinanciado * taxaJuros) /
        (1 - Math.pow(1 + taxaJuros, -numParcelas));

    const valorFormatado = valorParcela.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    resultado.innerHTML = `O valor da parcela será de ${valorFormatado}`;

    mostrarErro("Os valores não são exatos, mas sim aproximados.");
    mostrarErro("Valores com vencimento de 30 dias.");
}

// Função principal acionada ao clicar no botão
function calcularParcela() {
    if (!verificaValoresValidos()) {
        return;
    }

    formulaCalcularParcela();
}

// Evento do botão
btn.addEventListener("click", calcularParcela);
