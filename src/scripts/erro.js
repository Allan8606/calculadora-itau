// Agora espera o elemento onde a mensagem será exibida
export function mostrarErro(msg, resultado) {
    const erro = document.createElement("p");
    erro.classList.add("erro");
    erro.textContent = msg;
    resultado.appendChild(erro);
}
