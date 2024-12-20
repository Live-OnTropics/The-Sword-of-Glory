// Define European countries
const europeCountries = {
    "Germany": { color: "green", tiles: [], resources: { steel: 5, oil: 3, manpower: 10, money: 50 }, militaryUnits: [] },
    "France": { color: "blue", tiles: [], resources: { steel: 4, oil: 4, manpower: 8, money: 60 }, militaryUnits: [] },
    "Italy": { color: "red", tiles: [], resources: { steel: 3, oil: 2, manpower: 6, money: 40 }, militaryUnits: [] },
    "Spain": { color: "yellow", tiles: [], resources: { steel: 3, oil: 1, manpower: 7, money: 45 }, militaryUnits: [] },
    "Poland": { color: "purple", tiles: [], resources: { steel: 4, oil: 2, manpower: 9, money: 50 }, militaryUnits: [] },
    "Russia": { color: "darkblue", tiles: [], resources: { steel: 8, oil: 6, manpower: 15, money: 80 }, militaryUnits: [] },
    "UK": { color: "grey", tiles: [], resources: { steel: 6, oil: 5, manpower: 8, money: 70 }, militaryUnits: [] },
    "Ukraine": { color: "orange", tiles: [], resources: { steel: 3, oil: 2, manpower: 7, money: 45 }, militaryUnits: [] },
    "Sweden": { color: "lightblue", tiles: [], resources: { steel: 4, oil: 1, manpower: 5, money: 40 }, militaryUnits: [] },
    // Add more countries as needed
};

// Store the tiles for the map
const tiles = [];
const mapContainer = document.getElementById('map-container');

// Military Unit Class
class MilitaryUnit {
    constructor(type, country) {
        this.type = type;
        this.country = country;
        this.location = null; // Tile where the unit is located
    }

    // Move the unit to a different tile
    move(newTile) {
        if (this.location) {
            this.location.country = null; // Leave the old tile
        }
        this.location = newTile;
        newTile.country = this.country;
        alert(`${this.type} moved to new tile.`);
    }
}

// Tile Class
class Tile {
    constructor(x, y, type = 'city') {
        this.x = x;
        this.y = y;
        this.type = type; // city, water, etc.
        this.country = null; // Country controlling the tile
        this.element = null; // HTML element
    }

    setColor(color) {
        if (this.element) {
            this.element.style.backgroundColor = color;
        }
    }
}

// Initialize the map with a 20x20 square grid
function initializeEuropeMap(rows, cols) {
    const tileSize = 50;  // Square tile size

    // Loop through the rows and columns to create tiles
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const tileType = Math.random() < 0.05 ? 'water' : 'city'; // Some tiles will be water
            const tile = new Tile(x, y, tileType);

            // Assign country to tiles in a simplistic manner based on position
            if (y < 10 && x < 10) {
                assignTileToCountry(tile, "Germany");
            } else if (y < 10 && x >= 10 && x < 15) {
                assignTileToCountry(tile, "France");
            } else if (y >= 10 && y < 15 && x >= 5 && x < 10) {
                assignTileToCountry(tile, "Italy");
            } else if (y >= 15 && y < 20 && x >= 10 && x < 15) {
                assignTileToCountry(tile, "Russia");
            } else {
                tile.country = null; // Unclaimed tiles
            }

            tiles.push(tile);
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('data-x', x);
            square.setAttribute('data-y', y);
            square.style.left = `${x * tileSize}px`;
            square.style.top = `${y * tileSize}px`;

            square.addEventListener('click', () => handleTileClick(tile));

            mapContainer.appendChild(square);
            tile.element = square;
        }
    }
}

// Assign a tile to a country
function assignTileToCountry(tile, countryName) {
    const country = europeCountries[countryName];
    if (country) {
        country.tiles.push(tile);
        tile.country = countryName;
        tile.setColor(country.color);
    }
}

// Update country resources and display information
function displayCountryInfo(countryName) {
    const country = europeCountries[countryName];
    document.getElementById('current-country').textContent = `Current Country: ${countryName}`;
    document.getElementById('resources').textContent = `Resources: Steel: ${country.resources.steel}, Oil: ${country.resources.oil}, Manpower: ${country.resources.manpower}, Money: ${country.resources.money}`;
}

// Handle tile click to display country info
function handleTileClick(tile) {
    if (tile.country) {
        displayCountryInfo(tile.country);
    }
}

// Declare war between two countries
function declareWar(attacker, defender) {
    alert(`${attacker.name} declares war on ${defender.name}!`);
    // More complex behavior can be added, such as unit combat and territory changes
}

// Example: Initialize the map and create units
initializeEuropeMap(20, 20);

// Creating units for countries
function createUnit(country, type, x, y) {
    const unit = new MilitaryUnit(type, country);
    const tile = tiles.find(t => t.x === x && t.y === y);
    if (tile) {
        unit.location = tile;
        tile.country = country.name;
        country.militaryUnits.push(unit);
    }
}

createUnit(europeCountries["Germany"], "infantry", 1, 1);
const unit = europeCountries["Germany"].militaryUnits[0];
unit.move(tiles.find(t => t.x === 2 && t.y === 2));

document.getElementById('declare-war').addEventListener('click', () => {
    declareWar(europeCountries["Germany"], europeCountries["France"]);
});
