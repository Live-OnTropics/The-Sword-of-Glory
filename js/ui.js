document.getElementById('zoom-in').addEventListener('click', () => zoom(1.2));
document.getElementById('zoom-out').addEventListener('click', () => zoom(0.8));
document.getElementById('reset-view').addEventListener('click', () => {
  offsetX = 0;
  offsetY = 0;
  scale = 1;
  drawMap();
});

// Unit Movement (Drag to Move)
canvas.addEventListener('mousedown', (e) => {
  const mouseX = (e.clientX - canvas.offsetLeft - offsetX) / scale;
  const mouseY = (e.clientY - canvas.offsetTop - offsetY) / scale;

  const selectedUnit = units.find(unit => {
    return (
      mouseX >= unit.x && mouseX <= unit.x + unit.width &&
      mouseY >= unit.y && mouseY <= unit.y + unit.height
    );
  });

  if (selectedUnit) {
    // Update unit position based on drag or click
    const moveUnit = (e) => {
      const newMouseX = (e.clientX - canvas.offsetLeft - offsetX) / scale;
      const newMouseY = (e.clientY - canvas.offsetTop - offsetY) / scale;
      selectedUnit.x = Math.floor(newMouseX);
      selectedUnit.y = Math.floor(newMouseY);
      drawMap();
    };

    canvas.addEventListener('mousemove', moveUnit);
    canvas.addEventListener('mouseup', () => {
      canvas.removeEventListener('mousemove', moveUnit);
    });
  }
});
