const noButton = document.querySelector('.no-button');
const imagesContainer = document.querySelector('.images-container');

noButton.addEventListener('mouseover', () => {
  const offset = 40; // Odległość odskoku
  const rect = noButton.getBoundingClientRect();

  // Przesunięcie lekko w górę
  let newX = rect.left; // X pozostaje bez zmian
  let newY = rect.top - offset; // Przesuwamy przycisk w górę

  // Zapobieganie wychodzeniu poza ekran
  newX = Math.max(0, Math.min(window.innerWidth - noButton.offsetWidth, newX));
  newY = Math.max(0, Math.min(window.innerHeight - noButton.offsetHeight, newY));

  noButton.style.position = 'absolute';
  noButton.style.left = `${newX}px`;
  noButton.style.top = `${newY}px`;
});
const images = document.querySelectorAll('.floating-image');
const margin = 50; // Margines od krawędzi ekranu
const screenFactor = Math.min(window.innerWidth, window.innerHeight) * 0.3; // 30% mniejszy wymiar ekranu
const minSize = 100; // Minimalny rozmiar zdjęcia
const maxSize = 400; // Maksymalny rozmiar zdjęcia
const overlapMargin = 50; // Dopuszczalne nakładanie się
const placedImages = []; // Lista zapisanych pozycji zdjęć

images.forEach(image => {
  let randomX, randomY, isOverlapping;
  const imageSize = Math.max(minSize, Math.min(maxSize, screenFactor)); // Skaluje do ekranu

  do {
    randomX = margin + Math.random() * (window.innerWidth - 2 * margin - imageSize);
    randomY = margin + Math.random() * (window.innerHeight - 2 * margin - imageSize);

    isOverlapping = placedImages.some(placed => {
      return (
        randomX < placed.x + imageSize - overlapMargin &&
        randomX + imageSize - overlapMargin > placed.x &&
        randomY < placed.y + imageSize - overlapMargin &&
        randomY + imageSize - overlapMargin > placed.y
      );
    });
  } while (isOverlapping);

  placedImages.push({ x: randomX, y: randomY });

  // Przypisanie losowej pozycji i wielkości do obrazów
  image.style.left = `${randomX}px`;
  image.style.top = `${randomY}px`;
  image.style.width = `${imageSize}px`;
  image.style.height = `${imageSize}px`;
});
