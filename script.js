const imageContainer = document.getElementById("image-container");
const loadingSpinner = document.getElementById("loading-spinner");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imagesArray = [];

const count = 25;
const apiKey = "BIZgMIiPodIobg8jzZZDypOfM6Pw3rgvJx4AnVzoW3I";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageLoaded = () => {
  console.log("Image loaded:", imagesLoaded);
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log("ready =", ready);
  }
};

const setAttributes = (domElement, attributes) => {
  for (const key in attributes) {
    domElement.setAttribute(key, attributes[key]);
  }
};

const displayImages = () => {
  imagesLoaded = 0;
  totalImages = imagesArray.length;
  console.log("total images:", totalImages);
  imagesArray.forEach((image) => {
    const item = document.createElement("a");
    // item.setAttribute("href", image.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: image.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    // img.setAttribute("src", image.urls.regular);
    // img.setAttribute("alt", image.alt_description);
    // img.setAttribute("title", image.alt_description);
    setAttributes(img, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

const getUnsplashImages = async () => {
  try {
    const response = await fetch(apiUrl);
    imagesArray = await response.json();
    displayImages();
  } catch (error) {
    console.log(error);
    return error;
  }
};

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getUnsplashImages();
  }
});

getUnsplashImages();
