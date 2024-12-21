const countries = [
    { name: 'Country A', resources: { oil: 500, steel: 500, food: 500, manpower: 500 }, x: 10, y: 5 },
    { name: 'Country B', resources: { oil: 500, steel: 500, food: 500, manpower: 500 }, x: 20, y: 15 },
  ];
  
  function updateAI() {
    countries.forEach(country => {
      // AI behavior (example: accumulate resources)
      country.resources.oil += 10;
      country.resources.steel += 5;
      country.resources.food += 15;
      country.resources.manpower += 3;
  
      // Move the country around (example behavior)
      country.x = Math.floor(Math.random() * (mapWidth / tileSize));
      country.y = Math.floor(Math.random() * (mapHeight / tileSize));
    });
  
    drawMap();
  }
  
  setInterval(updateAI, 5000);  