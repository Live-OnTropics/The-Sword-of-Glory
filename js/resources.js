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

// Resource accumulation (simple)
setInterval(() => {
    resources.oil += 10;
    resources.steel += 5;
    resources.food += 20;
    resources.manpower += 3;
    updateResources();
}, 1000);
