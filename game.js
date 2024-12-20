// Game setup
const mapContainer = document.getElementById("map-container");
const infoPanel = document.getElementById("info-panel");
let currentCountry = null;
let countries = [];
let tiles = [];

// Define resources
const resources = {
    steel: 0,
    oil: 0,
    manpower: 0,
    money: 0
};

// Define the country class
class Country {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.tiles = [];
        this.militaryUnits = [];
        this.resources = { ...resources };
    }

    // Add a tile to the country
    addTile(tile) {
        this.tiles.push(tile);
        tile.country = this;
        tile.setColor(this.color);
    }

    // Build a unit
    buildUnit(type) {
        if (this.resources.money >= 100) {
            this.resources.money -= 100;
            const unit = new MilitaryUnit(type, this);
            this.militaryUnits.push(unit);
        }
    }
}

// Define the tile class
class Tile {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // city, forest, water, etc.
        this.country = null;
    }

    // Change the tile's color when controlled by a country
    setColor(color) {
        const hex = document.querySelector(`.hex[data-x="${this.x}"][data-y="${this.y}"]`);
        hex.style.backgroundColor = color;
    }
}

// Define military units
class MilitaryUnit {
    constructor(type, country) {
        this.type = type; // e.g., infantry, tank
        this.country = country;
        this.location = null; // Tile where unit is located
    }

    // Move the unit to a different tile
    move(newTile) {
        if (this.location) {
            this.location.country = null;
        }
        this.location = newTile;
        newTile.country = this.country;
    }
}

// Initialize map
function initializeMap(rows, cols) {
    const hexWidth = 60;
    const hexHeight = 60;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const tileType = Math.random() < 0.1 ? 'water' : 'city'; // 10% chance to be water
            const tile = new Tile(x, y, tileType);
            tiles.push(tile);

            const hex = document.createElement('div');
            hex.classList.add('hex');
            hex.setAttribute('data-x', x);
            hex.setAttribute('data-y', y);
            hex.style.left = `${x * (hexWidth * 0.75)}px`;
            hex.style.top = `${y * (hexHeight * 0.87)}px`;

            hex.addEventListener('click', () => handleTileClick(tile));

            mapContainer.appendChild(hex);
        }
    }
}

// Handle tile clicks
function handleTileClick(tile) {
    if (tile.country) {
        alert(`You clicked on ${tile.country.name}'s tile!`);
    } else {
        alert("This is an unclaimed city or land.");
    }
}

// Place countries on the map
function placeCountry(country, x, y) {
    const tile = tiles.find(t => t.x === x && t.y === y);
    if (tile && tile.type === 'city') {
        country.addTile(tile);
    }
}

// Create some countries
const germany = new Country("Germany", "green");
const france = new Country("France", "blue");
countries.push(germany, france);

// Place countries
placeCountry(germany, 1, 1);
placeCountry(france, 3, 3);

// Display country info
function displayCountryInfo(country) {
    document.getElementById('current-country').textContent = `Current Country: ${country.name}`;
    document.getElementById('resources').textContent = `Resources: Steel: ${country.resources.steel}, Oil: ${country.resources.oil}, Manpower: ${country.resources.manpower}, Money: ${country.resources.money}`;
}

// Example of building units
germany.buildUnit("infantry");

// End Turn button functionality
document.getElementById("end-turn").addEventListener("click", () => {
    alert("Ending turn...");
    // Example: Here, we could trigger AI actions and other mechanics like building units or declaring war
    simpleAI(germany);
});

// Simple AI behavior for now
function simpleAI(country) {
    alert(`${country.name} AI is making moves!`);
    country.buildUnit("tank"); // Example AI action
}

// Initialize map with 10x10 grid
initializeMap(10, 10);
