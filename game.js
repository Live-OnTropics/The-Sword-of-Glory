// Game setup
const mapContainer = document.getElementById("map-container");
const infoPanel = document.getElementById("info-panel");
let currentCountry = null;

// Tile data structure: Each tile has a type, and country (for simplicity)
const tiles = [];

// Initialize the map grid with hexagonal tiles
function initializeMap(rows, cols) {
    const hexWidth = 60;
    const hexHeight = 60;
    const offsetX = 0;
    const offsetY = 0;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let tileType = 'city'; // Default to city for simplicity
            if (Math.random() < 0.1) tileType = 'water'; // Randomly make some water tiles
            tiles.push({x, y, type: tileType, country: null});
            const hex = document.createElement('div');
            hex.classList.add('hex');
            hex.style.left = `${x * (hexWidth * 0.75)}px`;
            hex.style.top = `${y * (hexHeight * 0.87)}px`;

            // Attach event listener for tile interactions
            hex.addEventListener('click', () => handleTileClick(x, y));

            mapContainer.appendChild(hex);
        }
    }
}

// Handle tile click event
function handleTileClick(x, y) {
    const clickedTile = tiles.find(tile => tile.x === x && tile.y === y);
    if (clickedTile.type === 'water') {
        alert("This is a water tile. Cannot build or control.");
    } else {
        // If the tile is a city, display info about the country there
        if (clickedTile.country) {
            alert(`You clicked on ${clickedTile.country}'s city!`);
        } else {
            alert("This is an unclaimed city.");
        }
    }
}

// Set up the country in a tile
function placeCountry(countryName, x, y) {
    const tile = tiles.find(tile => tile.x === x && tile.y === y);
    if (tile && tile.type === 'city') {
        tile.country = countryName;
    }
}

// Set up the game with 10x10 grid
initializeMap(10, 10);

// Example: Placing a country in a few tiles
placeCountry('Germany', 1, 1);
placeCountry('France', 3, 3);

// End turn functionality (for later game mechanics)
document.getElementById("end-turn").addEventListener("click", () => {
    alert("Ending turn...");
    // Example: Here, we could trigger AI actions and other mechanics
});

// Display current country info when selected
function displayCountryInfo(countryName) {
    document.getElementById('current-country').textContent = `Current Country: ${countryName}`;
}

// Simple AI system to perform actions
function simpleAI(countryName) {
    // Example: AI builds a unit for the country
    alert(`${countryName} is building a unit.`);
    // Example: AI declares war on a neighboring country
    declareWar('Germany', 'France');
}

// Declare war function (simple)
function declareWar(attacker, defender) {
    alert(`${attacker} declares war on ${defender}.`);
}

// Example: Run simple AI for 'Germany' and 'France'
simpleAI('Germany');
simpleAI('France');
