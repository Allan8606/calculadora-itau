//Calculo para calcular o valor da parcela.
import { mostrarErro } from "./erro.js";

export function formulaCalcularParcela(valor, meses, resultado) {
    resultado.innerHTML = "";

    const tac = 0.03;
    const taxaJuros = 0.041;
    const numParcelas = parseInt(meses.value);
    const valorBruto = parseFloat(valor.value.replace(/\D/g, "")) / 100;
    const valorFinanciado = valorBruto * (1 + tac);

    const valorParcela =
        (valorFinanciado * taxaJuros) /
        (1 - Math.pow(1 + taxaJuros, -numParcelas));

    const valorFormatado = valorParcela.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    resultado.innerHTML = `O valor da parcela será de ${valorFormatado}`;

    mostrarErro("Os valores não são exatos, mas sim aproximados.", resultado);
    mostrarErro("Valores com vencimento de 30 dias.", resultado);
}
