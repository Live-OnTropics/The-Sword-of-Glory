const resources = {
    oil: 1000,
    steel: 1000,
    food: 1000,
    manpower: 1000,
  };
  
  function updateResources() {
    document.getElementById('resource-oil').textContent = resources.oil;
    document.getElementById('resource-steel').textContent = resources.steel;
    document.getElementById('resource-food').textContent = resources.food;
    document.getElementById('resource-manpower').textContent = resources.manpower;
  }
  
  // Example: Decrement Oil
  resources.oil -= 10;
  updateResources();
  