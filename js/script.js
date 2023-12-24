document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startGame');
  const counterElement = document.getElementById('counter');
  const colorElements = document.querySelectorAll('.color');

  let sequence = [];
  let playerSequence = [];
  let round = 1;
  let playerTurn = false;

  startButton.addEventListener('click', startGame);

  colorElements.forEach(colorElement => {
    colorElement.addEventListener('click', () => {
      if (playerTurn) {
        const color = colorElement.id;
        lightUpColor(color);
        playSound('player');
        playerSequence.push(color);
        checkPlayerInput();
      }
    });
  });

  function startGame() {
    resetGame();
    playSequence();
  }

  function playSequence() {
    updateCounter();
    sequence.push(getRandomColor());
    animateSequence();
  }

  function getRandomColor() {
    const colors = ['yellow', 'blue', 'red', 'green'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  function animateSequence() {
    playerTurn = false;
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < sequence.length) {
        const color = sequence[i];
        lightUpColor(color);
        playSound('simon');
        setTimeout(() => {
          darkenColor(color);
          i++;
        }, 500);
      } else {
        clearInterval(intervalId);
        playerTurn = true;
      }
    }, 1000);
  }

  function lightUpColor(color) {
    const colorElement = document.getElementById(color);
    colorElement.classList.add('bright');
  }

  function darkenColor(color) {
    const colorElement = document.getElementById(color);
    colorElement.classList.remove('bright');
  }

  function updateCounter() {
    counterElement.textContent = `Round ${round}`;
    round++;
  }

  function checkPlayerInput() {
    const index = playerSequence.length - 1;
    if (playerSequence[index] !== sequence[index]) {
      alert('¡Secuencia incorrecta! Reiniciando el juego.');
      resetGame();
    } else if (playerSequence.length === sequence.length) {
      playerTurn = false;
      playerSequence = [];
      playSequence();
    }
  }

  function resetGame() {
    sequence = [];
    playerSequence = [];
    round = 1;
    playerTurn = false;
  }

  function playSound(type) {
    const audio = new Audio();
    if (type === 'simon') {
      audio.src = '/audio/tono-mensaje.mp3';
    } else if (type === 'player') {
      audio.src = '/audio/tono-mensaje.mp3';
    }
    audio.play();
  }
});
