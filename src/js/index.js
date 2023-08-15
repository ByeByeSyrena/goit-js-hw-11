import axios from "axios";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

// ***********************************************************************************************


// Варіант 1 (через асинхронні функції)

// document.addEventListener('DOMContentLoaded', () => {
//   const breedSelect = document.getElementById('breed-select');
//   const catInfoDiv = document.querySelector('.cat-info');
//   const loader = document.querySelector('.loader');
//   const errorElement = document.querySelector('.error');

//   function toggleLoader(isLoading) {
//     if (isLoading) {
//       loader.style.display = 'inline-block';
//     } else {
//       loader.style.display = 'none';
//     }
//   }

//   toggleLoader(true);
//   fetchBreeds()
//     .then(data => {
//       data.forEach(breed => {
//         const option = document.createElement('option');
//         option.value = breed.id;
//         option.text = breed.name;
//         breedSelect.appendChild(option);
//       });

//       breedSelect.style.display = 'block';
//       toggleLoader(false);
//     })
//     .catch(error => {
//       console.error('Error:', error);

//       errorElement.style.display = 'block';
//       toggleLoader(false);
//     });

//   breedSelect.addEventListener('change', async () => {
//     const selectedOption = breedSelect.options[breedSelect.selectedIndex];
//     const breedId = selectedOption.value;

//     catInfoDiv.style.display = 'none';
//     toggleLoader(true);

//     try {
//       const catData = await fetchCatByBreed(breedId);

//       catInfoDiv.innerHTML = `
//         <img src="${catData.url}" alt="Cat Image" height="300" width="300">
//         <p><strong>Breed:</strong> ${catData.breeds[0].name}</p>
//         <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
//         <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
//       `;

//       catInfoDiv.style.display = 'block';
//       toggleLoader(false);
//       errorElement.style.display = 'none';
//     } catch (error) {
//       console.error('Error:', error);

//       errorElement.style.display = 'block';
//       toggleLoader(false);
//     }
//   });
// });

// ***********************************************************************************************

// Практика з ментором

// import pokemonsApi from "./cat-api";

// import createButton from "./create-button";

// pokemonsApi()
//   .then(pokemonsData => {
//     pokemonsData.map(pokemonData => {
//     createButton(pokemonData);
//     })
//   })
//   .catch(error => {
//     console.log(333, error.message);

// })

// ***********************************************************************************************

const refs = {
  body: document.querySelector("body"),
  select: document.getElementById("breed-select"),
}

  let breedNamesArray = [{ text: 'Choose your sweety boo-boo', value: '', 'data-placeholder': 'true' }];

  const slimSelect = new SlimSelect({
    select: '#breed-select',
    data: breedNamesArray,
    placeholder: true, // not sure it works
  }
  );

fetchBreeds()
  .then(data => {
    data.forEach(element => {
      breedNamesArray.push({ text: element.name, value: element.id });
    });

    slimSelect.setData(breedNamesArray);
  })
  .catch(error => {
    console.log("You are dead");
  });
