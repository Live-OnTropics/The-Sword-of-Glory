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

const units = [];

// Generate a Randomized Map with Terrain Types
const map = Array.from({ length: mapHeight / tileSize }, () =>
  Array.from({ length: mapWidth / tileSize }, () => {
    const terrains = Object.keys(terrainColors);
    return terrains[Math.floor(Math.random() * terrains.length)];
  })
);

// Military Units
function createUnit(x, y, type) {
  return {
    x,
    y,
    type,
    color: 'red',
    width: tileSize,
    height: tileSize,
  };
}

// Add a unit on the map at a specific tile
units.push(createUnit(5, 5, 'infantry'));
units.push(createUnit(10, 10, 'tank'));

function drawMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Terrain
  map.forEach((row, y) => {
    row.forEach((terrain, x) => {
      ctx.fillStyle = terrainColors[terrain];
      ctx.fillRect(x * tileSize + offsetX, y * tileSize + offsetY, tileSize, tileSize);
    });
  });

  // Draw Units
  units.forEach(unit => {
    ctx.fillStyle = unit.color;
    ctx.fillRect(unit.x * tileSize + offsetX, unit.y * tileSize + offsetY, unit.width, unit.height);
  });
}

function zoom(factor) {
  scale = Math.min(3, Math.max(0.5, scale * factor));
  ctx.scale(scale, scale);
  drawMap();
}

canvas.addEventListener('mousedown', (e) => {
  // Drag functionality for units
  const mouseX = (e.clientX - canvas.offsetLeft - offsetX) / scale;
  const mouseY = (e.clientY - canvas.offsetTop - offsetY) / scale;

  // Find the unit closest to mouse click
  const selectedUnit = units.find(unit => {
    return (
      mouseX >= unit.x && mouseX <= unit.x + unit.width &&
      mouseY >= unit.y && mouseY <= unit.y + unit.height
    );
  });

  if (selectedUnit) {
    console.log('Unit Selected', selectedUnit);
  }
});