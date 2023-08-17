import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const input = form.elements.searchQuery;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "38857854-067aa7c8dbb389fbf2efb7da8"

let arrayOfImgs = null;

const fetchImgs = async (searchQuery) =>  {
  try {
    const response = await axios.get(BASE_URL, {
      params:
      {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        q: searchQuery,
      }
    });
    console.log('Response:', response); // не приберу бо забуду звідки data
    return response.data.hits;
  }
  catch(error) {
    console.log("error");
}
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  gallery.innerHTML = "";

  const searchQuery = input.value;
 if (!searchQuery.trim()) {
    return;
  };
  await getImgParams(searchQuery);
});


  async function getImgParams(searchQuery) {
    arrayOfImgs = await fetchImgs(searchQuery);

    if (arrayOfImgs.length === 0) { 
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    };

    const markup = arrayOfImgs
      .map(
        ({ webformatURL, largeImageURL, tag, likes, views, comments, downloads, }) => `
     <div class="photo-card">
        <a 
    class = "gallery__link"
    href="${largeImageURL}"
    ><img src="${webformatURL}" alt="${tag}" loading="lazy" class="gallery__image" height="300" width="300"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</br>
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

    var lightbox = new SimpleLightbox('.gallery a');

    lightbox.refresh()
  };
