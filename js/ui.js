document.getElementById('zoom-in').addEventListener('click', () => zoom(1.2));
document.getElementById('zoom-out').addEventListener('click', () => zoom(0.8));
document.getElementById('reset-view').addEventListener('click', () => {
  offsetX = 0;
  offsetY = 0;
  scale = 1;
  drawMap();
});
