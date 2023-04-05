// Récupérer la couleur de fond du conteneur de jeu
const gameContainer = document.getElementById('game-container');
const backgroundColor = window.getComputedStyle(gameContainer).getPropertyValue('background-color');

// Convertir la couleur de fond en format RGB
const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
const match = backgroundColor.match(rgbRegex);
const r = parseInt(match[1]) / 255;
const g = parseInt(match[2]) / 255;
const b = parseInt(match[3]) / 255;

// Initialisation de la scène avec la couleur de fond du conteneur de jeu
const scene = new THREE.Scene();
scene.background = new THREE.Color(r, g, b);


// Initialisation de la caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Initialisation du rendu
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('dice-canvas'), alpha: true});
renderer.setSize(window.innerWidth * 0.3, window.innerHeight * 0.3);



// Ajout de la lumière ambiante
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);




// Création de la géométrie du dé
const geometry = new THREE.BoxGeometry(1, 1, 1);



// Création du matériau du dé
const material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load('https://cors-anywhere.herokuapp.com/https://game-icons.net/1x1/delapouite/dice-six-faces-one.html'),
  color: 0xffffff 
});




// Création du mesh (objet 3D) du dé
const dice = new THREE.Mesh(geometry, material);
dice.id = "dice";


// Positionnement du dé dans la scène
dice.position.set(1, 1, 1);

console.log(dice);



// Ajout du dé à la scène
scene.add(dice);

// Rendu de la scène
renderer.render(scene, camera);



// Variables pour le jeu de dé
let roundScore = 0;
let globalScores = [0, 0];
let currentPlayer = 0;
let diceValue = 0;
let rolls = 0;
let turnScore = 0;

//6 faces du dé
const dice1 = new THREE.TextureLoader().load('https://cors-anywhere.herokuapp.com/https://game-icons.net/1x1/delapouite/dice-six-faces-one.html');
const dice2 = new THREE.TextureLoader().load('https://cors-anywhere.herokuapp.com/https://game-icons.net/1x1/delapouite/dice-six-faces-two.html');
const dice3 = new THREE.TextureLoader().load('https://cors-anywhere.herokuapp.com/https://game-icons.net/1x1/delapouite/dice-six-faces-three.html');
const dice4 = new THREE.TextureLoader().load('https://cors-anywhere.herokuapp.com/https://game-icons.net/1x1/delapouite/dice-six-faces-four.html');
const dice5 = new THREE.TextureLoader().load('https://cors-anywhere.herokuapp.com/https://game-icons.net/1x1/delapouite/dice-six-faces-five.html');
const dice6 = new THREE.TextureLoader().load('https://cors-anywhere.herokuapp.com/https://game-icons.net/1x1/delapouite/dice-six-faces-six.html');

//Fonction pour générer une des 6 faces du dé
function updateDiceTexture(value) {
  switch (value) {
    case 1:
      dice.material.map = dice1;
      break;
    case 2:
      dice.material.map = dice2;
      break;
    case 3:
      dice.material.map = dice3;
      break;
    case 4:
      dice.material.map = dice4;
      break;
    case 5:
      dice.material.map = dice5;
      break;
    case 6:
      dice.material.map = dice6;
      break;
  }
}



// Fonction pour mettre à jour l'affichage du score
function updateScoreUI() {
  if (globalScores[currentPlayer] + turnScore > 100) {
    document.getElementById(`player${currentPlayer + 1}-score`).textContent = 'WINNER!';
    document.getElementById('current-score').textContent = '';
    document.getElementById('roll-btn').setAttribute('disabled', true);
    document.getElementById('hold-btn').setAttribute('disabled', true);
  } else {
    document.getElementById('player1-score').textContent = globalScores[0];
    document.getElementById('player2-score').textContent = globalScores[1];
    document.getElementById('current-score').textContent = turnScore;
  }
}

// Fonction pour réinitialiser le jeu
function restartGame() {
  roundScore = 0;
  globalScores = [0, 0];
  currentPlayer = 0;
  diceValue = 0;
  dice.rotation.x = 0;
  dice.rotation.y = 0;
  rolls = 0;
  updateScoreUI();
}

// Fonction pour lancer le dé
function rollDice() {
  if (rolls < 3) {
    
    diceValue = Math.floor(Math.random() * 6) + 1;;
    roundScore += diceValue;
    turnScore += diceValue;

    dice.rotation.x += Math.PI / 4;
    dice.rotation.y += Math.PI / 4;

    updateDiceTexture(diceValue);

    rolls++;
    updateScoreUI();
  if(rolls === 3 && roundScore >= 12 && roundScore <=18){
      rolls = 0;
      roundScore = 0;
      }
    
  
  } else {
    hold();

  }
  console.log(rolls)
  console.log(roundScore)
  console.log(turnScore)
  
}

// Fonction pour passer le tour
function hold() {
  globalScores[currentPlayer] += turnScore;
  roundScore = 0;
  rolls = 0;
  turnScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  updateScoreUI();
}




// Événement pour lancer le dé
document.getElementById('roll-btn').addEventListener('click', function() {
  rollDice();
});

// Événement pour passer le tour
document.getElementById('hold-btn').addEventListener('click', function() {
  hold();
});

// Événement pour redémarrer le jeu
document.getElementById('restart-btn').addEventListener('click', function() {
  restartGame();
});


// Boucle d'animation pour afficher la scène
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();







  

