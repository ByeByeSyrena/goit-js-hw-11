import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById("search-form");
let input = form.elements.searchQuery;
const gallery = document.querySelector(".gallery");
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "38857854-067aa7c8dbb389fbf2efb7da8"

let arrayOfImgs = null;

form.addEventListener("submit", getImgParams);

const fetchImgs = async () =>  {
  try {
    const response = await axios.get(BASE_URL, {
      params:
      {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        p: input.value,
      }
    });
    return response.data.hits;
  }
  catch(error) {
    console.log("error");
}
};

  async function getImgParams() {
    arrayOfImgs = await fetchImgs();

    if (arrayOfImgs.length === 0) { 
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    };

    const markup = arrayOfImgs
      .map(
        ({ webformatURL, largeImageURL, tag, likes, views, comments, downloads, }) => `
     <div class="photo-card">
        <img src="${webformatURL}" alt="${tag}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`).join("");
    gallery.insertAdjacentHTML("afterbegin", markup);
  };

