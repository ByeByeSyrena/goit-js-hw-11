import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById("search-form");
let input = form.elements.searchQuery;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "38857854-067aa7c8dbb389fbf2efb7da8"

async function getGallery() {
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
    return response;
  }
  catch(error) {
    console.log("error");
}
};

// getGallery();


form.addEventListener("submit", async (event) => {

  event.preventDefault();
  const searchKeywords = input.value.toLowerCase().split(" ").join("+");
  
  input.value = searchKeywords;

  if (!searchKeywords || searchKeywords == "") {
    Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    return;
  };

    try {
    const galleryData = await getGallery(searchKeywords);
    console.log(galleryData);
  } catch (error) {
    console.error('Error:', error);
  };
});


