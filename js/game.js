const units = [];

function createUnit(x, y, type) {
    const unit = {
        x, y, type,
        width: tileSize, height: tileSize,
        color: 'red', // Placeholder color
    };
    units.push(unit);
    drawMap();
}

function updateAI() {
    // Basic AI to move units and do actions periodically
    units.forEach(unit => {
        // Move units randomly for testing purposes
        unit.x = Math.floor(Math.random() * (mapWidth / tileSize));
        unit.y = Math.floor(Math.random() * (mapHeight / tileSize));
    });

    drawMap();
}

setInterval(updateAI, 5000);
