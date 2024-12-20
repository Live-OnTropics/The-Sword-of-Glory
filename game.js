// Initialize resources and military units
let resources = {
    oil: 1000,
    steel: 1000,
    food: 1000,
    manpower: 1000
  };
  
  let militaryUnits = {
    infantry: 0,
    tanks: 0,
    aircraft: 0
  };
  
  // Reference to UI elements
  const oilElement = document.getElementById('oil');
  const steelElement = document.getElementById('steel');
  const foodElement = document.getElementById('food');
  const manpowerElement = document.getElementById('manpower');
  const infantryElement = document.getElementById('infantry');
  const tanksElement = document.getElementById('tanks');
  const aircraftElement = document.getElementById('aircraft');
  
  // Update resources in the UI
  function updateResources() {
    oilElement.textContent = resources.oil;
    steelElement.textContent = resources.steel;
    foodElement.textContent = resources.food;
    manpowerElement.textContent = resources.manpower;
  }
  
  function updateMilitary() {
    infantryElement.textContent = militaryUnits.infantry;
    tanksElement.textContent = militaryUnits.tanks;
    aircraftElement.textContent = militaryUnits.aircraft;
  }
  
  // Game Map (Canvas) setup
  const canvas = document.getElementById('game-map');
  const ctx = canvas.getContext('2d');
  
  // Draw the game grid (for simplicity, 10x10 grid)
  function drawMap() {
    const gridSize = 50; // 50px per grid
    const rows = canvas.height / gridSize;
    const cols = canvas.width / gridSize;
  
    // Loop through each grid cell and draw it
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        ctx.strokeStyle = '#ccc';
        ctx.strokeRect(col * gridSize, row * gridSize, gridSize, gridSize);
      }
    }
  }
  
  // Initial map drawing
  drawMap();
  
  // Update the game state every second
  setInterval(() => {
    // Simulate resource depletion over time
    resources.oil -= 5;
    resources.steel -= 5;
    resources.food -= 2;
    resources.manpower -= 1;
  
    // Update the UI
    updateResources();
    updateMilitary();
  
    // Draw map again
    drawMap();
  }, 1000);
  
  // Toggle Diplomacy Sidebar
  function toggleDiplomacy() {
    alert("Diplomacy UI coming soon...");
  }
  
  // Function to recruit military units
  function recruitUnit(type) {
    if (resources.steel > 50 && resources.oil > 50) {
      switch (type) {
        case 'infantry':
          militaryUnits.infantry++;
          resources.steel -= 50;
          resources.oil -= 50;
          break;
        case 'tanks':
          militaryUnits.tanks++;
          resources.steel -= 100;
          resources.oil -= 100;
          break;
        case 'aircraft':
          militaryUnits.aircraft++;
          resources.steel -= 150;
          resources.oil -= 150;
          break;
        default:
          break;
      }
    } else {
      alert("Not enough resources!");
    }
    updateMilitary();
  }
  
  // Simulate recruiting infantry
  setInterval(() => {
    recruitUnit('infantry');
  }, 5000); // Recruit 1 infantry every 5 seconds
  