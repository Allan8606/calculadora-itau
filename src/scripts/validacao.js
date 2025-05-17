//Vai verificar se os valores digitados estão validos e dentro das normas do banco

import { mostrarErro } from "./erro.js";

export function verificaValoresValidos(valor, meses, resultado) {
    resultado.innerHTML = "";

    const valorNumerico = parseFloat(valor.value.replace(/\D/g, "")) / 100;
    const mesesNumerico = parseInt(meses.value);

    if (isNaN(valorNumerico) || valorNumerico <= 0 || isNaN(mesesNumerico)) {
        mostrarErro("Por favor, insira valores válidos.", resultado);
        valor.value = "";
        meses.value = "";
        valor.focus();
        return false;
    }

    if (mesesNumerico < 4 || mesesNumerico > 15) {
        mostrarErro(
            "Por favor, escolha um prazo entre 04 e 15 meses.",
            resultado
        );
        meses.value = "";
        meses.focus();
        return false;
    }

    if (valorNumerico < 400 || valorNumerico > 21000) {
        mostrarErro(
            "Por favor, escolha um valor entre R$ 400,00 e R$ 21.000,00.",
            resultado
        );
        valor.value = "";
        valor.focus();
        return false;
    }

    return true;
}
