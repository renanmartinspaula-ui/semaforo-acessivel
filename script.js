const canvas = document.getElementById("canvasSemaforo");
const ctx = canvas.getContext("2d");
const timerElement = document.getElementById("timer");

// Tempos padrões do edital
const TEMPOS = {
  VERDE: 10,
  AMARELO: 3,
  VERMELHO: 8
};

let estadoAtual = "VERDE";
let tempoRestante = TEMPOS.VERDE;
let altoContrasteAtivo = false;

// Função para sintetizar voz (Web Speech API para deficientes visuais)
function falarEstado(texto) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Para fala anterior se houver
    const mensagem = new SpeechSynthesisUtterance(texto);
    mensagem.lang = 'pt-BR';
    window.speechSynthesis.speak(mensagem);
  }
}

// Desenha o semáforo e os símbolos para daltônicos
function desenharSemaforo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Caixa do Semáforo
  ctx.fillStyle = altoContrasteAtivo ? "#000000" : "#333333";
  ctx.fillRect(20, 20, 160, 380);
  ctx.strokeStyle = altoContrasteAtivo ? "#FFFFFF" : "#555555";
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 160, 380);

  // Luz Vermelha
  desenharLuz(100, 80, estadoAtual === "VERMELHO" ? "#FF0000" : "#440000", "❌");

  // Luz Amarela
  desenharLuz(100, 210, estadoAtual === "AMARELO" ? "#FFFF00" : "#444400", "⚠️");

  // Luz Verde
  desenharLuz(100, 340, estadoAtual === "VERDE" ? "#00FF00" : "#004400", "✔");
}

function desenharLuz(x, y, cor, simbolo) {
  ctx.beginPath();
  ctx.arc(x, y, 45, 0, Math.PI * 2);
  ctx.fillStyle = cor;
  ctx.fill();
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Desenha símbolo para daltônicos
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 28px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(simbolo, x, y);
}

// Atualização do ciclo de tempo
function atualizarTimer() {
  timerElement.innerText = tempoRestante;
  desenharSemaforo();

  if (tempoRestante > 1) {
    tempoRestante--;
  } else {
    // Troca de estados do ciclo
    if (estadoAtual === "VERDE") {
      estadoAtual = "AMARELO";
      tempoRestante = TEMPOS.AMARELO;
      falarEstado("Sinal amarelo. Atenção.");
    } else if (estadoAtual === "AMARELO") {
      estadoAtual = "VERMELHO";
      tempoRestante = TEMPOS.VERMELHO;
      falarEstado("Sinal vermelho. Pare.");
    } else if (estadoAtual === "VERMELHO") {
      estadoAtual = "VERDE";
      tempoRestante = TEMPOS.VERDE;
      falarEstado("Sinal verde. Pode atravessar.");
    }
  }
}

// Botão: Solicitar Mais Tempo (Para idosos/cadeirantes)
function solicitarTempoExtra() {
  tempoRestante += 8; // Adiciona 8 segundos extras ao tempo atual
  falarEstado("Mais tempo adicionado para travessia.");
  timerElement.innerText = tempoRestante;
}

// Botão: Modo Alto Contraste (Para daltônicos e baixa visão)
function alternarAltoContraste() {
  altoContrasteAtivo = !altoContrasteAtivo;
  document.body.classList.toggle("alto-contraste");
  desenharSemaforo();
}

// Inicialização
falarEstado("Sinal verde. Pode atravessar.");
setInterval(atualizarTimer, 1000);
desenharSemaforo();
