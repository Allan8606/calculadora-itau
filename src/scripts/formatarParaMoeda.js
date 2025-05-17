// Formata o valor digitado em tempo real como moeda
export function formatarParaMoeda(e) {
    let valorDigitado = e.target.value;

    // Remove tudo que não for número
    valorDigitado = valorDigitado.replace(/\D/g, "");

    // Converte para número e divide por 100 para colocar centavos
    const valorNumerico = parseFloat(valorDigitado) / 100;

    // Se não for um número válido, limpa o campo
    if (isNaN(valorNumerico)) {
        e.target.value = "";
        return;
    }

    // Formata como moeda brasileira
    e.target.value = valorNumerico.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
