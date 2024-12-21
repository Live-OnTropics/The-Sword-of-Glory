const resources = {
    oil: 1000,
    steel: 1000,
    food: 1000,
    manpower: 1000,
    gold: 500,
    energy: 300,
};

function updateResources() {
    document.getElementById('resource-oil').textContent = resources.oil;
    document.getElementById('resource-steel').textContent = resources.steel;
    document.getElementById('resource-food').textContent = resources.food;
    document.getElementById('resource-manpower').textContent = resources.manpower;
    document.getElementById('resource-gold').textContent = resources.gold;
    document.getElementById('resource-energy').textContent = resources.energy;
}

setInterval(() => {
    resources.oil += 10;
    resources.steel += 5;
    resources.food += 20;
    resources.manpower += 3;
    resources.gold += 2;
    resources.energy += 1;
    updateResources();
}, 1000);
