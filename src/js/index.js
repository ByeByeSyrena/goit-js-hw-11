import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById("search-form");
const input = form.elements.searchQuery;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "38857854-067aa7c8dbb389fbf2efb7da8"

let array = null;

async function getGallery() {
  try {
    const response = await axios.get(BASE_URL, { 
      params:
      {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        p: `EncodeURIComponent('${input.value}')`,
      }
    });
    return response.hits;
  }
  catch(error) {
    console.log("error");
}
};

getGallery();


form.addEventListener("submit", (event) => {

  if (event.target !== BUTTON) {
    return;
  } else if (input.value =""){
    return Notiflix.Notify.warning('Please fill in this field');
  };

  getGallery(input.value);

  // else if (input = "" || input !== ) { // тут має бути ім'я елементу масиву
  //   Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
  // }


});


