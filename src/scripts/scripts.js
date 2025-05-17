import { formatarParaMoeda } from "./formatarParaMoeda.js";
import { verificaValoresValidos } from "./validacao.js";
import { formulaCalcularParcela } from "./calculoParcela.js";

const valor = document.getElementById("valor");
const meses = document.getElementById("meses");
const btn = document.querySelector(".btn-calcular");
const resultado = document.getElementById("resultado");

valor.addEventListener("input", formatarParaMoeda);

function calcularParcela() {
    if (!verificaValoresValidos(valor, meses, resultado)) return;
    formulaCalcularParcela(valor, meses, resultado);
}

btn.addEventListener("click", calcularParcela);
