const canvas = document.getElementById('game-map');
const ctx = canvas.getContext('2d');
let offsetX = 0, offsetY = 0, scale = 1;

// Map Properties
const mapWidth = 1000;
const mapHeight = 600;
const tileSize = 20;
const terrainColors = {
  plains: '#d1e7a8',
  forest: '#6d9c59',
  mountain: '#a1a1a1',
  water: '#5da9e9',
};

// Generate a Randomized Map
const map = Array.from({ length: mapHeight / tileSize }, () =>
  Array.from({ length: mapWidth / tileSize }, () => {
    const terrains = Object.keys(terrainColors);
    return terrains[Math.floor(Math.random() * terrains.length)];
  })
);

function drawMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  map.forEach((row, y) => {
    row.forEach((terrain, x) => {
      ctx.fillStyle = terrainColors[terrain];
      ctx.fillRect(x * tileSize + offsetX, y * tileSize + offsetY, tileSize, tileSize);
    });
  });
}

function zoom(factor) {
  scale = Math.min(3, Math.max(0.5, scale * factor));
  ctx.scale(scale, scale);
  drawMap();
}

// Event Listeners
canvas.addEventListener('mousedown', (e) => {
  // Drag functionality
});
