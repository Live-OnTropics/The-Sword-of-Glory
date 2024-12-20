// Game state and configuration
const map = [];
const resources = {
  oil: 1000,
  steel: 1000,
  food: 1000,
  manpower: 1000,
};
let controlledTerritories = [];

// Terrain types and resource modifiers
const terrainTypes = {
  plains: { food: 10, steel: 2, oil: 1 },
  forest: { food: 5, steel: 3, oil: 2 },
  mountains: { food: 1, steel: 5, oil: 1 },
  water: { food: 0, steel: 0, oil: 0 },
};

// Map dimensions and tile size
const mapWidth = 16;
const mapHeight = 16;
const tileSize = 50;

// Initialize the map
function generateMap() {
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      const terrainKeys = Object.keys(terrainTypes);
      const terrain = terrainKeys[Math.floor(Math.random() * terrainKeys.length)];
      const owner = null; // Neutral tile
      const tile = { x, y, terrain, owner };
      map.push(tile);
    }
  }
}

// Draw the map
function drawMap() {
  const canvas = document.getElementById('game-map');
  const ctx = canvas.getContext('2d');
  map.forEach(tile => {
    const color = {
      plains: '#FFFFE0',
      forest: '#228B22',
      mountains: '#A9A9A9',
      water: '#4682B4',
    }[tile.terrain];

    // Draw the tile
    ctx.fillStyle = color;
    ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);

    // Highlight owned tiles
    if (tile.owner) {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.strokeRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
    }
  });
}

// Claim a tile
function claimTile(tile, player) {
  if (!tile.owner) {
    tile.owner = player;
    controlledTerritories.push(tile);
    updateResources();
    drawMap();
  }
}

// Update resources
function updateResources() {
  resources.food = 0;
  resources.steel = 0;
  resources.oil = 0;

  controlledTerritories.forEach(tile => {
    const terrain = terrainTypes[tile.terrain];
    resources.food += terrain.food;
    resources.steel += terrain.steel;
    resources.oil += terrain.oil;
  });

  // Update UI
  document.getElementById('food').textContent = resources.food;
  document.getElementById('steel').textContent = resources.steel;
  document.getElementById('oil').textContent = resources.oil;

  // Update territory list
  const territoryList = document.getElementById('territories');
  territoryList.innerHTML = '';
  controlledTerritories.forEach(tile => {
    const li = document.createElement('li');
    li.textContent = `(${tile.x}, ${tile.y}) - ${tile.terrain}`;
    territoryList.appendChild(li);
  });
}

// Handle map clicks
document.getElementById('game-map').addEventListener('click', (e) => {
  const x = Math.floor(e.offsetX / tileSize);
  const y = Math.floor(e.offsetY / tileSize);
  const tile = map.find(t => t.x === x && t.y === y);
  if (tile) claimTile(tile, 'player');
});

// Initialize the game
generateMap();
drawMap();
