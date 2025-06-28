let currentIndex = 0;
let images = [];

// Open Lightbox
function openLightbox(imgElement) {
  images = Array.from(document.querySelectorAll(".gallery .image"))
                .filter(img => img.style.display !== 'none')
                .map(img => img.querySelector('img'));

  currentIndex = images.indexOf(imgElement);

  const lightbox = document.getElementById("lightbox");
  document.getElementById("lightbox-img").src = imgElement.src;
  lightbox.style.display = "block";
}

// Close Lightbox
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Change Image in Lightbox
function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  document.getElementById("lightbox-img").src = images[currentIndex].src;
}

// Filter Images by Category
function filterImages(category) {
  const allImages = document.querySelectorAll(".gallery .image");
  const buttons = document.querySelectorAll(".filter-buttons button");

  allImages.forEach(img => {
    if (category === "all" || img.classList.contains(category)) {
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });

  // Highlight active filter button
  buttons.forEach(btn => btn.classList.remove("active"));
  const clickedButton = Array.from(buttons).find(btn => btn.textContent.toLowerCase() === category.toLowerCase());
  if (clickedButton) clickedButton.classList.add("active");
  else if (category === "all") buttons[0].classList.add("active");
}

// Keyboard Navigation (optional enhancement)
document.addEventListener("keydown", function (e) {
  const lightbox = document.getElementById("lightbox");
  if (lightbox.style.display === "block") {
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "ArrowRight") changeImage(1);
    if (e.key === "Escape") closeLightbox();
  }
});
