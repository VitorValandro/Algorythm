function loadImages(element, path, images) {
  images.forEach(image => {
    const img = document.createElement("img");
    img.src = path + image;
    element.appendChild(img);
  })
}