// Pegando os elementos da tela
const canvas = document.getElementById("canvasSemaforo");
const ctx = canvas.getContext("2d");
const timerElement = document.getElementById("timer");

// Configuração dos tempos do edital (em segundos)
const TEMPOS = {
  VERDE: 10,
  AMARELO: 3,
  VERMELHO: 8
};

let estadoAtual = "VERDE"; // Estado inicial
let tempoRestante = TEMPOS.VERDE;

// Função para desenhar o semáforo no Canvas
function desenharSemaforo() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha a caixa preta do semáforo
  ctx.fillStyle = "#333333";
  ctx.fillRect(20, 20, 160, 380);

  // Luz Vermelha
  ctx.beginPath();
  ctx.arc(100, 80, 45, 0, Math.PI * 2);
  ctx.fillStyle = (estadoAtual === "VERMELHO") ? "#FF0000" : "#550000";
  ctx.fill();

  // Luz Amarela
  ctx.beginPath();
  ctx.arc(100, 210, 45, 0, Math.PI * 2);
  ctx.fillStyle = (estadoAtual === "AMARELO") ? "#FFFF00" : "#555500";
  ctx.fill();

  // Luz Verde
  ctx.beginPath();
  ctx.arc(100, 340, 45, 0, Math.PI * 2);
  ctx.fillStyle = (estadoAtual === "VERDE") ? "#00FF00" : "#005500";
  ctx.fill();
}

// Lógica de contagem e troca de cores
function atualizarTimer() {
  timerElement.innerText = tempoRestante;
  desenharSemaforo();

  if (tempoRestante > 1) {
    tempoRestante--;
  } else {
    // Alterna para a próxima cor de acordo com o ciclo
    if (estadoAtual === "VERDE") {
      estadoAtual = "AMARELO";
      tempoRestante = TEMPOS.AMARELO;
    } else if (estadoAtual === "AMARELO") {
      estadoAtual = "VERMELHO";
      tempoRestante = TEMPOS.VERMELHO;
    } else if (estadoAtual === "VERMELHO") {
      estadoAtual = "VERDE";
      tempoRestante = TEMPOS.VERDE;
    }
  }
}

// Executa a função a cada 1 segundo (1000 milissegundos)
setInterval(atualizarTimer, 1000);

// Desenho inicial
desenharSemaforo();
