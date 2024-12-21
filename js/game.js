const units = [];
const structures = [];

function createUnit(x, y, type) {
    const unit = {
        x, y, type,
        width: tileSize, height: tileSize,
        color: 'red',
    };
    units.push(unit);
    drawMap();
}

function buildStructure(type) {
    const structure = {
        type,
        x: Math.floor(offsetX / tileSize),
        y: Math.floor(offsetY / tileSize),
        width: tileSize * 2,
        height: tileSize * 2,
    };
    structures.push(structure);
    drawMap();
}

function updateAI() {
    units.forEach(unit => {
        unit.x = Math.floor(Math.random() * (mapWidth / tileSize));
        unit.y = Math.floor(Math.random() * (mapHeight / tileSize));
    });
    structures.forEach(structure => {
        // Structures can generate resources over time
    });

    drawMap();
}

setInterval(updateAI, 5000);
