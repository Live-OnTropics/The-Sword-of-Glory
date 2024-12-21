const canvas = document.getElementById('game-map');
const ctx = canvas.getContext('2d');
const tileSize = 50;
let offsetX = 0, offsetY = 0, scale = 1;
let mapWidth = 2000, mapHeight = 1000; // Fixed size for infinite scroll feature

const terrainImages = {
    plains: new Image(),
    forest: new Image(),
    mountain: new Image(),
    water: new Image(),
};

terrainImages.plains.src = 'assets/images/terrain/plains.png';
terrainImages.forest.src = 'assets/images/terrain/forest.png';
terrainImages.mountain.src = 'assets/images/terrain/mountain.png';
terrainImages.water.src = 'assets/images/terrain/water.png';

function generateMap() {
    const map = [];
    for (let y = 0; y < mapHeight / tileSize; y++) {
        const row = [];
        for (let x = 0; x < mapWidth / tileSize; x++) {
            const terrains = ['plains', 'forest', 'mountain', 'water'];
            row.push(terrains[Math.floor(Math.random() * terrains.length)]);
        }
        map.push(row);
    }
    return map;
}

let map = generateMap();

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const terrain = map[y][x];
            ctx.drawImage(
                terrainImages[terrain],
                x * tileSize + offsetX, y * tileSize + offsetY,
                tileSize, tileSize
            );
        }
    }
}

function zoom(factor) {
    scale = Math.min(3, Math.max(0.5, scale * factor));
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.scale(scale, scale);
    drawMap();
}

function pan(dx, dy) {
    offsetX += dx;
    offsetY += dy;
    drawMap();
}

canvas.addEventListener('mousedown', (e) => {
    const mouseX = (e.clientX - canvas.offsetLeft - offsetX) / scale;
    const mouseY = (e.clientY - canvas.offsetTop - offsetY) / scale;
    
    // Handle unit selection or interaction
});

canvas.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        zoom(0.8);
    } else {
        zoom(1.2);
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') pan(0, 10);
    if (e.key === 'ArrowDown') pan(0, -10);
    if (e.key === 'ArrowLeft') pan(10, 0);
    if (e.key === 'ArrowRight') pan(-10, 0);
});

// Initialize the map
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
drawMap();
